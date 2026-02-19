import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: "Password already set. Please sign in." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    adminUser.passwordHash = passwordHash;
    adminUser.passwordSetAt = new Date();
    await adminUser.save();

    const otp = generateOtp();
    setAdminOtpSession({
      email,
      deviceId,
      otpHash: hashOtp(otp),
      expiresAt: otpExpiryDate(10),
    });

    await sendAdminOtpEmail(email, otp);
    return NextResponse.json({ success: true, message: "Password set. OTP sent." });
  } catch {
    return NextResponse.json(
      { error: "Failed to set password. Please try again." },
      { status: 500 }
    );
  }
}
