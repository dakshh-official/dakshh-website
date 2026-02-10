import React from 'react';
import HandDrawnCard from './HandDrawnCard';

interface Stat {
  label: string;
  value: string;
  color: string;
}

const stats: Stat[] = [
  { label: 'Total Prize Pool', value: '₹1,000,000+', color: 'text-yellow' },
  { label: 'Participants', value: '5,000+', color: 'text-cyan' },
  { label: 'Events', value: '50+', color: 'text-green' },
  { label: 'Colleges', value: '100+', color: 'text-red' },
];

export default function StatsSection() {
  return (
    <section className="py-16">
      <h2 className="text-center hand-drawn-title text-white mb-12">Festival Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <HandDrawnCard key={index} className="text-center">
            <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-white/80 text-sm uppercase tracking-wider">
              {stat.label}
            </div>
          </HandDrawnCard>
        ))}
      </div>
    </section>
  );
}
