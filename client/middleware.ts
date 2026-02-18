import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_BASE_PATH =
  process.env.ADMIN_BASE_PATH ?? "x7k9p2";
const adminPath = ADMIN_BASE_PATH.startsWith("/")
  ? ADMIN_BASE_PATH
  : `/${ADMIN_BASE_PATH}`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(adminPath)) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    return response;
  }

  return NextResponse.next();
}
