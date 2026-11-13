import { NextRequest, NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const runtime = "edge";

interface AutopilotResponse {
  intent: "NAVIGATE" | "EXPLAIN" | "VERIFY_LOR" | "CONNECT" | "TALK" | "GENERAL";
  speechText: string;
  displayText: string;
  action?: {
    type: "SCROLL" | "OPEN_MODAL" | "EXTERNAL_LINK";
    target: string;
  };
  telemetry: {
    processedAt: string;
    engine: string;
    latencyMs: number;
  };
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json().catch(() => ({}));
    const rawCmd = String(body.command || body.query || "").trim();

    if (!rawCmd) {
      return NextResponse.json(
        {
          intent: "TALK",
          speechText: "I am ready. Tell me what you would like to explore or navigate to.",
          displayText:
            "Say or type: 'Tell me about Vexaro', 'Show Verified RAG', 'Verify LOR', 'Skills', or 'Contact on WhatsApp'.",
          telemetry: {
            processedAt: new Date().toISOString(),
            engine: "VTR Autopilot Edge Dispatcher",
            latencyMs: Date.now() - startTime,
          },
        },
        { status: 200 }
      );
    }

    const lower = rawCmd.toLowerCase();

    // 1. Vexaro AI Platform Intent
    if (lower.includes("vexaro") || lower.includes("agentic platform") || lower.includes("multi-agent os")) {
      return NextResponse.json({
        intent: "EXPLAIN",
        speechText:
          "Viswa is building Vexaro AI, an omni-sector autonomous multi-agent operating system with specialized agents across legal, outbound SDR, clinical triage, finance, and code engineering. It is launching very soon.",
        displayText:
          "🚀 **Vexaro AI — Autonomous Agentic Platform**\n\n• **Core**: Omni-sector multi-agent operating system.\n• **Specialized Workforces**: Legal, Outbound SDR, Clinical Triage, Financial Forecasting, and Code Execution.\n• **Architecture**: 8-Layer Agent Architecture with zero-trust multi-tenancy.\n• **Status**: Launching very soon.",
        action: {
          type: "SCROLL",
          target: "#projects",
        },
        telemetry: {
          processedAt: new Date().toISOString(),
          engine: "VTR Autopilot Edge Dispatcher",
          latencyMs: Date.now() - startTime,
        },
      });
    }

    // 2. Verified RAG Intent
    if (lower.includes("verified rag") || lower.includes("rag") || lower.includes("retrieval") || lower.includes("lewis")) {
      return NextResponse.json({
        intent: "EXPLAIN",
        speechText:
          "Verified RAG is Viswa's production retrieval-augmented generation engine grounded in the Lewis et al. end-to-end framework, featuring dense MIPS search, Cross-Encoder reranking, and DeBERTa claim-level NLI verification.",
        displayText:
          "🛡️ **Verified RAG — Evidence & Claim NLI Verification**\n\n• **Framework**: Lewis et al. (NeurIPS 2020) parametric & non-parametric memory.\n• **Retrieval**: Dense MIPS + BM25 Sparse hybrid retrieval with RRF.\n• **Reranker**: Cross-Encoder joint attention (`ms-marco-MiniLM-L-6-v2`).\n• **Verification**: Atomic claim decomposition with DeBERTa-v3 Natural Language Inference.\n• **Live Deployment**: [verified-rag.onrender.com](https://verified-rag.onrender.com)",
        action: {
          type: "SCROLL",
          target: "#projects",
        },
        telemetry: {
          processedAt: new Date().toISOString(),
          engine: "VTR Autopilot Edge Dispatcher",
          latencyMs: Date.now() - startTime,
        },
      });
    }

    // 3. LOR & Credential Verification Intent
    if (lower.includes("lor") || lower.includes("recommendation") || lower.includes("credential") || lower.includes("verify id")) {
      return NextResponse.json({
        intent: "VERIFY_LOR",
        speechText:
          "Opening the LOR Verification Engine. You can inspect verified Letters of Recommendation and credentials for Viswa across AI research, Vexaro architecture, and Quantum exploration.",
        displayText:
          "📜 **Cryptographic LOR & Credentials Registry**\n\n• `LOR-VTR-2024-AI01`: Academic LOR — AI & Multi-Agent Systems\n• `LOR-VTR-2024-SYS02`: Industry Architecture Endorsement — Vexaro AI\n• `LOR-VTR-2025-QUANT369`: Quantum Computing & Mechanics Credential\n• `LOR-VTR-2025-DP04`: Verified RAG & Differential Privacy Certification\n\nAll credentials feature SHA-256 cryptographic verification.",
        action: {
          type: "OPEN_MODAL",
          target: "lor-verifier",
        },
        telemetry: {
          processedAt: new Date().toISOString(),
          engine: "VTR Autopilot Edge Dispatcher",
          latencyMs: Date.now() - startTime,
        },
      });
    }

    // 4. Navigation: Projects & Repositories
    if (lower.includes("project") || lower.includes("repo") || lower.includes("github") || lower.includes("work")) {
      return NextResponse.json({
        intent: "NAVIGATE",
        speechText: "Scrolling down to Viswa's flagship platforms and live GitHub repositories.",
        displayText:
          "Navigating to **Autonomous Systems & Live Repositories**. Showing 33+ open-source builds, deep learning models, and agent platforms.",
        action: {
          type: "SCROLL",
          target: "#projects",
        },
        telemetry: {
          processedAt: new Date().toISOString(),
          engine: "VTR Autopilot Edge Dispatcher",
          latencyMs: Date.now() - startTime,
        },
      });
    }

    // 5. Navigation: About & Skills
    if (lower.includes("skill") || lower.includes("about") || lower.includes("tech stack") || lower.includes("education")) {
      return NextResponse.json({
        intent: "NAVIGATE",
        speechText:
          "Navigating to About and Skills. Viswa specializes in autonomous multi-agent swarms, TypeScript, PyTorch deep learning, and quantum mechanics.",
        displayText:
          "Navigating to **About, Education & Animated Skill Bars**. Highlights: Autonomous Multi-Agent Swarms (96%), Full-Stack TypeScript/Next.js (92%), PyTorch Deep Learning (90%).",
        action: {
          type: "SCROLL",
          target: "#about",
        },
        telemetry: {
          processedAt: new Date().toISOString(),
          engine: "VTR Autopilot Edge Dispatcher",
          latencyMs: Date.now() - startTime,
        },
      });
    }

    // 6. Connect / WhatsApp / Instagram
    if (lower.includes("contact") || lower.includes("whatsapp") || lower.includes("hire") || lower.includes("connect") || lower.includes("message")) {
      return NextResponse.json({
        intent: "CONNECT",
        speechText:
          "Navigating to the Connect section. You can message Viswa directly on WhatsApp or Instagram.",
        displayText: `Navigating to **Connect & Direct Chat**.\n\n• **WhatsApp**: [wa.me/${SITE_CONFIG.whatsappNumber}](https://wa.me/${SITE_CONFIG.whatsappNumber})\n• **Instagram**: [@${SITE_CONFIG.instagramHandle}](https://instagram.com/${SITE_CONFIG.instagramHandle})\n• **Email**: ${SITE_CONFIG.email}`,
        action: {
          type: "SCROLL",
          target: "#connect",
        },
        telemetry: {
          processedAt: new Date().toISOString(),
          engine: "VTR Autopilot Edge Dispatcher",
          latencyMs: Date.now() - startTime,
        },
      });
    }

    // Default: General Technical Answer
    return NextResponse.json({
      intent: "GENERAL",
      speechText: `M. Viswa Teja Reddy is an AI Research Engineer building Vexaro AI, an autonomous agentic platform launching very soon. Ask me about his projects, skills, or LOR verification.`,
      displayText: `**Autopilot Assistant**: Viswa is an AI Research Engineer building **Vexaro AI** (Autonomous Multi-Agent OS) and pioneering **Verified RAG**, **Aegis Safety Harness**, **VastCare LLM**, and **Synthesizer AI**.\n\nTry asking:\n• *"Explain Vexaro AI"*\n• *"Show Verified RAG architecture"*\n• *"Verify LOR ID"*\n• *"Show Skills"*\n• *"WhatsApp Viswa"*`,
      telemetry: {
        processedAt: new Date().toISOString(),
        engine: "VTR Autopilot Edge Dispatcher",
        latencyMs: Date.now() - startTime,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        intent: "TALK",
        speechText: "I encountered a minor dispatch error. Please try again.",
        displayText: "Autopilot dispatch encountered an issue: " + (error?.message || "unknown error"),
        telemetry: {
          processedAt: new Date().toISOString(),
          engine: "VTR Autopilot Edge Dispatcher",
          latencyMs: Date.now() - startTime,
        },
      },
      { status: 500 }
    );
  }
}
