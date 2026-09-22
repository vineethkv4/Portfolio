"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ShowcaseMediaProps = {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  parallax?: number;
};

export function ShowcaseMedia({
  src,
  alt = "",
  className,
  imgClassName,
  parallax = 48,
}: ShowcaseMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-parallax, parallax],
  );

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden bg-[#121018]", className)}
      initial={reduceMotion ? false : { clipPath: "inset(12% 0% 12% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1.05, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className={cn(
          "h-full w-full scale-100",
          imgClassName,
        )}
        draggable={false}
      />
    </motion.div>
  );
}
