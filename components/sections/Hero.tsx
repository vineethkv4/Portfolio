"use client";

import { motion } from "framer-motion";
import { usePageTransition } from "@/components/animation/TransitionProvider";
import { DesignationCycler } from "@/components/animation/DesignationCycler";
import { IllustratedCharacter } from "@/components/sections/IllustratedCharacter";

const ease = [0.2, 0.7, 0.2, 1] as const;

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

const DESIGNATIONS = [
  "UX\nEngineer",
  "Product\nDesigner",
  "UI/UX\nDesigner"
];

export function Hero() {
  const { revealHero } = usePageTransition();

  return (
    <section
      id="home"
      className="relative flex min-h-0 w-full flex-1 flex-col justify-center px-5 pt-10 sm:px-8 sm:pt-16"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col items-center gap-6 text-center min-[1000px]:flex-row min-[1000px]:items-center min-[1000px]:justify-center min-[1000px]:gap-x-12 min-[1000px]:text-left">
          <div className="flex flex-col items-center min-[1000px]:items-start">
            <motion.p
              className="mb-1 font-[family-name:var(--font-mono)] text-[11px] leading-none text-[var(--ink-soft)] sm:mb-2 sm:text-sm min-[1000px]:text-[clamp(14px,3.2vw,30px)]"
              variants={item}
              initial="hidden"
              animate={revealHero ? "show" : "hidden"}
            >
              Hi there! I&apos;m
            </motion.p>

            <motion.h1
              className="font-[family-name:var(--font-pixel)] text-[clamp(28px,8vw,160px)] font-normal leading-[0.98] tracking-[0.01em] text-[var(--ink-soft)]"
              variants={item}
              initial="hidden"
              animate={revealHero ? "show" : "hidden"}
            >
              <span className="block">Vineeth</span>
              <span className="block">Vijayan</span>
            </motion.h1>
          </div>

          <motion.div
            variants={item}
            initial="hidden"
            animate={revealHero ? "show" : "hidden"}
            className="mx-auto w-[min(52vw,300px)] shrink-0 min-[1000px]:mx-0 min-[1000px]:w-[min(30vw,400px)]"
          >
            <IllustratedCharacter />
          </motion.div>

          <motion.h2
            className="font-[family-name:var(--font-pixel)] text-[clamp(20px,6.2vw,130px)] font-normal leading-[0.98] tracking-[0.01em] whitespace-nowrap text-[var(--ink-soft)] min-[1000px]:text-left min-[1000px]:whitespace-normal min-[1000px]:text-[clamp(30px,7vw,130px)]"
            variants={item}
            initial="hidden"
            animate={revealHero ? "show" : "hidden"}
          >
            <DesignationCycler
              designations={DESIGNATIONS}
              intervalMs={2500}
            />
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

