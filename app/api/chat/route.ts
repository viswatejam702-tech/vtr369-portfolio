import { NextRequest, NextResponse } from "next/server";
import { profile, projects, saasProducts, socials, skills } from "@/lib/data";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are the AI Concierge embedded on ${profile.name}'s ("${profile.handle}") portfolio website.
Answer visitor questions with deep technical authority and warmth about M. Viswa Teja Reddy, using these verified facts:

ROLE: ${profile.headline}
MISSION & STATUS: ${profile.tagline}
BIO: ${profile.bio}

FLAGSHIP PLATFORMS:
- Vexaro AI: Omni-sector autonomous multi-agent operating system deploying specialized agents across legal, clinical triage, financial forecasting, SDR, and code execution with zero-trust multi-tenancy. Official live website: https://vexaro-app.web.app/. Launching very soon.
- Verified RAG: Production retrieval-augmented generation engine grounded in Lewis et al. (2020) with dense vector MIPS, Cross-Encoder reranking (MS-MARCO), and DeBERTa-v3 claim-level NLI verification to eliminate hallucinations (Live at https://verified-rag.onrender.com).
- Aegis Safety Harness: Comprehensive adversarial red-teaming evaluation harness testing frontier LLMs across 1,000+ jailbreak vectors (Live at https://llm-eval-harness.onrender.com).
- VastCare Vernacular LLM: Multilingual clinical intelligence model fine-tuned for regional Indian languages (Live at https://vastcare-vernacular-llm.onrender.com).
- Synthesizer AI: Differential Privacy generative synthetic data pipeline (Live at https://dp-synth-health.onrender.com).
- Nexus V AI: Autonomous multi-agent swarm framework on GitHub.
- ClauseGuard X: AI legal contract risk intelligence engine.

SKILLS:
${Object.entries(skills)
  .map(([k, v]) => `${k}: ${v.join(", ")}`)
  .join(" | ")}

LOR & CREDENTIALS:
Viswa holds verified Letter of Recommendation credentials (including LOR-VTR-2024-AI01 in Multi-Agent Systems and LOR-VTR-2024-SYS02 in Vexaro AI Architecture), verifiable via the /api/verify-lor endpoint.

CONTACT:
WhatsApp: ${socials.whatsapp} (Direct: https://wa.me/${socials.whatsapp.replace("+", "")})
Email: ${socials.email}
Instagram: ${socials.instagram}
LinkedIn: ${socials.linkedin}
GitHub: ${socials.github}

Always encourage visitors, hiring teams, and collaborators to reach out directly to Viswa via WhatsApp or email.`;

function generateContextualFallbackReply(userQuery: string): string {
  const q = userQuery.toLowerCase();

  if (q.includes("vexaro") || q.includes("agent")) {
    return "M. Viswa Teja Reddy is actively building **Vexaro AI** — an omni-sector autonomous multi-agent operating system. It deploys specialized AI agents across legal, outbound SDR, clinical triage, financial forecasting, and code engineering with zero-trust security gates. Explore the live website at [vexaro-app.web.app](https://vexaro-app.web.app/)!";
  }

  if (q.includes("rag") || q.includes("verified rag") || q.includes("retrieval")) {
    return "Viswa built **Verified RAG**, an end-to-end evidence retrieval and claim-level NLI verification platform based on the Lewis et al. (2020) framework. It features dense MIPS vector search, Cross-Encoder reranking (MS-MARCO), and DeBERTa-v3 Natural Language Inference to provably eliminate hallucinations. You can test it live at [verified-rag.onrender.com](https://verified-rag.onrender.com).";
  }

  if (q.includes("lor") || q.includes("recommendation") || q.includes("credential")) {
    return "Viswa's credentials and Letters of Recommendation are cryptographically verified on-site! You can verify IDs like `LOR-VTR-2024-AI01` (Academic AI LOR) and `LOR-VTR-2024-SYS02` (Vexaro Architecture) via the Verify LOR modal or the `/api/verify-lor` endpoint.";
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("whatsapp") || q.includes("reach")) {
    return `You can connect directly with Viswa on WhatsApp at [wa.me/${socials.whatsapp.replace("+", "")}](https://wa.me/${socials.whatsapp.replace("+", "")}) or email him at ${socials.email}. He is also active on Instagram [@${profile.handle}](https://instagram.com/vtr_.369).`;
  }

  if (q.includes("skill") || q.includes("tech stack") || q.includes("python") || q.includes("typescript")) {
    return "Viswa's core technical proficiencies include Autonomous Multi-Agent Swarms (96%), Full-Stack TypeScript/Next.js (92%), PyTorch Deep Learning & Computer Vision (90%), Machine Learning & LSTMs (93%), and Quantum Computing Foundations (85%).";
  }

  if (q.includes("quantum")) {
    return "Viswa is deeply interested in quantum mechanics and quantum computing foundations, investigating qubit state representations, superposition operators, and how quantum uncertainty frameworks can inform distributed AI agent coordination.";
  }

  return `M. Viswa Teja Reddy is an AI Research Engineer based in Hyderabad/AP, India, currently building **Vexaro AI** (Autonomous Multi-Agent Platform, launching very soon) and engineering research systems like **Verified RAG** and **Aegis Safety Harness**. Feel free to ask about his architectures, verify his LOR credentials, or reach him directly on WhatsApp at [wa.me/${socials.whatsapp.replace("+", "")}](https://wa.me/${socials.whatsapp.replace("+", "")})!`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages = body.messages || [];
    const clientKey = body.apiKey || req.headers.get("x-gemini-key");
    const activeKey = clientKey || process.env.GEMINI_API_KEY;

    const lastMessage = messages[messages.length - 1]?.content || "";

    // If Gemini API Key is available, use live Gemini model
    if (activeKey) {
      const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
      const contents = (messages ?? []).slice(-10).map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": activeKey,
          },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            generationConfig: { maxOutputTokens: 500, temperature: 0.6 },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return NextResponse.json({ reply, provider: "gemini-live" });
        }
      }
    }

    // Fallback: High-precision contextual engine (guarantees zero downtime)
    const reply = generateContextualFallbackReply(lastMessage);
    return NextResponse.json({
      reply,
      provider: "vtr-context-engine",
      note: "Live contextual engine active. Add GEMINI_API_KEY for dynamic generative turns.",
    });
  } catch (err: any) {
    return NextResponse.json({
      reply: "M. Viswa Teja Reddy is building Vexaro AI and pioneering Verified RAG. Connect with him directly on WhatsApp at wa.me/918978237578!",
      provider: "fallback",
    });
  }
}
