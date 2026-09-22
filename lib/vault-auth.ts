import { SignJWT, jwtVerify } from "jose";

export const VAULT_COOKIE_NAME = "vault_session";
export const VAULT_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * Dynamic lookup so Next.js does not inline `undefined` at build time.
 * Static `process.env.VAULT_JWT_SECRET` can be replaced during `next build`
 * and then ignore the real Vercel runtime value.
 */
function readServerEnv(name: string): string | undefined {
  const env = process.env as Record<string, string | undefined>;
  const value = env[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function getJwtSecret(): Uint8Array {
  const secret =
    readServerEnv("VAULT_JWT_SECRET") ?? readServerEnv("SIGNAL_JWT_SECRET");
  if (!secret) {
    throw new Error("VAULT_JWT_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export function vaultSecretConfigError(): string {
  const onVercel = Boolean(readServerEnv("VERCEL"));
  return onVercel
    ? "Server auth is not configured. Set VAULT_JWT_SECRET in Vercel Environment Variables, then redeploy."
    : "Server auth is not configured. Add VAULT_JWT_SECRET to .env.local.";
}

export function getVaultPasscode(): string {
  const passcode = readServerEnv("VAULT_PASSCODE");
  if (!passcode) {
    throw new Error("VAULT_PASSCODE is not set");
  }
  return passcode;
}

export async function createVaultToken(): Promise<string> {
  return new SignJWT({ scope: "vault" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${VAULT_COOKIE_MAX_AGE}s`)
    .sign(getJwtSecret());
}

export async function verifyVaultToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload.scope === "vault";
  } catch {
    return false;
  }
}

export function verifyPasscode(input: string): boolean {
  return input === getVaultPasscode();
}
