import Event from "@/lib/models/Events";
import connect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connect();

        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        if (!category) {
            return NextResponse.json(
                { error: "Category parameter is required" },
                { status: 400 }
            );
        }

        const events = await Event.aggregate([
            { $match: { category: category } },
            { $sample: { size: 8 } },
            {
                $project: {
                    _id: 1,
                    eventName: 1,
                    banner: 1,
                }
            }
        ]);

        return NextResponse.json(events);
    } catch (error) {
        console.error("Fetch Random Events Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}