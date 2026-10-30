import { NextResponse, type NextRequest } from "next/server";
import { readSignalTracks, SIGNAL_COOKIE_NAME } from "@/lib/signal/session";
import {
  canViewWork,
  requiredTracksForAsset,
  visitorCanSee,
} from "@/lib/signal/work-access";
import { VAULT_COOKIE_NAME, verifyVaultToken } from "@/lib/vault-auth";

function signalLogin(request: NextRequest) {
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/signal";
  loginUrl.search = "";
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

async function signalTracks(request: NextRequest) {
  const token = request.cookies.get(SIGNAL_COOKIE_NAME)?.value;
  if (!token) return null;
  return readSignalTracks(token);
}

function assetPathFromRequest(request: NextRequest): string | null {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/images/")) return pathname;
  if (pathname !== "/_next/image") return null;
  const source = request.nextUrl.searchParams.get("url");
  if (!source || !source.startsWith("/images/")) return null;
  return source;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/vault" || pathname.startsWith("/api/vault-auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/vault/")) {
    const token = request.cookies.get(VAULT_COOKIE_NAME)?.value;
    const valid = token ? await verifyVaultToken(token) : false;
    if (!valid) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/vault";
      loginUrl.search = "";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/work/")) {
    const slug = pathname.slice("/work/".length).split("/")[0] ?? "";
    const tracks = await signalTracks(request);
    if (!tracks || !slug || !canViewWork(decodeURIComponent(slug), tracks)) {
      return signalLogin(request);
    }
    return NextResponse.next();
  }

  const assetPath = assetPathFromRequest(request);
  if (assetPath) {
    const required = requiredTracksForAsset(assetPath);
    if (required) {
      const tracks = await signalTracks(request);
      if (!tracks || !visitorCanSee(required, tracks)) {
        return new NextResponse(null, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/vault/:path*",
    "/work/:path*",
    "/images/projects/:path*",
    "/images/work-002.jpg",
    "/_next/image",
  ],
};
