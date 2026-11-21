// ==========================================
// CENTRALIZED OWNER & TECHNICAL CONFIGURATION
// ==========================================

export interface SiteConfig {
  name: string;
  brand: string;
  monogram: string;
  role: string;
  mission: string;
  tagline: string;
  headline: string;
  location: string;
  githubUsername: string;
  heroPortraitUrl: string;
  fallbackPortraitUrl: string;
  email: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramAltHandle: string;
  linkedinUrl: string;
  twitterUrl: string;
  status: string;
  stats: {
    repos: string;
    flagship: string;
    focus: string;
    gates: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "M. Viswa Teja Reddy",
  brand: "VTR369",
  monogram: "VTR.369",
  role: "AI Research Engineer & Systems Architect",
  mission:
    "Building Vexaro AI (9 specialized agents · 101 verified gates) & VTR's Agentic Company (90 subagents · 300 MCP skills)",
  tagline:
    "AI Research Engineer architecting autonomous multi-agent operating systems, low-latency telephony pipelines, and verified neural architectures. Creator of Vexaro AI, VTR's Agentic Company, and Sector Solver.",
  headline:
    "AI Research Engineer · Architect of Vexaro AI & Autonomous Multi-Agent Systems",
  location: "Bangalore, India",
  githubUsername: "viswatejam702-tech",
  heroPortraitUrl: "/viswa-portrait.png",
  fallbackPortraitUrl: "https://github.com/viswatejam702-tech.png",
  email: "viswatejam702@gmail.com",
  whatsappNumber: "918978237578",
  instagramHandle: "vtr_.369",
  instagramAltHandle: "vexaro.ai.in",
  linkedinUrl: "https://www.linkedin.com/in/m-viswa-teja-reddy-1234g",
  twitterUrl: "https://x.com/MViswateja1",
  status: "Operating Vexaro AI Platform & Agentic Swarms",
  stats: {
    repos: "35+ Production Repositories",
    flagship: "Vexaro AI (9 Agents · 101 Gates)",
    focus: "Multi-Agent OS, Low-Latency Voice & DL",
    gates: "101 Automated Gates Passed",
  },
};

export default SITE_CONFIG;
