"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ShowcaseHeadingProps = {
  title: string;
  color: string;
  /** Left intro column — animation finishes when this becomes sticky (`top-8`). */
  endTrigger: HTMLElement | null;
};

export function ShowcaseHeading({ title, color, endTrigger }: ShowcaseHeadingProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      const wrapper = wrapperRef.current;
      if (!heading || !wrapper || !endTrigger) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.fromTo(
        heading,
        { x: 0, y: 0, opacity: 1 },
        {
          x: -70,
          y: 50,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            endTrigger,
            end: "top 2rem",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      ScrollTrigger.refresh();
    },
    { dependencies: [endTrigger], revertOnUpdate: true },
  );

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none sticky top-0 z-0 pt-24 pb-[100px] pt-[100px]"
    >
      <h1
        ref={headingRef}
        className="pl-6 font-[family-name:var(--font-display-serif)] text-[clamp(2.25rem,10vw,15rem)] font-medium leading-[0.82] tracking-[-0.04em] whitespace-nowrap sm:pl-16"
        style={{ color }}
      >
        {title}
      </h1>
    </div>
  );
}
