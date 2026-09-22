import { NextResponse } from "next/server";
import { signalCookieBase } from "@/lib/auth/vault";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    ...signalCookieBase(),
    value: "",
    maxAge: 0,
  });
  return response;
}
