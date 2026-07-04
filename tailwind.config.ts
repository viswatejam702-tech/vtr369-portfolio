import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05050A",
        panel: "rgba(255,255,255,0.045)",
        line: "rgba(255,255,255,0.09)",
        ink: "#F5F5F7",
        muted: "#9696A8",
        violet: "#7C5CFF",
        cyan: "#3FE0FF",
        gold: "#F2B84B",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "orbit-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(124,92,255,0.25) 0%, rgba(63,224,255,0.08) 45%, rgba(5,5,10,0) 75%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        glow: "0 0 40px rgba(124,92,255,0.35)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        orbitspin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        orbit3: "orbitspin 18s linear infinite",
        orbit6: "orbitspin 30s linear infinite reverse",
        orbit9: "orbitspin 45s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
