'use client';

import Navbar from '@/app/components/Navbar';
import { DotOrbit } from '@paper-design/shaders-react';
import Crewmates from '@/app/components/Crewmates';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import HandDrawnCard from '@/app/components/HandDrawnCard';
import DialCarousel from '@/app/components/Events/DialCarousel';
import SpaceLoader from '@/app/components/SpaceLoader';

import RulesModal from '@/app/components/Events/modals/RulesModal';
import PocModal from '@/app/components/Events/modals/PocModal';
import { MessageSquare, ScrollText } from 'lucide-react';

const formatEventTime = (time: string) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');

  let hoursInt = parseInt(hours);
  let minutesInt = parseInt(minutes);

  if (!minutesInt || minutesInt === 0) {
    if (hoursInt <= 12) {
      return `${hoursInt} AM`;
    } else {
      return `${hoursInt - 12} PM`;
    }
  }
  if (hoursInt <= 12) {
    return `${hoursInt}:${minutesInt} AM`;
  } else {
    return `${hoursInt - 12}:${minutesInt} PM`;
  }
};

const EventPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [event, setEvent] = useState<any>(null);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showRules, setShowRules] = useState(false);
  const [showPoc, setShowPoc] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      let redirecting = false;
      try {
        // Fetch specific event
        const eventRes = await fetch(`/api/events/${id}`);
        if (eventRes.status === 401) {
          redirecting = true;
          const callbackUrl = encodeURIComponent(`/events/${id}`);
          const message = encodeURIComponent('Please log in to view event details');
          router.replace(`/auth?callbackUrl=${callbackUrl}&message=${message}`);
          return;
        }
        if (!eventRes.ok) throw new Error('Failed to fetch event');
        const eventData = await eventRes.json();
        setEvent(eventData);

        const similarEvents = await fetch(`/api/events/similar?category=${eventData.category}`);
        if (similarEvents.ok) {
          const allData = await similarEvents.json();
          setAllEvents(allData);
        }
      } catch (e: any) {
        toast.error(e.message);
      } finally {
        if (!redirecting) setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        <SpaceLoader />
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black text-white font-sans selection:bg-red-500 selection:text-white">
      <Navbar />

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <DotOrbit
          width="100%"
          height="100%"
          colors={['#ffffff', '#006aff', '#fff675']}
          colorBack="#000000"
          stepsPerColor={4}
          size={0.2}
          sizeRange={0.5}
          spreading={1}
          speed={0.5}
          scale={0.35}
        />
      </div>

      {/* CREWMATES LAYER */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Crewmates />
      </div>

      {/* DIAL CAROUSEL (LEFT FIXED) */}
      <DialCarousel events={allEvents} activeId={id} />

      {/* MAIN CONTENT LAYOUT */}
      <main className="relative z-20 pt-24 sm:pb-12 pb-20 px-4 w-full h-full flex flex-col items-center">

        {/* TOP ROW: Back - Header - User Profile/Date */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">

          <button
            onClick={() => router.back()}
            className="md:hidden hand-drawn-button px-4 py-2 text-sm flex items-center gap-2"
          >
            <span>←</span> Back
          </button>

          {/* Event Logo + Title */}
          <div className="flex-1 lg:pl-32 mt-10 flex justify-center md:justify-start">
            <div className="inline-flex items-center gap-3">
              {/* Circular Wobbly Logo */}
              {event.banner && (
                <div
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-white/60 flex-shrink-0 bg-black/40"
                  style={{ filter: 'url(#wobbly-border)' }}
                >
                  <img
                    src={event.banner}
                    alt={event.eventName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h1 className="hand-drawn-title text-3xl! sm:text-5xl! lg:text-6xl! text-white">
                {event.eventName}
              </h1>
            </div>
          </div>

          {/* Date Box */}
          <div className="hidden md:block">
            <div className="border-2 border-white rounded-2xl px-6 py-3 bg-black/50 rotate-2 transform hover:rotate-0 transition-transform duration-300"
              style={{ filter: 'url(#wobbly-border)' }}>
              <p className="text-sm uppercase tracking-widest text-gray-400">Date</p>
              <p className="text-2xl font-bold">{event.date}</p>
              <p className="text-sm text-yellow-400">{formatEventTime(event.time)}</p>
            </div>
          </div>
        </div>


        {/* MIDDLE ROW: Layout Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SPACER (For visual balance with Dial) */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* CENTER: Instructions / Description */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            <div className="block md:hidden mb-4">
              <div className="border-2 border-white rounded-xl px-4 py-2 bg-black/50 text-center">
                <p className="font-bold">{event.date} • {formatEventTime(event.time)}</p>
              </div>
            </div>

            <HandDrawnCard className="min-h-[400px] flex flex-col p-6 sm:p-10 relative group">
              <h2 className="text-2xl font-bold mb-6 text-yellow-400 uppercase tracking-wider">Mission Instructions</h2>

              <div className="prose prose-invert max-w-none flex-1 overflow-y-auto pr-2 custom-scrollbar text-lg leading-relaxed">
                <p>{event.description}</p>

                {event.isTeamEvent && (
                  <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                    <p className="text-blue-300 font-bold mb-1">Team Mission</p>
                    <p className="text-sm">Members: {event.minMembersPerTeam} - {event.maxMembersPerTeam}</p>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {event.category && (
                    <div className="p-3 bg-white/5 rounded">
                      <span className="text-xs text-gray-400 block uppercase">Category</span>
                      <span className="font-mono text-purple-300">{event.category}</span>
                    </div>
                  )}
                  <div className="p-3 bg-white/5 rounded">
                    <span className="text-xs text-gray-400 block uppercase">Venue</span>
                    <span className="font-mono">{event.venue}</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded">
                    <span className="text-xs text-gray-400 block uppercase">Prize Pool</span>
                    <span className="font-mono text-yellow-400">{event.prizePool}</span>
                  </div>
                  {event.duration && (
                    <div className="p-3 bg-white/5 rounded">
                      <span className="text-xs text-gray-400 block uppercase">Duration</span>
                      <span className="font-mono">{event.duration}</span>
                    </div>
                  )}
                  <div className="p-3 bg-white/5 rounded">
                    <span className="text-xs text-gray-400 block uppercase">Entry Fee</span>
                    <span className="font-mono text-green-400">
                      {event.isPaidEvent ? `₹${event.fees}` : 'Free'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center sticky bottom-0 pt-4 bg-gradient-to-t from-black/90 to-transparent">
                <button className="hand-drawn-button text-xl px-12 py-4 bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                  COMING SOON
                </button>
              </div>
            </HandDrawnCard>

            <button
              onClick={() => router.back()}
              className="hidden md:flex hand-drawn-button w-max px-6 py-3 items-center gap-3 self-start hover:-translate-x-2 transition-transform"
            >
              <span className="text-2xl">←</span> <span>Back</span>
            </button>
          </div>

          {/* RIGHT COLUMN: Actions & Rules */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Rules Button/Card */}
            <button
              onClick={() => setShowRules(true)}
              className="group relative"
            >
              <HandDrawnCard className="p-6 transition-transform group-hover:-translate-y-1 bg-blue-900/20 group-hover:bg-blue-900/40 border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold uppercase">Rules & <br />Regulations</span>
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
                    <ScrollText />
                  </div>
                </div>
              </HandDrawnCard>
            </button>

            {/* POC Button/Card */}
            {event.pocs && event.pocs.length > 0 && (
              <button
                onClick={() => setShowPoc(true)}
                className="group relative"
              >
                <HandDrawnCard className="p-6 transition-transform group-hover:-translate-y-1 bg-green-900/20 group-hover:bg-green-900/40 border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold uppercase">Contact <br />POCs</span>
                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
                      <MessageSquare />
                    </div>
                  </div>
                </HandDrawnCard>
              </button>
            )}

            {/* Organized By Card */}
            {event.clubs && event.clubs.length > 0 && (
              <HandDrawnCard className="p-6 bg-purple-900/20 border-purple-300">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 text-center">Organized By</p>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl font-bold text-purple-200 uppercase tracking-wide">
                    {event.clubs[0]}
                  </span>
                  {event.clubs.length > 1 && (
                    <>
                      <span className="text-sm text-gray-500 font-mono">✕</span>
                      <span className="text-2xl font-bold text-purple-200 uppercase tracking-wide">
                        {event.clubs[1]}
                      </span>
                    </>
                  )}
                </div>
              </HandDrawnCard>
            )}

          </div>

        </div>
      </main>

      {/* MODALS */}
      {showRules && (
        <RulesModal
          rules={event.rules}
          onClose={() => setShowRules(false)}
        />
      )}

      {showPoc && (
        <PocModal
          pocs={event.pocs}
          onClose={() => setShowPoc(false)}
        />
      )}
    </div>
  );
};

export default EventPage;
