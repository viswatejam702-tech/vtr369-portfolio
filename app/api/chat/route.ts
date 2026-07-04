import { NextRequest, NextResponse } from "next/server";
import { profile, projects, saasProducts, socials, skills } from "@/lib/data";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are the AI assistant embedded on ${profile.name}'s ("${profile.handle}") portfolio website.
Answer visitor questions ONLY about Viswa Teja Reddy, using the facts below. Be concise, warm, and helpful —
you're here to help hiring managers, clients, or collaborators quickly understand what he does and how to reach him.
If asked something you don't have data for, say so honestly and point them to the contact section instead of guessing.

BIO: ${profile.bio}

FOCUS AREAS: ${profile.focusAreas.join(", ")}

PROJECTS (real GitHub repos):
${projects.map((p) => `- ${p.title} (${p.category}): ${p.description}`).join("\n")}

SAAS PRODUCTS IN VALIDATION:
${saasProducts.map((s) => `- ${s.name}: ${s.description}`).join("\n")}

SKILLS: ${Object.entries(skills)
  .map(([k, v]) => `${k}: ${v.join(", ")}`)
  .join(" | ")}

CONTACT: Email ${socials.email}, WhatsApp ${socials.whatsapp}, LinkedIn ${socials.linkedin}, GitHub ${socials.github}.
If someone wants to hire him or discuss a project, direct them to the Contact section on this page.`;

// Free tier, no credit card: generate a key at https://aistudio.google.com/app/apikey
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "The AI assistant isn't configured yet — the site owner needs to add a free GEMINI_API_KEY environment variable (get one at aistudio.google.com/app/apikey, no card needed). Meanwhile, feel free to use the contact form below!",
      },
      { status: 200 }
    );
  }

  try {
    const { messages } = await req.json();

    // Gemini expects role "model" for the assistant turn, not "assistant".
    const contents = (messages ?? [])
      .slice(-12)
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { maxOutputTokens: 500 },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ reply: `AI backend error: ${errText.slice(0, 150)}` }, { status: 200 });
    }

    const data = await res.json();

    if (data.promptFeedback?.blockReason) {
      return NextResponse.json({
        reply: "I can't answer that one — try asking something about Viswa's projects, skills, or how to reach him.",
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "I couldn't generate a reply — try again.";
    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ reply: "Something went wrong reaching the AI backend. Please try again shortly." }, { status: 200 });
  }
}
