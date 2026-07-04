"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Plus, Trash2, ShieldCheck, FileUp, Loader2, AlertCircle } from "lucide-react";
import {
  addContentItem,
  deleteContentItem,
  getContentItems,
  ContentCategory,
  ContentItem,
  isAdminAuthed,
  setAdminAuthed,
  getTickerItems,
  setTickerItems,
} from "@/lib/storage";
import { seedTickerItems, researchFields } from "@/lib/data";

const CATEGORIES: { key: ContentCategory; label: string; hint: string }[] = [
  { key: "project", label: "Projects & Repos", hint: "A new coding project, whether on GitHub or not." },
  { key: "app", label: "Applications", hint: "A shipped app or tool, live or in beta." },
  { key: "landing_page", label: "Landing Pages", hint: "A standalone landing page you built for a client or product." },
  { key: "social_post", label: "Content Portfolio", hint: "A post, reel, or piece of content to showcase." },
  { key: "prompt", label: "AI Builder / Prompts", hint: "A professional prompt or AI-build worth sharing." },
];

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

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [activeCat, setActiveCat] = useState<ContentCategory>("project");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [ticker, setTicker] = useState<string[]>([]);
  const [tickerDraft, setTickerDraft] = useState("");

  const [form, setForm] = useState({ title: "", description: "", url: "", imageUrl: "" });

  useEffect(() => {
    setAuthed(isAdminAuthed());
  }, []);

  useEffect(() => {
    if (authed) {
      setItems(getContentItems());
      setTicker(getTickerItems(seedTickerItems));
    }
  }, [authed]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Lightweight gate for a solo portfolio's admin panel — not enterprise auth.
    // Set NEXT_PUBLIC_ADMIN_PASSWORD in your Vercel env vars to change this.
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "vtr369";
    if (pw === expected) {
      setAdminAuthed(true);
      setAuthed(true);
      setPwError("");
    } else {
      setPwError("Wrong password.");
    }
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    addContentItem({ category: activeCat, ...form });
    setForm({ title: "", description: "", url: "", imageUrl: "" });
    setItems(getContentItems());
  }

  function handleDelete(id: string) {
    deleteContentItem(id);
    setItems(getContentItems());
  }

  function addTickerItem() {
    if (!tickerDraft.trim()) return;
    const next = [tickerDraft.trim(), ...ticker];
    setTicker(next);
    setTickerItems(next);
    setTickerDraft("");
  }

  function removeTickerItem(i: number) {
    const next = ticker.filter((_, idx) => idx !== i);
    setTicker(next);
    setTickerItems(next);
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-void text-ink">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="glass rounded-2xl p-8 w-full max-w-sm"
        >
          <Lock className="w-6 h-6 text-gold mb-4" />
          <h1 className="font-display text-xl font-semibold mb-1">Admin access</h1>
          <p className="text-sm text-muted mb-6">Only you should have this password.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Admin password"
            className="w-full bg-transparent border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan/50 mb-3"
          />
          {pwError && <p className="text-xs text-red-400 mb-3">{pwError}</p>}
          <button className="w-full rounded-xl bg-gradient-to-r from-violet to-cyan text-void font-medium py-3">
            Unlock
          </button>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-void text-ink px-6 md:px-12 py-16 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="w-5 h-5 text-cyan" />
        <p className="eyebrow">Admin panel</p>
      </div>
      <h1 className="font-display text-3xl font-semibold mb-8">Add new stuff to the site</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCat(c.key)}
            className={`font-mono text-xs px-4 py-2 rounded-full border transition-colors ${
              activeCat === c.key ? "bg-ink text-void border-ink" : "border-line text-muted hover:text-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted mb-6">{CATEGORIES.find((c) => c.key === activeCat)?.hint}</p>

      <form onSubmit={handleAdd} className="glass rounded-2xl p-6 space-y-4 mb-14">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="w-full bg-transparent border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan/50"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Short description"
          rows={3}
          className="w-full bg-transparent border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan/50 resize-none"
        />
        <input
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="URL (link to project, post, or landing page)"
          className="w-full bg-transparent border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan/50"
        />
        <input
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          placeholder="Image URL (optional — paste a picture link)"
          className="w-full bg-transparent border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan/50"
        />
        <button className="inline-flex items-center gap-2 rounded-xl bg-cyan text-void font-medium px-5 py-2.5">
          <Plus className="w-4 h-4" /> Add to site
        </button>
      </form>

      <h2 className="font-display text-lg font-semibold mb-4">Current items in this category</h2>
      <div className="space-y-3 mb-16">
        {items
          .filter((i) => i.category === activeCat)
          .map((i) => (
            <div key={i.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm">{i.title}</p>
                <p className="text-xs text-muted">{i.description}</p>
              </div>
              <button onClick={() => handleDelete(i.id)} className="text-muted hover:text-red-400 shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        {items.filter((i) => i.category === activeCat).length === 0 && (
          <p className="text-sm text-muted">Nothing here yet — add your first item above.</p>
        )}
      </div>

      <ResearchPapersPanel adminPassword={pw} />

      <h2 className="font-display text-lg font-semibold mb-4 mt-16">AI Radar ticker</h2>
      <div className="glass rounded-2xl p-6">
        <div className="flex gap-2 mb-4">
          <input
            value={tickerDraft}
            onChange={(e) => setTickerDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTickerItem()}
            placeholder="e.g. Claude Sonnet 5 — new flagship release"
            className="flex-1 bg-transparent border border-line rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan/50"
          />
          <button onClick={addTickerItem} className="rounded-xl bg-gold text-void px-4 font-medium text-sm">
            Add
          </button>
        </div>
        <div className="space-y-2">
          {ticker.map((t, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-muted">{t}</span>
              <button onClick={() => removeTickerItem(i)} className="text-muted hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted mt-10">
        Note: items in the section above (projects/apps/landing pages/content/prompts) are saved in this browser
        only. Research papers below are different — they upload to shared storage and every visitor sees them
        immediately. See README.md → "Going further" to give the rest the same treatment.
      </p>
    </main>
  );
}

/**
 * Research papers are handled separately from the generic content store above
 * because they have a real requirement the others don't yet: every visitor,
 * on every device, must be able to see and download them. That needs actual
 * shared file storage (Vercel Blob), not localStorage — so this panel talks
 * to /api/papers instead of lib/storage.ts.
 */
function ResearchPapersPanel({ adminPassword }: { adminPassword: string }) {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pTitle, setPTitle] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pField, setPField] = useState<string>(researchFields[0]);
  const fileRef = useRef<HTMLInputElement>(null);

  function refresh() {
    setLoading(true);
    fetch("/api/papers")
      .then((r) => r.json())
      .then((d) => setPapers(d.papers ?? []))
      .catch(() => setError("Couldn't load the papers list."))
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const file = fileRef.current?.files?.[0];
    if (!file) return setError("Choose a PDF or Word file first.");
    if (!pTitle.trim()) return setError("Give the paper a title.");

    const body = new FormData();
    body.append("file", file);
    body.append("title", pTitle);
    body.append("description", pDesc);
    body.append("field", pField);

    setUploading(true);
    try {
      const res = await fetch("/api/papers", {
        method: "POST",
        headers: { "x-admin-password": adminPassword },
        body,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
      } else {
        setPTitle("");
        setPDesc("");
        if (fileRef.current) fileRef.current.value = "";
        refresh();
      }
    } catch {
      setError("Upload failed — check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDeletePaper(id: string) {
    try {
      await fetch(`/api/papers?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": adminPassword },
      });
      refresh();
    } catch {
      setError("Couldn't delete that paper — try again.");
    }
  }

  return (
    <div>
      <h2 className="font-display text-lg font-semibold mb-1">Research papers</h2>
      <p className="text-sm text-muted mb-4">
        Uploads here go to shared storage — every visitor sees them immediately, no redeploy needed.
      </p>

      <form onSubmit={handleUpload} className="glass rounded-2xl p-6 space-y-4 mb-6">
        <input
          value={pTitle}
          onChange={(e) => setPTitle(e.target.value)}
          placeholder="Paper title"
          className="w-full bg-transparent border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan/50"
        />
        <textarea
          value={pDesc}
          onChange={(e) => setPDesc(e.target.value)}
          placeholder="Short description — why it's worth reading"
          rows={2}
          className="w-full bg-transparent border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan/50 resize-none"
        />
        <select
          value={pField}
          onChange={(e) => setPField(e.target.value)}
          className="w-full bg-void border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan/50"
        >
          {researchFields.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-3 border border-dashed border-line rounded-xl px-4 py-4 cursor-pointer hover:border-cyan/50 transition-colors">
          <FileUp className="w-4 h-4 text-gold shrink-0" />
          <span className="text-sm text-muted">Choose a PDF or Word (.doc/.docx) file — 20MB max</span>
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" />
        </label>

        {error && (
          <div className="flex items-start gap-2 text-sm text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
          </div>
        )}

        <button
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan text-void font-medium px-5 py-2.5 disabled:opacity-50"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {uploading ? "Uploading…" : "Publish paper"}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : papers.length === 0 ? (
        <p className="text-sm text-muted">No papers published yet.</p>
      ) : (
        <div className="space-y-3">
          {papers.map((p) => (
            <div key={p.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm">{p.title}</p>
                <p className="text-xs text-muted">
                  {p.field} · {p.fileType.includes("pdf") ? "PDF" : "Word"}
                </p>
              </div>
              <button onClick={() => handleDeletePaper(p.id)} className="text-muted hover:text-red-400 shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
