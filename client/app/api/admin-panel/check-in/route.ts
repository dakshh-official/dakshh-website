import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { performCheckIn } from "@/lib/check-in-logic";

type CheckInAction = "entry" | "food";

function isValidAction(action: unknown): action is CheckInAction {
  return action === "entry" || action === "food";
}

function canCheckIn(
  session: { role: string; permissions: string[]; isMaster?: boolean } | null
): boolean {
  if (!session) return false;
  if (session.isMaster || session.role === "master") return true;
  if (session.role === "admin" || session.role === "crewmate") return true;
  if (session.role === "imposter")
    return session.permissions.includes("checkin");
  return false;
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session || !canCheckIn(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const eventId = typeof body.eventId === "string" ? body.eventId : "";
    const qrPayload = typeof body.qrPayload === "string" ? body.qrPayload : "";
    const action = body.action;

    if (!eventId || !qrPayload || !isValidAction(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const result = await performCheckIn({
      eventId,
      qrPayload,
      action,
      checkedInBy: session.id,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin check-in failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
