import { auth } from "@/auth";
import Registration from "@/lib/models/Registrations";
import connect from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connect();

        const registrations = await Registration.find({
            $or: [
                { owner: session.user.id },
                { team: session.user.id }
            ]
        })
            .populate('eventId', 'eventName category date time venue banner')
            .lean();

        return NextResponse.json({ registrations }, { status: 200 });
    } catch (error) {
        console.error("Error in Fetching Registered events:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}