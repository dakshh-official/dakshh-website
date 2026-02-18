import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import AdminUser from "@/lib/models/AdminUser";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connect();

    const adminUser = await AdminUser.findOne({ email })
      .select("passwordSetAt")
      .lean() as { passwordSetAt?: Date | null } | null;

    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    return NextResponse.json({
      needsSetup: !adminUser.passwordSetAt,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to check user" },
      { status: 500 }
    );
  }
}
