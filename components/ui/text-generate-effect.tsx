"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.2,
  start,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
  /** When set, plays only after the parent section is reached. */
  start?: boolean;
}) => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true, margin: "-20% 0px -20% 0px" });
  const shouldPlay = start ?? inView;
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!shouldPlay) return;

    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(staggerDelay),
      },
    );
  }, [shouldPlay, animate, duration, filter, staggerDelay]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-current opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold leading-snug tracking-wide", className)}>
      {renderWords()}
    </div>
  );
};
