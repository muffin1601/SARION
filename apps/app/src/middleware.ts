import { NextResponse, type NextRequest } from "next/server";

// Keep the edge bundle independent from Better Auth's Node/Jose internals.
// This is only an optimistic presence check; every protected page/API still
// verifies the full signed, database-backed session server-side.
const SESSION_COOKIE_NAMES = [
  "__Secure-better-auth.session_token",
  "better-auth.session_token",
] as const;

export function middleware(request: NextRequest) {
  if (!SESSION_COOKIE_NAMES.some((name) => request.cookies.has(name))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", "/activity/:path*", "/automations/:path*",
    "/clients/:path*", "/finance/:path*", "/invoices/:path*",
    "/projects/:path*", "/proposals/:path*", "/recurring/:path*",
    "/reports/:path*", "/team/:path*", "/settings/:path*",
    "/time/:path*", "/checkout/:path*",
  ],
};

