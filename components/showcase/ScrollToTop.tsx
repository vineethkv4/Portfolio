"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type ScrollToTopProps = {
  /** Dark button on the light case-study pages. Light button on the dark layout. */
  tone?: "dark" | "light";
};

export function ScrollToTop({ tone = "dark" }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const challenge = document.getElementById("challenge");
      if (challenge) {
        const top = challenge.getBoundingClientRect().top;
        setVisible(top < window.innerHeight * 0.72);
        return;
      }
      setVisible(window.scrollY > 520);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className={cn(
        "fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-3 scale-95 opacity-0",
        tone === "dark" ? "bg-black text-white" : "bg-white text-black",
      )}
    >
      <ArrowUp className="size-5" strokeWidth={1.75} aria-hidden />
    </button>
  );
}
