"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
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
  Volume2,
  VolumeX,
  Bot,
  X,
  ChevronRight,
  Search,
  ArrowUpRight,
  Zap,
  Rocket,
  Compass,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { triggerConfetti } from "@/lib/utils";

// ==========================================
// 1. CURATED FLAGSHIP AGENTIC PLATFORMS & PROJECTS
// ==========================================
const FLAGSHIP_PROJECTS = [
  {
    id: "vexaro-ai",
    name: "Vexaro AI — Autonomous Agentic Platform",
    repoName: "Vexaro-AI",
    category: "Startups & AI",
    badge: "FLAGSHIP PLATFORM · LAUNCHING VERY SOON",
    badgeColor: "from-amber-400 via-yellow-300 to-amber-500",
    isSpotlight: true,
    description:
      "Omni-sector autonomous multi-agent operating system designed to orchestrate specialized AI agents across every enterprise category: Legal, Outbound SDR, Clinical Triage, Financial Forecasting, and Code Engineering. Features zero-trust multi-tenancy and verifiable reasoning loops.",
    language: "Full-Stack TypeScript / Python",
    url: "https://github.com/viswatejam702-tech",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Specialized Agents for Every Sector",
      "Launching Very Soon",
      "8-Layer Agent Architecture",
      "Zero-Trust Multi-Tenancy",
    ],
  },
  {
    id: "verified-rag",
    name: "Verified RAG — Evidence & Claim NLI Platform",
    repoName: "verified-rag",
    category: "AI Research & Systems",
    badge: "LEWIS ET AL. RAG · LIVE ON RENDER",
    badgeColor: "from-blue-400 via-cyan-300 to-emerald-400",
    description:
      "End-to-end parametric/non-parametric Retrieval-Augmented Generation system grounded in Lewis et al. (2020). Features dense MIPS vector search, Cross-Encoder reranking (MS-MARCO), and DeBERTa-v3 claim-level NLI verification to detect and eliminate hallucinations.",
    language: "Python / FastAPI / Next.js",
    url: "https://verified-rag.onrender.com",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Dense MIPS Retrieval",
      "Cross-Encoder Reranking",
      "Atomic Claim Decomposition",
      "DeBERTa NLI Verification",
    ],
  },
  {
    id: "aegis-safety-harness",
    name: "Aegis — LLM Safety & Red-Teaming Harness",
    repoName: "llm-eval-harness",
    category: "AI Research & Systems",
    badge: "SAFETY HARNESS · LIVE ON RENDER",
    badgeColor: "from-rose-500 via-red-400 to-amber-500",
    description:
      "Comprehensive adversarial red-teaming evaluation harness testing frontier LLMs across 1,000+ jailbreak vectors, prompt injections, and safety boundary benchmarks with automated guardrail scoring.",
    language: "Python / PyTorch / Next.js",
    url: "https://llm-eval-harness.onrender.com",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
    highlights: ["1,000+ Jailbreak Vectors", "Automated Red-Teaming", "Guardrail Telemetry"],
  },
  {
    id: "vastcare-vernacular-llm",
    name: "VastCare — Vernacular Healthcare LLM",
    repoName: "vastcare-vernacular-llm",
    category: "AI Research & Systems",
    badge: "CLINICAL AI · LIVE ON RENDER",
    badgeColor: "from-emerald-400 via-teal-300 to-cyan-500",
    description:
      "Multilingual clinical intelligence model fine-tuned for low-resource regional Indian languages (Telugu, Hindi, Tamil) with clinical accuracy benchmarks and emergency patient triage routing.",
    language: "PyTorch / Transformers",
    url: "https://vastcare-vernacular-llm.onrender.com",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Vernacular Medical QA", "Clinical Triage", "Low-Resource Transfer"],
  },
  {
    id: "synthesizer-ai",
    name: "Synthesizer AI — Differential Privacy Data Engine",
    repoName: "dp-synth-health",
    category: "AI Research & Systems",
    badge: "DIFFERENTIAL PRIVACY · LIVE ON RENDER",
    badgeColor: "from-purple-400 via-violet-300 to-indigo-500",
    description:
      "Mathematical privacy-preserving generative system providing provable (ε, δ)-Differential Privacy guarantees to synthesize synthetic clinical and tabular datasets without data leakage.",
    language: "Python / PyTorch / DP-SGD",
    url: "https://dp-synth-health.onrender.com",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80",
    highlights: ["(ε, δ)-DP Guarantees", "Generative Tabular Models", "Zero Leakage"],
  },
  {
    id: "nexus-v-ai",
    name: "Nexus V AI",
    repoName: "nexus-V-AI",
    category: "Startups & AI",
    badge: "AUTONOMOUS SWARM",
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
    badge: "LEGALTECH AI PLATFORM",
    description:
      "AI-powered contract intelligence platform that analyzes legal documents, detects risky clauses, and provides actionable negotiation insights in real time.",
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
    badge: "VOICE AI ENGINE",
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
  { name: "Autonomous AI Agents & Multi-Agent Swarms", percent: 96 },
  { name: "Full-Stack TypeScript, React & Next.js", percent: 92 },
  { name: "Deep Learning, PyTorch & Computer Vision", percent: 90 },
  { name: "Autonomous Systems Engineering & VibeCoding", percent: 95 },
  { name: "Machine Learning & Predictive Systems (LSTM / GBDT)", percent: 93 },
  { name: "Quantum Computing & Mechanics Exploration", percent: 85 },
];

