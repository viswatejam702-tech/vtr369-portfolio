"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile, whatsappLink } from "@/lib/data";
import { ArrowDownRight, Sparkles } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Parallax gradient backdrop */}
      <motion.div style={{ y }} className="absolute inset-0 bg-orbit-glow pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_20%_30%,rgba(255,255,255,0.4),transparent),radial-gradient(1px_1px_at_70%_60%,rgba(255,255,255,0.3),transparent),radial-gradient(1px_1px_at_40%_80%,rgba(255,255,255,0.25),transparent)] opacity-60" />

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-0 px-6 md:px-12 pt-28 lg:pt-16">
        {/* Signature: 3-6-9 orbit rings, with portrait at the center — the "sun" the rings orbit */}
        <OrbitPortrait />

        <motion.div
          style={{ opacity }}
          className="w-full max-w-3xl mx-auto lg:mx-0 lg:ml-16 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="eyebrow">{profile.tagline}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold text-[13vw] sm:text-6xl md:text-7xl leading-[0.98] tracking-tight"
          >
            {profile.name.split(" ")[0]}{" "}
            <span className="bg-gradient-to-br from-violet via-cyan to-gold bg-clip-text text-transparent">
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-muted max-w-xl mx-auto lg:mx-0 font-body"
          >
            {profile.headline}. I build research-grade AI systems and validate real SaaS products in
            public — no templates, no filler, just shipped work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-ink text-void px-6 py-3 font-medium hover:bg-cyan transition-colors"
            >
              See the real work
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:border-cyan/50 transition-colors"
            >
              Message on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 flex items-center justify-center lg:justify-start gap-6 font-mono text-xs text-muted"
          >
            <span>{profile.designation}</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span>Favorite number: {profile.favoriteNumber}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * The site's signature element: three rings — 3, 6, 9 — orbiting a single
 * center. That center is Viswa, not a placeholder. Percentage-based insets
 * mean this one component works unchanged at mobile size (in normal flow,
 * stacked above the headline) and at desktop size (absolutely positioned
 * beside the headline) — same visual identity everywhere, not two designs.
 */
function OrbitPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative shrink-0 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[560px] lg:h-[560px] lg:absolute lg:right-[-6%] lg:top-1/2 lg:-translate-y-1/2"
    >
      <div className="absolute inset-0 rounded-full border border-violet/25 animate-orbit3">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet shadow-glow" />
      </div>
      <div className="absolute inset-[12.5%] rounded-full border border-cyan/25 animate-orbit6">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan shadow-glow" />
      </div>
      <div className="absolute inset-[26.8%] rounded-full border border-gold/30 animate-orbit9">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold shadow-glow" />
      </div>

      {/* Portrait — gradient ring frame, gently floating */}
      <div className="absolute inset-[31%] rounded-full p-[3px] bg-gradient-to-br from-violet via-cyan to-gold shadow-glow animate-float">
        <div className="relative w-full h-full rounded-full overflow-hidden bg-void ring-1 ring-white/10">
          <Image
            src="/images/viswa-portrait.jpg"
            alt="Viswa Teja Reddy"
            fill
            sizes="(min-width: 1024px) 220px, (min-width: 640px) 115px, 95px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}
