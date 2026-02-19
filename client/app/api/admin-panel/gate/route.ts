import { NextResponse } from "next/server";
import { isMasterKeyValid } from "@/lib/admin-config";
import { createSessionToken, setSessionCookie } from "@/lib/admin-session";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const key = typeof body.masterKey === "string" ? body.masterKey.trim() : "";

    if (!key) {
      return NextResponse.json(
        { error: "Master key is required" },
        { status: 400 }
      );
    }

    if (!isMasterKeyValid(key)) {
      return NextResponse.json(
        { error: "Invalid master key" },
        { status: 401 }
      );
    }

    const payload = {
      id: "master",
      email: "master",
      role: "master" as const,
      permissions: ["registrations", "checkin", "events", "users"] as ("registrations" | "checkin" | "events" | "users")[],
      exp: 0,
      isMaster: true,
    };
    const sessionToken = createSessionToken(payload);
    const cookie = setSessionCookie(sessionToken);
    const res = NextResponse.json({ success: true });
    res.headers.set("Set-Cookie", cookie);
    return res;
  } catch {
    return NextResponse.json(
      { error: "Failed to validate master key" },
      { status: 500 }
    );
  }
}
