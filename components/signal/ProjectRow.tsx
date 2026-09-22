"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SpecialText } from "@/components/ui/special-text";
import { usePageTransition } from "@/components/animation/TransitionProvider";
import type { VisibleSignalProject } from "@/lib/signal/content";
import { cn } from "@/lib/utils";

type ProjectRowProps = {
  project: VisibleSignalProject;
  isActive: boolean;
  onActivate: () => void;
};

function HoverText({
  text,
  active,
  className,
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  if (!active) {
    return (
      <span className={cn("inline-flex h-[1.15em] items-center leading-none", className)}>
        {text}
      </span>
    );
  }

  return (
    <SpecialText
      key={text}
      speed={18}
      className={cn("h-[1.15em] items-center leading-none", className)}
    >
      {text}
    </SpecialText>
  );
}

export function ProjectRow({ project, isActive, onActivate }: ProjectRowProps) {
  const { navigate } = usePageTransition();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!isActive) {
      event.preventDefault();
      onActivate();
      return;
    }
    if (project.href === "#") {
      event.preventDefault();
      return;
    }
    if (project.href.startsWith("/")) {
      event.preventDefault();
      navigate(project.href);
    }
  }

  const indexLabel = `[ ${project.index} ]`;

  return (
    <Link
      href={project.href}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={handleClick}
      aria-current={isActive ? "true" : undefined}
      className="group relative isolate flex h-16 w-full cursor-pointer items-center justify-between px-[26px] outline-none sm:h-[4.25rem]"
    >
      <span
        className={cn(
          "absolute inset-0 z-[-1] w-full bg-signal-green/0 transition-opacity duration-200",
          isActive ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      />

      <span
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-[-1] w-[52%] transition-opacity duration-200",
          isActive ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      />

      <span className="relative z-[1] flex w-[50%] min-w-0 items-center gap-4 sm:gap-6">
        <HoverText
          text={indexLabel}
          active={isActive}
          className={cn(
            "shrink-0 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.08em] sm:text-xs",
            isActive ? "text-signal-green" : "text-white/55",
          )}
        />

        <span
          className={cn(
            "font-[family-name:var(--font-display-serif)] text-[clamp(0.95rem,1.5vw,1.1rem)] font-bold leading-none tracking-[-0.01em]",
            isActive ? "text-signal-green" : "text-white",
          )}
        >
          {project.name}
        </span>
      </span>

      <span className="relative z-[1] flex h-5 shrink-0 items-center">
        <span
          className={cn(
            "absolute right-full mr-3 flex h-5 items-center gap-1.5",
            isActive ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={!isActive}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="flex h-5 items-center rounded-full bg-signal-green px-2 font-[family-name:var(--font-mono)] text-[9px] leading-none tracking-[0.12em] text-black uppercase"
            >
              {tag}
            </span>
          ))}
        </span>

        <span
          className={cn(
            "flex h-5 items-center gap-1 font-[family-name:var(--font-mono)] text-[10px] leading-none tracking-[0.16em] uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.55)] sm:text-[11px]",
            isActive ? "text-signal-green" : "text-white/40",
          )}
        >
          <span>Launch</span>
          <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
        </span>
      </span>

      <motion.span
        className="absolute bottom-0 left-0 z-[1] h-px w-full origin-left bg-signal-green"
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        aria-hidden
      />
    </Link>
  );
}
