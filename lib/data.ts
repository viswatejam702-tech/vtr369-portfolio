// ============================================================================
// Core Data & Production Systems Information
// ============================================================================

export const profile = {
  name: "M. Viswa Teja Reddy",
  handle: "vtr.369",
  githubUsername: "viswatejam702-tech",
  headline: "AI Research Engineer · Architect of Vexaro AI & Autonomous Multi-Agent Systems",
  tagline: "Building Vexaro AI (9 agents · 101 verified gates) & VTR's Agentic Company (90 subagents · 300 MCP skills)",
  bio:
    "AI Research Engineer architecting production-ready autonomous multi-agent systems, low-latency telephony pipelines, and evidence-grounded neural verification. " +
    "Creator of Vexaro AI — the evidence-grounded B2B intelligence engine with 9 specialized autonomous agents, 101 verification gates, and sub-second Tenglish voice calling OS. " +
    "Designing 8-layer agent architectures, zero-trust multi-tenancy, and DPDP-compliant verification loops.",
  bioLong: [
    "I'm M. Viswa Teja Reddy — an AI Research Engineer who designs and operates production-grade autonomous agent systems and neural pipelines. My work focuses on multi-agent decomposition, real-time voice orchestration, and claim-level NLI verification.",
    "I created Vexaro AI, an enterprise operating system powered by 9 specialized agents (Outreach SDR, Meetlyzer, Hirifir, CashPilot, Veylithra, Voice OS) verified across 101 automated evaluation gates.",
    "Beyond applied enterprise systems, I run machine learning and deep learning benchmarks in time-series forecasting (R² = 0.930), computer vision CNNs, and quantum computing foundations.",
  ],
  designation: "B.Tech, Computer Science Engineering · Hyderabad, India",
  focusAreas: [
    "Autonomous Multi-Agent Operating Systems",
    "Real-Time Telephony & Voice Agent OS (LiveKit + Sarvam)",
    "Evidence-Grounded RAG & NLI Verification",
    "Deep Learning & PyTorch CNN/LSTM Benchmarks",
  ],
  favoriteNumber: 369,
};

export const socials = {
  email: "viswatejam702@gmail.com",
  whatsapp: "+918978237578",
  linkedin: "https://www.linkedin.com/in/m-viswa-teja-reddy-1234g",
  x: "https://x.com/MViswateja1",
  github: "https://github.com/viswatejam702-tech",
  reddit: "https://www.reddit.com/u/Own_Smoke_6138/s/kFgJxROWxR",
  facebook: "https://www.facebook.com/share/18qbhkwRek/",
  instagram: "https://www.instagram.com/vtr_.369/",
  instagramAlt: "https://www.instagram.com/vexaro.ai.in/",
};

export const whatsappLink = `https://wa.me/${socials.whatsapp.replace("+", "")}`;

export const projects = [
  {
    repo: "Vexaro-AI",
    title: "Vexaro AI — Verifiable Autonomous Multi-Agent OS",
    category: "Autonomous Systems",
    description:
      "Evidence-grounded B2B buying-moment intelligence engine with 9 specialized autonomous agents (Outreach SDR, Meetlyzer, Hirifir, CashPilot, Veylithra), 101 automated verification gates, sub-second (0.86s p50) LiveKit + Sarvam AI Telugu-English voice calling OS, and TRAI/DPDP compliance gates.",
  },
  {
    repo: "vtr-agentic-company",
    title: "VTR's Agentic Company — 90-Agent Multi-Agent Swarm",
    category: "Autonomous Systems",
    description:
      "Enterprise autonomous orchestration network coordinating 90 specialized subagents and 300+ Model Context Protocol (MCP) skills across an 8-layer architecture with zero-trust tenant isolation.",
  },
  {
    repo: "sector-solver",
    title: "Sector Solver — Algorithmic Optimization Suite",
    category: "Algorithms & Optimization",
    description:
      "Quantitative optimization engine applying combinatorial algorithms and heuristics to solve industry-specific routing, scheduling, and asset-allocation bottlenecks.",
  },
  {
    repo: "verified-rag",
    title: "Verified RAG — Evidence & Claim NLI Platform",
    category: "RAG & Systems",
    description:
      "End-to-end parametric/non-parametric Retrieval-Augmented Generation system grounded in Lewis et al. (2020) with dense MIPS vector search, Cross-Encoder reranking, and DeBERTa-v3 claim-level NLI verification.",
  },
  {
    repo: "train-and-test-motion",
    title: "Train and Test Motion — Kinematics Deep Learning",
    category: "Deep Learning & Vision",
    description:
      "PyTorch human kinematics motion-tracking pipeline designed to train and benchmark deep neural models on spatial-temporal pose estimation with sub-pixel joint accuracy.",
  },
  {
    repo: "Weather-Prediction-with-ML-and-Dl",
    title: "Meteorological Forecasting (GBDT vs LSTM)",
    category: "Machine Learning & DL",
    description:
      "Comparative time-series benchmarking between Gradient Boosting (R² = 0.930, MAE 1.53°C) and Multi-Layer LSTM (R² = 0.914) over 10,000+ hourly meteorological telemetry records.",
  },
  {
    repo: "game-of-dl-in-ships",
    title: "Maritime Vessel Classification (PyTorch CNN)",
    category: "Deep Learning & Vision",
    description:
      "15-stage PyTorch maritime vessel detection and classification architecture leveraging transfer learning and residual feature maps across maritime satellite imagery.",
  },
  {
    repo: "AI-voice-agent-pro",
    title: "AI Voice Agent Pro — Telephony Audio Engine",
    category: "Voice & Telephony",
    description:
      "Low-latency speech-to-action engine pairing 8kHz telephony Silero VAD with sentence-level streaming TTS and instant barge-in audio truncation under 50ms.",
  },
];

