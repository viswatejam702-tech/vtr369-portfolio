import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AITicker from "@/components/AITicker";
import Projects from "@/components/Projects";
import SaaS from "@/components/SaaS";
import ResearchPapers from "@/components/ResearchPapers";
import SocialProof from "@/components/SocialProof";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <AITicker />
      <Projects />
      <SaaS />
      <ResearchPapers />
      <SocialProof />
      <About />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}
