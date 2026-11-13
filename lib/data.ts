// ============================================================================
// This file holds every real, static fact about you. Edit these values any
// time — no other file needs to change. Live data (GitHub stars, forks) is
// fetched at runtime in components/Projects.tsx; this file is the fallback
// source of truth for names, descriptions and links.
// ============================================================================

export const profile = {
  name: "M. Viswa Teja Reddy",
  handle: "vtr.369",
  githubUsername: "viswatejam702-tech",
  headline: "AI Research Engineer · Building Vexaro AI Autonomous Agentic Platform",
  tagline: "Building Vexaro AI — Autonomous Agentic Platform (Specialized Agents Across Every Category & Sector · Launching Very Soon)",
  bio:
    "AI Research Engineer pioneering autonomous multi-agent systems, evaluation harnesses, deep learning architectures, and quantum computing foundations. " +
    "Currently building Vexaro AI — the omni-sector autonomous multi-agent operating system launching very soon. " +
    "Bachelor's in Computer Science Engineering. Architecting production systems with zero-trust multi-tenancy and verifiable reasoning loops.",
  bioLong: [
    "I'm M. Viswa Teja Reddy — an AI Research Engineer who architects and builds production-ready autonomous multi-agent systems and deep learning engines. My work centers on autonomous multi-agent orchestration, evidence-grounded RAG verification, and high-precision deep learning.",
    "Outside of shipped systems, I explore quantum computing, quantum mechanics, and frontier theoretical physics — bringing rigorous mathematical state and uncertainty modeling into modern distributed AI architectures.",
    "Currently, I am building Vexaro AI — an omni-sector autonomous multi-agent operating system deploying specialized agents across every enterprise sector, launching very soon.",
  ],
  designation: "B.E. / B.Tech, Computer Science Engineering",
  focusAreas: ["Autonomous Multi-Agent Systems", "RAG & Evidence Verification", "Deep Learning & PyTorch", "Quantum Computing Foundations"],
  favoriteNumber: 369,
};

export const socials = {
  email: "viswatejam702@gmail.com",
  whatsapp: "+918978237578", // used to build wa.me link
  linkedin: "https://www.linkedin.com/in/m-viswa-teja-reddy-1234g",
  x: "https://x.com/MViswateja1",
  github: "https://github.com/viswatejam702-tech",
  reddit: "https://www.reddit.com/u/Own_Smoke_6138/s/kFgJxROWxR",
  facebook: "https://www.facebook.com/share/18qbhkwRek/",
  instagram: "https://www.instagram.com/vtr_.369/",
};

export const whatsappLink = `https://wa.me/${socials.whatsapp.replace("+", "")}`;

// ----------------------------------------------------------------------------
// GitHub repos: real repo slugs. Descriptions below are written summaries;
// live stats (stars, forks, language, last push) are fetched from the GitHub
// API at runtime in components/Projects.tsx and merged on top of this data.
// ----------------------------------------------------------------------------
export const projects = [
  {
    repo: "WaferGuard-AI-is-a-research-grade-semiconductor-wafer-anomaly-detection-platform",
    title: "WaferGuard AI",
    category: "AI / Manufacturing",
    description:
      "A research-grade anomaly detection platform for semiconductor wafer inspection. Applies computer vision and unsupervised learning to flag defect patterns on wafer maps early, the kind of quality signal that normally needs a trained fab engineer to spot.",
  },
  {
    repo: "Bitcoin-Market-Regime-Discovery-using-Advanced-Unsupervised-Machine-Learning",
    title: "Bitcoin Market Regime Discovery",
    category: "AI / Quant Finance",
    description:
      "Uses advanced unsupervised machine learning (clustering over engineered market features) to automatically discover distinct Bitcoin market regimes — trending, choppy, high-volatility — instead of relying on hand-drawn technical analysis.",
  },
  {
    repo: "Weather-Prediction-with-ML-and-Dl",
    title: "Weather Prediction (ML + DL)",
    category: "Data Science",
    description:
      "A weather forecasting pipeline comparing classical machine learning against deep learning architectures on meteorological time-series data, benchmarking accuracy and generalization across models.",
  },
  {
    repo: "apex-saas-strategy-and-audit",
    title: "Apex — SaaS Strategy & Audit",
    category: "SaaS / Strategy",
    description:
      "A structured framework and audit toolkit for evaluating a SaaS idea's go-to-market strategy, pricing, and product-market fit signals before writing a single line of production code — the due-diligence layer most solo founders skip.",
  },
  {
    repo: "AI-powered-Multi-Agent-Lead-Finder",
    title: "AI-Powered Multi-Agent Lead Finder",
    category: "AI / Agents",
    description:
      "A multi-agent AI system where autonomous agents divide, research, and qualify sales leads collaboratively — built to explore how orchestrated LLM agents outperform a single monolithic prompt on real prospecting tasks.",
  },
  {
    repo: "AI-powered-Crypto-Compliance-Tracker",
    title: "AI-Powered Crypto Compliance Tracker",
    category: "AI / Compliance",
    description:
      "An AI-assisted tracker for monitoring crypto transactions and flagging compliance risk signals, built to explore how LLMs and rule-based systems can work together on regulatory monitoring.",
  },
] as const;

