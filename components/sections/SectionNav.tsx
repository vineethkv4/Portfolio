"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/components/animation/TransitionProvider";
import { SECTION_NAV, sectionFromPath } from "@/lib/nav";
import { cn } from "@/lib/utils";

type SectionNavProps = {
  className?: string;
};

/**
 * Shared section nav — active state from pathname.
 * Current page ghost stays hidden; hover other items to preview theirs.
 * New pages: add an entry to SECTION_NAV (incl. `ghost`) and use <SectionNav />.
 */
export function SectionNav({ className }: SectionNavProps) {
  const pathname = usePathname();
  const { navigate } = usePageTransition();
  const activeItem = sectionFromPath(pathname);
  const [hoveredGhost, setHoveredGhost] = useState<string | null>(null);

  return (
    <nav
      className={cn(
        "relative z-40 w-full overflow-hidden bg-[var(--dark)] px-3 py-1.5 sm:px-8 sm:py-2",
        className,
      )}
      style={{
        backgroundImage: "url('/images/nav_bg.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="Primary"
      onMouseLeave={() => setHoveredGhost(null)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
        aria-hidden
      >
        <AnimatePresence mode="wait">
          {hoveredGhost ? (
            <motion.span
              key={hoveredGhost}
              className="whitespace-nowrap font-[family-name:var(--font-display-serif)] text-[clamp(22px,4vw,62px)] uppercase tracking-[0.02em] text-[rgba(247,245,240,0.14)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {hoveredGhost}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="relative z-[2] mx-auto flex w-full max-w-[1500px] flex-nowrap justify-between gap-1.5 sm:gap-6">
        {SECTION_NAV.map((item) => {
          const isActive = item.id === activeItem.id;

          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                "group cursor-pointer text-left font-[family-name:var(--font-display-serif)] uppercase text-white transition-opacity",
                isActive ? "opacity-100" : "opacity-50 hover:opacity-100",
              )}
              onMouseEnter={() =>
                setHoveredGhost(isActive ? null : item.ghost)
              }
              onClick={() => {
                setHoveredGhost(null);
                navigate(item.href);
              }}
            >
              <span className="mb-0.5 block text-[9px] sm:mb-1 sm:text-[13px]">
                {item.n}
              </span>
              <span
                className={cn(
                  "flex items-center gap-1 text-[11px] transition-[font-weight] sm:gap-2 sm:text-[15px]",
                  isActive
                    ? "font-bold"
                    : "font-normal group-hover:font-bold",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "hidden transition-all duration-200 sm:inline-block",
                    isActive
                      ? "translate-x-[5px] opacity-100"
                      : "translate-x-0 opacity-0 group-hover:translate-x-[5px] group-hover:opacity-100",
                  )}
                  aria-hidden
                >
                  →
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
