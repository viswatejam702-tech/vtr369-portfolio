"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Send,
  Github,
  ExternalLink,
  MessageCircle,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Mail,
  Sparkles,
  Cpu,
  ShieldCheck,
  Code2,
  GraduationCap,
  Terminal,
  Star,
  GitFork,
  Volume2,
  VolumeX,
  Bot,
  X,
  ChevronRight,
  Layers,
  Search,
  CheckCircle2,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { triggerConfetti } from "@/lib/utils";

// ==========================================
// 1. CURATED FLAGSHIP STARTUPS & VENTURES
// ==========================================
const FLAGSHIP_PROJECTS = [
  {
    id: "nexus-v-ai",
    name: "Nexus V AI",
    repoName: "nexus-V-AI",
    category: "Startups & AI",
    badge: "FLAGSHIP AI STARTUP",
    description:
      "Next-generation autonomous multi-agent system designed to automate, optimize, and scale complex tasks across enterprise domains using TypeScript and adaptive AI architectures.",
    language: "TypeScript",
    url: "https://github.com/viswatejam702-tech/nexus-V-AI",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Autonomous Swarm", "Task Decomposition", "Tool Execution"],
  },
  {
    id: "clauseguard-x",
    name: "ClauseGuard X",
    repoName: "Clause_gaurd_x_version",
    category: "Startups & AI",
    badge: "LEGALTECH AI STARTUP",
    description:
      "AI-powered contract intelligence startup platform that analyzes legal documents, detects risky clauses, and provides actionable negotiation insights in real time.",
    language: "TypeScript",
    url: "https://github.com/viswatejam702-tech/Clause_gaurd_x_version",
    image:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Risk Scoring", "Clause Extraction", "Compliance Gates"],
  },
  {
    id: "ai-voice-agent-pro",
    name: "AI Voice Agent Pro",
    repoName: "AI-voice-agent-pro",
    category: "Startups & AI",
    badge: "VOICE AI AUTOPILOT",
    description:
      "Real-time conversational AI voice assistant and intelligent automation showcase built with Python and modern web interfaces for low-latency voice execution.",
    language: "Python",
    url: "https://github.com/viswatejam702-tech/AI-voice-agent-pro",
    image:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Real-Time VAD", "Speech-to-Action", "Bidirectional Audio"],
  },
  {
    id: "weather-prediction-ml-dl",
    name: "Weather Forecasting (ML vs. LSTM DL)",
    repoName: "Weather-Prediction-with-ML-and-Dl",
    category: "Deep Learning & ML",
    badge: "R² = 0.930 RESEARCH",
    description:
      "Comparative Gradient Boosting (R² = 0.930, MAE 1.53°C) and LSTM Deep Learning (R² = 0.914) forecasting engine with automated feature engineering.",
    language: "Python / LSTM",
    url: "https://github.com/viswatejam702-tech/Weather-Prediction-with-ML-and-Dl",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Gradient Boosting", "Multi-Layer LSTM", "Feature Engineering"],
  },
  {
    id: "game-of-dl-in-ships",
    name: "Maritime Vessel Classification DL",
    repoName: "game-of-dl-in-ships",
    category: "Deep Learning & ML",
    badge: "PYTORCH VISION",
    description:
      "End-to-end PyTorch computer vision pipeline for ship classification featuring 15+ analytical stages, transfer learning, and deep CNN validation.",
    language: "PyTorch / Python",
    url: "https://github.com/viswatejam702-tech/game-of-dl-in-ships",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
    highlights: ["CNN Architectures", "15+ Analysis Stages", "Transfer Learning"],
  },
];

// ==========================================
// 2. CORE SKILLS SPECIFICATION
// ==========================================
const SKILLS = [
  { name: "Autonomous AI Agents & LLM Architectures", percent: 96 },
  { name: "Full-Stack TypeScript, React & Next.js", percent: 92 },
  { name: "Deep Learning, PyTorch & Computer Vision", percent: 90 },
  { name: "Startup Product Engineering & VibeCoding", percent: 95 },
  { name: "Machine Learning & Predictive Analytics (LSTM / GBDT)", percent: 93 },
  { name: "Quantum Computing & Mechanics Exploration", percent: 85 },
];

