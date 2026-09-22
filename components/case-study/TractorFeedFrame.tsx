import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TractorFeedFrameProps = {
  children: ReactNode;
  className?: string;
};

/** Dot-matrix / tractor-feed chrome: sprockets, tear-line, CMYK strip */
export function TractorFeedFrame({
  children,
  className,
}: TractorFeedFrameProps) {
  return (
    <div className={cn("relative mx-auto max-w-4xl px-8 md:px-12", className)}>
      {/* Sprocket holes */}
      <div
        className="absolute inset-y-0 left-0 flex w-6 flex-col justify-between py-4"
        aria-hidden
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={`l-${i}`}
            className="mx-auto h-2.5 w-2.5 rounded-full border border-foreground/25"
          />
        ))}
      </div>
      <div
        className="absolute inset-y-0 right-0 flex w-6 flex-col justify-between py-4"
        aria-hidden
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={`r-${i}`}
            className="mx-auto h-2.5 w-2.5 rounded-full border border-foreground/25"
          />
        ))}
      </div>

      {/* Perforation tear-line */}
      <div
        className="mb-6 border-t border-dashed border-foreground/30"
        aria-hidden
      />

      {/* CMYK test bar */}
      <div className="mb-8 flex h-3 w-full overflow-hidden" aria-hidden>
        <span className="flex-1 bg-[#00AEEF]" />
        <span className="flex-1 bg-[#EC008C]" />
        <span className="flex-1 bg-[#FFF200]" />
        <span className="flex-1 bg-black" />
        <span className="flex-1 bg-neutral-400" />
        <span className="flex-1 bg-white ring-1 ring-inset ring-foreground/20" />
      </div>

      {children}

      <div
        className="mt-10 border-t border-dashed border-foreground/30"
        aria-hidden
      />
    </div>
  );
}
