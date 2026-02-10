import { DotOrbit } from '@paper-design/shaders-react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import EventsGrid from './components/EventsGrid';
import SponsorsSection from './components/SponsorsSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen relative">
      {/* Navbar */}
      <Navbar />
      
      {/* Starry background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <DotOrbit
          width={"100%"}
          height={"100%"}
          colors={["#ffffff", "#006aff", "#fff675"]}
          colorBack="#000000"
          stepsPerColor={4}
          size={0.2}
          sizeRange={0.5}
          spreading={1}
          speed={0.5}
          scale={0.35}
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-[300vh]">
        {/* Floating crewmates - z-0 so they sit below cards */}
        {/* Left side amongus images */}
        <div className="absolute left-4 top-[200px] float opacity-80 z-0 pointer-events-none">
          <div style={{ transform: 'rotate(-12deg)' }}>
            <Image
              src="/1.png"
              alt="Amongus 1"
              width={150}
              height={150}
            />
          </div>
        </div>
        <div className="absolute left-4 top-[1100px] float-delay-1 opacity-80 z-0 pointer-events-none">
          <div style={{ transform: 'rotate(10deg)' }}>
            <Image
              src="/2.png"
              alt="Amongus 2"
              width={150}
              height={150}
            />
          </div>
        </div>
        
        {/* Right side amongus images - mirrored */}
        <div className="absolute right-4 top-[600px] float-delay-2 opacity-80 z-0 pointer-events-none">
          <div style={{ transform: 'scaleX(-1) rotate(12deg)' }}>
            <Image
              src="/3.png"
              alt="Amongus 3"
              width={150}
              height={150}
            />
          </div>
        </div>
        <div className="absolute right-4 top-[1800px] float-delay-3 opacity-80 z-0 pointer-events-none">
          <div style={{ transform: 'scaleX(-1) rotate(-10deg)' }}>
            <Image
              src="/4.png"
              alt="Amongus 4"
              width={150}
              height={150}
            />
          </div>
        </div>

        <div id="home" className="relative z-10">
          <Hero />
        </div>
        <div id="stats" className="relative z-10">
          <StatsSection />
        </div>
        <div id="events" className="relative z-10">
          <EventsGrid />
        </div>
        <div id="sponsors" className="relative z-10">
          <SponsorsSection />
        </div>
        <div id="contact" className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}
