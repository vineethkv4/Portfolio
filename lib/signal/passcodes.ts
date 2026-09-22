import "server-only";

import type { SignalTrack } from "@/lib/signal/types";

/** Single source of truth — rotate codes here only. Never import this file from client components. */
export const PASSCODE_TRACK_MAP: Record<string, SignalTrack[]> = {
  SIGNAL002: ["design"],
  SIGNAL007: ["tech"],
  SIGNAL999: ["design", "tech"],
};

export function resolveTracks(code: string): SignalTrack[] | null {
  return PASSCODE_TRACK_MAP[code.trim().toUpperCase()] ?? null;
}
