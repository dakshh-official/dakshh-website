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
    <HandDrawnCard className={`h-full ${featured ? 'border-yellow border-2 sm:border-3 md:border-4' : ''}`}>
      <div className="mb-2 sm:mb-3 flex flex-wrap gap-2">
        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-cyan px-2 py-1 border border-cyan rounded">
          {category}
        </span>
        {featured && (
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-yellow px-2 py-1 border border-yellow rounded">
            Featured
          </span>
        )}
      </div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70 text-xs sm:text-sm md:text-base mb-3 sm:mb-4">{description}</p>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-[10px] sm:text-xs text-white/60">
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
