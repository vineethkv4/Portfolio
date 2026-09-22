"use client";

import { motion } from "framer-motion";
import { usePageTransition } from "@/components/animation/TransitionProvider";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const },
  },
};

export function CornerLabels() {
  const { revealHero } = usePageTransition();

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-7 left-8 z-50 font-[family-name:var(--font-mono)] text-xs leading-[1.35] text-[var(--ink)]"
        variants={reveal}
        initial="hidden"
        animate={revealHero ? "show" : "hidden"}
      >
        DISPATCH
        <br />
        Vol.1 —
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-7 right-8 z-50 text-right font-[family-name:var(--font-mono)] text-xs leading-[1.35] text-[var(--ink)]"
        variants={reveal}
        initial="hidden"
        animate={revealHero ? "show" : "hidden"}
      >
        BLR
        
        - IN
      </motion.div>
    </>
  );
}
