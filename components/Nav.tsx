"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#saas", label: "SaaS" },
  { href: "#research", label: "Research" },
  { href: "#content", label: "Content" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`w-full max-w-5xl flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
          scrolled ? "glass shadow-glass" : "bg-transparent border border-transparent"
        }`}
      >
        <a href="#top" className="font-display font-semibold tracking-tight text-lg">
          vtr<span className="text-gold">.369</span>
        </a>

        <div className="hidden md:flex items-center gap-7 font-mono text-[13px] tracking-wide text-muted">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-cyan transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-violet to-cyan px-4 py-2 text-sm font-medium text-void hover:brightness-110 transition"
        >
          Hire Me
        </a>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-6 h-[2px] bg-ink mb-1.5" />
          <div className="w-6 h-[2px] bg-ink" />
        </button>
      </nav>

      {open && (
        <div className="absolute top-20 inset-x-4 glass rounded-2xl p-5 flex flex-col gap-4 md:hidden font-mono text-sm">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-ink">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="text-cyan">
            Hire Me →
          </a>
        </div>
      )}
    </motion.header>
  );
}
