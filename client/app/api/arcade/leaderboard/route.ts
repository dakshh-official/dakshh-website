import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import User from "@/lib/models/User";
import AdminUser from "@/lib/models/AdminUser";

export async function GET() {
  try {
    await connect();

    const adminEmails = await AdminUser.find({}).select("email").lean();
    const excludeEmails = adminEmails
      .map((a) => (a as { email?: string }).email?.toLowerCase())
      .filter(Boolean);

    const leaderboard = await User.aggregate([
      ...(excludeEmails.length ? [{ $match: { email: { $nin: excludeEmails } } }] : []),
      { $match: { amongUsScore: { $gt: 0 } } },
      { $sort: { amongUsScore: -1 } },
      { $limit: 10 },
      { $project: { username: 1, fullName: 1, amongUsScore: 1, avatar: 1, _id: 0 } },
    ]);

    return NextResponse.json({
      leaderboard: leaderboard.map((u) => ({
        username: (u as { username?: string }).username,
        fullName: (u as { fullName?: string }).fullName,
        amongUsScore: (u as { amongUsScore?: number }).amongUsScore ?? 0,
        avatar: (u as { avatar?: number }).avatar,
      })),
    });
  } catch (err) {
    console.error("Arcade leaderboard error:", err);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
