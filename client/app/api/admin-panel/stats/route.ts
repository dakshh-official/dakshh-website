import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import Event from "@/lib/models/Events";
import Registration from "@/lib/models/Registrations";
import User from "@/lib/models/User";
import Team from "@/lib/models/Team";
import AdminUser from "@/lib/models/AdminUser";
import { getAdminSession } from "@/lib/admin-session";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connect();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const adminEmails = await AdminUser.find({}).select("email").lean();
    const excludeEmails = adminEmails.map((a) => (a as { email?: string }).email?.toLowerCase()).filter(Boolean);

    const [userStats, eventStats, regStats, teamStats, adminStats, signupsByDay, regsByDay, regsByEvent, eventsByCategory, leaderboard, amongUsStats] = await Promise.all([
      User.aggregate([
        { $match: excludeEmails.length ? { email: { $nin: excludeEmails } } : {} },
        {
          $facet: {
            total: [{ $count: "count" }],
            verified: [{ $match: { verified: true } }, { $count: "count" }],
            completeProfiles: [{ $match: { isProfileComplete: true } }, { $count: "count" }],
            byRole: [{ $unwind: "$roles" }, { $group: { _id: "$roles", count: { $sum: 1 } } }],
            byProvider: [{ $group: { _id: "$provider", count: { $sum: 1 } } }],
          },
        },
      ]),
      Event.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            teamCount: [{ $match: { isTeamEvent: true } }, { $count: "count" }],
            soloCount: [{ $match: { isTeamEvent: false } }, { $count: "count" }],
            paidCount: [{ $match: { isPaidEvent: true } }, { $count: "count" }],
            foodCount: [{ $match: { isFoodProvided: true } }, { $count: "count" }],
          },
        },
      ]),
      Registration.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            verified: [{ $match: { verified: true } }, { $count: "count" }],
            checkedIn: [{ $match: { checkedIn: true } }, { $count: "count" }],
            teamCount: [{ $match: { isInTeam: true } }, { $count: "count" }],
            soloCount: [{ $match: { isInTeam: false } }, { $count: "count" }],
          },
        },
      ]),
      Team.aggregate([{ $count: "total" }]),
      AdminUser.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { passwordSetAt: { $ne: null } } }, { $count: "count" }],
            pending: [{ $match: { passwordSetAt: null } }, { $count: "count" }],
            byRole: [{ $group: { _id: "$role", count: { $sum: 1 } } }],
          },
        },
      ]),
      User.aggregate([
        { $match: excludeEmails.length ? { email: { $nin: excludeEmails } } : {} },
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            signups: { $sum: 1 },
            profilesCompleted: { $sum: { $cond: ["$isProfileComplete", 1, 0] } },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Registration.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $lookup: {
            from: "users",
            localField: "participant",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            registrations: { $sum: 1 },
            profilesCompleted: {
              $sum: { $cond: [{ $eq: ["$user.isProfileComplete", true] }, 1, 0] },
            },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Registration.aggregate([
        { $group: { _id: "$eventId", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $lookup: { from: "events", localField: "_id", foreignField: "_id", as: "event" } },
        { $unwind: { path: "$event", preserveNullAndEmptyArrays: true } },
        { $project: { eventName: "$event.eventName", count: 1, _id: 0 } },
      ]),
      Event.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]),
      User.aggregate([
        { $match: excludeEmails.length ? { email: { $nin: excludeEmails } } : {} },
        { $match: { amongUsScore: { $gt: 0 } } },
        { $sort: { amongUsScore: -1 } },
        { $limit: 10 },
        { $project: { username: 1, fullName: 1, amongUsScore: 1, avatar: 1, _id: 0 } },
      ]),
      User.aggregate([
        { $match: excludeEmails.length ? { email: { $nin: excludeEmails } } : {} },
        { $match: { amongUsScore: { $gt: 0 } } },
        {
          $group: {
            _id: null,
            totalPlayers: { $sum: 1 },
            totalScore: { $sum: "$amongUsScore" },
            highestScore: { $max: "$amongUsScore" },
          },
        },
      ]),
    ]);

    const toNum = (arr: { count?: number }[]) => arr[0]?.count ?? 0;
    const userFacet = userStats[0]?.total ? userStats[0] : { total: [], verified: [], completeProfiles: [], byRole: [], byProvider: [] };
    const eventFacet = eventStats[0]?.total ? eventStats[0] : { total: [], teamCount: [], soloCount: [], paidCount: [], foodCount: [] };
    const regFacet = regStats[0]?.total ? regStats[0] : { total: [], verified: [], checkedIn: [], teamCount: [], soloCount: [] };
    const adminFacet = adminStats[0]?.total ? adminStats[0] : { total: [], active: [], pending: [], byRole: [] };

    return NextResponse.json({
      users: {
        total: toNum(userFacet.total as { count?: number }[]),
        verified: toNum(userFacet.verified as { count?: number }[]),
        completeProfiles: toNum(userFacet.completeProfiles as { count?: number }[]),
        byRole: (userFacet.byRole as { _id: string; count: number }[]).map((r) => ({ role: r._id, count: r.count })),
        byProvider: (userFacet.byProvider as { _id: string; count: number }[]).map((p) => ({ provider: p._id, count: p.count })),
        signupsByDay: signupsByDay.map((d) => ({
          date: (d as { _id: string })._id,
          signups: (d as { signups: number }).signups,
          profilesCompleted: (d as { profilesCompleted: number }).profilesCompleted,
        })),
      },
      events: {
        total: toNum(eventFacet.total as { count?: number }[]),
        byCategory: eventsByCategory.map((c) => ({ category: (c as { _id: string })._id, count: (c as { count: number }).count })),
        teamCount: toNum(eventFacet.teamCount as { count?: number }[]),
        soloCount: toNum(eventFacet.soloCount as { count?: number }[]),
        paidCount: toNum(eventFacet.paidCount as { count?: number }[]),
        foodCount: toNum(eventFacet.foodCount as { count?: number }[]),
      },
      registrations: {
        total: toNum(regFacet.total as { count?: number }[]),
        verified: toNum(regFacet.verified as { count?: number }[]),
        checkedIn: toNum(regFacet.checkedIn as { count?: number }[]),
        teamCount: toNum(regFacet.teamCount as { count?: number }[]),
        soloCount: toNum(regFacet.soloCount as { count?: number }[]),
        byDay: regsByDay.map((d) => ({
          date: (d as { _id: string })._id,
          registrations: (d as { registrations: number }).registrations,
          profilesCompleted: (d as { profilesCompleted: number }).profilesCompleted,
        })),
        byEvent: regsByEvent.map((r) => ({ eventName: (r as { eventName?: string }).eventName ?? "Unknown", count: (r as { count: number }).count })),
      },
      teams: {
        total: teamStats[0]?.total ?? 0,
      },
      adminUsers: {
        total: toNum(adminFacet.total as { count?: number }[]),
        active: toNum(adminFacet.active as { count?: number }[]),
        pending: toNum(adminFacet.pending as { count?: number }[]),
        byRole: (adminFacet.byRole as { _id: string; count: number }[]).map((r) => ({ role: r._id, count: r.count })),
      },
      leaderboard: leaderboard.map((u) => ({
        username: (u as { username?: string }).username,
        fullName: (u as { fullName?: string }).fullName,
        amongUsScore: (u as { amongUsScore?: number }).amongUsScore ?? 0,
        avatar: (u as { avatar?: number }).avatar,
      })),
      amongUs: amongUsStats[0]
        ? {
            totalPlayers: (amongUsStats[0] as { totalPlayers?: number }).totalPlayers ?? 0,
            totalScore: (amongUsStats[0] as { totalScore?: number }).totalScore ?? 0,
            highestScore: (amongUsStats[0] as { highestScore?: number }).highestScore ?? 0,
          }
        : { totalPlayers: 0, totalScore: 0, highestScore: 0 },
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
