'use client';

import React, { useState } from 'react';
import EventCard from './EventCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Event {
  title: string;
  description: string;
  category: "Software" | "Hardware" | "Entrepreneurship" | "Quiz" | "Gaming" | "Design and Prototyping";
  prizePool?: string;
  teams?: string;
  featured?: boolean;
}

const events: Event[] = [
  {
    title: 'Hydro-Launch Challenge',
    description: 'Build and launch innovative hydro-powered models',
    category: 'Hardware',
    prizePool: '₹TBA',
    teams: '50+ Teams',
    featured: true
  },
  {
    title: 'Code Red Hackathon',
    description: '48-hour marathon to build innovative solutions',
    category: 'Software',
    prizePool: '₹TBA',
    teams: '100+ Teams',
    featured: true
  },
  {
    title: 'Robo-Wars Championship',
    description: 'Battle of bots in intense combat arena',
    category: 'Hardware',
    prizePool: '₹TBA',
    teams: '30+ Teams',
    featured: true
  },
  {
    title: 'BGMI Tournament',
    description: 'Competitive gaming championship',
    category: 'Gaming',
    prizePool: '₹TBA',
    teams: '200+ Teams'
  },
  {
    title: 'VALORANT Championship',
    description: 'Esports tournament for tactical shooters',
    category: 'Gaming',
    prizePool: '₹TBA',
    teams: '150+ Teams'
  },
  {
    title: 'Competitive Programming',
    description: 'Algorithm and data structure challenges',
    category: 'Software',
    prizePool: '₹TBA',
    teams: '500+ Participants'
  },
  {
    title: 'Drone Hurdle Race',
    description: 'Navigate drones through challenging obstacles',
    category: 'Hardware',
    prizePool: '₹TBA',
    teams: '40+ Teams'
  },
  {
    title: 'Robo Soccer',
    description: 'Autonomous robots compete in soccer matches',
    category: 'Hardware',
    prizePool: '₹TBA',
    teams: '25+ Teams'
  },
];

export default function EventsGrid() {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleViewAllClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);

    setTimeout(() => {
      router.push('/events');
    }, 1000);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {isNavigating && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
          <div className="relative p-8 rounded-2xl flex flex-col items-center">
            <Image
              src="/venting-in.gif"
              alt="Loading Events"
              className="object-contain drop-shadow-2xl"
              height={120}
              width={120}
            />
          </div>
        </div>
      )}

      <h2 className="text-center hand-drawn-title text-white mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Event Categories</h2>
      <p className="text-center text-white/70 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
        Explore our diverse range of technical events across multiple domains
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
        {/* {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))} */}
      </div>

      <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
        <button
          onClick={handleViewAllClick}
          className="hand-drawn-button text-sm sm:text-base px-6 py-3 md:px-8 md:py-4 cursor-pointer"
        >
          View All Events
        </button>
      </div>
    </section>
  );
}
