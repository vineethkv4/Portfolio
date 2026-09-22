"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export type ScrollImage = {
  index: number;
  src: string;
  alt: string;
};

type ScrollImageSwapProps = {
  images: ScrollImage[];
};

/**
 * Crossfade matches Ascent company images: stacked opacity + scale, 0.7s easeOut.
 * Observer is desktop-only (lg+) so mobile stays on the first image.
 */
export function ScrollImageSwap({ images }: ScrollImageSwapProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    setReduceMotion(motionQuery.matches);

    const disconnect = () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };

    const observe = () => {
      disconnect();
      if (!desktopQuery.matches) {
        setActiveIndex(0);
        return;
      }

      const sections = document.querySelectorAll("[data-section-index]");
      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const idx = Number(entry.target.getAttribute("data-section-index"));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        },
        { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );

      sections.forEach((section) => observerRef.current?.observe(section));
    };

    observe();
    desktopQuery.addEventListener("change", observe);
    return () => {
      desktopQuery.removeEventListener("change", observe);
      disconnect();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {images.map((image) => (
        <motion.img
          key={image.index}
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={false}
          animate={{
            opacity: image.index === activeIndex ? 1 : 0,
            scale: reduceMotion || image.index === activeIndex ? 1 : 1.04,
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: "easeOut" }
          }
          draggable={false}
        />
      ))}
    </div>
  );
}
