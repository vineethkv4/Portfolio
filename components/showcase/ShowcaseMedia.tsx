"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ShowcaseMediaProps = {
  src?: string;
  todo?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
};

export function ShowcaseMedia({
  src,
  todo,
  alt = "",
  className,
  imgClassName,
}: ShowcaseMediaProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("overflow-hidden bg-[#121018]", className)}
      initial={reduceMotion ? false : { clipPath: "inset(12% 0% 12% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1.05, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn("h-full w-full scale-100", imgClassName)}
          draggable={false}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-white/15 px-6 text-center">
          {/* TODO: drop in the real screenshot for this slot */}
          <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] text-signal-green uppercase">
            Placeholder
          </span>
          <span className="max-w-[28ch] font-[family-name:var(--font-mono)] text-[12px] leading-relaxed text-white/45">
            {todo ? `TODO: ${todo}` : "TODO: screenshot pending"}
          </span>
        </div>
      )}
    </motion.div>
  );
}
