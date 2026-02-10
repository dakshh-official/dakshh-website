import React from 'react';
import HandDrawnCard from './HandDrawnCard';

interface EventCardProps {
  title: string;
  description: string;
  category: string;
  prizePool?: string;
  teams?: string;
  featured?: boolean;
}

export default function EventCard({
  title,
  description,
  category,
  prizePool,
  teams,
  featured = false
}: EventCardProps) {
  return (
    <HandDrawnCard className={`h-full ${featured ? 'border-yellow border-4' : ''}`}>
      <div className="mb-3">
        <span className="text-xs uppercase tracking-wider text-cyan px-2 py-1 border border-cyan rounded">
          {category}
        </span>
        {featured && (
          <span className="ml-2 text-xs uppercase tracking-wider text-yellow px-2 py-1 border border-yellow rounded">
            Featured
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70 text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-4 text-xs text-white/60">
        {prizePool && (
          <div>
            <span className="text-yellow font-semibold">Prize:</span> {prizePool}
          </div>
        )}
        {teams && (
          <div>
            <span className="text-cyan font-semibold">Teams:</span> {teams}
          </div>
        )}
      </div>
    </HandDrawnCard>
  );
}
