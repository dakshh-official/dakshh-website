"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { DotOrbit } from "@paper-design/shaders-react";
import Crewmates from "../components/Crewmates";
import { Calendar, Clock, MapPin, Rocket, List } from "lucide-react";
import Image from "next/image";

// Hardcoded 2-Day Schedule Data
const FEST_SCHEDULE = [
  {
    dayTitle: "Day 1: Launch Sequence",
    date: "April 10, 2026",
    events: [
      {
        id: "d1-1",
        eventName: "DAKSHH Inauguration",
        description: "The grand kickoff ceremony for the tech fest.",
        time: "10:00 AM - 11:30 AM",
        venue: "Main Auditorium",
      },
      {
        id: "d1-2",
        eventName: "SPAWN Gaming Tournament",
        description: "Group stages for Valorant and BGMI kick-off.",
        time: "12:00 PM - 5:00 PM",
        venue: "Computer Labs 1-4",
      },
      {
        id: "d1-3",
        eventName: "Hack Heritage: The Sequel",
        description: "24-hour hackathon officially begins. Start building!",
        time: "6:00 PM onwards",
        venue: "HIT Library",
      },
    ],
  },
  {
    dayTitle: "Day 2: Final Orbit",
    date: "April 11, 2026",
    events: [
      {
        id: "d2-1",
        eventName: "Web3 & Blockchain Panel",
        description: "Exploring decentralized tech and smart contracts.",
        time: "11:00 AM - 1:00 PM",
        venue: "Seminar Hall B",
      },
      {
        id: "d2-2",
        eventName: "SPAWN Finals",
        description: "The ultimate showdown for the gaming championship.",
        time: "2:00 PM - 5:00 PM",
        venue: "Computer Labs 1-4",
      },
      {
        id: "d2-3",
        eventName: "Prize Distribution",
        description: "Crowning the champions and distributing the prize pools.",
        time: "5:30 PM - 7:00 PM",
        venue: "Main Auditorium",
      },
    ],
  },
];

