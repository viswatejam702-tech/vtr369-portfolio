"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, Download, ExternalLink, Loader2 } from "lucide-react";
import { profile, projects as fallbackProjects } from "@/lib/data";
import { getContentItems } from "@/lib/storage";

type LiveRepo = {
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  htmlUrl: string;
  defaultBranch: string;
};

export default function Projects() {
  const [live, setLive] = useState<Record<string, LiveRepo>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [extra, setExtra] = useState(getContentItemsSafe());

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const results = await Promise.all(
        fallbackProjects.map(async (p) => {
          try {
            const res = await fetch(`https://api.github.com/repos/${profile.githubUsername}/${p.repo}`);
            if (!res.ok) return null;
            const json = await res.json();
            const entry: LiveRepo = {
              stars: json.stargazers_count ?? 0,
              forks: json.forks_count ?? 0,
              language: json.language ?? null,
              updatedAt: json.pushed_at ?? json.updated_at,
              htmlUrl: json.html_url ?? `https://github.com/${profile.githubUsername}/${p.repo}`,
              defaultBranch: json.default_branch ?? "main",
            };
            return [p.repo, entry] as const;
          } catch {
            return null;
          }
        })
      );
      if (cancelled) return;
      const map: Record<string, LiveRepo> = {};
      results.forEach((r) => {
        if (r) map[r[0]] = r[1];
      });
      setLive(map);
      setLoading(false);
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(fallbackProjects.map((p) => p.category)))],
    []
  );

  const visible = filter === "All" ? fallbackProjects : fallbackProjects.filter((p) => p.category === filter);
  const extraProjects = extra.filter((i) => i.category === "project" || i.category === "app");

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Live from GitHub"
        title="Real projects, real repos"
        sub={`Pulled live from github.com/${profile.githubUsername} — stars, forks and activity update automatically. Every card links straight to the source and ships a one-click ZIP download.`}
      />

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
          {visible.map((p, i) => {
            const stats = live[p.repo];
            const zipUrl = `https://github.com/${profile.githubUsername}/${p.repo}/archive/refs/heads/${
              stats?.defaultBranch ?? "main"
            }.zip`;
            return (
              <motion.article
                key={p.repo}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="glass glass-hover rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="eyebrow">{p.category}</span>
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-muted" />
                    ) : stats ? (
                      <div className="flex items-center gap-3 font-mono text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" /> {stats.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" /> {stats.forks}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.description}</p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-line">
                  <a
                    href={stats?.htmlUrl ?? `https://github.com/${profile.githubUsername}/${p.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:text-ink transition-colors"
                  >
                    View repo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={zipUrl}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-gold transition-colors ml-auto"
                    download
                  >
                    Download ZIP <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {extraProjects.length > 0 && (
        <div className="mt-10">
          <p className="eyebrow mb-4">Added from admin panel</p>
          <div className="grid md:grid-cols-2 gap-5">
            {extraProjects.map((item) => (
              <div key={item.id} className="glass glass-hover rounded-2xl p-6">
                <h4 className="font-display text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted mb-3">{item.description}</p>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-cyan text-sm">
                    View →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function getContentItemsSafe() {
  if (typeof window === "undefined") return [];
  try {
    return getContentItems();
  } catch {
    return [];
  }
}

export function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
      <p className="text-muted mt-3 leading-relaxed">{sub}</p>
    </motion.div>
  );
}
