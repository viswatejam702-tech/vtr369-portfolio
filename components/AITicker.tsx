"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { seedTickerItems } from "@/lib/data";
import { getTickerItems } from "@/lib/storage";

export default function AITicker() {
  const [items, setItems] = useState<string[]>(seedTickerItems);

  useEffect(() => {
    setItems(getTickerItems(seedTickerItems));
  }, []);

  const loop = [...items, ...items];

  return (
    <div className="relative border-y border-line bg-panel py-2.5 overflow-hidden">
      <div className="flex items-center">
        <div className="flex items-center gap-2 pl-4 pr-4 shrink-0 z-10 bg-void/60 backdrop-blur-sm">
          <Radio className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span className="eyebrow whitespace-nowrap">AI Radar</span>
        </div>
        <div className="ticker-track">
          {loop.map((item, i) => (
            <span key={i} className="mx-6 font-mono text-sm text-muted whitespace-nowrap">
              {item}
              <span className="mx-6 text-line">/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
