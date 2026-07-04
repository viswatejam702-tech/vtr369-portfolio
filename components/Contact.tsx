"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail, MessageCircle, Phone, Github, Linkedin, Twitter, Facebook } from "lucide-react";
import { socials, whatsappLink } from "@/lib/data";
import { SectionHeader } from "./Projects";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const telLink = `tel:${socials.whatsapp}`;
const displayPhone = socials.whatsapp.replace(/^(\+91)/, "$1 ");

const socialLinks = [
  { href: socials.github, label: "GitHub", icon: Github },
  { href: socials.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: socials.x, label: "X", icon: Twitter },
  { href: socials.facebook, label: "Facebook", icon: Facebook },
  { href: socials.reddit, label: "Reddit", icon: MessageCircle },
  { href: socials.instagram, label: "Instagram", icon: MessageCircle },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(next: typeof form): Errors {
    const e: Errors = {};
    if (!next.name.trim()) e.name = "Tell me your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) e.email = "Enter a valid email";
    if (next.message.trim().length < 10) e.message = "A few more words would help";
    return e;
  }

  function update(field: keyof typeof form, value: string) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (Object.keys(errors).length) setErrors(validate(next));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const eObj = validate(form);
    setErrors(eObj);
    if (Object.keys(eObj).length > 0) return;

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${socials.email}?subject=${subject}&body=${body}`;

    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Let's build something"
        title="Get in touch, directly"
        sub="No gatekeeping, no forms that vanish into a void — this reaches me, or use WhatsApp/email straight away."
      />

      <div className="grid md:grid-cols-5 gap-8 mt-10">
        <form onSubmit={handleSubmit} noValidate className="md:col-span-3 glass rounded-2xl p-8 space-y-5">
          <Field
            label="Name"
            value={form.name}
            onChange={(v) => update("name", v)}
            error={errors.name}
            placeholder="Your name"
          />
          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
            placeholder="you@company.com"
          />
          <div>
            <label className="eyebrow block mb-2">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={5}
              placeholder="What are you building, and how can I help?"
              className={`w-full bg-transparent border rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none ${
                errors.message ? "border-red-400/60" : "border-line focus:border-cyan/50"
              }`}
            />
            {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-violet to-cyan text-void font-medium py-3 hover:brightness-110 transition"
          >
            Send message
          </button>

          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-cyan"
              >
                <CheckCircle2 className="w-4 h-4" /> Opening your mail app — send it off!
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="md:col-span-2 space-y-4">
          <a
            href={`mailto:${socials.email}`}
            className="glass glass-hover rounded-2xl p-5 flex items-center gap-3"
          >
            <Mail className="w-5 h-5 text-gold" />
            <div>
              <p className="text-xs text-muted">Email</p>
              <p className="text-sm font-medium">{socials.email}</p>
            </div>
          </a>
          <a href={telLink} className="glass glass-hover rounded-2xl p-5 flex items-center gap-3">
            <Phone className="w-5 h-5 text-violet" />
            <div>
              <p className="text-xs text-muted">Call directly</p>
              <p className="text-sm font-medium">{displayPhone}</p>
            </div>
          </a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="glass glass-hover rounded-2xl p-5 flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-cyan" />
            <div>
              <p className="text-xs text-muted">WhatsApp</p>
              <p className="text-sm font-medium">{displayPhone}</p>
            </div>
          </a>

          <div className="glass rounded-2xl p-5">
            <p className="eyebrow mb-3">Find me everywhere</p>
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 text-muted hover:text-cyan transition-colors py-2"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-mono">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="eyebrow block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
          error ? "border-red-400/60" : "border-line focus:border-cyan/50"
        }`}
      />
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}
