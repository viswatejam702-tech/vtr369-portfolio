import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark-Obsidian Token System
        canvas: "#07090E",
        surface: {
          1: "#0C1018",
          2: "#121824",
        },
        obsidian: {
          canvas: "#07090E",
          surface1: "#0C1018",
          surface2: "#121824",
        },
        accent: {
          blue: "#3B82F6",
          cyan: "#06B6D4",
          violet: "#8B5CF6",
        },
        // Hairline border tokens
        subtle: "rgba(255, 255, 255, 0.07)",
        // Retained backward compatibility tokens
        void: "#07090E",
        panel: "rgba(12, 16, 24, 0.72)",
        line: "rgba(255, 255, 255, 0.07)",
        ink: "#F3F4F6",
        muted: "#9CA3AF",
        violet: "#8B5CF6",
        cyan: "#06B6D4",
        blue: "#3B82F6",
        gold: "#F59E0B",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        display: "-0.03em",
      },
      maxWidth: {
        measure: "680px",
      },
      transitionTimingFunction: {
        snappy: "cubic-bezier(0.16, 1, 0.3, 1)",
        micro: "cubic-bezier(0.2, 0, 0, 1)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
        glow: "0 0 35px rgba(59, 130, 246, 0.35)",
        "glow-cyan": "0 0 35px rgba(6, 182, 212, 0.35)",
        "glow-obsidian": "0 20px 50px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.07)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        wave: {
          "0%, 100%": { height: "4px" },
          "50%": { height: "20px" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        float: "float 6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        wave: "wave 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
