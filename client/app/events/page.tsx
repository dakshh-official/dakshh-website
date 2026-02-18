"use client"

import Navbar from "../components/Navbar";
import { DotOrbit } from "@paper-design/shaders-react";
import Crewmates from "../components/Crewmates";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";

type PublicEvent = {
  _id: string;
  eventName: string;
  category:
    | "Software"
    | "Hardware"
    | "Entrepreneurship"
    | "Gaming"
    | "Quiz"
    | "Design and Prototyping";
  description: string;
  banner: string;
  clubs: string[];
  date: string;
  time: string;
  venue: string;
  isTeamEvent: boolean;
  maxMembersPerTeam: number;
  minMembersPerTeam: number;
  prizePool: string;
};

async function getEvents(): Promise<PublicEvent[]> {
  try {
    const res = await fetch(`/api/events/public`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data as PublicEvent[];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export default function Events() {
  const [events, setEvents] = useState<PublicEvent[]>([]);
  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  // Server Component - we render a client component for the interactive parts
  return (
    <div className="w-full min-h-full relative" data-main-content>
      <Navbar />

      <div className="fixed inset-0 w-full h-full z-0">
        <DotOrbit
          width="100%"
          height="100%"
          colors={["#ffffff", "#006aff", "#fff675"]}
          colorBack="#000000"
          stepsPerColor={4}
          size={0.2}
          sizeRange={0.5}
          spreading={1}
          speed={0.5}
          scale={0.35}
        />
      </div>

      <div className="relative z-10 h-full overflow-hidden">
        <Crewmates />
        <div className="relative z-10 pt-24 pb-12 px-4 max-w-7xl mx-auto">
          <h1 className="hand-drawn-title text-4xl sm:text-5xl text-center text-white mb-4">
            All Events
          </h1>
          <p className="text-center text-white/70 mb-8">
            Browse events and filter by category or search by name.
          </p>

          {/* Note: For full interactivity (search/filter), a client component would be needed.
              For now, we show all events. The filter functionality can be added with a 
              client component wrapper if needed. */}

          {events.length === 0 ? (
            <div className="py-20 text-center text-white/70">
              No events available at the moment. Check back later.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev) => (
                <EventCard
                  key={String(ev._id)}
                  _id={ev._id}
                  eventName={ev.eventName}
                  description={ev.description}
                  category={ev.category}
                  banner={ev.banner}
                  clubs={ev.clubs}
                  date={ev.date}
                  time={ev.time}
                  venue={ev.venue}
                  isTeamEvent={ev.isTeamEvent}
                  minMembersPerTeam={ev.minMembersPerTeam}
                  maxMembersPerTeam={ev.maxMembersPerTeam}
                  prizePool={ev.prizePool}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
