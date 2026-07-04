import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with real projects, no filler.
        </p>
        <p className="font-mono text-xs">
          vtr<span className="text-gold">.369</span> — designed &amp; engineered by Viswa Teja Reddy
        </p>
      </div>
    </footer>
  );
}
