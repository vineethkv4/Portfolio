"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TrackerSection = {
  id: string;
  number: string;
  label: string;
};

type ScrollTrackerProps = {
  sections: TrackerSection[];
  /** `labels` is a text rail: vertical on desktop, sticky horizontal bar on small screens. */
  variant?: "numbered" | "labels" | "echo";
};

export function ScrollTracker({
  sections,
  variant = "numbered",
}: ScrollTrackerProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const sectionKey = sections.map((section) => `${section.id}:${section.label}`).join("|");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    if (variant === "labels" || variant === "echo") {
      const visible = new Map<string, number>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visible.set(entry.target.id, entry.boundingClientRect.top);
            } else {
              visible.delete(entry.target.id);
            }
          }
          if (!visible.size) return;
          const line = window.innerHeight * 0.4;
          const tops = [...visible.entries()];
          const crossed = tops.filter(([, top]) => top <= line);
          const pool = crossed.length ? crossed : tops;
          pool.sort((a, b) => b[1] - a[1]);
          setActiveId(pool[0][0]);
        },
        { rootMargin: "-12% 0px -45% 0px", threshold: [0, 0.15, 0.4, 0.75] },
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionKey, sections, variant]);

  function scrollToSection(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    setActiveId(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  if (variant === "echo") {
    return (
      <nav className="rail" aria-label="Case study sections">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={activeId === section.id ? "true" : undefined}
            onClick={(event) => scrollToSection(event, section.id)}
          >
            {section.label}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        variant === "labels"
          ? "sticky top-20 z-30 -mx-6 mb-8 flex gap-6 overflow-x-auto border-b border-white/15 bg-[#050505]/95 px-6 py-3 backdrop-blur-sm lg:top-28 lg:mx-0 lg:mb-0 lg:block lg:w-full lg:overflow-visible lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
          : "sticky top-24 hidden w-40 shrink-0 lg:block",
      )}
      aria-label="Case study sections"
    >
      <ol
        className={cn(
          variant === "labels"
            ? "flex gap-6 lg:block lg:space-y-1"
            : "space-y-3 text-xs uppercase tracking-[0.2em]",
        )}
      >
        {sections.map((section) => {
          const active = activeId === section.id;
          return (
            <li key={section.id} className={variant === "labels" ? "shrink-0" : undefined}>
              <a
                href={`#${section.id}`}
                aria-current={active ? "true" : undefined}
                onClick={(event) => scrollToSection(event, section.id)}
                className={cn(
                  variant === "labels"
                    ? "block whitespace-nowrap font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em] uppercase transition-colors lg:py-1.5 lg:whitespace-normal"
                    : "flex gap-3 transition-opacity",
                  variant === "labels"
                    ? active
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                    : active
                      ? "opacity-100"
                      : "opacity-35 hover:opacity-70",
                )}
              >
                {variant === "numbered" ? (
                  <span className="font-[family-name:var(--font-pixel)]">
                    {section.number}
                  </span>
                ) : null}
                <span>{section.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
