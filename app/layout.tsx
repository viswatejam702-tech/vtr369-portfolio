import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/siteConfig";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.brand} | AI Architect & Startup Founder`,
  description: SITE_CONFIG.tagline,
  metadataBase: new URL("https://vtr369.dev"),
  keywords: [
    "AI Architect",
    "Startup Founder",
    "Nexus V AI",
    "ClauseGuard X",
    "Autonomous Agents",
    "Quantum Computing",
    "Full-Stack",
    "Deep Learning",
    "Hyderabad",
  ],
  authors: [{ name: SITE_CONFIG.name, url: `https://github.com/${SITE_CONFIG.githubUsername}` }],
  openGraph: {
    title: `${SITE_CONFIG.name} (${SITE_CONFIG.brand})`,
    description: SITE_CONFIG.tagline,
    type: "website",
    images: [
      {
        url: SITE_CONFIG.heroPortraitUrl,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.brand}`,
    description: SITE_CONFIG.tagline,
    images: [SITE_CONFIG.heroPortraitUrl],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="grain font-body bg-[#08080a] text-zinc-100">{children}</body>
    </html>
  );
}
