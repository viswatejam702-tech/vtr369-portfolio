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
  Award,
  Sliders,
  Copy,
  Check,
  Radio,
  FileCheck,
  Activity,
  Layers,
  Network,
  PhoneCall,
  GitBranch,
  Star,
  RefreshCw,
  Workflow,
  Key,
  Globe,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { triggerConfetti } from "@/lib/utils";

// ==========================================
// 1. CURATED FLAGSHIP ARCHITECTURES & LABS
// ==========================================
const CURATED_FLAGSHIPS = [
  {
    id: "vexaro-ai",
    name: "Vexaro AI — Verifiable Multi-Agent Operating System",
    repoName: "Vexaro-AI",
    category: "Autonomous Systems",
    badge: "FLAGSHIP OPERATING SYSTEM · 101 GATES PASSED",
    badgeColor: "from-blue-500/30 to-cyan-500/20 text-cyan-300 border-cyan-500/40",
    isSpotlight: true,
    description:
      "Evidence-grounded B2B buying-moment intelligence engine orchestrating 9 specialized autonomous agents (Outreach SDR, Meetlyzer Rooms, Hirifir, CashPilot, Veylithra, Voice OS). Engineered with 101 automated evaluation gates, 0.86s p50 LiveKit + Sarvam AI Telugu-English telephony voice agent, TRAI 09:00–21:00 calling windows, and mathematical Verhoeff Aadhaar + Luhn card DPDP privacy guards.",
    language: "TypeScript / Python / LiveKit",
    url: "https://vexaro-app.web.app/",
    image: "/vexaro-logo.png",
    metrics: [
      { label: "Verified Gates", val: "101 / 101" },
      { label: "Voice Turn p50", val: "0.86s" },
      { label: "Agents Active", val: "9 Specialized" },
      { label: "Architecture", val: "8-Layer Zero-Trust" },
    ],
  },
  {
    id: "vtr-agentic-company",
    name: "VTR's Agentic Company — 90-Agent Autonomous Swarm",
    repoName: "vtr-agentic-company",
    category: "Autonomous Systems",
    badge: "MULTI-AGENT SWARM · 300 MCP SKILLS",
    badgeColor: "from-violet-500/30 to-blue-500/20 text-violet-300 border-violet-500/40",
    description:
      "Enterprise multi-agent orchestration network coordinating 90 specialized subagents and 300+ Model Context Protocol (MCP) skills across an 8-layer architecture with zero-trust tenant isolation, automated telemetry loops, and self-healing error recovery.",
    language: "Python / TypeScript / LangGraph",
    url: "https://github.com/viswatejam702-tech",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "Subagents", val: "90 Swarm" },
      { label: "MCP Skills", val: "300+ Tools" },
      { label: "Architecture", val: "8-Layer" },
      { label: "Isolation", val: "Zero-Trust" },
    ],
  },
  {
    id: "sector-solver",
    name: "Sector Solver — Algorithmic Domain Optimization Suite",
    repoName: "sector-solver",
    category: "Algorithms & Optimization",
    badge: "QUANTITATIVE OPTIMIZATION",
    badgeColor: "from-emerald-500/30 to-teal-500/20 text-emerald-300 border-emerald-500/40",
    description:
      "Algorithmic decision-modeling engine applying integer programming, combinatorial heuristics, and graph optimization to resolve sector-specific resource allocation, route optimization, and operational bottlenecks.",
    language: "Python / PyTorch / C++",
    url: "https://github.com/viswatejam702-tech",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "Optimization", val: "Combinatorial" },
      { label: "Heuristics", val: "Domain-Specific" },
      { label: "Latency", val: "<12ms Solve" },
      { label: "Scale", val: "O(n log n)" },
    ],
  },
  {
    id: "verified-rag",
    name: "Verified RAG — Evidence & Claim NLI Platform",
    repoName: "verified-rag",
    category: "RAG & Systems",
    badge: "LEWIS ET AL. · LIVE ON RENDER",
    badgeColor: "from-blue-500/30 to-indigo-500/20 text-blue-300 border-blue-500/40",
    description:
      "Parametric/non-parametric Retrieval-Augmented Generation system grounded in Lewis et al. (2020). Combines dense MIPS vector search, Cross-Encoder reranking (MS-MARCO), and DeBERTa-v3 claim-level NLI verification to detect and eliminate hallucinations.",
    language: "FastAPI / Next.js / DeBERTa",
    url: "https://verified-rag.onrender.com",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "Retrieval", val: "Dense MIPS" },
      { label: "Reranker", val: "Cross-Encoder" },
      { label: "Verification", val: "DeBERTa NLI" },
      { label: "Hosting", val: "Render Live" },
    ],
  },
  {
    id: "weather-prediction-ml-dl",
    name: "Meteorological Forecasting (GBDT vs. LSTM Deep Learning)",
    repoName: "Weather-Prediction-with-ML-and-Dl",
    category: "Deep Learning & ML",
    badge: "R² = 0.930 BENCHMARK",
    badgeColor: "from-cyan-500/30 to-blue-500/20 text-cyan-300 border-cyan-500/40",
    description:
      "Comparative time-series benchmarking between Gradient Boosting (R² = 0.930, MAE 1.53°C) and Multi-Layer LSTM (R² = 0.914) over 10,000+ hourly meteorological telemetry records with automated feature engineering.",
    language: "Python / PyTorch / Scikit-Learn",
    url: "https://github.com/viswatejam702-tech/Weather-Prediction-with-ML-and-Dl",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "GBDT Score", val: "R² = 0.930" },
      { label: "LSTM Score", val: "R² = 0.914" },
      { label: "MAE", val: "1.53°C" },
      { label: "Telemetry", val: "10K+ Records" },
    ],
  },
  {
    id: "game-of-dl-in-ships",
    name: "Maritime Vessel Classification (PyTorch Residual CNN)",
    repoName: "game-of-dl-in-ships",
    category: "Deep Learning & Vision",
    badge: "PYTORCH VISION PIPELINE",
    badgeColor: "from-emerald-500/30 to-teal-500/20 text-emerald-300 border-emerald-500/40",
    description:
      "15-stage PyTorch maritime vessel detection and classification architecture leveraging transfer learning and residual feature maps across maritime satellite imagery with comprehensive confusion matrix validation.",
    language: "PyTorch / TorchVision / Python",
    url: "https://github.com/viswatejam702-tech/game-of-dl-in-ships",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
    metrics: [
      { label: "Pipeline", val: "15 Stages" },
      { label: "Framework", val: "PyTorch" },
      { label: "Augmentation", val: "Multi-Angle" },
      { label: "Domain", val: "Satellite Vision" },
    ],
  },
];

// ==========================================
// 2. TECHNICAL MASTERY CALIBRATION
// ==========================================
const SKILLS = [
  { name: "Autonomous Multi-Agent Operating Systems (LangGraph & LiveKit)", percent: 97, focus: "DAG Orchestration & Swarms" },
  { name: "Full-Stack TypeScript, React, Next.js & Serverless", percent: 94, focus: "Dark-Obsidian & State Machines" },
  { name: "Deep Learning, PyTorch, CNNs & Time-Series LSTMs", percent: 92, focus: "Model Training & Evaluation" },
  { name: "Telephony Voice Pipelines (VAD, Streaming STT/TTS & Barge-In)", percent: 95, focus: "Sub-Second Turn Latency" },
  { name: "RAG Evidence Architecture & Claim-Level NLI Verification", percent: 93, focus: "Dense MIPS & Cross-Encoders" },
  { name: "Compliance & Safety Gates (DPDP 2023, TRAI, Verhoeff & Luhn)", percent: 96, focus: "Zero-Trust Data Protection" },
];

