"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePageTransition } from "@/components/animation/TransitionProvider";
import { SECTION_NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

type NavBandProps = {
  className?: string;
};

/** Home hero nav — no active highlight; ghost labels appear on hover only */
export function NavBand({ className }: NavBandProps) {
  const { revealHero, navigate } = usePageTransition();
  const [ghostText, setGhostText] = useState<string | null>(null);

  return (
    <motion.nav
      className={cn(
        "relative w-full shrink-0 overflow-hidden bg-[var(--dark)] px-3 sm:px-8",
        revealHero ? "py-2.5 sm:py-7" : "py-0",
        className,
      )}
      style={{
        backgroundImage: "url('/images/nav_bg.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      initial={false}
      animate={
        revealHero
          ? { maxHeight: 200 }
          : { maxHeight: 0 }
      }
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Primary"
      onMouseLeave={() => setGhostText(null)}
    >
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 flex h-[1.2em] w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity duration-700 delay-200",
          revealHero ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      >
        <AnimatePresence mode="wait" initial={false}>
          {ghostText && (
            <motion.span
              key={ghostText}
              className="whitespace-nowrap font-[family-name:var(--font-display-serif)] text-[clamp(48px,8vw,120px)] tracking-[0.02em] text-[rgba(247,245,240,0.1)] md:uppercase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {ghostText}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div
        className={cn(
          "relative z-[2] mx-auto flex w-full max-w-[1500px] flex-nowrap justify-between gap-1.5 transition-opacity duration-700 delay-200 sm:gap-6",
          revealHero ? "opacity-100" : "opacity-0",
        )}
      >
        {SECTION_NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            className="group cursor-pointer text-left font-[family-name:var(--font-display-serif)] uppercase text-white opacity-50 transition-opacity hover:opacity-100"
            onMouseEnter={() => setGhostText(item.ghost)}
            onClick={() => {
              setGhostText(null);
              // Curtain transition into section routes
              navigate(item.href);
            }}
          >
            <span className="mb-0.5 block text-[9px] sm:mb-1 sm:text-[13px]">
              {item.n}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-normal transition-[font-weight] group-hover:font-bold sm:gap-2 sm:text-[15px]">
              {item.label}
              <span
                className="hidden translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-[5px] group-hover:opacity-100 sm:inline-block"
                aria-hidden
              >
                →
              </span>
            </span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
