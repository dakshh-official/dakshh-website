import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { getSessionRoleContext } from "@/lib/server-role-access";
import {
  hasAnyRole,
  hasRole,
  isAssignableRole,
  normalizeRoles,
  parseCommaSeparatedEmails,
  type AssignableRole,
  type UserRole,
} from "@/lib/roles";

type RoleAction = "add" | "remove";

interface RoleUpdateBody {
  emails?: string | string[];
  role?: string;
  action?: RoleAction;
}

function canManageRole(actorRoles: UserRole[], role: AssignableRole): boolean {
  if (role === "volunteer") return hasAnyRole(actorRoles, ["admin", "super_admin"]);
  if (role === "admin") return hasRole(actorRoles, "super_admin");
  return false;
}

export async function GET() {
  const actor = await getSessionRoleContext();
  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(actor.roles, ["admin", "super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await User.find({})
    .select("username email roles")
    .sort({ email: 1 })
    .lean<{ username?: string; email?: string; roles?: UserRole[] }[]>();

  return NextResponse.json({
    actor: {
      email: actor.email,
      roles: actor.roles,
      canManageAdminRole: hasRole(actor.roles, "super_admin"),
    },
    users: users.map((user) => ({
      username: user.username ?? "unknown",
      email: user.email ?? "",
      roles: normalizeRoles(user.roles, user.email ?? ""),
    })),
  });
}

export async function PATCH(request: Request) {
  const actor = await getSessionRoleContext();
  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(actor.roles, ["admin", "super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: RoleUpdateBody;
  try {
    body = (await request.json()) as RoleUpdateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const action: RoleAction = body.action === "remove" ? "remove" : "add";
  const role = body.role?.trim() ?? "";
  if (!isAssignableRole(role)) {
    return NextResponse.json(
      { error: "Only admin or volunteer roles can be managed here" },
      { status: 400 }
    );
  }

  if (!canManageRole(actor.roles, role)) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const emails = parseCommaSeparatedEmails(body.emails ?? "");
  if (emails.length === 0) {
    return NextResponse.json({ error: "Provide at least one valid email" }, { status: 400 });
  }

  const users = await User.find({ email: { $in: emails } })
    .select("email roles")
    .lean<{ _id: unknown; email?: string; roles?: UserRole[] }[]>();

  const usersByEmail = new Map(
    users
      .filter((user) => !!user.email)
      .map((user) => [user.email as string, user])
  );
  const notFound = emails.filter((email) => !usersByEmail.has(email));

  const updated: string[] = [];
  const skipped: { email: string; reason: string }[] = [];

  for (const email of emails) {
    const targetUser = usersByEmail.get(email);
    if (!targetUser) continue;

    const targetRoles = normalizeRoles(targetUser.roles, email);
    const targetIsSuperAdmin = hasRole(targetRoles, "super_admin");

    if (targetIsSuperAdmin && !hasRole(actor.roles, "super_admin")) {
      skipped.push({ email, reason: "Admins cannot change Super Admin users" });
      continue;
    }

    const nextRoles = new Set<UserRole>(targetRoles);
    if (action === "add") {
      nextRoles.add(role);
    } else {
      nextRoles.delete(role);
    }

    const normalizedNextRoles = normalizeRoles(Array.from(nextRoles), email);
    const changed =
      normalizedNextRoles.length !== targetRoles.length ||
      normalizedNextRoles.some((nextRole) => !targetRoles.includes(nextRole));

    if (!changed) {
      skipped.push({ email, reason: "No role change needed" });
      continue;
    }

    await User.updateOne({ _id: targetUser._id }, { $set: { roles: normalizedNextRoles } });
    updated.push(email);
  }

  return NextResponse.json({
    success: true,
    role,
    action,
    updated,
    notFound,
    skipped,
  });
}
