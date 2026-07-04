"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { instagramEmbeds, socials } from "@/lib/data";
import { getContentItems } from "@/lib/storage";
import { SectionHeader } from "./Projects";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export default function SocialProof() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [extraPosts, setExtraPosts] = useState<ReturnType<typeof getContentItems>>([]);

  useEffect(() => {
    if (scriptLoaded && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [scriptLoaded]);

  useEffect(() => {
    try {
      setExtraPosts(getContentItems().filter((i) => i.category === "social_post"));
    } catch {}
  }, []);

  return (
    <section id="content" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto">
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />

      <SectionHeader
        eyebrow="Content portfolio"
        title="From the feed"
        sub={`A few real posts from @${socials.instagram.split("/").filter(Boolean).pop()} — proof this isn't just a resume.`}
      />

      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {instagramEmbeds.map((url) => (
          <div key={url} className="glass rounded-2xl overflow-hidden flex justify-center p-2">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{ margin: 0, width: "100%", minWidth: "270px" }}
            />
          </div>
        ))}
      </div>

      {extraPosts.length > 0 && (
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {extraPosts.map((p) => (
            <div key={p.id} className="glass glass-hover rounded-2xl p-5">
              {p.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl} alt={p.title} className="rounded-lg mb-3 w-full object-cover aspect-square" />
              )}
              <h4 className="font-display font-semibold mb-1">{p.title}</h4>
              <p className="text-sm text-muted">{p.description}</p>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-cyan text-sm mt-2 inline-block">
                  View →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
