import { NextResponse } from "next/server";
import {
  SIGNAL_JWT_MAX_AGE,
  createSignalToken,
  signalCookieBase,
} from "@/lib/auth/vault";
import { resolveTracks } from "@/lib/signal/passcodes";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { code?: string };
    const code = body.code?.trim() ?? "";
    const tracks = code ? resolveTracks(code) : null;

    if (!tracks) {
      return NextResponse.json(
        { ok: false, error: "Incorrect passcode." },
        { status: 401 },
      );
    }

    const token = await createSignalToken(tracks);
    const response = NextResponse.json({ ok: true });

    response.cookies.set({
      ...signalCookieBase(),
      value: token,
      maxAge: SIGNAL_JWT_MAX_AGE,
    });

    return response;
  } catch (error) {
    const missingSecret =
      error instanceof Error && error.message.includes("VAULT_JWT_SECRET");
    return NextResponse.json(
      {
        ok: false,
        error: missingSecret
          ? "Server auth is not configured. Add VAULT_JWT_SECRET to .env.local."
          : "Auth unavailable",
      },
      { status: 500 },
    );
  }
}
