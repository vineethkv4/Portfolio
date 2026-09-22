import { SignJWT, jwtVerify } from "jose";

export const VAULT_COOKIE_NAME = "vault_session";
export const VAULT_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

function readRuntimeSecret(name: "VAULT_JWT_SECRET" | "VAULT_PASSCODE"): string | undefined {
  // Static member access so Next.js attaches these keys to the serverless env.
  void process.env.VAULT_JWT_SECRET;
  void process.env.VAULT_PASSCODE;
  // Index into the live process.env object so Turbopack cannot compile the value to undefined.
  const runtime = globalThis.process?.env;
  const value = runtime?.[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function getJwtSecret(): Uint8Array {
  const secret = readRuntimeSecret("VAULT_JWT_SECRET");
  if (!secret) {
    throw new Error("VAULT_JWT_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export function vaultSecretConfigError(): string {
  return process.env.VERCEL
    ? "Server auth is not configured. Set VAULT_JWT_SECRET in Vercel Environment Variables, then redeploy."
    : "Server auth is not configured. Add VAULT_JWT_SECRET to .env.local.";
}

export function getVaultPasscode(): string {
  const passcode = readRuntimeSecret("VAULT_PASSCODE");
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
