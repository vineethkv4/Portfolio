"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·:▪";
const SCRAMBLE_MS = 360;
const SCRAMBLE_TICK_MS = 40;
const RESOLVE_STAGGER_MS = 25;
const DEFAULT_INTERVAL_MS = 2500;

type DesignationCyclerProps = {
  /** Each item may include `\n` (or `<br>`) for a hard line break */
  designations: string[];
  intervalMs?: number;
  className?: string;
};

function parseLines(value: string) {
  return value
    .split(/\n|<br\s*\/?>/i)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function padLine(value: string, length: number) {
  return value.padEnd(length, "\u00A0");
}

function randomGlyph() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]!;
}

function isBlank(glyph: string) {
  return glyph === " " || glyph === "\u00A0";
}

function scrambleLines(target: string[][]): string[][] {
  return target.map((line) =>
    line.map((glyph) => (isBlank(glyph) ? glyph : randomGlyph())),
  );
}

function resolveLines(
  target: string[][],
  resolvedCount: number,
): string[][] {
  let seen = 0;
  return target.map((line) =>
    line.map((glyph) => {
      const i = seen;
      seen += 1;
      if (i < resolvedCount || isBlank(glyph)) return glyph;
      return randomGlyph();
    }),
  );
}

function flattenLen(lines: string[][]) {
  return lines.reduce((sum, line) => sum + line.length, 0);
}

export function DesignationCycler({
  designations,
  intervalMs = DEFAULT_INTERVAL_MS,
  className,
}: DesignationCyclerProps) {
  const reduceMotion = useReducedMotion();

  const [stackLines, setStackLines] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1000px)");
    const update = () => setStackLines(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const parsed = useMemo(
    () =>
      designations.map((d) => {
        const lines = parseLines(d);
        return stackLines ? lines : [lines.join(" ")];
      }),
    [designations, stackLines],
  );

  const lineCount = useMemo(
    () => Math.max(0, ...parsed.map((lines) => lines.length)),
    [parsed],
  );

  const maxLens = useMemo(() => {
    return Array.from({ length: lineCount }, (_, lineIndex) =>
      Math.max(0, ...parsed.map((lines) => (lines[lineIndex] ?? "").length)),
    );
  }, [lineCount, parsed]);

  const padded = useMemo(
    () =>
      parsed.map((lines) =>
        Array.from({ length: lineCount }, (_, lineIndex) =>
          padLine(lines[lineIndex] ?? "", maxLens[lineIndex] ?? 0).split(""),
        ),
      ),
    [lineCount, maxLens, parsed],
  );

  const widestLine = useMemo(
    () => Math.max(0, ...maxLens),
    [maxLens],
  );

  const [index, setIndex] = useState(0);
  const [lines, setLines] = useState<string[][]>(
    () => padded[0] ?? [],
  );
  const [paused, setPaused] = useState(false);
  const [busy, setBusy] = useState(false);

  const indexRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const pausedRef = useRef(false);
  const busyRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    busyRef.current = busy;
  }, [busy]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const runScramble = useCallback(
    (nextIndex: number) => {
      const target = padded[nextIndex];
      if (!target) return;

      clearTimers();
      setBusy(true);
      busyRef.current = true;

      const scrambleStarted = performance.now();
      let resolvedCount = 0;
      const total = flattenLen(target);

      const tick = () => {
        const elapsed = performance.now() - scrambleStarted;

        if (elapsed < SCRAMBLE_MS) {
          setLines(scrambleLines(target));
          timersRef.current.push(window.setTimeout(tick, SCRAMBLE_TICK_MS));
          return;
        }

        const resolveTick = () => {
          resolvedCount += 1;
          setLines(resolveLines(target, resolvedCount));

          if (resolvedCount < total) {
            timersRef.current.push(
              window.setTimeout(resolveTick, RESOLVE_STAGGER_MS),
            );
            return;
          }

          setLines(target);
          setIndex(nextIndex);
          indexRef.current = nextIndex;
          setBusy(false);
          busyRef.current = false;
        };

        resolveTick();
      };

      tick();
    },
    [clearTimers, padded],
  );

  const crossfadeTo = useCallback(
    (nextIndex: number) => {
      const target = padded[nextIndex];
      if (!target) return;

      setBusy(true);
      busyRef.current = true;
      setIndex(nextIndex);
      indexRef.current = nextIndex;
      setLines(target);
      timersRef.current.push(
        window.setTimeout(() => {
          setBusy(false);
          busyRef.current = false;
        }, 400),
      );
    },
    [padded],
  );

  const advance = useCallback(() => {
    if (!padded.length || pausedRef.current || busyRef.current) return;
    const next = (indexRef.current + 1) % padded.length;
    if (reduceMotion) {
      crossfadeTo(next);
    } else {
      runScramble(next);
    }
  }, [crossfadeTo, padded.length, reduceMotion, runScramble]);

  useEffect(() => {
    if (padded.length < 2) return;

    const id = window.setInterval(advance, intervalMs);
    return () => {
      window.clearInterval(id);
      clearTimers();
    };
  }, [advance, clearTimers, intervalMs, padded.length]);

  useEffect(() => {
    setLines(padded[indexRef.current] ?? padded[0] ?? []);
  }, [padded]);

  if (!designations.length) return null;

  const display = reduceMotion ? (padded[index] ?? []) : lines;
  const label = parsed[index]?.join(" ") ?? "";

  return (
    <div
      className={cn("inline-block text-left", className)}
      style={{ width: `${widestLine * 0.62}em`, maxWidth: "100%" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">{label}</span>

      {reduceMotion ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            className="block"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            aria-hidden
          >
            <LineBlock lines={display} />
          </motion.span>
        </AnimatePresence>
      ) : (
        <motion.span
          className="block"
          animate={{ opacity: busy ? 0.92 : 1 }}
          transition={{ duration: 0.15 }}
          aria-hidden
        >
          <LineBlock lines={display} />
        </motion.span>
      )}
    </div>
  );
}

function LineBlock({ lines }: { lines: string[][] }) {
  return (
    <span className="block">
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className="flex justify-center min-[1000px]:justify-start"
        >
          {line.map((glyph, i) => (
            <span
              key={i}
              className="inline-block w-[0.62em] text-center"
            >
              {isBlank(glyph) ? "\u00A0" : glyph}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
