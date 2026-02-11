import React from 'react';
import HandDrawnCard from './HandDrawnCard';

export default function SponsorsSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center hand-drawn-title text-white mb-8 sm:mb-10 md:mb-12 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Our Sponsors</h2>
      <div className="text-center mb-6 sm:mb-8 max-w-4xl mx-auto">
        <p className="text-white/70 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 px-4">
          We're proud to partner with industry leaders who support innovation and excellence.
        </p>
        <HandDrawnCard className="inline-block px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
          <p className="text-yellow text-base sm:text-lg md:text-xl font-bold mb-2">Sponsors Announcement Coming Soon!</p>
          <p className="text-white/80 text-xs sm:text-sm md:text-base">
            We're finalizing partnerships with leading tech companies, startups, and industry giants.
            The complete sponsor lineup will be revealed soon.
          </p>
        </HandDrawnCard>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12 max-w-6xl mx-auto">
        <HandDrawnCard className="text-center py-6 sm:py-7 md:py-8">
          <h3 className="text-yellow text-lg sm:text-xl font-bold mb-3 sm:mb-4">Platinum Partners</h3>
          <p className="text-white/60 text-sm sm:text-base">Announcing Soon</p>
        </HandDrawnCard>
        <HandDrawnCard className="text-center py-6 sm:py-7 md:py-8">
          <h3 className="text-cyan text-lg sm:text-xl font-bold mb-3 sm:mb-4">Gold Partners</h3>
          <p className="text-white/60 text-sm sm:text-base">Announcing Soon</p>
        </HandDrawnCard>
        <HandDrawnCard className="text-center py-6 sm:py-7 md:py-8 sm:col-span-2 lg:col-span-1">
          <h3 className="text-green text-lg sm:text-xl font-bold mb-3 sm:mb-4">Silver Partners</h3>
          <p className="text-white/60 text-sm sm:text-base">Announcing Soon</p>
        </HandDrawnCard>
      </div>
    </section>
  );
}
