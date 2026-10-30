import "server-only";

import { digestEqual } from "@/lib/auth/secret-compare";
import type { SignalTrack } from "@/lib/signal/types";

const CODE_ENV: { name: string; tracks: SignalTrack[] }[] = [
  { name: "SIGNAL_CODE_BOTH", tracks: ["design", "tech"] },
  { name: "SIGNAL_CODE_DESIGN", tracks: ["design"] },
  { name: "SIGNAL_CODE_TECH", tracks: ["tech"] },
];

function configuredCode(name: string): string | null {
  const value = process.env[name]?.trim().toUpperCase();
  return value || null;
}

/** Resolve a passcode to tracks. Codes come from env, never from source. */
export async function resolveTracks(
  code: string,
): Promise<SignalTrack[] | null> {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;

  let configured = false;
  for (const entry of CODE_ENV) {
    const expected = configuredCode(entry.name);
    if (!expected) continue;
    configured = true;
    if (await digestEqual(normalized, expected)) return entry.tracks;
  }

  if (!configured) {
    console.error(
      "Signal passcodes are not configured. Set SIGNAL_CODE_DESIGN, SIGNAL_CODE_TECH, and SIGNAL_CODE_BOTH.",
    );
  }

  return null;
}
