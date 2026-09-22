"use client";

import { ArrowLeft } from "lucide-react";
import { usePageTransition } from "@/components/animation/TransitionProvider";

export function ShowcaseBackButton() {
  const { navigate } = usePageTransition();

  return (
    <button
      type="button"
      onClick={() => navigate("/signal")}
      aria-label="Back to projects"
      className="fixed top-8 left-6 z-50 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/20 text-white/80 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white sm:top-12 sm:left-8"
    >
      <ArrowLeft className="size-4" strokeWidth={1.5} />
    </button>
  );
}
