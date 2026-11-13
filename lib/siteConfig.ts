// ==========================================
// CENTRALIZED OWNER & SOCIAL CONFIGURATION
// ==========================================

export interface SiteConfig {
  name: string;
  brand: string;
  monogram: string;
  role: string;
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
    flagships: string;
    focus: string;
    availability: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "M. Viswa Teja Reddy",
  brand: "VTR369",
  monogram: "VTR.369",
  role: "AI Architect, Startup Founder & Quantum-Tech Innovator",
  tagline:
    "Chasing greatness to engineer monumentally impactful AI architectures, autonomous multi-agent systems, legal & enterprise SaaS startups, and high-precision deep learning models.",
  headline:
    "AI Architect, Startup Founder & Full-Stack Innovator based in Hyderabad, India.",
  location: "Hyderabad / Andhra Pradesh, India",
  githubUsername: "viswatejam702-tech",
  heroPortraitUrl: "/viswa-portrait.png",
  fallbackPortraitUrl: "https://github.com/viswatejam702-tech.png",
  email: "viswatejam702@gmail.com",
  whatsappNumber: "918978237578", // Viswa's official WhatsApp
  instagramHandle: "vtr_.369", // Viswa's official Instagram handle
  linkedinUrl: "https://www.linkedin.com/in/m-viswa-teja-reddy-1234g",
  twitterUrl: "https://x.com/MViswateja1",
  status: "Available for Startups, Founding Roles & Collabs",
  stats: {
    repos: "33+ Public AI & Full-Stack Repositories",
    flagships: "Nexus V AI & ClauseGuard X",
    focus: "Autonomous Agents, LLMs, DL & Quantum Tech",
    availability: "Available for Startups & Ventures",
  },
};

export default SITE_CONFIG;