// Interactive Card Component
function AnimatedEventCard({ event, index, isEven }: { event: any, index: number, isEven: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScanned, setIsScanned] = useState(false); 
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for slide-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.25, 
        rootMargin: "0px" 
      } 
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Timer to handle the scanning duration
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible && !isScanned) {
      timer = setTimeout(() => {
        setIsScanned(true);
      }, 1500); 
    }
    return () => clearTimeout(timer);
  }, [isVisible, isScanned]);

  const translateClass = isEven ? "-translate-x-16 md:-translate-x-24" : "translate-x-16 md:translate-x-24";

  return (
    <div
      ref={cardRef}
      className={`relative mb-16 flex justify-between items-center w-full ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col group transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${translateClass}`
      }`}
    >
      {/* Empty space to keep the card on one side */}
      <div className="hidden md:block w-5/12" />

      {/* Peeking Figures */}
      <div className="hidden md:flex absolute inset-0 pointer-events-none items-center justify-center z-10">
        {isEven ? (
          <div 
            className={`absolute right-1/2 -mr-22.5 transition-all duration-700 ease-out delay-200
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
            `}
          >
            <Image
              src="/peeking2.png"
              alt="Peeking Crewmate"
              width={230}
              height={150}
              className="object-contain drop-shadow-[0_0_15px_rgba(0,255,0,0.3)]"
              unoptimized
            />
          </div>
        ) : (
          <div 
            className={`absolute left-1/2 -ml-2.75 transition-all duration-700 ease-out delay-200
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
            `}
          >
            <Image
              src="/peeking.png"
              alt="Peeking Crewmate"
              width={85}
              height={75}
              className="object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
              unoptimized
            />
          </div>
        )}
      </div>

      {/* Event Details Panel */}
      <div className="w-full md:w-5/12 transition-all duration-300 hover:-translate-y-2 hover:drop-shadow-[0_0_20px_rgba(0,255,0,0.6)] relative z-40 h-full min-h-45">
        <div className="hand-drawn-card text-left! flex flex-col h-full group-hover:bg-black/90 relative overflow-hidden">
          
          {/* Scanning Overlay (Shows up before text) */}
          <div 
            className={`absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500 ease-in-out
              ${isVisible && !isScanned ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
          >
            <div className="flex flex-col items-center">
              <Image
                src="/medbayScan.gif"
                alt="Scanning..."
                width={150}
                height={150}
                className="object-contain drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]"
                unoptimized
              />
              <span className="text-[#00FFFF] font-mono text-xs tracking-widest mt-2 animate-pulse uppercase">Scanning Data...</span>
            </div>
          </div>

          {/* Actual Card Content (Hidden until scan finishes) */}
          <div className={`flex flex-col h-full transition-opacity duration-700 delay-150 ${isScanned ? "opacity-100" : "opacity-0"}`}>
            <h3 className="text-2xl font-bold text-[#00FFFF] mb-3 uppercase tracking-wider transition-colors group-hover:text-[#FF4655]" style={{ filter: "url(#wobbly-text)" }}>
              {event.eventName}
            </h3>
            
            {event.description && (
              <p className="text-white/80 font-medium text-sm mb-5 leading-relaxed">
                {event.description}
              </p>
            )}
            
            <div className="flex flex-col gap-3 mt-auto border-t border-white/20 pt-4">
              <div className="flex items-center gap-3 text-white">
                <Clock size={18} className="text-[#FFD700]" />
                <span className="font-mono text-sm tracking-wide">{event.time}</span>
              </div>
              {event.venue && (
                <div className="flex items-center gap-3 text-white">
                  <MapPin size={18} className="text-[#FF4655]" />
                  <span className="font-mono text-sm tracking-wide">{event.venue}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<"fun" | "simple">("fun");
  const [displayLoading, setDisplayLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  if (displayLoading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center relative">
        <Navbar />
        <div className="fixed inset-0 w-full h-full z-0">
          <DotOrbit
            width="100%" height="100%" colors={["#ffffff", "#FF4655", "#555555"]}
            colorBack="#000000" stepsPerColor={4} size={0.2} sizeRange={0.5} spreading={1} speed={0.5} scale={0.35}
          />
        </div>
        <div className="z-10 flex flex-col items-center gap-6">
          <Image
            src="/AmongUsVent.gif" 
            alt="Sabotage..."
            className="object-contain drop-shadow-[0_0_30px_rgba(255,70,85,0.6)]"
            height={200}
            width={200}
            unoptimized
          />
          <h1 className="hand-drawn-title text-[#FF4655] animate-pulse text-3xl! md:text-4xl!">
            Sabotage in progress...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative bg-black" data-main-content>
      <Navbar />

      <div className="fixed inset-0 w-full h-full z-0">
        <DotOrbit
          width="100%" height="100%" colors={["#ffffff", "#00FFFF", "#FFD700"]}
          colorBack="#000000" stepsPerColor={4} size={0.2} sizeRange={0.5} spreading={1} speed={0.5} scale={0.35}
        />
      </div>

      <div className="relative z-10 min-h-screen pb-24">
        <Crewmates />

        <div className="relative z-10 pt-28 px-4 max-w-6xl mx-auto">
          
          <div className="flex flex-col items-center justify-center mb-16">
            <h1 className="hand-drawn-title text-5xl! md:text-6xl! text-white mb-4">
              Mission Schedule
            </h1>
            <p className="text-center text-[#00FFFF] font-mono tracking-widest mb-10 max-w-2xl text-sm md:text-base uppercase" style={{ filter: "url(#wobbly-text)" }}>
              &gt; Complete your tasks before the impostor strikes_
            </p>

            <div className="flex items-center gap-4 md:gap-6 bg-black/40 p-3 rounded-3xl border-2 border-white/20 backdrop-blur-md">
              <button
                onClick={() => setViewMode("fun")}
                className={`flex items-center gap-2 transition-all ${
                  viewMode === "fun" 
                  ? "hand-drawn-button py-2! px-4! md:px-6!" 
                  : "text-white/60 hover:text-white px-4 md:px-6 py-2 uppercase font-bold tracking-widest text-sm md:text-base"
                }`}
                style={viewMode !== "fun" ? { filter: "url(#wobbly-text)" } : {}}
              >
                <Rocket size={18} /> Interactive Map
              </button>

              <div className="w-0.5 h-8 bg-white/20 rounded-full" />

              <button
                onClick={() => setViewMode("simple")}
                className={`flex items-center gap-2 transition-all ${
                  viewMode === "simple" 
                  ? "hand-drawn-button py-2! px-4! md:px-6!" 
                  : "text-white/60 hover:text-white px-4 md:px-6 py-2 uppercase font-bold tracking-widest text-sm md:text-base"
                }`}
                style={viewMode !== "simple" ? { filter: "url(#wobbly-text)" } : {}}
              >
                <List size={18} /> Simple List
              </button>
            </div>
          </div>

          <div className="relative w-full">
            
            {viewMode === "fun" && (
              <div className="relative p-4 h-full w-full">
                
                {/* Central Dashed Line */}
                <div className="hidden md:block absolute top-0 bottom-0 border-l-[3px] border-white/40 border-dashed left-1/2 -translate-x-1/2 z-0" />

                {FEST_SCHEDULE.map((dayData, dayIndex) => {
                  const previousEventsCount = FEST_SCHEDULE.slice(0, dayIndex).reduce((acc, curr) => acc + curr.events.length, 0);

                  return (
                    <div key={dayData.dayTitle} className="mb-24 mt-10 relative z-20">
                      <div className="flex justify-center mb-16 relative">
                        <div className="hand-drawn-card w-auto! inline-flex! flex-col items-center px-8! py-4! bg-black/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                          <h2 className="hand-drawn-title text-2xl! md:text-3xl! text-white mb-2">
                            {dayData.dayTitle}
                          </h2>
                          <div className="flex items-center gap-2 text-[#00FFFF] font-mono text-sm tracking-widest">
                            <Calendar size={14} /> {dayData.date}
                          </div>
                        </div>
                      </div>

                      {dayData.events.map((event, index) => (
                        <AnimatedEventCard
                          key={event.id}
                          event={event}
                          index={index}
                          isEven={(previousEventsCount + index) % 2 === 0}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            )}

            {viewMode === "simple" && (
              <div className="max-w-4xl mx-auto space-y-16 relative z-20">
                {FEST_SCHEDULE.map((dayData) => (
                  <div key={dayData.dayTitle} className="hand-drawn-card bg-black/60 p-6! md:p-10!">
                    <div className="border-b-[3px] border-white/20 pb-6 mb-8" style={{ filter: "url(#wobbly-border)" }}>
                      <h2 className="hand-drawn-title text-left! text-2xl! md:text-4xl! text-white mb-3">
                        {dayData.dayTitle}
                      </h2>
                      <div className="flex items-center gap-2 text-[#00FFFF] font-mono tracking-widest text-sm md:text-base">
                        <Calendar size={18} /> {dayData.date}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {dayData.events.map((event) => (
                        <div 
                          key={event.id} 
                          className="group border-[3px] border-white/10 rounded-[20px] p-5 md:p-6 bg-white/5 transition-all duration-300 hover:bg-black/80 hover:drop-shadow-[0_0_20px_rgba(0,255,0,0.6)] hover:-translate-y-1" 
                          style={{ filter: "url(#wobbly-border)" }}
                        >
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-[#00FF00] transition-colors" style={{ filter: "url(#wobbly-text)" }}>
                              {event.eventName}
                            </h3>
                            <div className="text-sm font-mono text-[#FFD700] border-2 border-white/20 px-3 py-1 rounded-full whitespace-nowrap bg-black/50 w-fit">
                              {event.time}
                            </div>
                          </div>
                          
                          {event.description && (
                            <p className="text-white/70 font-medium text-sm md:text-base mb-4 leading-relaxed max-w-2xl">
                              {event.description}
                            </p>
                          )}

                          {event.venue && (
                            <div className="flex items-center gap-2 text-sm font-mono text-[#FF4655] tracking-wide">
                              <MapPin size={16} /> {event.venue}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}