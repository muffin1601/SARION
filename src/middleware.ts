import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE_NAMES = [
  "__Secure-better-auth.session_token",
  "better-auth.session_token",
] as const;

/**
 * Route protection — unauthenticated users hitting an app route are bounced to
 * /login. This is an optimistic cookie check (fast, edge-safe); pages still
 * resolve the full session server-side before rendering sensitive data.
 */
export function middleware(request: NextRequest) {
  const sessionCookie = SESSION_COOKIE_NAMES.some((name) => request.cookies.has(name));

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/clients/:path*",
    "/projects/:path*",
    "/invoices/:path*",
    "/team/:path*",
    "/settings/:path*",
    "/checkout/:path*",
  ],
};
