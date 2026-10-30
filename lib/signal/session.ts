import { SignJWT, jwtVerify } from "jose";
import { isSignalTrack, type SignalTrack } from "@/lib/signal/types";

/** Cookie + JWT lifetime. Client idle lock is shorter and is not the security boundary. */
export const SIGNAL_JWT_MAX_AGE = 60 * 30;
export const SIGNAL_COOKIE_NAME = "signal_access";

export function getSignalJwtSecret(): Uint8Array {
  const secret = (
    process.env.SIGNAL_JWT_SECRET || process.env.VAULT_JWT_SECRET
  )?.trim();
  if (!secret) {
    throw new Error("SIGNAL_JWT_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
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
    .sign(getSignalJwtSecret());
}

export async function readSignalTracks(
  token: string,
): Promise<SignalTrack[] | null> {
  try {
    const { payload } = await jwtVerify(token, getSignalJwtSecret());
    if (
      typeof payload.iat === "number" &&
      Date.now() / 1000 - payload.iat > SIGNAL_JWT_MAX_AGE
    ) {
      return null;
    }
    return parseTracks(payload.tracks);
  } catch {
    return null;
  }
}