// ----------------------------------------------------------------------------
// SaaS products currently being validated
// ----------------------------------------------------------------------------
export const saasProducts = [
  {
    name: "Vexaro AI",
    url: "https://vexaro-app.web.app/",
    status: "Launching Very Soon",
    description:
      "Omni-sector autonomous multi-agent operating system orchestrating specialized AI agent fleets across legal, clinical, financial, and SDR domains.",
  },
  {
    name: "Verified RAG",
    url: "https://verified-rag.onrender.com",
    status: "Live on Render",
    description:
      "Enterprise Retrieval-Augmented Generation system with dense vector MIPS, Cross-Encoder reranking, and DeBERTa claim-level NLI verification.",
  },
  {
    name: "Nexus V AI",
    url: "https://github.com/viswatejam702-tech/nexus-V-AI",
    status: "Active System",
    description:
      "Adaptive autonomous multi-agent swarm framework executing multi-step enterprise reasoning, tool execution, and self-healing tasks.",
  },
  {
    name: "ClauseGuard X",
    url: "https://github.com/viswatejam702-tech/Clause_gaurd_x_version",
    status: "Active System",
    description:
      "AI contract risk intelligence engine performing real-time clause extraction, risk scoring, and DPDP compliance auditing.",
  },
];

// ----------------------------------------------------------------------------
// Instagram posts to embed as social proof (official Instagram embed, no API)
// ----------------------------------------------------------------------------
export const instagramEmbeds = [
  "https://www.instagram.com/p/DaPrLy9AUfk/",
  "https://www.instagram.com/vtr_.369/reel/DZ6nbKgBUmS/",
  "https://www.instagram.com/vtr_.369/reel/DZ-IoY2hNPJ/",
];

// ----------------------------------------------------------------------------
// Seed data for the "AI tools" breaking-news ticker. Editable live from the
// admin panel (/admin) — these are just the starting values.
// ----------------------------------------------------------------------------
export const seedTickerItems = [
  "Claude Sonnet 5 — Anthropic's latest flagship model",
  "Claude Cowork — agentic desktop app for non-developers",
  "GPT-5.1 — OpenAI's reasoning-focused release",
  "Gemini 3 — Google's multimodal frontier model",
  "Cursor — AI-native code editor adoption keeps climbing",
  "Perplexity Comet — AI browser agent",
  "v0 by Vercel — prompt-to-UI generation",
  "Runway Gen-4 — text-to-video generation",
];

export const researchFields = [
  "AI / Machine Learning",
  "Quantum Computing",
  "Data Science",
  "Mechanics / Physics",
  "Other",
] as const;

export const researchIntro =
  "Reading and writing about the edge of what's possible isn't a side interest — it's most of my free time. " +
  "This is a running shelf of papers I've read, referenced, or written: AI, quantum computing, data science, " +
  "and the physics that quietly underpins all of it. Open, download, cite freely.";

export const skills = {
  "Languages": ["Python", "TypeScript / JavaScript", "SQL", "C++"],
  "AI / ML": ["PyTorch", "Scikit-learn", "LLM Agents", "Computer Vision", "Unsupervised Learning"],
  "Data Science": ["Pandas", "NumPy", "Time-Series Forecasting", "Statistical Modeling"],
  "Full-Stack / Product": ["React", "Next.js", "Node.js", "Tailwind CSS", "REST APIs"],
  "Frontier Interests": ["Quantum Computing", "Quantum Mechanics", "Space Systems"],
};

