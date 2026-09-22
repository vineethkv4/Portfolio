import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { getJwtSecret } from "@/lib/vault-auth";
import { isSignalTrack, type SignalTrack } from "@/lib/signal/types";

export const SIGNAL_COOKIE_NAME = "signal_access";
/** Cookie + JWT lifetime. Client also hard-locks at this duration. */
export const SIGNAL_JWT_MAX_AGE = 60 * 30; // 30 minutes

export function signalCookieBase() {
  return {
    name: SIGNAL_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}

function parseTracks(value: unknown): SignalTrack[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  if (!value.every(isSignalTrack)) return null;
  return value;
}

export async function createSignalToken(
  tracks: SignalTrack[],
): Promise<string> {
  return new SignJWT({ tracks })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SIGNAL_JWT_MAX_AGE}s`)
    .sign(getJwtSecret());
}

export async function getSignalTracksFromToken(
  token: string,
): Promise<SignalTrack[] | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const tracks = parseTracks(payload.tracks);
    if (!tracks) return null;
    // Reject older long-lived tokens that predate the 30-minute cap
    if (
      typeof payload.iat === "number" &&
      Date.now() / 1000 - payload.iat > SIGNAL_JWT_MAX_AGE
    ) {
      return null;
    }
    return tracks;
  } catch {
    return null;
  }
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
