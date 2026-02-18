import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/admin-session";
import { getAdminBasePath } from "@/lib/admin-config";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const base = `${url.origin}/${getAdminBasePath()}`;
  const res = NextResponse.redirect(base);
  res.headers.set("Set-Cookie", clearSessionCookie());
  return res;
}
