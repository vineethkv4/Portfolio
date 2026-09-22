"use client";

import { usePageTransition } from "@/components/animation/TransitionProvider";
import { cn } from "@/lib/utils";

type SectionTopBarProps = {
  theme?: "dark" | "light";
};

export function SectionTopBar({ theme = "dark" }: SectionTopBarProps) {
  const { navigate } = usePageTransition();
  const isLight = theme === "light";

  return (
    <header className="relative z-40 flex items-start justify-between px-6 py-6 sm:px-8">
      <div
        className={cn(
          "font-[family-name:var(--font-mono)] text-xs leading-[1.35]",
          isLight ? "text-gray-500" : "text-white/40",
        )}
      >
        DISPATCH
        <br />
        Vol.1 —
      </div>

      <button
        type="button"
        onClick={() => navigate("/")}
        className={cn(
          "font-[family-name:var(--font-pixel)] text-xl transition-opacity hover:opacity-80 md:text-3xl",
          isLight ? "text-black" : "text-white",
        )}
      >
        Vineeth Vijayan
      </button>

      <div
        className={cn(
          "text-right font-[family-name:var(--font-mono)] text-xs leading-[1.35]",
          isLight ? "text-gray-500" : "text-white/40",
        )}
      >
        BLR
        
        - IN
      </div>
    </header>
  );
}
