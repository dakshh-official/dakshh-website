import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import User from "@/lib/models/User";
import { getAdminSession } from "@/lib/admin-session";
import {
  SUPER_ADMIN_EMAIL,
  hasRole,
  normalizeRoles,
} from "@/lib/roles";

export async function GET() {
  const session = await getAdminSession();
  if (!session || (!session.isMaster && session.role !== "master")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connect();
  const superAdminUser = await User.findOne({ email: SUPER_ADMIN_EMAIL })
    .select("email username roles verified")
    .lean<{
      email?: string;
      username?: string;
      roles?: ("participant" | "volunteer" | "admin" | "super_admin")[];
      verified?: boolean;
    } | null>();

  if (!superAdminUser) {
    return NextResponse.json({
      superAdminEmail: SUPER_ADMIN_EMAIL,
      exists: false,
      hasSuperAdminRole: false,
    });
  }

  const normalizedRoles = normalizeRoles(superAdminUser.roles, SUPER_ADMIN_EMAIL);
  return NextResponse.json({
    superAdminEmail: SUPER_ADMIN_EMAIL,
    exists: true,
    username: superAdminUser.username ?? null,
    verified: Boolean(superAdminUser.verified),
    roles: normalizedRoles,
    hasSuperAdminRole: hasRole(normalizedRoles, "super_admin"),
  });
}

export async function POST() {
  const session = await getAdminSession();
  if (!session || (!session.isMaster && session.role !== "master")) {
    return NextResponse.json(
      { error: "Only master key holder can run seed operation" },
      { status: 403 }
    );
  }

  await connect();
  const existing = await User.findOne({ email: SUPER_ADMIN_EMAIL })
    .select("roles email")
    .lean<{
      roles?: ("participant" | "volunteer" | "admin" | "super_admin")[];
      email?: string;
    } | null>();

  if (!existing?.email) {
    return NextResponse.json(
      {
        success: false,
        superAdminEmail: SUPER_ADMIN_EMAIL,
        error: "Super Admin account not found. Sign up first with this email.",
      },
      { status: 404 }
    );
  }

  const roles = normalizeRoles(existing.roles, existing.email);
  await User.updateOne({ email: SUPER_ADMIN_EMAIL }, { $set: { roles } });

  return NextResponse.json({
    success: true,
    superAdminEmail: SUPER_ADMIN_EMAIL,
    roles,
    hasSuperAdminRole: hasRole(roles, "super_admin"),
  });
}
