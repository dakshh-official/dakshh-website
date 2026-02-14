import { auth } from "@/auth";
import connect from "@/lib/mongoose";
import User from "@/lib/models/User";
import { normalizeRoles, type UserRole } from "@/lib/roles";

export interface SessionRoleContext {
  userId: string;
  email: string;
  roles: UserRole[];
}

export async function getSessionRoleContext(): Promise<SessionRoleContext | null> {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) return null;

  await connect();
  const user = (await User.findById(session.user.id)
    .select("email roles")
    .lean()) as { email: string; roles?: UserRole[] } | null;

  if (!user?.email) return null;

  const roles = normalizeRoles(user.roles, user.email);
  return {
    userId: session.user.id,
    email: user.email,
    roles,
  };
}
