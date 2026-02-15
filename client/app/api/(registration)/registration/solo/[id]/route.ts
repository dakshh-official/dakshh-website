import { auth } from "@/auth";
import Event, { IEventDocument } from "@/lib/models/Events";
import Registration from "@/lib/models/Registrations";
import connect from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connect();

        const { id } = await params;
        const event = await Event.findById(id) as IEventDocument;

        if (event.isTeamEvent) {
            return NextResponse.json({ error: "Not a Solo Event" }, { status: 400 });
        }
        if (event.isPaidEvent) {
            return NextResponse.json({ error: "The Event is a paid event" }, { status: 400 });
        }

        const newRegistration = new Registration({
            eventId: event._id,
            owner: session.user.id,
            verified: true
        });

        if (newRegistration) {
            event.registrations.push(newRegistration._id);
            await Promise.all([newRegistration.save(), event.save()]);
        }

        return NextResponse.json({ message: `Registered in ${event.eventName} Successfully!` }, { status: 201 });
    } catch (error) {
        console.error("Registering in Solo Event Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}