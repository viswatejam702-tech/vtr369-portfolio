import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Default verified premade voice for studio-quality output:
// "JBFqnCBsd6RMkjVDRZzb" -> George (Warm, Captivating Storyteller - Free/Paid compatible)
// "EXAVITQu4vr4xnSDxMaL" -> Sarah (Mature, Reassuring, Confident)
// "CwhRBWXzGAHq8TQ4Fs17" -> Roger (Laid-Back, Casual, Resonant)
// "Xb7hH8MSUJpSbSDYk0k2" -> Alice (Clear, Engaging Educator)
const DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";

export async function GET() {
  const isConfigured = Boolean(process.env.ELEVENLABS_API_KEY);
  return NextResponse.json({
    status: isConfigured ? "configured" : "unconfigured",
    provider: "ElevenLabs Text-to-Speech API",
    defaultVoiceId: process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID,
    recommendedVoices: [
      { id: "JBFqnCBsd6RMkjVDRZzb", name: "George", style: "Warm, Captivating Storyteller" },
      { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", style: "Mature, Reassuring, Confident" },
      { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", style: "Laid-Back, Casual, Resonant" },
      { id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice", style: "Clear, Engaging Educator" },
    ],
    note: "Send POST with { text, apiKey?, voiceId? } to stream audio.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { text, voiceId, apiKey: clientApiKey, modelId } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required for voice synthesis." }, { status: 400 });
    }

    const headerApiKey = req.headers.get("x-elevenlabs-key");
    const activeApiKey = clientApiKey || headerApiKey || process.env.ELEVENLABS_API_KEY;
    const activeVoiceId = voiceId || process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
    const activeModelId = modelId || "eleven_multilingual_v2";

    if (!activeApiKey) {
      return NextResponse.json(
        {
          status: "fallback",
          provider: "browser_synthesis",
          message:
            "No ElevenLabs API key provided. Client should use browser Web Speech API fallback or supply a key in the settings drawer.",
          fallbackVoice: "browser",
        },
        { status: 200 }
      );
    }

    // Call ElevenLabs Text-to-Speech Endpoint
    const synthesize = async (targetVoiceId: string) => {
      return fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(targetVoiceId)}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": activeApiKey,
            Accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text: text.slice(0, 1500),
            model_id: activeModelId,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.15,
              use_speaker_boost: true,
            },
          }),
        }
      );
    };

    let elevenRes = await synthesize(activeVoiceId);

    // If a library voice failed due to plan tier restrictions (402), automatically fallback to verified premade voice
    if ((elevenRes.status === 402 || elevenRes.status === 404) && activeVoiceId !== DEFAULT_VOICE_ID) {
      elevenRes = await synthesize(DEFAULT_VOICE_ID);
    }

    if (!elevenRes.ok) {
      const errText = await elevenRes.text();
      return NextResponse.json(
        {
          error: "ElevenLabs API Error",
          details: errText.slice(0, 250),
          status: "fallback",
        },
        { status: 200 }
      );
    }

    // Stream the audio/mpeg back to client
    const audioData = await elevenRes.arrayBuffer();

    return new Response(audioData, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioData.byteLength.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Voice generation failure",
        message: error?.message || "Unknown error",
        status: "fallback",
      },
      { status: 500 }
    );
  }
}

