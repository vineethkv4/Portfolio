"use client";

import { useEffect } from "react";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { CornerLabels } from "@/components/sections/CornerLabels";
import { Hero } from "@/components/sections/Hero";
import { NavBand } from "@/components/sections/NavBand";
import { InfoStrip } from "@/components/sections/InfoStrip";

export default function HomePage() {
  useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-[var(--bg)]">
      <HeroBackground />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <CornerLabels />
        <Hero />
        <NavBand />
        <InfoStrip />
      </div>
    </div>
  );
}
