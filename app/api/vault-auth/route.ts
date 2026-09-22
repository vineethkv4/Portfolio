import { NextResponse } from "next/server";
import {
  VAULT_COOKIE_MAX_AGE,
  VAULT_COOKIE_NAME,
  createVaultToken,
  vaultSecretConfigError,
  verifyPasscode,
} from "@/lib/vault-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { passcode?: string };
    const passcode = body.passcode?.trim() ?? "";

    if (!passcode || !verifyPasscode(passcode)) {
      return NextResponse.json(
        { ok: false, error: "Invalid passcode" },
        { status: 401 },
      );
    }

    const token = await createVaultToken();
    const response = NextResponse.json({ ok: true });

    response.cookies.set({
      name: VAULT_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: VAULT_COOKIE_MAX_AGE,
    });

    return response;
  } catch (error) {
    const missingSecret =
      error instanceof Error && error.message.includes("VAULT_JWT_SECRET");
    return NextResponse.json(
      {
        ok: false,
        error: missingSecret ? vaultSecretConfigError() : "Auth unavailable",
      },
      { status: 500 },
    );
  }
}
