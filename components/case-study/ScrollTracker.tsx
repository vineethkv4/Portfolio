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
};

export function ScrollTracker({ sections }: ScrollTrackerProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

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
  }, [sections]);

  return (
    <nav
      className="sticky top-24 hidden w-40 shrink-0 lg:block"
      aria-label="Case study sections"
    >
      <ol className="space-y-3 text-xs uppercase tracking-[0.2em]">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                "flex gap-3 transition-opacity",
                activeId === section.id
                  ? "opacity-100"
                  : "opacity-35 hover:opacity-70",
              )}
            >
              <span className="font-[family-name:var(--font-pixel)]">
                {section.number}
              </span>
              <span>{section.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
