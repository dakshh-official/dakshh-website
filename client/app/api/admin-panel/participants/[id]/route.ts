import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connect from "@/lib/mongoose";
import User from "@/lib/models/User";
import AdminUser from "@/lib/models/AdminUser";
import { getAdminSession } from "@/lib/admin-session";
import { USER_ROLES } from "@/lib/roles";

function canAccessParticipants(
  session: { role: string; permissions: string[]; isMaster?: boolean } | null
): boolean {
  if (!session) return false;
  if (session.isMaster || session.role === "master") return true;
  if (session.role === "admin") return true;
  if (session.role === "imposter")
    return session.permissions.includes("users");
  return false;
}

function isValidRole(r: unknown): r is (typeof USER_ROLES)[number] {
  return typeof r === "string" && USER_ROLES.includes(r as (typeof USER_ROLES)[number]);
}

function isValidRoles(arr: unknown): (typeof USER_ROLES)[number][] {
  if (!Array.isArray(arr)) return [];
  return arr.filter((x): x is (typeof USER_ROLES)[number] =>
    isValidRole(x)
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session || !canAccessParticipants(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    await connect();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "Participant not found" }, { status: 404 });
    }

    const adminExists = await AdminUser.findOne({ email: user.email?.toLowerCase() });
    if (adminExists) {
      return NextResponse.json(
        { error: "Cannot edit admin users from participants" },
        { status: 403 }
      );
    }

    if (body.username !== undefined) {
      const username = typeof body.username === "string" ? body.username.trim() : "";
      if (username.length < 3 || username.length > 30) {
        return NextResponse.json(
          { error: "Username must be 3–30 characters" },
          { status: 400 }
        );
      }
      const existing = await User.findOne({
        username: new RegExp(`^${username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
        _id: { $ne: new mongoose.Types.ObjectId(id) },
      });
      if (existing) {
        return NextResponse.json(
          { error: "Username is already taken" },
          { status: 409 }
        );
      }
      user.username = username;
    }

    if (body.fullName !== undefined) user.fullName = String(body.fullName ?? "").trim();
    if (body.phoneNumber !== undefined) {
      const pn = String(body.phoneNumber ?? "").trim();
      if (pn && !/^\d{10}$/.test(pn)) {
        return NextResponse.json(
          { error: "Phone number must be 10 digits" },
          { status: 400 }
        );
      }
      user.phoneNumber = pn || undefined;
    }
    if (body.college !== undefined) user.college = String(body.college ?? "").trim();
    if (body.stream !== undefined) user.stream = String(body.stream ?? "").trim();

    if (body.avatar !== undefined) {
      const av = body.avatar;
      if (av === null || av === undefined) {
        user.avatar = undefined;
      } else {
        const n = Number(av);
        if (n >= 1 && n <= 10) user.avatar = n;
      }
    }

    if (typeof body.amongUsScore === "number") {
      user.amongUsScore = body.amongUsScore;
    }

    if (typeof body.verified === "boolean") {
      user.verified = body.verified;
    }

    if (body.roles !== undefined) {
      const roles = isValidRoles(body.roles);
      if (roles.length > 0) {
        user.roles = roles;
      }
    }

    const hasRequired =
      !!user.username &&
      !!user.email &&
      !!user.fullName &&
      !!user.phoneNumber &&
      !!user.college &&
      !!user.stream;
    user.isProfileComplete = hasRequired;

    await user.save();

    const u = user.toObject ? user.toObject() : (user as unknown as Record<string, unknown>);
    return NextResponse.json({
      success: true,
      participant: {
        id: String(u._id ?? ""),
        username: u.username ?? "",
        email: u.email ?? "",
        fullName: u.fullName ?? "",
        phoneNumber: u.phoneNumber ?? "",
        college: u.college ?? "",
        stream: u.stream ?? "",
        avatar: u.avatar ?? null,
        amongUsScore: u.amongUsScore ?? 0,
        verified: u.verified ?? false,
        roles: u.roles ?? ["participant"],
        isProfileComplete: u.isProfileComplete ?? false,
      },
    });
  } catch (err) {
    console.error("Admin update participant error:", err);
    return NextResponse.json(
      { error: "Failed to update participant" },
      { status: 500 }
    );
  }
}
