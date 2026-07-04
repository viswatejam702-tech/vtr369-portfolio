"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Rocket } from "lucide-react";
import { saasProducts } from "@/lib/data";
import { SectionHeader } from "./Projects";

export default function SaaS() {
  return (
    <section id="saas" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Building in public"
        title="SaaS products in validation"
        sub="Two products currently being tested with real early users — not polished launches, honest works-in-progress."
      />

      <div className="grid md:grid-cols-2 gap-5 mt-10">
        {saasProducts.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass glass-hover rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet/20 rounded-full blur-3xl" />
            <div className="relative flex items-start justify-between mb-4">
              <Rocket className="w-6 h-6 text-gold" />
              <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-full border border-cyan/40 text-cyan">
                {s.status}
              </span>
            </div>
            <h3 className="relative font-display text-2xl font-semibold mb-2">{s.name}</h3>
            <p className="relative text-sm text-muted leading-relaxed mb-6">{s.description}</p>
            {s.url !== "#" && (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:text-ink transition-colors"
              >
                Visit {s.name} <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
