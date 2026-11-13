import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function triggerConfetti() {
  if (typeof window !== "undefined") {
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#f59e0b", "#fbbf24", "#ffffff", "#10b981"],
      });
    });
  }
}

