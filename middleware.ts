import { NextResponse, type NextRequest } from "next/server";
import { VAULT_COOKIE_NAME, verifyVaultToken } from "@/lib/vault-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Passcode landing + auth API stay public
  if (pathname === "/vault" || pathname.startsWith("/api/vault-auth")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(VAULT_COOKIE_NAME)?.value;
  const valid = token ? await verifyVaultToken(token) : false;

  if (!valid) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/vault";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vault/:path*"],
};