export default function VTR369Portfolio() {
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [portraitSrc, setPortraitSrc] = useState(SITE_CONFIG.heroPortraitUrl);
  const [portraitAttempts, setPortraitAttempts] = useState(0);

  // Autopilot State (Voice + Text)
  const [commandText, setCommandText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autopilotStatus, setAutopilotStatus] = useState(
    "Say or type: 'Show startups', 'Open Nexus V AI', 'Skills', or 'WhatsApp' (Cmd/Ctrl + K)"
  );
  const [swarmActive, setSwarmActive] = useState(true);

  // Instant On-Site Chat Drawer State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am Viswa's AI Concierge. Ask me about Nexus V AI, ClauseGuard X, Deep Learning architectures, or bridge directly to Viswa's WhatsApp!",
    },
  ]);

  const recognitionRef = useRef<any>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Handle portrait fallback smoothly
  const handlePortraitError = () => {
    if (portraitAttempts === 0) {
      setPortraitSrc("/viswa-portrait.jpg");
      setPortraitAttempts(1);
    } else if (portraitAttempts === 1) {
      setPortraitSrc("/images/viswa-portrait.jpg");
      setPortraitAttempts(2);
    } else {
      setPortraitSrc(SITE_CONFIG.fallbackPortraitUrl);
      setPortraitAttempts(3);
    }
  };

  // Keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        commandInputRef.current?.focus();
        speakResponse("Autopilot ready. Speak or type your request.");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ==========================================
  // 3. LIVE GITHUB API AUTO-FETCH
  // ==========================================
  useEffect(() => {
    fetch(
      `https://api.github.com/users/${SITE_CONFIG.githubUsername}/repos?sort=updated&per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGithubRepos(data.filter((r) => !r.fork));
        }
      })
      .catch(() => { });
  }, []);

  // Merge curated flagships + live repos from GitHub
  const allProjects = useMemo(() => {
    const flagshipNames = new Set(
      FLAGSHIP_PROJECTS.map((p) => p.repoName.toLowerCase())
    );
    const dynamicRepos = githubRepos
      .filter((r) => !flagshipNames.has(r.name.toLowerCase()))
      .map((r) => ({
        id: String(r.id),
        name: r.name.replace(/[-_]/g, " "),
        repoName: r.name,
        category: "Live GitHub Feed",
        badge: r.language || "GITHUB REPO",
        description:
          r.description ||
          "Production repository engineered by M. Viswa Teja Reddy on GitHub.",
        language: r.language || "Code",
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        url: r.html_url,
        image: `https://opengraph.githubassets.com/1/${SITE_CONFIG.githubUsername}/${r.name}`,
        highlights: [
          `★ ${r.stargazers_count || 0} Stars`,
          `⑂ ${r.forks_count || 0} Forks`,
          r.language || "Open Source",
        ],
      }));

    return [...FLAGSHIP_PROJECTS, ...dynamicRepos];
  }, [githubRepos]);

  const filteredProjects = useMemo(() => {
    let list = allProjects;
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.language.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allProjects, activeCategory, searchQuery]);

  // ==========================================
  // 4. SPEECH SYNTHESIS & VOICE AUTOPILOT ENGINE
  // ==========================================
  const speakResponse = (text: string) => {
    setAutopilotStatus(text);
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window))
      return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const executeAutopilotCommand = (rawInput: string) => {
    const q = rawInput.toLowerCase().trim();
    if (!q) return;

    const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    if (q.includes("nexus")) {
      scrollTo("projects");
      setActiveCategory("Startups & AI");
      speakResponse("Opening Nexus V AI, Viswa's autonomous multi-agent platform.");
      triggerConfetti();
      window.open("https://github.com/viswatejam702-tech/nexus-V-AI", "_blank");
    } else if (q.includes("clause") || q.includes("legal") || q.includes("contract")) {
      scrollTo("projects");
      setActiveCategory("Startups & AI");
      speakResponse("Launching ClauseGuard X, Viswa's AI contract intelligence platform.");
      triggerConfetti();
      window.open(
        "https://github.com/viswatejam702-tech/Clause_gaurd_x_version",
        "_blank"
      );
    } else if (q.includes("weather") || q.includes("lstm")) {
      scrollTo("projects");
      setActiveCategory("Deep Learning & ML");
      speakResponse("Showing Weather Prediction with Gradient Boosting and LSTM Deep Learning.");
    } else if (q.includes("ship") || q.includes("maritime") || q.includes("vessel")) {
      scrollTo("projects");
      setActiveCategory("Deep Learning & ML");
      speakResponse("Opening Maritime Vessel Classification Deep Learning in PyTorch.");
      window.open("https://github.com/viswatejam702-tech/game-of-dl-in-ships", "_blank");
    } else if (q.includes("startup") || q.includes("project") || q.includes("work")) {
      scrollTo("projects");
      setActiveCategory("Startups & AI");
      speakResponse(
        `Showing Viswa's startups and AI architectures. Currently syncing ${allProjects.length} repositories.`
      );
    } else if (q.includes("github") || q.includes("repo") || q.includes("feed")) {
      scrollTo("projects");
      setActiveCategory("Live GitHub Feed");
      speakResponse("Filtering live repositories directly from Viswa's GitHub account.");
    } else if (q.includes("skill") || q.includes("about") || q.includes("education")) {
      scrollTo("about");
      speakResponse(
        "Displaying Viswa's core engineering skills, research background, and startup metrics."
      );
    } else if (q.includes("service") || q.includes("build") || q.includes("what i do")) {
      scrollTo("services");
      speakResponse("Navigating to AI Engineering & Startup Ventures section.");
    } else if (q.includes("whatsapp")) {
      speakResponse("Opening official WhatsApp connection with Viswa Teja Reddy.");
      triggerConfetti();
      window.open(
        `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Viswa!%20Connecting%20from%20your%20VTR369%20Portfolio.`,
        "_blank"
      );
    } else if (q.includes("instagram") || q.includes("insta")) {
      speakResponse("Opening Viswa's official Instagram profile.");
      window.open(`https://instagram.com/${SITE_CONFIG.instagramHandle}`, "_blank");
    } else if (q.includes("chat") || q.includes("contact") || q.includes("connect") || q.includes("hire")) {
      scrollTo("contact");
      setChatOpen(true);
      speakResponse("Opening the live connect drawer so you can message Viswa directly.");
    } else if (q.includes("swarm") || q.includes("agent") || q.includes("antigravity")) {
      setSwarmActive((prev) => !prev);
      speakResponse(
        !swarmActive
          ? "Activated Antigravity multi-agent cursor swarm."
          : "Deactivated multi-agent swarm."
      );
    } else {
      scrollTo("projects");
      setSearchQuery(rawInput);
      speakResponse(
        `Searching for "${rawInput}". Filtered matching startups and GitHub repositories.`
      );
    }
  };

  const toggleVoiceListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      speakResponse("Voice recognition is not supported in this browser. Please use text input instead.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setAutopilotStatus("Listening... Speak a command (e.g. 'Show startups', 'Open ClauseGuard X', or 'WhatsApp')");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCommandText(transcript);
      executeAutopilotCommand(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = `Thank you for reaching out! You can click "Bridge to WhatsApp" below to deliver your message "${userMsg}" directly to Viswa's phone!`;
      if (lower.includes("hire") || lower.includes("role") || lower.includes("freelance")) {
        reply = `Viswa is currently available for AI Architect roles, founding team collaborations, and high-impact freelance builds. Click "Bridge to WhatsApp" to start an immediate discussion!`;
      } else if (lower.includes("nexus")) {
        reply = `Nexus V AI is Viswa's autonomous multi-agent platform for orchestrating cross-domain tasks with adaptive reasoning. Would you like me to open the repository?`;
      } else if (lower.includes("clause")) {
        reply = `ClauseGuard X is an AI-powered legal contract risk analysis platform built with full-stack TypeScript and specialized NLP evaluators.`;
      }
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 selection:bg-amber-400 selection:text-black font-sans overflow-x-hidden">
      {/* ========================================== */}
      {/* ANTIGRAVITY MULTI-AGENT SWARM CURSORS      */}
      {/* ========================================== */}
      {swarmActive && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {[
            {
              name: "Agent-01 UI",
              color: "#f59e0b",
              x: ["12vw", "78vw", "35vw"],
              y: ["18vh", "62vh", "28vh"],
              dur: 18,
            },
            {
              name: "Agent-02 GitHub Sync",
              color: "#10b981",
              x: ["82vw", "24vw", "68vw"],
              y: ["30vh", "75vh", "22vh"],
              dur: 22,
            },
            {
              name: "Agent-03 Motion",
              color: "#38bdf8",
              x: ["45vw", "18vw", "85vw"],
              y: ["75vh", "25vh", "55vh"],
              dur: 20,
            },
          ].map((agent, idx) => (
            <motion.div
              key={idx}
              animate={{ x: agent.x, y: agent.y }}
              transition={{
                duration: agent.dur,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute flex items-center gap-1.5 opacity-60"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={agent.color}>
                <path d="M3 2l18 9-9 2-2 9-7-20z" />
              </svg>
              <span
                style={{ backgroundColor: agent.color }}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold text-black shadow-lg tracking-wider"
              >
                {agent.name}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* ========================================== */}
      {/* STICKY GLASS HEADER                        */}
      {/* ========================================== */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#08080a]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5 font-bold tracking-tight text-lg group">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition duration-300 animate-pulse" />
            <span className="text-white font-mono tracking-wider">{SITE_CONFIG.brand}</span>
            <span className="text-xs text-zinc-400 font-normal hidden sm:inline">
              | {SITE_CONFIG.name}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-300 font-medium">
            <a href="#home" className="hover:text-amber-400 transition">
              Home
            </a>
            <a href="#about" className="hover:text-amber-400 transition">
              About &amp; Skills
            </a>
            <a href="#services" className="hover:text-amber-400 transition">
              What I Build
            </a>
            <a href="#projects" className="hover:text-amber-400 transition">
              Startups &amp; GitHub
            </a>
            <a href="#contact" className="hover:text-amber-400 transition">
              Connect
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSwarmActive(!swarmActive)}
              className="text-xs px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-amber-400/50 transition hidden sm:flex items-center gap-1.5"
              title="Toggle Multi-Agent Swarm Overlay"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {swarmActive ? "Swarm Active" : "Swarm Off"}
            </button>
            <button
              onClick={() => {
                triggerConfetti();
                setChatOpen(true);
              }}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-amber-400 text-black hover:bg-amber-300 transition shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 1. HERO SECTION (DARK EDITORIAL LUXURY)    */}
      {/* ========================================== */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Cinematic Studio Portrait Background with Radial Composite Mask */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.78 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
        >
          <div className="relative w-full max-w-3xl h-[85vh]">
            <img
              src={portraitSrc}
              onError={handlePortraitError}
              alt={SITE_CONFIG.name}
              className="w-full h-full object-cover object-top filter contrast-110 brightness-95"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 65% 75% at 50% 38%, black 35%, rgba(0,0,0,0.5) 68%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 65% 75% at 50% 38%, black 35%, rgba(0,0,0,0.5) 68%, transparent 100%)",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/65 to-[#08080a]/40" />
        </motion.div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-[0.25em] mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            HELLO, I AM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white mb-4 drop-shadow-2xl"
          >
            {SITE_CONFIG.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-200 max-w-3xl mx-auto mb-6 leading-relaxed"
          >
            {SITE_CONFIG.role}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {SITE_CONFIG.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              onClick={() => triggerConfetti()}
              className="px-8 py-4 rounded-full bg-amber-400 text-black font-bold text-sm hover:bg-amber-300 transition shadow-[0_0_35px_rgba(245,158,11,0.4)] flex items-center gap-2"
            >
              <span>Explore Startups &amp; Work</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border border-white/25 bg-white/5 hover:bg-white/15 backdrop-blur-md text-white font-semibold text-sm transition flex items-center gap-2"
            >
              <span>Connect &amp; Chat Now</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. ABOUT, EDUCATION & ANIMATED SKILL BARS  */}
      {/* ========================================== */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column Narrative & 2x2 Stat Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="text-amber-400 uppercase tracking-[0.25em] text-xs font-semibold">
              WHO I AM
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Creative &amp; Autonomous AI Builder
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              I engineer intelligent systems, autonomous multi-agent platforms, and high-accuracy
              machine learning pipelines. My focus is turning cutting-edge research in AI, deep
              learning, and quantum computing into real-world startups that scale.
            </p>
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              Whether architecting legal intelligence platforms like <strong>ClauseGuard X</strong>{" "}
              or autonomous agent swarms like <strong>Nexus V AI</strong>, I combine rapid VibeCoding
              execution with production-grade full-stack engineering from Hyderabad, India.
            </p>

            {/* 2x2 Stat & Availability Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Experience &amp; Output</p>
                <p className="text-lg font-bold text-white mt-1">
                  {Math.max(33, allProjects.length)}+ Public Repos
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Flagship Ventures</p>
                <p className="text-lg font-bold text-white mt-1">Nexus V &amp; ClauseGuard X</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Core Focus</p>
                <p className="text-lg font-bold text-amber-400 mt-1">Agents, LLMs &amp; Quantum</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Current Status</p>
                <p className="text-lg font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Ventures
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column Education & Animated Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Education & Research Card */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 text-amber-400 font-semibold">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm uppercase tracking-wider">Education &amp; Research Focus</span>
              </div>
              <div className="space-y-4 pl-2 border-l-2 border-amber-400/40">
                <div className="pl-4">
                  <p className="font-semibold text-white">
                    Computer Science Engineering &amp; AI Architectures
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Autonomous Multi-Agent Systems, Deep Learning (PyTorch/LSTM) &amp; Predictive Analytics
                  </p>
                </div>
                <div className="pl-4">
                  <p className="font-semibold text-white">
                    Quantum Computing &amp; Mechanics Exploration
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Qubit State Formulations, Quantum Superposition Simulation &amp; VibeCoding Paradigms
                  </p>
                </div>
              </div>
            </div>

            {/* Animated Skills Progress Bars */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-amber-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-white text-base">Skills &amp; Mastery</span>
                </div>
                <span className="text-xs text-zinc-500 font-mono">CALIBRATED %</span>
              </div>

              <div className="space-y-3.5">
                {SKILLS.map((skill, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-zinc-200 font-medium">{skill.name}</span>
                      <span className="text-amber-400 font-mono font-bold">{skill.percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. WHAT I BUILD (SERVICES & CORE PILLARS)  */}
      {/* ========================================== */}
      <section id="services" className="py-24 bg-[#0a0a0e] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-amber-400 uppercase tracking-[0.25em] text-xs font-semibold mb-2">
              WHAT I DO
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              AI Engineering &amp; Startup Ventures
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              Architecting production-grade AI platforms, real-world SaaS startups, and high-precision deep learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "Autonomous AI & Voice Agents",
                desc: "Multi-agent orchestration, voice-to-action assistants (AI Voice Agent Pro), and autonomous workflow automation platforms like Nexus V AI.",
                tag: "AGENTIC AI",
              },
              {
                icon: ShieldCheck,
                title: "AI SaaS Startups & LegalTech",
                desc: "Production full-stack SaaS startups including ClauseGuard X for real-time AI contract analysis, risk detection, and negotiation insights.",
                tag: "STARTUPS",
              },
              {
                icon: Code2,
                title: "Deep Learning & Computer Vision",
                desc: "High-precision predictive modeling (R² > 0.90 weather forecasting) and multi-stage PyTorch maritime vessel classification pipelines.",
                tag: "DEEP LEARNING",
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="p-8 rounded-2xl bg-[#111116] border border-white/10 hover:border-amber-400/50 transition duration-300 text-left space-y-4 relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-zinc-400 border border-white/10">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. LIVE GITHUB STARTUPS & PORTFOLIO GRID   */}
      {/* ========================================== */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-amber-400 uppercase tracking-[0.25em] text-xs font-semibold mb-2">
            LIVE GITHUB &amp; VENTURES
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3">
            Startups &amp; Latest Repositories
          </h2>
          <p className="text-sm text-zinc-400">
            Synchronized live with{" "}
            <a
              href={`https://github.com/${SITE_CONFIG.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline font-mono"
            >
              @{SITE_CONFIG.githubUsername}
            </a>
            . Any new startup or repository pushed to GitHub appears here automatically.
          </p>

          {/* Search + Filter Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {["All", "Startups & AI", "Deep Learning & ML", "Live GitHub Feed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${activeCategory === tab
                      ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                      : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.slice(0, 15).map((project) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl overflow-hidden bg-[#111116] border border-white/10 hover:border-amber-400/60 transition duration-300 flex flex-col shadow-xl"
            >
              <div className="relative h-52 overflow-hidden bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 text-amber-400 border border-amber-400/30 backdrop-blur-md">
                  {project.badge}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                      {project.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 shrink-0 transition" />
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.highlights && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.highlights.map((h: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span className="text-amber-400/90 font-medium font-mono">{project.language}</span>
                  <span className="flex items-center gap-1 text-zinc-300 group-hover:text-amber-400 transition">
                    <Github className="w-3.5 h-3.5" /> View on GitHub
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* 5. CONTACT & OMNICHANNEL CONNECT SECTION   */}
      {/* ========================================== */}
      <section id="contact" className="py-24 bg-[#0a0a0e] border-t border-white/10 pb-36">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <p className="text-amber-400 uppercase tracking-[0.25em] text-xs font-semibold">
            CONTACT &amp; COLLABORATION
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Let&apos;s Build Together</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Building an AI startup, seeking a Principal AI Engineer, or want to collaborate on
            autonomous systems? Connect directly via WhatsApp, Instagram, or the live chat below.
          </p>

          {/* 3 Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 flex flex-col items-center gap-2">
              <MapPin className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-sm text-white">Location</h4>
              <p className="text-xs text-zinc-400">{SITE_CONFIG.location}</p>
            </div>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="p-6 rounded-2xl bg-[#111116] border border-white/10 hover:border-amber-400/50 transition flex flex-col items-center gap-2"
            >
              <Mail className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-sm text-white">Email</h4>
              <p className="text-xs text-zinc-400">{SITE_CONFIG.email}</p>
            </a>

            <a
              href={`https://instagram.com/${SITE_CONFIG.instagramHandle}`}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-[#111116] border border-white/10 hover:border-amber-400/50 transition flex flex-col items-center gap-2"
            >
              <Instagram className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-sm text-white">Instagram</h4>
              <p className="text-xs text-zinc-400">@{SITE_CONFIG.instagramHandle}</p>
            </a>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Viswa!%20I%20saw%20your%20VTR369%20portfolio%20and%20want%20to%20connect.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => triggerConfetti()}
              className="px-8 py-4 rounded-full bg-amber-400 text-black font-bold text-sm hover:bg-amber-300 transition shadow-[0_0_35px_rgba(245,158,11,0.4)] flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Connect on Official WhatsApp
            </a>

            <button
              onClick={() => {
                triggerConfetti();
                setChatOpen(true);
              }}
              className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              Open Live Connect Drawer
            </button>
          </div>

          {/* Secondary Social Ecosystem Links */}
          <div className="flex justify-center gap-6 pt-4 text-zinc-400">
            <a
              href={`https://github.com/${SITE_CONFIG.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={SITE_CONFIG.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={SITE_CONFIG.twitterUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition"
              title="X / Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 6. FLOATING VOICE + TEXT AI AUTOPILOT DOCK */}
      {/* ========================================== */}
      <div className="fixed bottom-4 inset-x-0 z-50 px-4 flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-2xl rounded-2xl bg-[#111116]/95 backdrop-blur-2xl border border-amber-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-3 space-y-2">
          <div className="flex items-center justify-between px-2 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              VTR369 AI AUTOPILOT
            </span>
            <span className="truncate max-w-xs sm:max-w-md text-zinc-300">{autopilotStatus}</span>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="text-zinc-400 hover:text-white transition"
              title="Toggle Voice Output"
            >
              {voiceEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-600" />
              )}
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeAutopilotCommand(commandText);
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleVoiceListening}
              className={`p-3 rounded-xl font-semibold transition flex items-center justify-center ${isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-amber-400/15 text-amber-400 hover:bg-amber-400/25 border border-amber-400/30"
                }`}
              title="Speak Command"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              ref={commandInputRef}
              type="text"
              value={commandText}
              onChange={(e) => setCommandText(e.target.value)}
              placeholder="Speak or type: 'Show startups', 'Open ClauseGuard X', 'Skills', 'WhatsApp'..."
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
            />

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-black font-bold text-xs sm:text-sm hover:bg-amber-300 transition flex items-center gap-1.5 shadow"
            >
              <span>Run</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* ========================================== */}
      {/* 7. ON-SITE INSTANT LIVE CHAT DRAWER        */}
      {/* ========================================== */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-28 right-6 z-50 w-80 sm:w-96 rounded-2xl bg-[#14141b] border border-amber-400/40 shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            <div className="p-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black flex items-center justify-between font-bold text-sm">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-black" />
                <span>Direct Chat — M. Viswa Teja Reddy</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 hover:bg-black/10 rounded-md transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${m.sender === "user"
                      ? "bg-amber-400 text-black ml-auto font-medium"
                      : "bg-white/10 text-zinc-200"
                    }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSend} className="p-3 border-t border-white/10 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Write a message to Viswa..."
                  className="flex-1 bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition"
                >
                  Send
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    chatInput || "Hi Viswa! Reaching out from your VTR369 website."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => triggerConfetti()}
                  className="text-center py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold hover:bg-emerald-500/30 transition flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Bridge to WhatsApp
                </a>
                <a
                  href={`https://instagram.com/${SITE_CONFIG.instagramHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center py-2 rounded-lg bg-pink-500/20 border border-pink-500/40 text-pink-300 text-[11px] font-semibold hover:bg-pink-500/30 transition flex items-center justify-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  DM on Instagram
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
