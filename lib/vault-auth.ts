import { SignJWT, jwtVerify } from "jose";

export const VAULT_COOKIE_NAME = "vault_session";
export const VAULT_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

function getJwtSecret(): Uint8Array {
  const secret = process.env.VAULT_JWT_SECRET;
  if (!secret) {
    throw new Error("VAULT_JWT_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export function getVaultPasscode(): string {
  const passcode = process.env.VAULT_PASSCODE;
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
