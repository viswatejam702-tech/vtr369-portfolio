// ============================================================================
// This file holds every real, static fact about you. Edit these values any
// time — no other file needs to change. Live data (GitHub stars, forks) is
// fetched at runtime in components/Projects.tsx; this file is the fallback
// source of truth for names, descriptions and links.
// ============================================================================

export const profile = {
  name: "Viswa Teja Reddy",
  handle: "vtr.369",
  githubUsername: "viswatejam702-tech",
  headline: "AI / SaaS / Data Science — Solo Founder, Building in Public",
  tagline: "Aspiring Entrepreneur · Solo Founder · Scaling One Real Build at a Time",
  bio:
    "AI · SaaS · real executions, real builds · Data Science · Freelancing · Website building. " +
    "AI-tech / quantum computing & mechanics enthusiast, and a lifelong space nerd. " +
    "Bachelor's in Computer Science Engineering. Currently building in AI, applied data science " +
    "and SaaS products — validating ideas in public instead of waiting for permission.",
  bioLong: [
    "I'm Viswa Teja Reddy — a computer science engineering graduate who builds real, working software instead of talking about it. My focus sits at the intersection of AI, data science, and SaaS: taking messy real-world problems (semiconductor defects, crypto market regimes, weather signals, compliance risk) and turning them into working, research-grade systems.",
    "Outside of shipped projects, I'm an AI-tech, quantum computing & mechanics enthusiast — I read about qubits and orbital mechanics for fun, and it shows up in how I think about systems: as things with state, uncertainty, and emergent behavior.",
    "Right now I'm solo-founding and validating two SaaS ideas in public — vitro.ai and MindBridge AI — while freelancing on AI/data/web projects and slowly scaling what's working. No stealth mode. No fake traction. Just real builds, shipped and shown.",
  ],
  designation: "B.E. / B.Tech, Computer Science Engineering",
  focusAreas: ["Applied AI", "Data Science", "SaaS Product Building", "Full-Stack / Vibe Coding"],
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
    name: "vitro.ai",
    url: "https://vitro.ai",
    status: "Validating",
    description:
      "An AI-native product currently in validation — built to test a real workflow problem with a small group of early users before scaling.",
  },
  {
    name: "MindBridge AI",
    url: "#",
    status: "Validating",
    description:
      "A mental wellness platform using AI to give people an accessible first step toward support — currently being validated with early users and clinical-style feedback loops.",
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

