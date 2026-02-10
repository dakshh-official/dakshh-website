import React from 'react';
import HandDrawnCard from './HandDrawnCard';

export default function SponsorsSection() {
  return (
    <section className="py-16">
      <h2 className="text-center hand-drawn-title text-white mb-12">Our Sponsors</h2>
      <div className="text-center mb-8">
        <p className="text-white/70 text-lg mb-6">
          We're proud to partner with industry leaders who support innovation and excellence.
        </p>
        <HandDrawnCard className="inline-block px-8 py-6">
          <p className="text-yellow text-xl font-bold mb-2">Sponsors Announcement Coming Soon!</p>
          <p className="text-white/80">
            We're finalizing partnerships with leading tech companies, startups, and industry giants.
            The complete sponsor lineup will be revealed soon.
          </p>
        </HandDrawnCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <HandDrawnCard className="text-center py-8">
          <h3 className="text-yellow text-xl font-bold mb-4">Platinum Partners</h3>
          <p className="text-white/60">Announcing Soon</p>
        </HandDrawnCard>
        <HandDrawnCard className="text-center py-8">
          <h3 className="text-cyan text-xl font-bold mb-4">Gold Partners</h3>
          <p className="text-white/60">Announcing Soon</p>
        </HandDrawnCard>
        <HandDrawnCard className="text-center py-8">
          <h3 className="text-green text-xl font-bold mb-4">Silver Partners</h3>
          <p className="text-white/60">Announcing Soon</p>
        </HandDrawnCard>
      </div>
    </section>
  );
}
