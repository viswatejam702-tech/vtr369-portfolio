// ==========================================
// CENTRALIZED OWNER & SOCIAL CONFIGURATION
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
  linkedinUrl: string;
  twitterUrl: string;
  status: string;
  stats: {
    repos: string;
    flagship: string;
    focus: string;
    availability: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "M. Viswa Teja Reddy",
  brand: "VTR369",
  monogram: "VTR.369",
  role: "AI Research Engineer",
  mission:
    "Building Vexaro AI — Autonomous Agentic Platform (Specialized Agents Across Every Category & Sector · Launching Very Soon)",
  tagline:
    "AI Research Engineer pioneering autonomous multi-agent systems, evaluation harnesses, deep learning architectures, and quantum computing foundations. Currently building Vexaro AI — the omni-sector autonomous agentic platform launching very soon.",
  headline:
    "AI Research Engineer · Building Vexaro AI Autonomous Agentic Platform",
  location: "Hyderabad / Andhra Pradesh, India",
  githubUsername: "viswatejam702-tech",
  heroPortraitUrl: "/viswa-portrait.png",
  fallbackPortraitUrl: "https://github.com/viswatejam702-tech.png",
  email: "viswatejam702@gmail.com",
  whatsappNumber: "918978237578", // Viswa's official WhatsApp
  instagramHandle: "vtr_.369", // Viswa's official Instagram handle
  linkedinUrl: "https://www.linkedin.com/in/m-viswa-teja-reddy-1234g",
  twitterUrl: "https://x.com/MViswateja1",
  status: "Building Vexaro AI · Launching Very Soon",
  stats: {
    repos: "33+ Public AI & Deep Tech Repositories",
    flagship: "Vexaro AI & Nexus V",
    focus: "Autonomous Agents, LLMs & Quantum Mechanics",
    availability: "Building Vexaro AI (Launching Very Soon)",
  },
};

export default SITE_CONFIG;
