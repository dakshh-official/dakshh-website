import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import Registration from "@/lib/models/Registrations";
import { getAdminSession } from "@/lib/admin-session";

function canAccessRegistrations(
  session: { role: string; permissions: string[]; isMaster?: boolean } | null
): boolean {
  if (!session) return false;
  if (session.isMaster || session.role === "master") return true;
  if (session.role === "admin") return true;
  if (session.role === "imposter")
    return session.permissions.includes("registrations");
  return false;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session || !canAccessRegistrations(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    await connect();

    const registration = await Registration.findById(id);
    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    if (typeof body.verified === "boolean") {
      registration.verified = body.verified;
    }

    if (typeof body.checkedIn === "boolean") {
      registration.checkedIn = body.checkedIn;
      if (body.checkedIn) {
        registration.checkedInAt = new Date();
        registration.checkedInBy = session.id as unknown as typeof registration.checkedInBy;
      } else {
        registration.checkedInAt = undefined;
        registration.checkedInBy = undefined;
      }
    }

    if (typeof body.foodServedCount === "number" && body.foodServedCount >= 0) {
      registration.foodServedCount = body.foodServedCount;
    }

    await registration.save();

    const r = registration.toObject ? registration.toObject() : (registration as unknown as Record<string, unknown>);
    return NextResponse.json({
      success: true,
      registration: {
        id: String(r._id ?? ""),
        verified: r.verified ?? false,
        checkedIn: r.checkedIn ?? false,
        checkedInAt: r.checkedInAt ?? null,
        foodServedCount: r.foodServedCount ?? 0,
      },
    });
  } catch (err) {
    console.error("Admin update registration error:", err);
    return NextResponse.json(
      { error: "Failed to update registration" },
      { status: 500 }
    );
  }
}
