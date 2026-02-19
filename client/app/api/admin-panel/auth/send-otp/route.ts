import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import AdminUser from "@/lib/models/AdminUser";
import { sendAdminOtpEmail } from "@/lib/auth-mail";
import { generateOtp, hashOtp, otpExpiryDate } from "@/lib/otp";
import {
  setAdminOtpSession,
  isValidDeviceId,
} from "@/lib/otp-session-store";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const deviceId = body.deviceId;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!isValidDeviceId(deviceId)) {
      return NextResponse.json(
        { error: "Invalid device session. Please refresh and try again." },
        { status: 400 }
      );
    }

    await connect();

    const adminUser = await AdminUser.findOne({ email });
    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    if (adminUser.passwordSetAt) {
      if (!password) {
        return NextResponse.json(
          { error: "Password is required", requiresPassword: true },
          { status: 400 }
        );
      }
      const valid = await adminUser.comparePassword(password);
      if (!valid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
      }
    }

    const otp = generateOtp();
    setAdminOtpSession({
      email,
      deviceId,
      otpHash: hashOtp(otp),
      expiresAt: otpExpiryDate(10),
    });

    await sendAdminOtpEmail(email, otp);
    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch {
    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
