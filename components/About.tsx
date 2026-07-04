"use client";

import { motion } from "framer-motion";
import { profile, skills } from "@/lib/data";
import { SectionHeader } from "./Projects";

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto">
      <SectionHeader eyebrow="The story" title="About Viswa" sub="" />

      <div className="grid md:grid-cols-5 gap-12 mt-10">
        <div className="md:col-span-3 space-y-5">
          {profile.bioLong.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-muted leading-relaxed"
            >
              {para}
            </motion.p>
          ))}

          <div className="flex flex-wrap gap-3 pt-4">
            {profile.focusAreas.map((f) => (
              <span key={f} className="glass rounded-full px-4 py-1.5 text-xs font-mono text-cyan">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {Object.entries(skills).map(([group, list], gi) => (
            <div key={group}>
              <p className="eyebrow mb-3">{group}</p>
              <div className="flex flex-wrap gap-2">
                {list.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: gi * 0.06 + i * 0.03 }}
                    whileHover={{ y: -3, borderColor: "rgba(63,224,255,0.5)" }}
                    className="glass rounded-lg px-3 py-1.5 text-xs font-medium"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
