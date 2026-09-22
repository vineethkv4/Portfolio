"use client";

import { useEffect, useRef, useState } from "react";
import { SectionTopBar } from "@/components/sections/SectionTopBar";
import { SectionNav } from "@/components/sections/SectionNav";
import { GlitchThumb } from "@/components/signal/GlitchThumb";
import { ProjectRow } from "@/components/signal/ProjectRow";
import type { VisibleSignalProject } from "@/lib/signal/content";
import { useSignalIdleLogout } from "@/hooks/use-signal-idle-logout";

const HOVER_DEBOUNCE_MS = 60;

type WorkListProps = {
  projects: VisibleSignalProject[];
};

export function WorkList({ projects }: WorkListProps) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const debounceRef = useRef<number | null>(null);
  useSignalIdleLogout();

  const displayed = activeProjectId
    ? (projects.find((project) => project.id === activeProjectId) ?? null)
    : null;

  function activate(id: string) {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setActiveProjectId(id);
    }, HOVER_DEBOUNCE_MS);
  }

  function deactivate() {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    setActiveProjectId(null);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="signal-grid-bg relative flex h-dvh w-full flex-col overflow-hidden text-white">
      <SectionTopBar theme="dark" />
      <SectionNav />

      <section className="relative min-h-0 w-full flex-1 overflow-hidden">
        {/* LAYER 0 — image as background, not a sibling column */}
        <div className="absolute inset-y-0 right-[20%] z-0 w-[30%] overflow-hidden">
          <GlitchThumb src={displayed?.image ?? null} />
        </div>

        {/* LAYER 1 + 2 — ghost above the list, no overlay */}
        <div className="relative z-10 flex h-full flex-col">
          <p
            className="shrink-0 pt-8 pb-4 font-[family-name:var(--font-pixel-grid)] text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] tracking-[0.04em] text-white/[0.20] lg:pt-10 w-[88%] my-0 mx-auto"
            aria-hidden
          >
            MY WORK
          </p>
          {/* TODO: confirm copy with Vineeth — optional track-aware header via signalHeaderCopy() */}

          {projects.length === 0 ? (
            <p className="mx-auto mt-6 w-[88%] font-[family-name:var(--font-mono)] text-sm text-white/45">
              Nothing to decode right now.
            </p>
          ) : (
            <ul
              className="signal-work-list mx-auto my-0 flex min-h-0 w-[88%] flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain pb-8"
              onMouseLeave={deactivate}
            >
              {projects.map((project) => (
                <li key={project.id} className="w-full">
                  <ProjectRow
                    project={project}
                    isActive={activeProjectId === project.id}
                    onActivate={() => activate(project.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
