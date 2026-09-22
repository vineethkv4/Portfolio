"use client";

import { motion } from "framer-motion";

type CurtainsProps = {
  /** When true, panels meet at center covering the viewport */
  closed: boolean;
  /** Preloader mode: panels start closed and open upward/downward */
  mode?: "transition" | "preloader";
  progress?: number;
  /** Hide the centered counter (used while curtains retract) */
  hideCount?: boolean;
};

const panelTransition = {
  duration: 1,
  ease: [0.76, 0, 0.24, 1] as const,
};

export function Curtains({
  closed,
  mode = "transition",
  progress = 0,
  hideCount = false,
}: CurtainsProps) {
  const isPreloader = mode === "preloader";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden"
      aria-hidden={!closed && !isPreloader}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-[50vh] bg-[var(--dark)]"
        initial={false}
        animate={{ y: closed ? "0%" : "-100%" }}
        transition={panelTransition}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[50vh] bg-[var(--dark)]"
        initial={false}
        animate={{ y: closed ? "0%" : "100%" }}
        transition={panelTransition}
      />

      {isPreloader && (
        <motion.div
          className="fixed inset-0 z-[10001] flex flex-col items-center justify-center gap-1.5"
          initial={false}
          animate={{ opacity: hideCount || !closed ? 0 : 1 }}
          transition={{ duration: 0.35 }}
        >
            <span className="font-[family-name:var(--font-pixel)] text-[clamp(48px,10vw,120px)] font-normal leading-none text-[var(--bg)]">
            {Math.min(100, Math.round(progress))}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[rgba(247,245,240,0.5)]">
            Loading portfolio
          </span>
        </motion.div>
      )}
    </div>
  );
}