// ==========================================
// 3. MOTION VARIANTS FOR FLUID SCROLL TRANSITIONS
// ==========================================
const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardScrollFadeUp = {
  hidden: { opacity: 0, y: 45, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
      mass: 0.7,
    },
  },
};

const headerFadeIn = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function VTR369Portfolio() {
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [portraitSrc, setPortraitSrc] = useState(SITE_CONFIG.heroPortraitUrl);
  const [portraitAttempts, setPortraitAttempts] = useState(0);

  // Scroll Progress Hooks for Page-Wide Choreography
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Hero Parallax Scroll Transforms
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(heroScroll, [0, 1], ["0%", "28%"]);
  const portraitScale = useTransform(heroScroll, [0, 1], [1, 1.14]);
  const portraitOpacity = useTransform(heroScroll, [0, 0.75, 1], [0.85, 0.45, 0]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.7, 1], [1, 0.5, 0]);

  // Ambient Background Glowing Orbs that drift on scroll
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0vh", "-40vh"]);

  // Autopilot State (Voice + Text)
  const [commandText, setCommandText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autopilotStatus, setAutopilotStatus] = useState(
    "Say or type: 'Tell me about Vexaro', 'Show projects', 'Skills', or 'WhatsApp' (Cmd/Ctrl + K)"
  );
  const [swarmActive, setSwarmActive] = useState(true);

  // Instant On-Site Chat Drawer State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am Viswa's AI Concierge. Ask me about Vexaro AI (the autonomous agentic platform launching very soon), Nexus V AI, or connect directly with Viswa!",
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
  // 4. LIVE GITHUB API AUTO-FETCH
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
      .catch(() => {});
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
        badgeColor: "from-zinc-500 to-zinc-400",
        isSpotlight: false,
        description:
          r.description ||
          "Autonomous repository engineered by M. Viswa Teja Reddy on GitHub.",
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
  // 5. SPEECH SYNTHESIS & VOICE AUTOPILOT ENGINE
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

    if (q.includes("vexaro") || q.includes("agentic") || q.includes("building")) {
      scrollTo("projects");
      setActiveCategory("Startups & AI");
      speakResponse(
        "Viswa is building Vexaro AI, an autonomous agentic platform featuring specialized agents for every category and industry sector, launching very soon!"
      );
      triggerConfetti();
    } else if (q.includes("nexus")) {
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
    } else if (q.includes("project") || q.includes("work") || q.includes("show")) {
      scrollTo("projects");
      setActiveCategory("Startups & AI");
      speakResponse(
        `Displaying Viswa's autonomous agentic systems and repositories. Currently syncing ${allProjects.length} projects.`
      );
    } else if (q.includes("github") || q.includes("repo") || q.includes("feed")) {
      scrollTo("projects");
      setActiveCategory("Live GitHub Feed");
      speakResponse("Filtering live repositories directly from Viswa's GitHub account.");
    } else if (q.includes("skill") || q.includes("about") || q.includes("education")) {
      scrollTo("about");
      speakResponse(
        "Here are Viswa's core engineering skills as an AI Research Engineer, research background, and autonomous metrics."
      );
    } else if (q.includes("service") || q.includes("build") || q.includes("what i do")) {
      scrollTo("services");
      speakResponse("Navigating to AI Research Engineering & Autonomous Agentic Platforms.");
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
    } else if (q.includes("chat") || q.includes("contact") || q.includes("connect")) {
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
        `Searching for "${rawInput}". Filtered matching projects and GitHub repositories.`
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
      setAutopilotStatus("Listening... Speak a command (e.g. 'Tell me about Vexaro', 'Show projects', or 'WhatsApp')");
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
      if (lower.includes("vexaro") || lower.includes("agent")) {
        reply = `Vexaro AI is Viswa's flagship autonomous agentic platform where every category and sector's agents are specialized (Legal, Sales SDR, Clinical Triage, Financial, Code). It is launching very soon!`;
      } else if (lower.includes("hire") || lower.includes("role") || lower.includes("research")) {
        reply = `Viswa is an AI Research Engineer focusing on autonomous agentic systems, multi-agent evaluation, and deep learning. Click "Bridge to WhatsApp" to discuss engineering collaborations!`;
      } else if (lower.includes("nexus")) {
        reply = `Nexus V AI is Viswa's autonomous multi-agent platform for orchestrating cross-domain tasks with adaptive reasoning.`;
      } else if (lower.includes("clause")) {
        reply = `ClauseGuard X is an AI-powered legal contract risk analysis platform built with full-stack TypeScript and specialized NLP evaluators.`;
      }
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 400);
  };

  return (
    <div className="relative min-h-screen bg-[#08080a] text-zinc-100 selection:bg-amber-400 selection:text-black font-sans overflow-x-hidden">
      {/* ========================================== */}
      {/* 0. TOP SCROLL PROGRESS BAR (AWWWARDS GRADE) */}
      {/* ========================================== */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 origin-left z-[100] shadow-[0_0_14px_rgba(245,158,11,0.85)]"
      />

      {/* ========================================== */}
      {/* AMBIENT BACKGROUND GLOWING ORBS (SCROLL)   */}
      {/* ========================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <motion.div
          style={{ y: orb1Y }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-500/[0.06] blur-[140px]"
        />
        <motion.div
          style={{ y: orb2Y }}
          className="absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full bg-emerald-500/[0.04] blur-[150px]"
        />
      </div>

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
              name: "Agent-02 Vexaro Sync",
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
                className="px-2 py-0.5 rounded-full text-[10px] font-bold text-black shadow-lg tracking-wider font-mono"
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
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-2xl bg-[#08080a]/80 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5 font-bold tracking-tight text-lg group">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition duration-300 animate-pulse" />
            <span className="text-white font-mono tracking-wider">{SITE_CONFIG.brand}</span>
            <span className="text-xs text-zinc-400 font-normal hidden sm:inline">
              | {SITE_CONFIG.name}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-300 font-medium">
            <a href="#home" className="hover:text-amber-400 transition duration-200">
              Home
            </a>
            <a href="#about" className="hover:text-amber-400 transition duration-200">
              About &amp; Skills
            </a>
            <a href="#services" className="hover:text-amber-400 transition duration-200">
              What I Build
            </a>
            <a href="#projects" className="hover:text-amber-400 transition duration-200">
              Vexaro &amp; Repos
            </a>
            <a href="#contact" className="hover:text-amber-400 transition duration-200">
              Connect
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSwarmActive(!swarmActive)}
              className="text-xs px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-amber-400/50 transition hidden sm:flex items-center gap-1.5 font-mono"
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
              className="text-xs font-semibold px-4 py-2 rounded-full bg-amber-400 text-black hover:bg-amber-300 transition shadow-[0_0_20px_rgba(245,158,11,0.3)] font-medium"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 1. HERO SECTION (CINEMATIC SCROLL PARALLAX)*/}
      {/* ========================================== */}
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Parallax Studio Portrait Background */}
        <motion.div
          style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-0"
        >
          <div className="relative w-full max-w-3xl h-[88vh]">
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

        {/* Foreground Hero Typography with Smooth Parallax Drift */}
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-20"
        >
          {/* Mission / Launching Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-400 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.22em] mb-5 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>BUILDING VEXARO AI — LAUNCHING VERY SOON</span>
          </motion.div>

          {/* Monumental Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white mb-4 drop-shadow-2xl"
          >
            {SITE_CONFIG.name}
          </motion.h1>

          {/* AI Research Engineer Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-200 max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            <span className="text-amber-400 font-semibold">{SITE_CONFIG.role}</span>
            <span className="text-zinc-500 font-normal"> · </span>
            <span className="text-zinc-300">Autonomous Agentic Platforms &amp; Deep Tech</span>
          </motion.h2>

          {/* Tagline / Mission */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Engineering <strong>Vexaro AI</strong> — an omni-sector autonomous agentic platform
            with specialized agents across every category and sector. Pioneering multi-agent systems,
            deep learning evaluation harnesses, and quantum-inspired architectures.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              onClick={() => triggerConfetti()}
              className="px-8 py-4 rounded-full bg-amber-400 text-black font-bold text-sm hover:bg-amber-300 transition shadow-[0_0_35px_rgba(245,158,11,0.45)] flex items-center gap-2 group"
            >
              <span>Explore Vexaro AI &amp; Projects</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border border-white/25 bg-white/5 hover:bg-white/15 backdrop-blur-md text-white font-semibold text-sm transition flex items-center gap-2"
            >
              <span>Connect &amp; Collaborate</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* 2. ABOUT, RESEARCH & ANIMATED SKILL BARS   */}
      {/* ========================================== */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerStagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column Narrative & Stat Grid */}
          <motion.div variants={cardScrollFadeUp} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-[0.25em]">
              <Terminal className="w-3.5 h-3.5" />
              WHO I AM
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              AI Research Engineer &amp; Agentic System Architect
            </h2>

            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              I specialize in autonomous multi-agent systems, deep learning reliability, and
              high-precision predictive modeling. My research sits at the intersection of agentic
              reasoning loops, claim-level evidence verification, and scalable neural architectures.
            </p>

            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              Currently engineering <strong>Vexaro AI</strong> — an autonomous agentic platform
              deploying category-specialized agents across every major industry sector. Combining
              deep research rigor with rapid VibeCoding execution from Hyderabad, India.
            </p>

            {/* 2x2 Stat & Availability Grid */}
            <motion.div
              variants={containerStagger}
              className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10"
            >
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition duration-300">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Experience &amp; Output</p>
                <p className="text-lg font-bold text-white mt-1">
                  {Math.max(33, allProjects.length)}+ Public Repos
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition duration-300">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Flagship Platform</p>
                <p className="text-lg font-bold text-amber-400 mt-1">Vexaro AI Platform</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition duration-300">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Core Focus</p>
                <p className="text-lg font-bold text-white mt-1">Autonomous Multi-Agents &amp; DL</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-400/40 transition duration-300">
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Launch Status</p>
                <p className="text-lg font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Launching Very Soon
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column Education & Animated Skill Bars */}
          <motion.div variants={cardScrollFadeUp} className="lg:col-span-6 space-y-8">
            {/* Education & Research Card */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 hover:border-amber-400/40 transition duration-300 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 text-amber-400 font-semibold">
                <GraduationCap className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  Education &amp; Research Focus
                </span>
              </div>
              <div className="space-y-4 pl-2 border-l-2 border-amber-400/40">
                <div className="pl-4">
                  <p className="font-semibold text-white">
                    Computer Science Engineering &amp; AI Research
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Autonomous Multi-Agent Platforms, PyTorch Deep Learning &amp; Evidence-Grounded Verification
                  </p>
                </div>
                <div className="pl-4">
                  <p className="font-semibold text-white">
                    Quantum Computing &amp; Mechanics Foundations
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    State Superposition Simulation, Qubit Logic &amp; Next-Gen Computational Architectures
                  </p>
                </div>
              </div>
            </div>

            {/* Animated Skills Progress Bars with Scroll Trigger */}
            <div className="space-y-4 p-6 rounded-2xl bg-[#111116]/80 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-amber-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-white text-sm font-semibold">Technical Mastery</span>
                </div>
                <span className="text-xs text-zinc-500 font-mono">CALIBRATED %</span>
              </div>

              <div className="space-y-4">
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
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* 3. WHAT I BUILD (SERVICES & CORE PILLARS)  */}
      {/* ========================================== */}
      <section id="services" className="py-28 bg-[#0a0a0e] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={headerFadeIn}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-amber-400 uppercase tracking-[0.25em] text-xs font-semibold mb-2 font-mono">
              WHAT I DO
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              AI Research Engineering &amp; Agentic Platforms
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              Architecting production-grade multi-agent operating systems, deep learning pipelines, and research harnesses.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={containerStagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Rocket,
                title: "Vexaro AI Platform Engineering",
                desc: "Autonomous agentic operating system deploying specialized multi-agent teams across legal, SDR, clinical triage, finance, and code execution with zero-trust safety gates.",
                tag: "FLAGSHIP PLATFORM",
                highlight: "Launching Very Soon",
              },
              {
                icon: ShieldCheck,
                title: "Verified RAG & Research Systems",
                desc: "Parametric/non-parametric retrieval engines grounded in Lewis et al. with dense MIPS, Cross-Encoder reranking, and DeBERTa claim-level NLI verification to eliminate hallucinations.",
                tag: "AI RESEARCH ENGINE",
                highlight: "Live on Render",
              },
              {
                icon: Cpu,
                title: "Autonomous Agents & Voice Systems",
                desc: "Low-latency bidirectional voice-to-action pipelines (AI Voice Agent Pro), swarm task decomposition, and self-healing multi-agent orchestration (Nexus V AI).",
                tag: "MULTI-AGENT SWARMS",
                highlight: "Real-Time VAD",
              },
              {
                icon: Code2,
                title: "Deep Learning & Computer Vision",
                desc: "High-precision time-series forecasting (R² > 0.90 weather forecasting with LSTM/GBDT), PyTorch maritime CNNs, and (ε, δ)-Differential Privacy tabular generators.",
                tag: "DEEP LEARNING",
                highlight: "PyTorch & CNNs",
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardScrollFadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl bg-[#111116] border border-white/10 hover:border-amber-400/60 transition duration-300 text-left space-y-4 relative group shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-amber-400/90 border border-amber-400/20">
                        {service.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{service.desc}</p>
                  </div>
                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {service.highlight}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. VEXARO AI SPOTLIGHT + GITHUB REPOSITORIES */}
      {/* ========================================== */}
      <section id="projects" className="py-28 max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headerFadeIn}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-[0.25em] mb-3">
            <Compass className="w-3.5 h-3.5" />
            VEXARO AI &amp; REPOSITORIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
            Autonomous Systems &amp; Live Repositories
          </h2>
          <p className="text-sm text-zinc-400">
            Featuring <strong>Vexaro AI</strong> alongside repositories synchronized live with{" "}
            <a
              href={`https://github.com/${SITE_CONFIG.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline font-mono"
            >
              @{SITE_CONFIG.githubUsername}
            </a>
            . Any new repository pushed to GitHub appears here automatically.
          </p>

          {/* Search + Category Tabs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects & platforms..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {["All", "Startups & AI", "AI Research & Systems", "Deep Learning & ML", "Live GitHub Feed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    activeCategory === tab
                      ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Cards Grid with Buttery Smooth Scroll Reveals */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={containerStagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {filteredProjects.slice(0, 15).map((project) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              variants={cardScrollFadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group rounded-2xl overflow-hidden bg-[#111116] border transition duration-300 flex flex-col shadow-xl relative ${
                project.isSpotlight
                  ? "border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.25)] md:col-span-2 lg:col-span-3"
                  : "border-white/10 hover:border-amber-400/60"
              }`}
            >
              <div
                className={`relative overflow-hidden bg-zinc-900 ${
                  project.isSpotlight ? "h-64 sm:h-80" : "h-52"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/40 to-transparent" />

                {/* Badge */}
                <span
                  className={`absolute top-4 left-4 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                    project.isSpotlight
                      ? "bg-amber-400 text-black border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                      : "bg-black/80 text-amber-400 border-amber-400/30"
                  }`}
                >
                  {project.badge}
                </span>

                {project.isSpotlight && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    OMNI-SECTOR PLATFORM
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3
                      className={`font-bold text-white group-hover:text-amber-400 transition ${
                        project.isSpotlight ? "text-2xl sm:text-3xl" : "text-lg"
                      }`}
                    >
                      {project.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 shrink-0 transition" />
                  </div>
                  <p
                    className={`text-zinc-400 leading-relaxed ${
                      project.isSpotlight ? "text-sm sm:text-base" : "text-xs line-clamp-3"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {project.highlights && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.highlights.map((h: string, idx: number) => (
                      <span
                        key={idx}
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-mono ${
                          project.isSpotlight
                            ? "bg-amber-400/10 border-amber-400/30 text-amber-300"
                            : "bg-white/5 border-white/10 text-zinc-300"
                        }`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="text-amber-400/90 font-medium">{project.language}</span>
                  <span className="flex items-center gap-1 text-zinc-300 group-hover:text-amber-400 transition">
                    <Github className="w-3.5 h-3.5" /> View on GitHub
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* 5. CONTACT & OMNICHANNEL CONNECT SECTION   */}
      {/* ========================================== */}
      <section id="contact" className="py-28 bg-[#0a0a0e] border-t border-white/10 pb-36 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headerFadeIn}
          className="max-w-4xl mx-auto px-6 text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-[0.25em]">
            <Zap className="w-3.5 h-3.5" />
            CONNECT &amp; COLLABORATE
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Let&apos;s Build the Future of AI Together
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Interested in <strong>Vexaro AI</strong>, seeking an AI Research Engineer, or looking to collaborate
            on autonomous multi-agent systems and deep learning architectures? Connect directly via WhatsApp, Instagram, or live chat.
          </p>

          {/* 3 Contact Cards */}
          <motion.div
            variants={containerStagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6"
          >
            <motion.div
              variants={cardScrollFadeUp}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-[#111116] border border-white/10 flex flex-col items-center gap-2 shadow-lg"
            >
              <MapPin className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-sm text-white">Location</h4>
              <p className="text-xs text-zinc-400">{SITE_CONFIG.location}</p>
            </motion.div>

            <motion.a
              variants={cardScrollFadeUp}
              whileHover={{ y: -6 }}
              href={`mailto:${SITE_CONFIG.email}`}
              className="p-6 rounded-2xl bg-[#111116] border border-white/10 hover:border-amber-400/50 transition flex flex-col items-center gap-2 shadow-lg"
            >
              <Mail className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-sm text-white">Email</h4>
              <p className="text-xs text-zinc-400">{SITE_CONFIG.email}</p>
            </motion.a>

            <motion.a
              variants={cardScrollFadeUp}
              whileHover={{ y: -6 }}
              href={`https://instagram.com/${SITE_CONFIG.instagramHandle}`}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-[#111116] border border-white/10 hover:border-amber-400/50 transition flex flex-col items-center gap-2 shadow-lg"
            >
              <Instagram className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-sm text-white">Instagram</h4>
              <p className="text-xs text-zinc-400">@{SITE_CONFIG.instagramHandle}</p>
            </motion.a>
          </motion.div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Viswa!%20Connecting%20from%20your%20VTR369%20portfolio%20regarding%20Vexaro%20AI.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => triggerConfetti()}
              className="px-8 py-4 rounded-full bg-amber-400 text-black font-bold text-sm hover:bg-amber-300 transition shadow-[0_0_35px_rgba(245,158,11,0.45)] flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Connect on Official WhatsApp
            </a>

            <button
              onClick={() => {
                triggerConfetti();
                setChatOpen(true);
              }}
              className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition flex items-center gap-2 backdrop-blur-md"
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
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* 6. FLOATING VOICE + TEXT AI AUTOPILOT DOCK */}
      {/* ========================================== */}
      <div className="fixed bottom-4 inset-x-0 z-50 px-4 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="pointer-events-auto w-full max-w-2xl rounded-2xl bg-[#111116]/95 backdrop-blur-2xl border border-amber-400/35 shadow-[0_10px_40px_rgba(0,0,0,0.85)] p-3 space-y-2"
        >
          <div className="flex items-center justify-between px-2 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              VTR369 AI AUTOPILOT
            </span>
            <span className="truncate max-w-xs sm:max-w-md text-zinc-300 font-medium">
              {autopilotStatus}
            </span>
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
              className={`p-3 rounded-xl font-semibold transition flex items-center justify-center ${
                isListening
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
              placeholder="Speak or type: 'Tell me about Vexaro', 'Show projects', 'Skills', 'WhatsApp'..."
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
            />

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-black font-bold text-xs sm:text-sm hover:bg-amber-300 transition flex items-center gap-1.5 shadow"
            >
              <span>Run</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>

      {/* ========================================== */}
      {/* 7. ON-SITE INSTANT LIVE CHAT DRAWER        */}
      {/* ========================================== */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed bottom-28 right-6 z-50 w-80 sm:w-96 rounded-2xl bg-[#14141b] border border-amber-400/40 shadow-2xl overflow-hidden backdrop-blur-2xl"
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
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === "user"
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
                  className="flex-1 bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
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
                    chatInput || "Hi Viswa! Reaching out from your VTR369 website regarding Vexaro AI."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => triggerConfetti()}
                  className="text-center py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold hover:bg-emerald-500/30 transition flex items-center justify-center gap-1 font-mono"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Bridge to WhatsApp
                </a>
                <a
                  href={`https://instagram.com/${SITE_CONFIG.instagramHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center py-2 rounded-lg bg-pink-500/20 border border-pink-500/40 text-pink-300 text-[11px] font-semibold hover:bg-pink-500/30 transition flex items-center justify-center gap-1 font-mono"
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
