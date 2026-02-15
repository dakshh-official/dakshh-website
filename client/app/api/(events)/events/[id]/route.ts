import { auth } from "@/auth";
import Event from "@/lib/models/Events";
import connect from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connect();

    const { id } = await params;

    const event = await Event.findById(id)
      .select(
        "_id eventName category date time duration venue description banner rules clubs isTeamEvent pocs minMembersPerTeam maxMembersPerTeam isPaidEvent fees prizePool"
      )
      .lean();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 400 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Fetch Event Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}