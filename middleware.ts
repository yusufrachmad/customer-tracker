import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const excludedPaths = ["/login", "/register"];

  if (
    !excludedPaths.some((path) => url.pathname.startsWith(path)) &&
    !request.cookies.get("next-auth.session-token")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/",
    "/akun/:path*",
    "/pendaftaran/:path*",
    "/riwayat/:path*",
    "/apotek/:path*",
  ],
};
