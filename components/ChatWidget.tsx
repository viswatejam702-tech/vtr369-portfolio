"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey, I'm Viswa's site assistant. Ask me about his projects, skills, SaaS products, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "Something went wrong — try again." }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I couldn't reach the AI backend. The site owner may need to set GEMINI_API_KEY (free at aistudio.google.com/app/apikey)." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center shadow-glow"
        aria-label="Open AI assistant"
      >
        {open ? <X className="w-5 h-5 text-void" /> : <Sparkles className="w-5 h-5 text-void" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[520px] glass rounded-2xl flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-line flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <p className="text-sm font-medium">Ask about Viswa</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm leading-relaxed rounded-xl px-3.5 py-2.5 max-w-[85%] ${
                    m.role === "user" ? "ml-auto bg-cyan/15 text-ink" : "bg-white/5 text-muted"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-muted text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> thinking…
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-line flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask a question…"
                className="flex-1 bg-transparent border border-line rounded-full px-4 py-2 text-sm outline-none focus:border-cyan/50"
              />
              <button
                onClick={send}
                disabled={loading}
                className="w-9 h-9 shrink-0 rounded-full bg-ink text-void flex items-center justify-center disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
