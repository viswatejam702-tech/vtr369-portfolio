import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/siteConfig";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.brand} | AI Research Engineer · Vexaro AI`,
  description: SITE_CONFIG.tagline,
  metadataBase: new URL("https://vtr369.dev"),
  keywords: [
    "AI Research Engineer",
    "M. Viswa Teja Reddy",
    "Vexaro AI",
    "Autonomous Multi-Agent Operating System",
    "Sector Solver",
    "Veylithra",
    "Deep Learning Systems",
    "LiveKit Voice Calling OS",
    "Bangalore",
    "Bengaluru",
  ],
  authors: [
    {
      name: SITE_CONFIG.name,
      url: `https://github.com/${SITE_CONFIG.githubUsername}`,
    },
  ],
  openGraph: {
    title: `${SITE_CONFIG.name} (${SITE_CONFIG.brand}) — AI Research Engineer`,
    description: SITE_CONFIG.tagline,
    type: "website",
    images: [
      {
        url: SITE_CONFIG.heroPortraitUrl,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - AI Research Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — AI Research Engineer · Vexaro AI`,
    description: SITE_CONFIG.tagline,
    images: [SITE_CONFIG.heroPortraitUrl],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} dark`}
    >
      <body className="grain font-body bg-[#07090E] text-[#F3F4F6] overflow-x-hidden selection:bg-blue-600/30 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
