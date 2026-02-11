import React from 'react';
import EventCard from './EventCard';

interface Event {
  title: string;
  description: string;
  category: string;
  prizePool?: string;
  teams?: string;
  featured?: boolean;
}

const events: Event[] = [
  {
    title: 'Hydro-Launch Challenge',
    description: 'Build and launch innovative hydro-powered models',
    category: 'Aviation',
    prizePool: '₹TBA',
    teams: '50+ Teams',
    featured: true
  },
  {
    title: 'Code Red Hackathon',
    description: '48-hour marathon to build innovative solutions',
    category: 'Coding',
    prizePool: '₹TBA',
    teams: '100+ Teams',
    featured: true
  },
  {
    title: 'Robo-Wars Championship',
    description: 'Battle of bots in intense combat arena',
    category: 'Robotics',
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
    category: 'Coding',
    prizePool: '₹TBA',
    teams: '500+ Participants'
  },
  {
    title: 'Drone Hurdle Race',
    description: 'Navigate drones through challenging obstacles',
    category: 'Aviation',
    prizePool: '₹TBA',
    teams: '40+ Teams'
  },
  {
    title: 'Robo Soccer',
    description: 'Autonomous robots compete in soccer matches',
    category: 'Robotics',
    prizePool: '₹TBA',
    teams: '25+ Teams'
  },
];

export default function EventsGrid() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center hand-drawn-title text-white mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Event Categories</h2>
      <p className="text-center text-white/70 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
        Explore our diverse range of technical events across multiple domains
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
      <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
        <button className="hand-drawn-button text-sm sm:text-base px-6 py-3 md:px-8 md:py-4">
          View All Events
        </button>
      </div>
    </section>
  );
}
