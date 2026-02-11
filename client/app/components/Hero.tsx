import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 md:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center z-10 w-full max-w-4xl mx-auto">
        <div className="hand-drawn-card inline-block mb-6 md:mb-8 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:px-12 lg:py-10 xl:px-16 xl:py-12">
          <h1 className="hand-drawn-title text-white mb-3 md:mb-4 lg:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">
            DAKSHH
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-cyan font-bold mb-2 lg:mb-3">Tech Fest 2026</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-yellow font-semibold">Heritage Institute of Technology, Kolkata</p>
        </div>
        <div className="mt-6 md:mt-8">
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white/90 max-w-2xl mx-auto px-4">
            A premier tech festival building the next generation of innovators
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center flex-wrap px-4">
            <button className="hand-drawn-button w-full sm:w-auto text-sm sm:text-base px-6 py-3 md:px-8 md:py-4">
              Browse Events
            </button>
            <button className="hand-drawn-button w-full sm:w-auto text-sm sm:text-base px-6 py-3 md:px-8 md:py-4" style={{ background: 'rgba(0, 0, 255, 0.9)' }}>
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
