"use client";

import { useEffect, useState } from "react";
import { Curtains } from "./Curtains";

type PreloaderProps = {
  /** Fires when curtains begin opening — hero/navband should reveal here */
  onReveal: () => void;
  /** Fires after curtains finish retracting — unmount preloader */
  onComplete: () => void;
};

/** Percentage counter + curtain open — mirrors the HTML prototype timing */
export function Preloader({ onReveal, onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [closing, setClosing] = useState(true);
  const [hideCount, setHideCount] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(100);
      setClosing(false);
      setHideCount(true);
      onReveal();
      onComplete();
      return;
    }

    let pct = 0;
    let timer: number;
    let hideTimer: number;

    const tick = () => {
      pct += Math.floor(Math.random() * 8) + 4;
      if (pct >= 100) {
        setProgress(100);
        setHideCount(true);
        setClosing(false);
        onReveal();
        // Match HTML: hide preloader after curtain transition (~1s)
        hideTimer = window.setTimeout(onComplete, 1050);
        return;
      }
      setProgress(pct);
      timer = window.setTimeout(tick, 70);
    };

    timer = window.setTimeout(tick, 250);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(hideTimer);
    };
  }, [onReveal, onComplete]);

  return (
    <Curtains
      closed={closing}
      mode="preloader"
      progress={progress}
      hideCount={hideCount}
    />
  );
}
