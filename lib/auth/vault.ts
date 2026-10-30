import "server-only";

import { cookies } from "next/headers";
import {
  readSignalTracks,
  SIGNAL_COOKIE_NAME,
} from "@/lib/signal/session";
import type { SignalTrack } from "@/lib/signal/types";

export { SIGNAL_COOKIE_NAME };
export { SIGNAL_JWT_MAX_AGE, createSignalToken } from "@/lib/signal/session";

export function signalCookieBase() {
  return {
    name: SIGNAL_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}

export async function getSignalTracksFromToken(
  token: string,
): Promise<SignalTrack[] | null> {
  return readSignalTracks(token);
}

export async function getSignalTracks(): Promise<SignalTrack[] | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SIGNAL_COOKIE_NAME)?.value;
  if (!cookie) return null;
  return getSignalTracksFromToken(cookie);
}

export async function hasSignalAccess(
  cookieValue: string | undefined,
): Promise<boolean> {
  if (!cookieValue) return false;
  const tracks = await getSignalTracksFromToken(cookieValue);
  return tracks !== null;
}
