import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hasAccessToken = request.cookies.has("access_token");
  const hasRefreshToken = request.cookies.has("refresh_token");

  const { pathname, searchParams } = request.nextUrl;
  const isBlank = pathname === "/";
  const isAuthPage =
    pathname === "/login" || pathname === "/register" || isBlank;
  const isAuthFailure = searchParams.get("code") === "401";

  console.log(pathname, "[[this is the path]]");

  // If they have a refresh token, they are "logged in"
  // even if the access token is momentarily expired.

  if (hasRefreshToken && isBlank) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Don't redirect back to dashboard if auth failed (code=401)
  if (hasRefreshToken && isAuthPage && !isAuthFailure) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Optional: Protect private routes
  // If they have NO refresh token and are trying to hit a private page
  if (!hasRefreshToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
