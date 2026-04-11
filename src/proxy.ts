import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hasRefreshToken = request.cookies.has("refresh_token");

  const { pathname, searchParams } = request.nextUrl;
  const isBlank = pathname === "/";
  const isAuthPage =
    pathname === "/login" || pathname === "/register" || isBlank;
  const isAuthFailure = searchParams.get("code") === "401";

  if (hasRefreshToken && isBlank) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Don't redirect back to dashboard if auth failed (code=401)
  if (hasRefreshToken && isAuthPage && !isAuthFailure) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!hasRefreshToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
