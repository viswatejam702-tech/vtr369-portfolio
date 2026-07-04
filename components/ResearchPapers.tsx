"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, FlaskConical, Loader2 } from "lucide-react";
import { researchFields, researchIntro } from "@/lib/data";
import { SectionHeader } from "./Projects";

type Paper = {
  id: string;
  title: string;
  description: string;
  field: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
};

export default function ResearchPapers() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/papers")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setPapers(d.papers ?? []);
      })
      .catch(() => !cancelled && setError(true))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = ["All", ...researchFields];
  const visible = filter === "All" ? papers : papers.filter((p) => p.field === filter);

  return (
    <section id="research" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto">
      <SectionHeader eyebrow="Research shelf" title="Papers, references & write-ups" sub={researchIntro} />

      {loading ? (
        <div className="flex items-center gap-2 text-muted text-sm mt-10">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading the shelf…
        </div>
      ) : error ? (
        <p className="text-sm text-muted mt-10">Couldn't reach the papers library right now — try again shortly.</p>
      ) : papers.length === 0 ? (
        <div className="mt-10 glass rounded-2xl p-10 text-center">
          <FlaskConical className="w-6 h-6 text-gold mx-auto mb-3" />
          <p className="text-muted text-sm">
            The shelf is empty for now — papers get added straight from the admin panel as they're read and written.
            Check back soon.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mt-10 mb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`font-mono text-xs px-4 py-2 rounded-full border transition-colors ${
                  filter === c
                    ? "bg-ink text-void border-ink"
                    : "border-line text-muted hover:border-cyan/50 hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="glass glass-hover rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="eyebrow">{p.field}</span>
                      <span className="font-mono text-[11px] text-muted">
                        {new Date(p.uploadedAt).toLocaleDateString(undefined, { year: "numeric", month: "short" })}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-display text-lg font-semibold leading-snug">{p.title}</h3>
                        {p.description && (
                          <p className="text-sm text-muted leading-relaxed mt-1.5">{p.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <a
                    href={p.fileUrl}
                    download={p.fileName}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:text-ink transition-colors mt-6 pt-5 border-t border-line"
                  >
                    Download {p.fileType.includes("pdf") ? "PDF" : "Word doc"} <Download className="w-3.5 h-3.5" />
                  </a>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </section>
  );
}
