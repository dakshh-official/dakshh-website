import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="text-center z-10 px-4 w-full max-w-4xl">
        <div className="hand-drawn-card inline-block mb-8 px-8 py-6">
          <h1 className="hand-drawn-title text-white mb-4">
            DAKSHH
          </h1>
          <h2 className="text-2xl text-cyan font-bold mb-2">Tech Fest 2026</h2>
          <p className="text-lg text-yellow font-semibold">Heritage Institute of Technology, Kolkata</p>
        </div>
        <div className="mt-8">
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            A premier tech festival building the next generation of innovators
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="hand-drawn-button">
              Browse Events
            </button>
            <button className="hand-drawn-button" style={{ background: 'rgba(0, 255, 255, 0.9)' }}>
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