export const saasProducts = [
  {
    name: "Vexaro AI Platform",
    status: "101 GATES PASSED · LIVE",
    description: "Evidence-grounded autonomous multi-agent operating system with 9 specialized agents, sub-second Tenglish voice calling, and zero-trust safety gates.",
    tagline: "Autonomous multi-agent OS with 9 agents and 101 verified gates",
    url: "https://vexaro-app.web.app/",
  },
  {
    name: "Sector Solver",
    status: "ALGORITHMIC SUITE",
    description: "Algorithmic decision-modeling engine applying integer programming and combinatorial heuristics to resolve sector-specific bottlenecks.",
    tagline: "Algorithmic domain optimization suite",
    url: "https://github.com/viswatejam702-tech",
  },
  {
    name: "Verified RAG",
    status: "LIVE ON RENDER",
    description: "Production retrieval-augmented generation engine with dense vector MIPS and DeBERTa-v3 claim-level NLI verification.",
    tagline: "Evidence-grounded claim-level NLI verification platform",
    url: "https://verified-rag.onrender.com",
  },
];

export const skills: Record<string, string[]> = {
  "Autonomous Agent Systems": [
    "LangGraph DAG Orchestration",
    "Multi-Agent Swarms (90 Subagents)",
    "MCP Protocol (300+ Skills)",
    "Self-Healing State Machines",
  ],
  "Voice & Telephony": [
    "LiveKit Agents WebRTC",
    "Silero Telephony VAD",
    "Sarvam AI Saaras/Bulbul",
    "Sub-Second Turn Latency",
  ],
  "Deep Learning & PyTorch": [
    "Time-Series LSTMs & GBDTs",
    "Residual CNN Architectures",
    "DeBERTa NLI Verification",
    "OpenPipe ART / Unsloth GRPO",
  ],
  "Full-Stack & Cloud": [
    "TypeScript & React / Next.js",
    "Tailwind CSS Obsidian Design",
    "Google Firebase & Cloud Run",
    "Zero-Trust Multi-Tenancy",
  ],
};

export const seedTickerItems = [
  "Vexaro AI — 101 Automated Evaluation Gates Passed",
  "LiveKit + Sarvam AI Telugu-English Voice OS (0.86s p50 Latency)",
  "90 Autonomous Subagents & 300 MCP Skills Orchestrated",
  "Sector Solver Algorithmic Optimization Suite",
  "Meteorological Forecasting R² = 0.930 with GBDT & LSTM",
  "Verified RAG — Lewis et al. NLI Claim Verification Live on Render",
];

export const researchFields = [
  "Autonomous Multi-Agent Operating Systems",
  "Low-Latency Telephony Speech Pipelines",
  "Retrieval-Augmented Generation & Claim-Level NLI",
  "Deep Learning & Time-Series Modeling",
  "Quantum Computing State Space Exploration",
];

export const researchIntro =
  "Preprints, experimental write-ups, and architectural whitepapers from Viswa's AI systems and deep learning research.";

export const instagramEmbeds: string[] = [
  "https://www.instagram.com/p/DB123456789/",
];

