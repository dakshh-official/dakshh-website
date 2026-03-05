import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connect from "@/lib/mongoose";
import User from "@/lib/models/User";
import { isSessionProcessed, markSessionProcessed } from "@/lib/game-session-store";

const POINTS = { COIN: 10, BOMB: -10, SUPERBOMB: -50, IMPOSTER: -100 } as const;
const MAX_SESSION_MS = 30 * 60 * 1000;
const MAX_EVENTS = 2000;
const RATE_LIMIT_PER_SEC: Record<string, number> = {
  COIN: 5,
  BOMB: 2,
  SUPERBOMB: 1,
  IMPOSTER: 1,
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type EventType = keyof typeof POINTS;

const eventSchema = {
  type: (v: unknown): v is EventType =>
    typeof v === "string" && v in POINTS,
  t: (v: unknown): v is number =>
    typeof v === "number" && Number.isFinite(v) && v > 0,
};

function validateEvents(events: unknown): { ok: true; events: { type: EventType; t: number }[] } | { ok: false; error: string } {
  if (!Array.isArray(events) || events.length > MAX_EVENTS) {
    return { ok: false, error: "Invalid events" };
  }

  const validated: { type: EventType; t: number }[] = [];
  let lastT = 0;

  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    if (!e || typeof e !== "object") {
      return { ok: false, error: "Invalid event" };
    }
    const { type, t } = e as { type?: unknown; t?: unknown };
    if (!eventSchema.type(type) || !eventSchema.t(t)) {
      return { ok: false, error: "Invalid event" };
    }
    if (t < lastT) {
      return { ok: false, error: "Events must be in chronological order" };
    }
    lastT = t;
    validated.push({ type, t });
  }

  if (validated.length > 0) {
    const firstT = validated[0].t;
    const lastT2 = validated[validated.length - 1].t;
    if (lastT2 - firstT > MAX_SESSION_MS) {
      return { ok: false, error: "Session too long" };
    }
  }

  const bySecond = new Map<number, Record<string, number>>();
  for (const { type, t } of validated) {
    const sec = Math.floor(t / 1000);
    const counts = bySecond.get(sec) ?? { COIN: 0, BOMB: 0, SUPERBOMB: 0, IMPOSTER: 0 };
    counts[type] = (counts[type] ?? 0) + 1;
    bySecond.set(sec, counts);
  }

  for (const [, counts] of bySecond) {
    for (const [type, limit] of Object.entries(RATE_LIMIT_PER_SEC)) {
      const count = counts[type] ?? 0;
      if (count > limit) {
        return { ok: false, error: `Rate limit exceeded for ${type}` };
      }
    }
  }

  return { ok: true, events: validated };
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const gameSessionId =
      typeof body?.gameSessionId === "string" ? body.gameSessionId : "";
    const startScore =
      typeof body?.startScore === "number" && Number.isFinite(body.startScore)
        ? body.startScore
        : null;

    if (!UUID_REGEX.test(gameSessionId)) {
      return NextResponse.json({ error: "Invalid game session" }, { status: 400 });
    }

    if (startScore === null || startScore < 0) {
      return NextResponse.json({ error: "Invalid start score" }, { status: 400 });
    }

    const eventsResult = validateEvents(body?.events);
    if (!eventsResult.ok) {
      return NextResponse.json({ error: eventsResult.error }, { status: 400 });
    }

    if (isSessionProcessed(gameSessionId)) {
      return NextResponse.json(
        { error: "Session already processed" },
        { status: 409 }
      );
    }

    await connect();

    const user = await User.findById(session.user.id)
      .select("amongUsScore")
      .lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const currentScore = (user as { amongUsScore?: number }).amongUsScore ?? 0;
    if (currentScore !== startScore) {
      return NextResponse.json(
        { error: "Score mismatch" },
        { status: 400 }
      );
    }

    let delta = 0;
    for (const { type } of eventsResult.events) {
      delta += POINTS[type];
    }

    const newScore = Math.max(0, currentScore + delta);

    await User.findByIdAndUpdate(session.user.id, {
      $set: { amongUsScore: newScore },
    });

    markSessionProcessed(gameSessionId, session.user.id);

    return NextResponse.json({ amongUsScore: newScore });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit score" },
      { status: 500 }
    );
  }
}