export default function VTR369Portfolio() {
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [repoLoading, setRepoLoading] = useState(true);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [portraitSrc, setPortraitSrc] = useState(SITE_CONFIG.heroPortraitUrl);
  const [portraitAttempts, setPortraitAttempts] = useState(0);

  // Top Scroll Progress (Snappy spring)
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // =========================================================================
  // STICKY STATE-MORPHING SCROLLYTELLING STAGE (wrkr.dev Style)
  // Outer Track: min-h-[280vh] | Viewport: sticky top-0 h-screen
  // =========================================================================
  const scrollyTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: trackProgress } = useScroll({
    target: scrollyTrackRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll tracking across 4 chapters (0 to 1)
  // Chapter 1: 0.00 - 0.25 (Identity)
  // Chapter 2: 0.25 - 0.50 (Vexaro AI)
  // Chapter 3: 0.50 - 0.75 (VTR's Agentic Company)
  // Chapter 4: 0.75 - 1.00 (Sector Solver & ML/DL Lab)
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const unsubscribe = trackProgress.on("change", (latest) => {
      if (latest < 0.25) {
        setActiveChapter(0);
      } else if (latest < 0.5) {
        setActiveChapter(1);
      } else if (latest < 0.75) {
        setActiveChapter(2);
      } else {
        setActiveChapter(3);
      }
    });
    return () => unsubscribe();
  }, [trackProgress]);

  // Click handler to jump to chapter directly
  const jumpToChapter = (chapterIdx: number) => {
    if (!scrollyTrackRef.current) return;
    const trackRect = scrollyTrackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const trackTop = trackRect.top + scrollTop;
    const trackHeight = trackRect.height;
    // Map index 0..3 to fractional offset inside the track
    const targetScroll = trackTop + (chapterIdx / 3) * (trackHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  // Autopilot State (Voice + Text)
  const [commandText, setCommandText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autopilotStatus, setAutopilotStatus] = useState("Autopilot Ready · Press '/' or Cmd+K to navigate");
  const [swarmActive, setSwarmActive] = useState(true);

  // Instant On-Site Chat Drawer State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am Viswa's AI Concierge. Ask me about Vexaro AI (9 agents · 101 verified gates), VTR's Agentic Company, his LOR credentials, or connect with Viswa directly on WhatsApp.",
    },
  ]);

  // Live ElevenLabs Voice & Gemini Autopilot State
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState("");
  const [elevenLabsVoiceId, setElevenLabsVoiceId] = useState("21m00Tcm4TlvDq8ikWAM");
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // LOR Cryptographic Proof State
  const [lorModalOpen, setLorModalOpen] = useState(false);
  const [lorInputId, setLorInputId] = useState("LOR-VTR-2024-AI01");
  const [lorData, setLorData] = useState<any>(null);
  const [lorLoading, setLorLoading] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const recognitionRef = useRef<any>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Load client keys from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEleven = localStorage.getItem("vtr_elevenlabs_key") || "";
      const storedVoice = localStorage.getItem("vtr_elevenlabs_voice") || "JBFqnCBsd6RMkjVDRZzb";
      const storedGemini = localStorage.getItem("vtr_gemini_key") || "";
      if (storedEleven) setElevenLabsApiKey(storedEleven);
      if (storedVoice) setElevenLabsVoiceId(storedVoice);
      if (storedGemini) setGeminiApiKey(storedGemini);
    }
  }, []);

  // Keyboard shortcut listener (Cmd/Ctrl + K or '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        commandInputRef.current?.focus();
        speakResponse("Autopilot active. Type or speak a command.");
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        commandInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch GitHub repos with layout-matched skeleton and error resilience
  const fetchGithubRepos = () => {
    setRepoLoading(true);
    setRepoError(null);
    fetch(`https://api.github.com/users/${SITE_CONFIG.githubUsername}/repos?sort=updated&per_page=100`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setGithubRepos(data.filter((r) => !r.fork));
        }
        setRepoLoading(false);
      })
      .catch((err) => {
        setRepoError(err.message || "Could not fetch dynamic GitHub repos");
        setRepoLoading(false);
      });
  };

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  // Merge Curated Flagships + Live GitHub Repos
  const allProjects = useMemo(() => {
    const flagshipNames = new Set(CURATED_FLAGSHIPS.map((p) => p.repoName.toLowerCase()));
    const dynamicRepos = githubRepos
      .filter((r) => !flagshipNames.has(r.name.toLowerCase()))
      .map((r) => ({
        id: String(r.id),
        name: r.name.replace(/[-_]/g, " "),
        repoName: r.name,
        category: "Live GitHub Feed",
        badge: r.language || "GITHUB REPOSITORY",
        badgeColor: "from-zinc-500/20 to-zinc-600/10 text-zinc-300 border-zinc-700/50",
        isSpotlight: false,
        description: r.description || "Production repository authored by M. Viswa Teja Reddy.",
        language: r.language || "Code",
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        url: r.html_url,
        image: `https://opengraph.githubassets.com/1/${SITE_CONFIG.githubUsername}/${r.name}`,
        metrics: [
          { label: "Stars", val: `★ ${r.stargazers_count || 0}` },
          { label: "Forks", val: `⑂ ${r.forks_count || 0}` },
          { label: "Language", val: r.language || "Open Source" },
        ],
      }));

    return [...CURATED_FLAGSHIPS, ...dynamicRepos];
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

  // Fallback portrait handler
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

  // Cryptographic LOR Verifier
  const verifyLorId = async (idToVerify: string) => {
    setLorLoading(true);
    setLorInputId(idToVerify);
    try {
      const res = await fetch(`/api/verify-lor?id=${encodeURIComponent(idToVerify)}`);
      const data = await res.json();
      if (res.ok && data.verified) {
        setLorData(data.credential);
      } else {
        setLorData({ error: data.message || "Credential ID not found in registry." });
      }
    } catch {
      setLorData({ error: "Network error reaching cryptographic registry." });
    } finally {
      setLorLoading(false);
    }
  };

  // Voice TTS dispatcher
  const fallbackWebSpeech = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsPlayingAudio(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  const speakResponse = async (text: string) => {
    setAutopilotStatus(text);
    if (!voiceEnabled || typeof window === "undefined") return;

    try {
      setIsPlayingAudio(true);
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          apiKey: elevenLabsApiKey || undefined,
          voiceId: elevenLabsVoiceId || undefined,
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("audio/mpeg")) {
        const audioBlob = await res.blob();
        const url = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.pause();
        }
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => {
          setIsPlayingAudio(false);
          fallbackWebSpeech(text);
        };
        await audio.play();
        return;
      }
    } catch {
      // Fallback below
    }
    fallbackWebSpeech(text);
  };

  const executeAutopilotCommand = async (rawInput: string) => {
    const q = rawInput.trim();
    if (!q) return;

    const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const lower = q.toLowerCase();

    if (lower.includes("lor") || lower.includes("recommendation") || lower.includes("credential")) {
      setLorModalOpen(true);
      verifyLorId("LOR-VTR-2024-AI01");
      speakResponse("Opening Viswa's Cryptographic LOR & Credentials Registry.");
      triggerConfetti();
      return;
    }

    try {
      const res = await fetch("/api/autopilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: q }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.action?.type === "SCROLL" && data.action.target) {
          const targetId = data.action.target.replace("#", "");
          scrollTo(targetId);
        } else if (data.action?.type === "OPEN_MODAL" && data.action.target === "lor-verifier") {
          setLorModalOpen(true);
          verifyLorId("LOR-VTR-2024-AI01");
        }

        if (lower.includes("vexaro") || lower.includes("verified rag")) {
          triggerConfetti();
        }

        speakResponse(data.speechText || data.displayText);
        return;
      }
    } catch {
      // Fallback
    }

    if (lower.includes("vexaro") || lower.includes("platform")) {
      jumpToChapter(1);
      speakResponse("Navigating to Vexaro AI Operating System stage.");
      triggerConfetti();
    } else if (lower.includes("agent") || lower.includes("swarm") || lower.includes("company")) {
      jumpToChapter(2);
      speakResponse("Navigating to VTR's Agentic Company 90-agent swarm.");
      triggerConfetti();
    } else if (lower.includes("solver") || lower.includes("ml") || lower.includes("dl") || lower.includes("weather")) {
      jumpToChapter(3);
      speakResponse("Navigating to Sector Solver & ML/DL Lab benchmarks.");
    } else if (lower.includes("whatsapp")) {
      speakResponse("Connecting to Viswa's official WhatsApp channel.");
      triggerConfetti();
      window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Viswa!%20Connecting%20from%20VTR369.`, "_blank");
    } else {
      scrollTo("projects-grid");
      setSearchQuery(q);
      speakResponse(`Searching for "${q}". Showing matching production systems.`);
    }
  };

  const toggleVoiceListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      speakResponse("Voice recognition not supported in this browser. Please type your request.");
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
      setAutopilotStatus("Listening... Speak a command ('Vexaro', 'Sector Solver', 'WhatsApp')");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCommandText(transcript);
      executeAutopilotCommand(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    const updatedHistory = [...chatMessages, { sender: "user", text: userMsg }];
    setChatMessages(updatedHistory);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
          apiKey: geminiApiKey || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || "Thank you for reaching out! Viswa will reply shortly.";
        setChatMessages((prev) => [...prev, { sender: "bot", text: replyText }]);
        speakResponse(replyText);
        return;
      }
    } catch {
      // Fallback
    } finally {
      setChatLoading(false);
    }

    const fallbackReply = `Thank you for your message! Connect directly on WhatsApp at wa.me/${SITE_CONFIG.whatsappNumber}.`;
    setChatMessages((prev) => [...prev, { sender: "bot", text: fallbackReply }]);
    speakResponse(fallbackReply);
  };

  return (
    <div className="relative min-h-screen bg-[#07090E] text-[#F3F4F6] font-sans overflow-x-hidden selection:bg-blue-600/30 selection:text-white">
      {/* ========================================================================= */}
      {/* 0. TOP HAIRLINE SCROLL PROGRESS INDICATOR                                 */}
      {/* ========================================================================= */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 origin-left z-[100] shadow-[0_0_12px_rgba(59,130,246,0.8)]"
      />

      {/* ========================================================================= */}
      {/* AMBIENT OBSIDIAN GRADIENT MESH                                            */}
      {/* ========================================================================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[650px] h-[650px] rounded-full bg-blue-600/[0.04] blur-[160px]" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.03] blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] rounded-full bg-violet-600/[0.03] blur-[170px]" />
      </div>

      {/* ========================================================================= */}
      {/* MULTI-AGENT SWARM ACTIVE CURSORS (TOGGLEABLE)                             */}
      {/* ========================================================================= */}
      {swarmActive && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {[
            { name: "Agent-01 · UI Architect", color: "#3B82F6", x: ["10vw", "75vw", "30vw"], y: ["15vh", "65vh", "25vh"], dur: 19 },
            { name: "Agent-02 · Vexaro Engine", color: "#06B6D4", x: ["80vw", "20vw", "65vw"], y: ["28vh", "78vh", "20vh"], dur: 23 },
            { name: "Agent-03 · Neural Benchmark", color: "#8B5CF6", x: ["40vw", "15vw", "85vw"], y: ["70vh", "22vh", "50vh"], dur: 21 },
          ].map((agent, idx) => (
            <motion.div
              key={idx}
              animate={{ x: agent.x, y: agent.y }}
              transition={{ duration: agent.dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              className="absolute flex items-center gap-1.5 opacity-60"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill={agent.color}>
                <path d="M3 2l18 9-9 2-2 9-7-20z" />
              </svg>
              <span
                style={{ borderColor: agent.color, color: agent.color }}
                className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#0C1018]/90 border backdrop-blur-md shadow-lg tracking-wider"
              >
                {agent.name}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STICKY GLASS HEADER                                                       */}
      {/* ========================================================================= */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#07090E]/80 border-b border-white/[0.07] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#showcase" className="flex items-center gap-3 font-bold tracking-tight text-base group">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 group-hover:scale-125 transition duration-200 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span className="text-white font-mono tracking-wider">{SITE_CONFIG.brand}</span>
            <span className="text-xs text-zinc-400 font-normal hidden sm:inline">
              | {SITE_CONFIG.name}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <button onClick={() => jumpToChapter(0)} className="hover:text-cyan-400 transition">
              01 Identity
            </button>
            <button onClick={() => jumpToChapter(1)} className="hover:text-cyan-400 transition">
              02 Vexaro AI
            </button>
            <button onClick={() => jumpToChapter(2)} className="hover:text-cyan-400 transition">
              03 Agentic Co
            </button>
            <button onClick={() => jumpToChapter(3)} className="hover:text-cyan-400 transition">
              04 ML/DL Lab
            </button>
            <a href="#research-results" className="text-cyan-400 hover:text-cyan-300 font-semibold transition flex items-center gap-1">
              <span>Research &amp; Platforms</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </a>
            <a href="#projects-grid" className="hover:text-cyan-400 transition">
              All Repos
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setLorModalOpen(true);
                verifyLorId("LOR-VTR-2024-AI01");
              }}
              className="tactile-btn text-xs px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition flex items-center gap-1.5 font-mono shadow-[0_0_12px_rgba(59,130,246,0.15)]"
              title="Verify Letters of Recommendation & Credentials"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Verify LOR</span>
            </button>

            <button
              onClick={() => setSwarmActive(!swarmActive)}
              className="tactile-btn text-xs px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#0C1018] hover:border-cyan-400/40 text-zinc-400 hover:text-white transition hidden sm:flex items-center gap-1.5 font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{swarmActive ? "Swarm On" : "Swarm Off"}</span>
            </button>

            <button
              onClick={() => {
                triggerConfetti();
                setChatOpen(true);
              }}
              className="tactile-btn text-xs font-semibold px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition shadow-[0_0_20px_rgba(59,130,246,0.35)]"
            >
              Connect
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. FAST WRKR.DEV-STYLE STICKY STATE-MORPHING SCROLLYTELLING STAGE         */}
      {/* Track: min-h-[175vh] | Viewport: sticky top-0 h-screen                     */}
      {/* ========================================================================= */}
      <section
        id="showcase"
        ref={scrollyTrackRef}
        className="relative min-h-[175vh] w-full"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 z-10 pt-16">
          {/* Central Architectural Glass Container */}
          <div className="relative w-full max-w-5xl h-[82vh] rounded-3xl bg-[#0C1018]/90 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 overflow-hidden">
            {/* Top Stage Bar: Active Chapter Tracker & Live Badge */}
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-4 z-20">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                  SYSTEM STAGE · CHAPTER 0{activeChapter + 1}
                </span>
                <span className="text-zinc-600">/</span>
                <span className="font-mono text-xs text-zinc-400 hidden sm:inline">
                  {activeChapter === 0
                    ? "IDENTITY & TELEMETRY"
                    : activeChapter === 1
                    ? "VEXARO AI MULTI-AGENT OS"
                    : activeChapter === 2
                    ? "VTR AGENTIC COMPANY (90 SUBAGENTS)"
                    : "SECTOR SOLVER & NEURAL LABS"}
                </span>
              </div>

              {/* Clickable Chapter Navigation Rail */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[
                  { idx: 0, label: "01 Identity" },
                  { idx: 1, label: "02 Vexaro AI" },
                  { idx: 2, label: "03 Agentic Co" },
                  { idx: 3, label: "04 ML/DL Lab" },
                ].map((chap) => (
                  <button
                    key={chap.idx}
                    onClick={() => jumpToChapter(chap.idx)}
                    className={`tactile-btn px-2.5 sm:px-3 py-1 rounded-lg font-mono text-[11px] transition flex items-center gap-1 ${
                      activeChapter === chap.idx
                        ? "bg-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                        : "bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.06]"
                    }`}
                  >
                    <span>{chap.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Morphing Stage Body: AnimatePresence crossfade between the 4 chapters */}
            <div className="relative flex-1 py-6 flex items-center overflow-y-auto z-20">
              <AnimatePresence mode="wait">
                {/* ------------------------------------------------------------- */}
                {/* CHAPTER 1: FOUNDER & AI SYSTEMS IDENTITY                      */}
                {/* ------------------------------------------------------------- */}
                {activeChapter === 0 && (
                  <motion.div
                    key="chap-0"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-7 space-y-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                        <span>AI RESEARCH ENGINEER &amp; SYSTEMS ARCHITECT</span>
                      </div>

                      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        {SITE_CONFIG.name}
                      </h1>

                      <p className="text-zinc-300 max-measure leading-relaxed text-sm sm:text-base">
                        Architecting autonomous multi-agent systems, low-latency telephony voice engines,
                        and evidence-grounded neural verification. Creator of <strong>Vexaro AI</strong> and
                        the 90-agent orchestration company.
                      </p>

                      {/* Telemetry Numbers */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        <div className="p-3.5 rounded-xl bg-[#121824] border border-white/[0.07]">
                          <span className="block text-[10px] font-mono text-zinc-400 uppercase">Public Repos</span>
                          <span className="text-lg font-bold text-white font-mono tabular-nums">35+ Repos</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#121824] border border-white/[0.07]">
                          <span className="block text-[10px] font-mono text-zinc-400 uppercase">Test Gates</span>
                          <span className="text-lg font-bold text-cyan-400 font-mono tabular-nums">101 Gates</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#121824] border border-white/[0.07]">
                          <span className="block text-[10px] font-mono text-zinc-400 uppercase">Voice Latency</span>
                          <span className="text-lg font-bold text-emerald-400 font-mono tabular-nums">0.86s p50</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#121824] border border-white/[0.07]">
                          <span className="block text-[10px] font-mono text-zinc-400 uppercase">Location</span>
                          <span className="text-lg font-bold text-zinc-200 font-mono">Bangalore</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          onClick={() => jumpToChapter(1)}
                          className="tactile-btn px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                        >
                          <span>Explore Vexaro AI Engine</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setLorModalOpen(true);
                            verifyLorId("LOR-VTR-2024-AI01");
                          }}
                          className="tactile-btn px-5 py-2.5 rounded-xl bg-[#121824] hover:bg-[#1A2234] border border-white/[0.08] text-zinc-200 font-medium text-xs transition flex items-center gap-2"
                        >
                          <Award className="w-4 h-4 text-cyan-400" />
                          <span>Verify LOR &amp; Credentials</span>
                        </button>
                      </div>
                    </div>

                    {/* Portrait Frame with Obsidian Rim */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-white/[0.09] shadow-[0_15px_40px_rgba(0,0,0,0.9)] bg-[#121824]">
                        <img
                          src={portraitSrc}
                          onError={handlePortraitError}
                          alt={SITE_CONFIG.name}
                          className="w-full h-full object-cover object-top filter contrast-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1018] via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-[#0C1018]/80 border border-white/[0.08] backdrop-blur-md flex items-center justify-between">
                          <span className="font-mono text-[11px] text-zinc-300">Bangalore, IN</span>
                          <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Active On-Duty
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* CHAPTER 2: VEXARO AI MULTI-AGENT OPERATING SYSTEM             */}
                {/* ------------------------------------------------------------- */}
                {activeChapter === 1 && (
                  <motion.div
                    key="chap-1"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs font-mono mb-1.5">
                          <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                          <span>FLAGSHIP OPERATING SYSTEM · 101 AUTOMATED GATES</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                          Vexaro AI — Evidence-Grounded Multi-Agent Engine
                        </h2>
                      </div>

                      <a
                        href="https://vexaro-app.web.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="tactile-btn px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
                      >
                        <span>Open Live Platform</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                      {/* Left: Key Metrics & 6 Core Agents */}
                      <div className="lg:col-span-6 space-y-3">
                        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                          Enterprise multi-agent OS deploying 9 specialized autonomous agents with mathematical
                          reasoning loops, 101 pass-fail verification gates, and sub-second (0.86s p50) Tenglish voice telephony.
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { title: "Outreach SDR Agent", desc: "Autonomous B2B buying signals & outbound qualification" },
                            { title: "Tenglish Voice OS", desc: "LiveKit + Sarvam streaming telephony (0.86s p50)" },
                            { title: "Meetlyzer Rooms", desc: "Isolated meeting workspace & 50+ live participant rooms" },
                            { title: "Hirifir Career Ops", desc: "Automated candidate sourcing & multi-agent vetting" },
                            { title: "Veylithra Ecosystem", desc: "Collaborative agent orchestration & LangGraph DAGs" },
                            { title: "DPDP & TRAI Guard", desc: "Verhoeff Aadhaar + Luhn PII redaction & 09:00-21:00 IST gate" },
                          ].map((ag, i) => (
                            <div key={i} className="p-2 rounded-xl bg-[#121824] border border-white/[0.07] space-y-0.5">
                              <span className="text-[11px] font-bold text-cyan-300 font-mono block">{ag.title}</span>
                              <span className="text-[10px] text-zinc-400 leading-tight block">{ag.desc}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono pt-1">
                          <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3 h-3" />
                            101 Automated Gates Passed (100% Green)
                          </span>
                          <span className="text-zinc-500 text-[11px]">Live on Google Firebase</span>
                        </div>
                      </div>

                      {/* Right: Live Platform UI Preview Frame */}
                      <div className="lg:col-span-6">
                        <a
                          href="https://vexaro-app.web.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="block group relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#121824] shadow-2xl hover:border-cyan-400/50 transition duration-300"
                        >
                          <div className="bg-[#0C1018] px-3.5 py-2 border-b border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-white font-medium">vexaro-app.web.app</span>
                            </div>
                            <span className="text-cyan-400 group-hover:underline flex items-center gap-1 text-[10px]">
                              <span>Live Platform</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>

                          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black/60">
                            <img
                              src="/images/platforms/vexaro-platform-hero.png"
                              alt="Vexaro AI Platform Cockpit"
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1018] via-transparent to-transparent opacity-50" />
                            <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/[0.1] text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
                              <Activity className="w-3 h-3 text-cyan-400" />
                              <span>0.86s p50 Telephony Voice Latency</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* CHAPTER 3: VTR'S AGENTIC COMPANY (90 SUBAGENTS)               */}
                {/* ------------------------------------------------------------- */}
                {activeChapter === 2 && (
                  <motion.div
                    key="chap-2"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono mb-1.5">
                          <Network className="w-3.5 h-3.5 text-violet-400" />
                          <span>90-AGENT ORCHESTRATION NETWORK · 300 MCP SKILLS</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                          VTR&apos;s Agentic Company — 8-Layer Swarm Architecture
                        </h2>
                      </div>

                      <a
                        href="https://github.com/viswatejam702-tech/vtr-humanoid-agentic-company"
                        target="_blank"
                        rel="noreferrer"
                        className="tactile-btn px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Inspect Swarm Repo</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                      <div className="lg:col-span-6 space-y-3">
                        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                          Enterprise autonomous operations network where 90 autonomous subagents divide and conquer
                          software engineering, SDR research, security audits, and data synthesis with zero-trust tenant isolation.
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { num: "01", name: "UI & Canvas", desc: "Tailwind, Framer & obsidian glass" },
                            { num: "02", name: "Orchestration", desc: "LangGraph DAG & multi-agent router" },
                            { num: "03", name: "Knowledge RAG", desc: "Dense MIPS & Cross-Encoder NLI" },
                            { num: "05", name: "Tools & MCP", desc: "300+ Model Context Protocol skills" },
                          ].map((layer, idx) => (
                            <div key={idx} className="p-2.5 rounded-xl bg-[#121824] border border-white/[0.07] space-y-0.5">
                              <span className="font-mono text-[9px] text-violet-400 font-bold block">LAYER {layer.num}</span>
                              <span className="text-[11px] font-bold text-white block">{layer.name}</span>
                              <span className="text-[10px] text-zinc-400 block">{layer.desc}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
                          <span className="text-violet-300 text-[11px]">OpenPipe ART / Unsloth GRPO Evaluation</span>
                          <span className="text-zinc-500 text-[11px]">90 Swarm Agents</span>
                        </div>
                      </div>

                      <div className="lg:col-span-6">
                        <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#121824] shadow-2xl">
                          <div className="bg-[#0C1018] px-3.5 py-2 border-b border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                            <span className="text-violet-300 font-medium">Multi-Agent Swarm Cockpit</span>
                            <span className="text-[10px] text-zinc-500">Autonomous DAG</span>
                          </div>
                          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black/60">
                            <img
                              src="/images/platforms/vexaro-agent-cockpit.png"
                              alt="Agent Swarm Cockpit"
                              className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1018] via-transparent to-transparent opacity-50" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* CHAPTER 4: SECTOR SOLVER & ML/DL LAB                          */}
                {/* ------------------------------------------------------------- */}
                {activeChapter === 3 && (
                  <motion.div
                    key="chap-3"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full space-y-5"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>ALGORITHMIC DOMAIN SOLVERS &amp; PYTORCH LABS</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                      Sector Solver &amp; Neural Benchmarks
                    </h2>

                    <p className="text-zinc-300 max-measure text-xs sm:text-sm leading-relaxed">
                      Quantitative optimization and high-accuracy deep learning benchmarks across meteorological forecasting,
                      maritime satellite computer vision, and kinematics motion estimation.
                    </p>

                    {/* 4 Core Lab Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {[
                        {
                          title: "Sector Solver Suite",
                          tag: "Combinatorial Optimization",
                          desc: "Combinatorial heuristic engine for sector-specific scheduling and asset routing bottlenecks.",
                          metric: "O(n log n) · <12ms Solve",
                          link: "https://github.com/viswatejam702-tech",
                        },
                        {
                          title: "Weather Forecasting (GBDT vs LSTM)",
                          tag: "Deep Learning Benchmark",
                          desc: "Gradient Boosting (R² = 0.930, MAE 1.53°C) vs Multi-Layer LSTM (R² = 0.914) over 10K records.",
                          metric: "R² = 0.930 · MAE 1.53°C",
                          link: "https://github.com/viswatejam702-tech/Weather-Prediction-with-ML-and-Dl",
                        },
                        {
                          title: "Maritime Classification CNN",
                          tag: "Computer Vision",
                          desc: "15-stage PyTorch maritime satellite vessel detection with residual feature extraction.",
                          metric: "15 Analytical Stages",
                          link: "https://github.com/viswatejam702-tech/game-of-dl-in-ships",
                        },
                        {
                          title: "Verified RAG Engine",
                          tag: "Evidence & NLI",
                          desc: "Dense MIPS retrieval + Cross-Encoder reranking + DeBERTa-v3 claim-level NLI verification.",
                          metric: "Lewis et al. Grounding",
                          link: "https://verified-rag.onrender.com",
                        },
                      ].map((lab, i) => (
                        <a
                          key={i}
                          href={lab.link}
                          target="_blank"
                          rel="noreferrer"
                          className="tactile-btn p-3.5 rounded-xl bg-[#121824] hover:bg-[#1A2234] border border-white/[0.08] hover:border-cyan-400/40 transition block space-y-1.5 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                              {lab.title}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition" />
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-snug">{lab.desc}</p>
                          <span className="inline-block text-[10px] font-mono font-medium text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 tabular-nums">
                            {lab.metric}
                          </span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Stage Footer: Chapter Scrubbing Bar */}
            <div className="border-t border-white/[0.07] pt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500 z-20">
              <span className="hidden sm:inline">Scroll scrub or click chapter pills above to morph stage</span>
              <span className="text-zinc-400 font-medium">Stage Viewport: Sticky 100vh · Dynamic Morph</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EMPIRICAL RESEARCH RESULTS & LIVE PLATFORMS SHOWCASE                   */}
      {/* ========================================================================= */}
      <section id="research-results" className="py-20 max-w-7xl mx-auto px-6 relative z-10 border-t border-white/[0.07]">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>EMPIRICAL RESEARCH RESULTS &amp; LIVE PLATFORMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Research-Based Platforms &amp; Verified Results
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-measure mx-auto leading-relaxed">
            Direct access to production systems, satellite neural networks, time-series forecasting benchmarks,
            and real interface results engineered by <strong>M. Viswa Teja Reddy</strong>.
          </p>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* PLATFORM 1: VEXARO AI — MULTI-AGENT OS HERO CARD                      */}
        {/* --------------------------------------------------------------------- */}
        <div className="glass-obsidian-card p-6 sm:p-10 rounded-3xl border border-blue-500/30 hover:border-cyan-400/50 transition duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-12 space-y-8 group">
          {/* Top Bar with Live Badges and Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">
                  FLAGSHIP LIVE PLATFORM · 101/101 AUTOMATED GATES PASSED
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Vexaro AI — Autonomous B2B Multi-Agent Operating System
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://vexaro-app.web.app/"
                target="_blank"
                rel="noreferrer"
                className="tactile-btn px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                <span>Launch Live Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2-Column Content: Telemetry & Results on Left, 4-Screenshot Grid on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Architecture, Agent Workforces & Verification Gates */}
            <div className="lg:col-span-5 space-y-5">
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Evidence-grounded enterprise multi-agent operating system coordinating 9 specialized autonomous agents.
                Features mathematical reasoning loops, complete Indian DPDP Act 2023 compliance gates, and sub-second
                (0.86s p50) Tenglish telephony voice calling.
              </p>

              {/* 4 Quantitative Telemetry Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#121824] border border-white/[0.08]">
                  <span className="block text-[10px] font-mono text-zinc-400 uppercase">Automated Gates</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono tabular-nums">101/101 Passed</span>
                  <span className="text-[10px] text-zinc-500 block pt-0.5">100% Automated Green</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#121824] border border-white/[0.08]">
                  <span className="block text-[10px] font-mono text-zinc-400 uppercase">Voice OS Latency</span>
                  <span className="text-lg font-bold text-cyan-400 font-mono tabular-nums">0.86s p50</span>
                  <span className="text-[10px] text-zinc-500 block pt-0.5">LiveKit + Sarvam Saaras</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#121824] border border-white/[0.08]">
                  <span className="block text-[10px] font-mono text-zinc-400 uppercase">Workforces</span>
                  <span className="text-lg font-bold text-violet-400 font-mono">9 Agents</span>
                  <span className="text-[10px] text-zinc-500 block pt-0.5">SDR, Meetlyzer, Hirifir</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#121824] border border-white/[0.08]">
                  <span className="block text-[10px] font-mono text-zinc-400 uppercase">Hosting</span>
                  <span className="text-lg font-bold text-zinc-200 font-mono">Firebase</span>
                  <span className="text-[10px] text-zinc-500 block pt-0.5">vexaro-app.web.app</span>
                </div>
              </div>

              {/* 5 Key Capabilities */}
              <div className="space-y-2 pt-1">
                {[
                  "Outreach SDR Agent: Real-time B2B buying signals & automated lead scoring",
                  "VoxCloser Telephony OS: 8kHz Silero VAD with sentence-level streaming TTS",
                  "Meetlyzer Rooms: Isolated video workspace supporting 50+ live participants",
                  "Hirifir Career Ops: Automated candidate sourcing & credential vetting pipeline",
                  "DPDP & TRAI Guard: Verhoeff Aadhaar + Luhn card PII redaction & 09:00-21:00 gate",
                ].map((cap, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://vexaro-app.web.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="tactile-btn px-4 py-2 rounded-xl bg-[#121824] hover:bg-[#1A2234] border border-white/[0.09] text-zinc-200 text-xs font-mono flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>vexaro-app.web.app</span>
                </a>
                <button
                  onClick={() => speakResponse("Vexaro AI is Viswa's flagship platform with 9 specialized agents and 101 automated evaluation gates.")}
                  className="tactile-btn px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-2"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Listen to Overview</span>
                </button>
              </div>
            </div>

            {/* Right Column: 4 Real Platform Screenshots Grid */}
            <div className="lg:col-span-7 space-y-3">
              {/* Primary Large Screenshot: Vexaro Platform Hero Cockpit */}
              <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#121824] shadow-2xl relative group/img">
                <div className="bg-[#0C1018] px-4 py-2 border-b border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-zinc-200 font-semibold">Vexaro AI — Production System Cockpit</span>
                  </div>
                  <span className="text-cyan-400 text-[10px]">Live Web App</span>
                </div>
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-black/60">
                  <img
                    src="/images/platforms/vexaro-platform-hero.png"
                    alt="Vexaro AI Live Platform Cockpit"
                    className="w-full h-full object-cover object-top group-hover/img:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1018]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/[0.1] text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Real-time B2B Buying Signals &amp; Multi-Agent Cockpit</span>
                  </div>
                </div>
              </div>

              {/* 3 Supporting Platform Screenshots: Voice Calling OS, SDR Radar & Deliverability */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#121824] group/sub">
                  <div className="p-1.5 bg-[#0C1018] text-[10px] font-mono text-zinc-400 border-b border-white/[0.06] flex items-center justify-between">
                    <span>VoxCloser Voice OS</span>
                    <span className="text-emerald-400">0.86s</span>
                  </div>
                  <div className="relative h-28 w-full overflow-hidden bg-black/40">
                    <img
                      src="/images/platforms/voxcloser-voice-live.png"
                      alt="VoxCloser Voice Calling OS"
                      className="w-full h-full object-cover object-top group-hover/sub:scale-105 transition duration-300"
                    />
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#121824] group/sub">
                  <div className="p-1.5 bg-[#0C1018] text-[10px] font-mono text-zinc-400 border-b border-white/[0.06] flex items-center justify-between">
                    <span>AI SDR Radar</span>
                    <span className="text-cyan-400">Signals</span>
                  </div>
                  <div className="relative h-28 w-full overflow-hidden bg-black/40">
                    <img
                      src="/images/platforms/vexaro-sdr-radar.png"
                      alt="AI SDR Workflow Radar"
                      className="w-full h-full object-cover object-top group-hover/sub:scale-105 transition duration-300"
                    />
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#121824] group/sub">
                  <div className="p-1.5 bg-[#0C1018] text-[10px] font-mono text-zinc-400 border-b border-white/[0.06] flex items-center justify-between">
                    <span>Deliverability Shield</span>
                    <span className="text-emerald-400">100% Health</span>
                  </div>
                  <div className="relative h-28 w-full overflow-hidden bg-black/40">
                    <img
                      src="/images/platforms/vexaro-deliverability-shield.png"
                      alt="Deliverability Health Shield"
                      className="w-full h-full object-cover object-top group-hover/sub:scale-105 transition duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* RESEARCH PROJECTS & BENCHMARKS: 3-COLUMN RESEARCH RESULTS GRID        */}
        {/* --------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Research Result 1: Verified RAG */}
          <div className="glass-obsidian-card p-6 rounded-2xl flex flex-col justify-between space-y-5 border border-white/[0.08] hover:border-cyan-400/40 transition duration-300 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  NEURIPS 2020 GROUNDING · LIVE ON RENDER
                </span>
                <a
                  href="https://verified-rag.onrender.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 group-hover:text-cyan-400 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                Verified RAG — Zero Hallucination NLI Engine
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Production retrieval-augmented generation engine based on Lewis et al. (2020). Combines dense MIPS
                vector search with BM25 sparse hybrid retrieval via Reciprocal Rank Fusion, MS-MARCO joint-attention
                Cross-Encoder reranking, and DeBERTa-v3 Natural Language Inference to eliminate hallucinations.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/[0.07]">
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 rounded bg-[#121824] text-zinc-300">
                  <span className="text-zinc-500 block">Reranker Model</span>
                  <span className="text-cyan-400 font-bold">MS-MARCO Cross-Encoder</span>
                </div>
                <div className="p-2 rounded bg-[#121824] text-zinc-300">
                  <span className="text-zinc-500 block">NLI Verifier</span>
                  <span className="text-emerald-400 font-bold">DeBERTa-v3 Claims</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-zinc-400">Framework: Lewis et al.</span>
                <a
                  href="https://verified-rag.onrender.com"
                  target="_blank"
                  rel="noreferrer"
                  className="tactile-btn text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <span>Open Live Platform</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Research Result 2: Meteorological Forecasting Benchmark */}
          <div className="glass-obsidian-card p-6 rounded-2xl flex flex-col justify-between space-y-5 border border-white/[0.08] hover:border-cyan-400/40 transition duration-300 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300">
                  TIME-SERIES DL · 10,000+ RECORDS
                </span>
                <a
                  href="https://github.com/viswatejam702-tech/Weather-Prediction-with-ML-and-Dl"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 group-hover:text-cyan-400 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                Weather Prediction — GBDT vs Bidirectional LSTM
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Empirical comparative evaluation of non-linear Gradient Boosted Decision Trees against multi-layer
                Bidirectional LSTMs over 10,000+ hourly meteorological telemetry records. Utilizes cyclical trigonometric
                transforms (sine/cosine of day/year) and rolling lag statistics.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/[0.07]">
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 rounded bg-[#121824] text-zinc-300">
                  <span className="text-zinc-500 block">GBDT Accuracy</span>
                  <span className="text-emerald-400 font-bold tabular-nums">R² = 0.930 (MAE 1.53°C)</span>
                </div>
                <div className="p-2 rounded bg-[#121824] text-zinc-300">
                  <span className="text-zinc-500 block">Bi-LSTM Accuracy</span>
                  <span className="text-cyan-400 font-bold tabular-nums">R² = 0.914 (MAE 1.72°C)</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-zinc-400">Dataset: 10K Telemetry</span>
                <a
                  href="https://github.com/viswatejam702-tech/Weather-Prediction-with-ML-and-Dl"
                  target="_blank"
                  rel="noreferrer"
                  className="tactile-btn text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <span>Inspect GitHub Repo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Research Result 3: Maritime Satellite Classification CNN */}
          <div className="glass-obsidian-card p-6 rounded-2xl flex flex-col justify-between space-y-5 border border-white/[0.08] hover:border-cyan-400/40 transition duration-300 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">
                  PYTORCH SATELLITE COMPUTER VISION
                </span>
                <a
                  href="https://github.com/viswatejam702-tech/game-of-dl-in-ships"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 group-hover:text-cyan-400 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                Maritime Vessel Classification — 15-Stage PyTorch CNN
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed">
                15-stage computer vision deep learning pipeline for multi-class maritime vessel identification in satellite
                imagery. Integrates deep residual connections with adaptive pooling layers to extract robust features under
                severe ocean wave clutter and illumination variance.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/[0.07]">
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 rounded bg-[#121824] text-zinc-300">
                  <span className="text-zinc-500 block">Architecture</span>
                  <span className="text-violet-400 font-bold">15-Stage Residual CNN</span>
                </div>
                <div className="p-2 rounded bg-[#121824] text-zinc-300">
                  <span className="text-zinc-500 block">Framework</span>
                  <span className="text-cyan-400 font-bold">PyTorch + Transfer Learning</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-zinc-400">Domain: Satellite Vision</span>
                <a
                  href="https://github.com/viswatejam702-tech/game-of-dl-in-ships"
                  target="_blank"
                  rel="noreferrer"
                  className="tactile-btn text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <span>Inspect PyTorch Repo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* PLATFORM 2: 90-AGENT SWARM & SAFETY HARNESS (2-COLUMN CARDS)          */}
        {/* --------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: VTR's Agentic Company */}
          <div className="glass-obsidian-card p-6 sm:p-8 rounded-2xl border border-white/[0.08] hover:border-violet-500/40 transition duration-300 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">
                  8-LAYER MULTI-AGENT SWARM
                </span>
                <h3 className="text-xl font-bold text-white pt-2">
                  VTR&apos;s Agentic Company — 90 Autonomous Subagents
                </h3>
              </div>
              <a
                href="https://github.com/viswatejam702-tech/vtr-humanoid-agentic-company"
                target="_blank"
                rel="noreferrer"
                className="tactile-btn px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repo</span>
              </a>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Coordinated multi-agent workforce dividing SDR lead qualification, full-stack code synthesis, security auditing,
              and synthetic data generation across an 8-layer architecture with 300+ Model Context Protocol (MCP) skills.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#121824]">
                <div className="p-1.5 bg-[#0C1018] text-[10px] font-mono text-zinc-400 border-b border-white/[0.06]">
                  Agent Swarm Cockpit
                </div>
                <img
                  src="/images/platforms/vexaro-agent-cockpit.png"
                  alt="Agent Swarm Cockpit"
                  className="w-full h-24 object-cover object-top"
                />
              </div>

              <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#121824]">
                <div className="p-1.5 bg-[#0C1018] text-[10px] font-mono text-zinc-400 border-b border-white/[0.06]">
                  Hirifir Career Ops
                </div>
                <img
                  src="/images/platforms/hirifir-career-ops.png"
                  alt="Hirifir Career Ops"
                  className="w-full h-24 object-cover object-top"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/[0.07]">
              <span className="text-violet-300">300+ Live MCP Tools Orchestrated</span>
              <span className="text-zinc-500">Zero-Trust Tenant Isolation</span>
            </div>
          </div>

          {/* Card 2: Aegis Safety Harness & VastCare Clinical LLM */}
          <div className="glass-obsidian-card p-6 sm:p-8 rounded-2xl border border-white/[0.08] hover:border-cyan-400/40 transition duration-300 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-cyan-300">
                  ADVERSARIAL EVALUATION &amp; HEALTHCARE LLM
                </span>
                <h3 className="text-xl font-bold text-white pt-2">
                  Aegis Safety Harness &amp; VastCare Clinical AI
                </h3>
              </div>
              <a
                href="https://llm-eval-harness.onrender.com"
                target="_blank"
                rel="noreferrer"
                className="tactile-btn px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono flex items-center gap-1"
              >
                <span>Live Suite</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Frontier safety evaluation harness testing production LLMs across 1,000+ jailbreak and prompt-injection vectors,
              paired with VastCare Vernacular LLM—a regional multilingual clinical model fine-tuned for healthcare triage.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#121824] border border-white/[0.08] space-y-1">
                <span className="text-zinc-400 text-[10px] uppercase block">Aegis Vectors</span>
                <span className="text-cyan-400 font-bold block tabular-nums">1,000+ Vectors</span>
                <span className="text-zinc-500 text-[10px] block">Jailbreak &amp; Injection Evals</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#121824] border border-white/[0.08] space-y-1">
                <span className="text-zinc-400 text-[10px] uppercase block">Clinical Languages</span>
                <span className="text-emerald-400 font-bold block">Telugu + English</span>
                <span className="text-zinc-500 text-[10px] block">Regional Indian Triage</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2 border-t border-white/[0.07]">
              <a
                href="https://llm-eval-harness.onrender.com"
                target="_blank"
                rel="noreferrer"
                className="tactile-btn px-3.5 py-1.5 rounded-lg bg-[#121824] hover:bg-[#1A2234] border border-white/[0.08] text-xs font-mono text-zinc-200 flex items-center gap-1.5"
              >
                <span>Aegis Harness Live</span>
                <ArrowUpRight className="w-3 h-3 text-cyan-400" />
              </a>
              <a
                href="https://vastcare-vernacular-llm.onrender.com"
                target="_blank"
                rel="noreferrer"
                className="tactile-btn px-3.5 py-1.5 rounded-lg bg-[#121824] hover:bg-[#1A2234] border border-white/[0.08] text-xs font-mono text-zinc-200 flex items-center gap-1.5"
              >
                <span>VastCare LLM Live</span>
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TECHNICAL MASTERY & SKILLS                                             */}
      {/* ========================================================================= */}
      <section id="skills" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-white/[0.07]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>CORE ARCHITECTURAL MASTERY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Calibrated Engineering Competencies
            </h2>

            <p className="text-zinc-400 max-measure text-sm sm:text-base leading-relaxed">
              Synthesizing rigorous machine learning theory with production execution: multi-agent state machines,
              real-time telephony VAD, and claim-level NLI verification.
            </p>

            {/* Education Box */}
            <div className="p-5 rounded-2xl bg-[#0C1018] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <GraduationCap className="w-4 h-4" />
                <span>Formal Background</span>
              </div>
              <p className="text-sm font-semibold text-white">
                B.Tech in Computer Science Engineering
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Specialized in deep learning architectures, time-series forecasting, and autonomous multi-agent systems.
              </p>
            </div>
          </div>

          {/* Animated Skills Progress Bars */}
          <div className="lg:col-span-7 space-y-4 p-6 sm:p-8 rounded-2xl bg-[#0C1018] border border-white/[0.08] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs font-mono">
                <Sparkles className="w-4 h-4" />
                <span>BENCHMARKED PROFICIENCY</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">VERIFIED %</span>
            </div>

            <div className="space-y-4">
              {SKILLS.map((sk, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-zinc-200 font-medium">{sk.name}</span>
                    <span className="text-cyan-400 font-mono font-bold tabular-nums">{sk.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#121824] rounded-full overflow-hidden border border-white/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${sk.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: idx * 0.08, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. REPOSITORY CATALOG (LIVE GITHUB FEED WITH SKELETON LOADERS)            */}
      {/* ========================================================================= */}
      <section id="projects-grid" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-white/[0.07]">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>PRODUCTION CODEBASE ARCHIVES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Curated Systems &amp; Live Repositories
          </h2>
          <p className="text-sm text-zinc-400">
            Real-time feed synchronized with{" "}
            <a
              href={`https://github.com/${SITE_CONFIG.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline font-mono"
            >
              @{SITE_CONFIG.githubUsername}
            </a>
            . Any pushed repository appears here automatically.
          </p>

          {/* Search + Category Tabs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter repositories..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0C1018] border border-white/[0.08] text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {["All", "Autonomous Systems", "Algorithms & Optimization", "Deep Learning & ML", "Live GitHub Feed"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className={`tactile-btn px-3.5 py-2 rounded-xl text-xs font-mono transition ${
                      activeCategory === tab
                        ? "bg-blue-600 text-white font-semibold shadow-[0_0_15px_rgba(59,130,246,0.35)]"
                        : "bg-[#0C1018] text-zinc-400 hover:text-white border border-white/[0.08]"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Live Loading Skeleton */}
        {repoLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((sk) => (
              <div key={sk} className="h-64 rounded-2xl bg-[#0C1018] border border-white/[0.06] p-6 space-y-4 animate-pulse">
                <div className="h-4 w-28 bg-[#121824] rounded" />
                <div className="h-6 w-3/4 bg-[#121824] rounded" />
                <div className="h-16 w-full bg-[#121824] rounded" />
                <div className="h-4 w-1/2 bg-[#121824] rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Inline Error Notice */}
        {repoError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center justify-between max-w-xl mx-auto my-4">
            <span>Notice: {repoError}. Displaying curated production systems.</span>
            <button
              onClick={fetchGithubRepos}
              className="tactile-btn px-3 py-1 rounded-md bg-red-500/20 hover:bg-red-500/30 text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Repositories Grid */}
        {!repoLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="tactile-btn glass-obsidian-card p-6 rounded-2xl flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/[0.08] bg-[#121824] text-cyan-300">
                      {project.badge}
                    </span>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition" />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                    {project.name}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/[0.07]">
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      {project.metrics.slice(0, 2).map((m: any, i: number) => (
                        <div key={i} className="p-1.5 rounded bg-[#121824] text-zinc-300">
                          <span className="text-zinc-500 block">{m.label}</span>
                          <span className="text-cyan-400 font-bold tabular-nums">{m.val}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span className="text-blue-400">{project.language}</span>
                    <span className="flex items-center gap-1 text-zinc-300 group-hover:text-cyan-400 transition">
                      <Github className="w-3.5 h-3.5" />
                      <span>Inspect Code</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 4. CONNECT & COLLABORATE FOOTER SECTION                                   */}
      {/* ========================================================================= */}
      <section id="contact" className="py-24 bg-[#0A0D14] border-t border-white/[0.07] pb-36 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>DIRECT CHANNELS &amp; RECRUITING</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Connect &amp; Collaborate
          </h2>

          <p className="text-zinc-400 max-measure mx-auto text-sm sm:text-base leading-relaxed">
            Discussing <strong>Vexaro AI</strong> systems, AI Research Engineer roles, or autonomous multi-agent
            engineering? Reach out directly via WhatsApp, Instagram, or the verified concierge drawer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-[#0C1018] border border-white/[0.08] flex flex-col items-center gap-2 shadow">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-xs text-white">Location</span>
              <span className="text-xs text-zinc-400 font-mono">{SITE_CONFIG.location}</span>
            </div>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="tactile-btn p-5 rounded-2xl bg-[#0C1018] border border-white/[0.08] hover:border-cyan-400/40 transition flex flex-col items-center gap-2 shadow"
            >
              <Mail className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-xs text-white">Email</span>
              <span className="text-xs text-zinc-400 font-mono">{SITE_CONFIG.email}</span>
            </a>

            <a
              href={`https://instagram.com/${SITE_CONFIG.instagramHandle}`}
              target="_blank"
              rel="noreferrer"
              className="tactile-btn p-5 rounded-2xl bg-[#0C1018] border border-white/[0.08] hover:border-cyan-400/40 transition flex flex-col items-center gap-2 shadow"
            >
              <Instagram className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-xs text-white">Instagram</span>
              <span className="text-xs text-zinc-400 font-mono">@{SITE_CONFIG.instagramHandle}</span>
            </a>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Viswa!%20Connecting%20from%20VTR369%20portfolio.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => triggerConfetti()}
              className="tactile-btn px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-[0_0_25px_rgba(59,130,246,0.35)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on Official WhatsApp</span>
            </a>

            <button
              onClick={() => {
                triggerConfetti();
                setChatOpen(true);
              }}
              className="tactile-btn px-7 py-3.5 rounded-full bg-[#0C1018] hover:bg-[#121824] border border-white/[0.1] text-white font-medium text-xs sm:text-sm transition flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Open Concierge Drawer</span>
            </button>
          </div>

          {/* Social Links Bar */}
          <div className="flex justify-center gap-6 pt-4 text-zinc-400">
            <a href={`https://github.com/${SITE_CONFIG.githubUsername}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
              <Github className="w-5 h-5" />
            </a>
            <a href={SITE_CONFIG.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={SITE_CONFIG.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href={`https://instagram.com/${SITE_CONFIG.instagramAltHandle}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition font-mono text-xs pt-0.5">
              @{SITE_CONFIG.instagramAltHandle}
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. POLISHED AUTOPILOT COMMAND BAR (VOICE + TEXT)                          */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 inset-x-0 z-50 px-4 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
          className="pointer-events-auto w-full max-w-2xl rounded-2xl glass-obsidian p-3 space-y-2 border border-white/[0.09]"
        >
          <div className="flex items-center justify-between px-2 text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                VTR369 AUTOPILOT
              </span>
              {isListening && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  <span className="w-1 bg-cyan-400 rounded-full animate-wave-1" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-wave-2" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-wave-3" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-wave-4" />
                  <span className="text-[10px] text-cyan-300 font-mono ml-1">Live Wave</span>
                </div>
              )}
              {isPlayingAudio && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 animate-pulse">
                  <Radio className="w-3 h-3" />
                  <span>ElevenLabs Active</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="truncate max-w-xs text-zinc-300 font-medium hidden sm:inline">
                {autopilotStatus}
              </span>
              <button
                onClick={() => {
                  setLorModalOpen(true);
                  verifyLorId("LOR-VTR-2024-AI01");
                }}
                className="tactile-btn text-zinc-400 hover:text-cyan-400 transition flex items-center gap-1 text-[10px] font-mono border border-white/[0.08] px-2 py-0.5 rounded bg-[#121824]"
                title="Verify LOR"
              >
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span>LOR</span>
              </button>
              <button
                onClick={() => setSettingsModalOpen(true)}
                className="tactile-btn text-zinc-400 hover:text-cyan-400 transition flex items-center gap-1 text-[10px] font-mono border border-white/[0.08] px-2 py-0.5 rounded bg-[#121824]"
                title="API Settings"
              >
                <Sliders className="w-3 h-3 text-cyan-400" />
                <span>APIs</span>
              </button>
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="tactile-btn text-zinc-400 hover:text-white transition p-1"
                title="Toggle Voice"
              >
                {voiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-600" />}
              </button>
            </div>
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
              className={`tactile-btn p-2.5 rounded-xl transition flex items-center justify-center ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-blue-600/20 text-cyan-400 hover:bg-blue-600/30 border border-cyan-500/30"
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
              placeholder="Speak or type: 'Vexaro AI', 'Sector Solver', 'Agentic Co', 'Verify LOR', 'WhatsApp' (Press '/' or Cmd+K)..."
              className="flex-1 bg-black/50 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 font-mono transition"
            />

            <button
              type="submit"
              className="tactile-btn px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <span>Run</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 6. INSTANT ON-SITE CHAT DRAWER                                            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed bottom-28 right-6 z-50 w-80 sm:w-96 rounded-2xl bg-[#0C1018] border border-cyan-500/40 shadow-2xl overflow-hidden backdrop-blur-2xl"
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-between font-bold text-xs font-mono">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <span>Concierge — M. Viswa Teja Reddy</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-black/10 rounded transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3 text-xs font-sans">
              {chatMessages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === "user" ? "bg-blue-600 text-white ml-auto font-medium" : "bg-[#121824] text-zinc-200 border border-white/[0.06]"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {chatLoading && (
                <div className="p-3 rounded-xl max-w-[85%] bg-[#121824] text-cyan-400 flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Synthesizing response...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleChatSend} className="p-3 border-t border-white/[0.08] space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Message Viswa..."
                  className="flex-1 bg-black/60 border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 transition"
                />
                <button
                  type="submit"
                  disabled={chatLoading}
                  className="tactile-btn px-3.5 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition disabled:opacity-50"
                >
                  Send
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    chatInput || "Hi Viswa! Reaching out from VTR369 regarding Vexaro AI."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => triggerConfetti()}
                  className="tactile-btn text-center py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold hover:bg-emerald-500/30 transition flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`https://instagram.com/${SITE_CONFIG.instagramHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="tactile-btn text-center py-2 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-300 font-semibold hover:bg-violet-500/30 transition flex items-center justify-center gap-1"
                >
                  <Instagram className="w-3 h-3" />
                  <span>Instagram</span>
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 7. CRYPTOGRAPHIC LOR & CREDENTIAL PROOF MODAL                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl bg-[#0C1018] border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span>Cryptographic LOR &amp; Credential Registry</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        LIVE API
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      Endpoint: /api/verify-lor · SHA-256 Tamper-Proof
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setLorModalOpen(false)}
                  className="tactile-btn p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider block">
                    Verify Credential ID:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={lorInputId}
                      onChange={(e) => setLorInputId(e.target.value)}
                      placeholder="e.g. LOR-VTR-2024-AI01"
                      className="flex-1 bg-black/60 border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 font-mono uppercase"
                    />
                    <button
                      onClick={() => verifyLorId(lorInputId)}
                      disabled={lorLoading}
                      className="tactile-btn px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition disabled:opacity-50 font-mono flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>{lorLoading ? "Verifying..." : "Verify"}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                    {[
                      { id: "LOR-VTR-2024-AI01", label: "Academic AI LOR" },
                      { id: "LOR-VTR-2024-SYS02", label: "Vexaro AI Endorsement" },
                      { id: "LOR-VTR-2025-QUANT369", label: "Quantum Foundations" },
                      { id: "LOR-VTR-2025-DP04", label: "Verified RAG & DP" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => verifyLorId(item.id)}
                        className={`tactile-btn px-3 py-1 rounded-full border transition flex items-center gap-1.5 ${
                          lorInputId === item.id
                            ? "bg-blue-600 text-white border-cyan-400 font-semibold shadow"
                            : "bg-[#121824] text-zinc-300 border-white/[0.08] hover:border-cyan-400/40"
                        }`}
                      >
                        <span>{item.id}</span>
                        <span className="text-[9px] opacity-70 hidden sm:inline">({item.label})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {lorData && !lorData.error ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-[#07090E] border border-emerald-500/40 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                          {lorData.status}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">{lorData.issueDate}</span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white">{lorData.title}</h4>
                      <p className="text-xs text-cyan-400 font-mono mt-0.5">Candidate: {lorData.candidate}</p>
                      <p className="text-xs text-zinc-400 mt-1">
                        Issuer: <strong>{lorData.issuer}</strong> ({lorData.role} · {lorData.organization})
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300 leading-relaxed italic">
                      &ldquo;{lorData.endorsement}&rdquo;
                    </div>

                    {lorData.verifiedCompetencies && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                          Verified Technical Competencies:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {lorData.verifiedCompetencies.map((comp: string, i: number) => (
                            <span key={i} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#121824] border border-white/[0.08] text-zinc-200">
                              ✓ {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-[#0C1018] border border-white/[0.08] space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span>SHA-256 Cryptographic Verification Fingerprint:</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(lorData.verificationHash || "");
                            setCopiedHash(true);
                            setTimeout(() => setCopiedHash(false), 2000);
                          }}
                          className="text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedHash ? "Copied" : "Copy Proof"}</span>
                        </button>
                      </div>
                      <p className="font-mono text-[11px] text-emerald-400 break-all select-all">
                        {lorData.verificationHash}
                      </p>
                    </div>
                  </motion.div>
                ) : lorData?.error ? (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                    ⚠️ {lorData.error}
                  </div>
                ) : null}
              </div>

              <div className="p-4 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono text-[11px]">VTR369 Credential Verification Engine</span>
                <button
                  onClick={() => setLorModalOpen(false)}
                  className="tactile-btn px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 8. API SETTINGS MODAL (ELEVENLABS & GEMINI)                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {settingsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-[#0C1018] border border-cyan-500/40 shadow-2xl overflow-hidden p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">Live API Gateway Settings</h3>
                </div>
                <button
                  onClick={() => setSettingsModalOpen(false)}
                  className="tactile-btn p-1.5 text-zinc-400 hover:text-white rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-semibold block flex items-center justify-between">
                    <span>ElevenLabs Voice API Key:</span>
                    <span className="text-[10px] text-cyan-400">xi-...</span>
                  </label>
                  <input
                    type="password"
                    value={elevenLabsApiKey}
                    onChange={(e) => setElevenLabsApiKey(e.target.value)}
                    placeholder="Enter ElevenLabs API Key"
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-semibold block">ElevenLabs Studio Voice:</label>
                  <select
                    value={elevenLabsVoiceId}
                    onChange={(e) => setElevenLabsVoiceId(e.target.value)}
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    <option value="JBFqnCBsd6RMkjVDRZzb">George — Warm Storyteller (Studio Default)</option>
                    <option value="EXAVITQu4vr4xnSDxMaL">Sarah — Reassuring &amp; Confident</option>
                    <option value="CwhRBWXzGAHq8TQ4Fs17">Roger — Laid-Back &amp; Resonant</option>
                    <option value="Xb7hH8MSUJpSbSDYk0k2">Alice — Clear &amp; Engaging</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-semibold block flex items-center justify-between">
                    <span>Google Gemini API Key:</span>
                    <span className="text-[10px] text-cyan-400">AIza...</span>
                  </label>
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="Enter free Gemini API Key"
                    className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => speakResponse("Testing ElevenLabs studio voice output.")}
                  className="tactile-btn px-4 py-2 rounded-xl border border-white/[0.1] hover:border-cyan-400/50 text-zinc-300 hover:text-white transition font-mono text-xs flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Test Audio</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSettingsModalOpen(false)}
                    className="tactile-btn px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        localStorage.setItem("vtr_elevenlabs_key", elevenLabsApiKey);
                        localStorage.setItem("vtr_elevenlabs_voice", elevenLabsVoiceId);
                        localStorage.setItem("vtr_gemini_key", geminiApiKey);
                      }
                      setSettingsModalOpen(false);
                      triggerConfetti();
                      speakResponse("Settings saved. ElevenLabs Studio Voice active.");
                    }}
                    className="tactile-btn px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow"
                  >
                    Save &amp; Activate
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
