import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // const token = request.cookies.get("access_token");
  // if (!token && !request.nextUrl.pathname.startsWith("/login")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // return NextResponse.next();
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
