import { NextResponse } from "next/server";
import {
  SIGNAL_JWT_MAX_AGE,
  createSignalToken,
  signalCookieBase,
} from "@/lib/auth/vault";
import { allowAttempt, clientAddress } from "@/lib/auth/rate-limit";
import { resolveTracks } from "@/lib/signal/passcodes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!allowAttempt(`signal:${clientAddress(request)}`)) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Try again later." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as { code?: string };
    const code = body.code?.trim() ?? "";
    const tracks = code ? await resolveTracks(code) : null;

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
  } catch {
    return NextResponse.json(
      { ok: false, error: "Auth unavailable" },
      { status: 500 },
    );
  }
}
