import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import AdminUser from "@/lib/models/AdminUser";
import { hashOtp } from "@/lib/otp";
import {
  getAdminOtpSession,
  clearAdminOtpSession,
  isValidDeviceId,
} from "@/lib/otp-session-store";
import {
  createSessionToken,
  setSessionCookie,
  type AdminSessionPayload,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";
    const otp = typeof body.otp === "string" ? body.otp.trim() : "";
    const deviceId = body.deviceId;

    if (!email || !otp || !deviceId) {
      return NextResponse.json(
        { error: "Missing required fields: email, otp, deviceId" },
        { status: 400 }
      );
    }

    if (!isValidDeviceId(deviceId)) {
      return NextResponse.json(
        { error: "Invalid device session. Please refresh and try again." },
        { status: 400 }
      );
    }

    const otpSession = getAdminOtpSession(email, deviceId);
    if (!otpSession) {
      return NextResponse.json(
        { error: "No active OTP found. Please request a new OTP." },
        { status: 400 }
      );
    }

    if (otpSession.otpHash !== hashOtp(otp)) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    await connect();

    const adminUser = await AdminUser.findOne({ email });
    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    clearAdminOtpSession(email, deviceId);

    const payload: AdminSessionPayload = {
      id: adminUser._id.toString(),
      email: adminUser.email,
      role: adminUser.role,
      permissions: adminUser.permissions ?? [],
      exp: 0,
    };

    const token = createSessionToken(payload);
    const cookie = setSessionCookie(token);

    const res = NextResponse.json({ success: true });
    res.headers.set("Set-Cookie", cookie);
    return res;
  } catch {
    return NextResponse.json(
      { error: "Failed to verify OTP. Please try again." },
      { status: 500 }
    );
  }
}
