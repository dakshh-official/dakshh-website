'use client';

import Navbar from '@/app/components/Navbar';
import { DotOrbit } from '@paper-design/shaders-react';
import Crewmates from '@/app/components/Crewmates';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import HandDrawnCard from '@/app/components/HandDrawnCard';
import DialCarousel from '@/app/components/Events/DialCarousel';
import RulesModal from '@/app/components/Events/modals/RulesModal';
import PocModal from '@/app/components/Events/modals/PocModal';
import { MessageSquare, ScrollText } from 'lucide-react';

// MOCK DATA
const MOCK_EVENT = {
    _id: 'test-event-id',
    eventName: "IMPOSTER HUNT",
    category: "Gaming",
    banner: "/5.png",
    date: "24 OCT",
    time: "10:00 AM",
    duration: "3 Hours",
    venue: "The Skeld - Cafeteria",
    description: "⚠️ EMERGENCY MEETING CALLED ⚠️\n\nThere is an imposter among us! Join the hunt to identify the saboteur before the reactor melts down. \n\nParticipants will be grouped into teams of 4. Complete tasks around the campus (Electrical, MedBay, Navigation) to earn clues. \n\nBeware: The vents are open.",
    isTeamEvent: true,
    minMembersPerTeam: 3,
    maxMembersPerTeam: 4,
    prizePool: "₹ 15,000",
    isPaidEvent: true,
    fees: 150,
    clubs: ["Gaming Club", "Tech Society"],
    rules: [
        "No venting allowed for Crewmates.",
        "Imposters must sabotage at least one system.",
        "Emergency meetings can only be called once per round.",
        "Ghost crewmates can still complete tasks."
    ],
    pocs: [
        { name: "Red", mobile: "9876543210" },
        { name: "Cyan", mobile: "1234567890" }
    ]
};

const MOCK_ALL_EVENTS = [
    { _id: '1', eventName: 'Code Red', category: 'Software', banner: '/1.png' },
    { _id: '2', eventName: 'Circuit Breaker', category: 'Hardware', banner: '/2.png' },
    { _id: '3', eventName: 'Venture Capital', category: 'Entrepreneurship', banner: '/3.png' },
    { _id: '4', eventName: 'Quiz Whiz', category: 'Quiz', banner: '/4.png' },
    { _id: 'test-event-id', eventName: 'Imposter Hunt', category: 'Gaming', banner: '/5.png' },
    { _id: '5', eventName: 'Robo War', category: 'Hardware', banner: '/6.png' },
    { _id: '6', eventName: 'Design-a-thon', category: 'Design', banner: '/1.png' },
    { _id: '7', eventName: 'Pitch Perfect', category: 'Business', banner: '/2.png' },
    { _id: '8', eventName: 'Capture The Flag', category: 'Cybersecurity', banner: '/3.png' },
    { _id: '9', eventName: 'Data Dash', category: 'Data Science', banner: '/4.png' },
    { _id: '10', eventName: 'AI Workshop', category: 'AI/ML', banner: '/5.png' },
    { _id: '11', eventName: 'Web Weaver', category: 'Web Dev', banner: '/6.png' },
];

const TestEventPage = () => {
    const router = useRouter();
    const [showRules, setShowRules] = useState(false);
    const [showPoc, setShowPoc] = useState(false);

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
            <DialCarousel events={MOCK_ALL_EVENTS} activeId={MOCK_EVENT._id} />

            {/* MAIN CONTENT LAYOUT */}
            <main className="relative z-20 pt-24 sm:pb-12 pb-20 px-4 w-full h-full flex flex-col items-center pt-30">

                {/* TOP ROW: Back - Header - User Profile/Date */}
                <div className="w-full max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">

                    <button
                        onClick={() => router.back()}
                        className="md:hidden hand-drawn-button px-4 py-2 text-sm flex items-center gap-2"
                    >
                        <span>←</span> Back
                    </button>

                    {/* Event Logo + Title */}
                    <div className="flex-1 md:pl-32 flex justify-center md:justify-start">
                        <div className="inline-flex items-center gap-10">
                            {/* Circular Wobbly Logo */}
                            <div
                                className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-6 border-white flex-shrink-0 bg-black/40"
                                style={{ filter: 'url(#wobbly-border)' }}
                            >
                                <img
                                    src={MOCK_EVENT.banner}
                                    alt={MOCK_EVENT.eventName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h1 className="hand-drawn-title text-4xl md:text-6xl text-white">
                                {MOCK_EVENT.eventName}
                            </h1>
                        </div>
                    </div>

                    {/* Date Box */}
                    <div className="hidden md:block">
                        <div className="border-2 border-white rounded-2xl px-6 py-3 bg-black/50 rotate-2 transform hover:rotate-0 transition-transform duration-300"
                            style={{ filter: 'url(#wobbly-border)' }}>
                            <p className="text-sm uppercase tracking-widest text-gray-400">Date</p>
                            <p className="text-2xl font-bold">{MOCK_EVENT.date}</p>
                            <p className="text-sm text-yellow-400">{MOCK_EVENT.time}</p>
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
                                <p className="font-bold">{MOCK_EVENT.date} • {MOCK_EVENT.time}</p>
                            </div>
                        </div>

                        <HandDrawnCard className="min-h-[400px] flex flex-col p-6 sm:p-10 relative group">
                            <h2 className="text-2xl font-bold mb-6 text-yellow-400 uppercase tracking-wider">Mission Instructions</h2>

                            <div className="prose prose-invert max-w-none flex-1 overflow-y-auto pr-2 custom-scrollbar text-lg leading-relaxed whitespace-pre-wrap">
                                <p>{MOCK_EVENT.description}</p>

                                {MOCK_EVENT.isTeamEvent && (
                                    <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                                        <p className="text-blue-300 font-bold mb-1">Team Mission</p>
                                        <p className="text-sm">Members: {MOCK_EVENT.minMembersPerTeam} - {MOCK_EVENT.maxMembersPerTeam}</p>
                                    </div>
                                )}

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-white/5 rounded">
                                        <span className="text-xs text-gray-400 block uppercase">Category</span>
                                        <span className="font-mono text-purple-300">{MOCK_EVENT.category}</span>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded">
                                        <span className="text-xs text-gray-400 block uppercase">Venue</span>
                                        <span className="font-mono">{MOCK_EVENT.venue}</span>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded">
                                        <span className="text-xs text-gray-400 block uppercase">Prize Pool</span>
                                        <span className="font-mono text-yellow-400">{MOCK_EVENT.prizePool}</span>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded">
                                        <span className="text-xs text-gray-400 block uppercase">Duration</span>
                                        <span className="font-mono">{MOCK_EVENT.duration}</span>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded">
                                        <span className="text-xs text-gray-400 block uppercase">Entry Fee</span>
                                        <span className="font-mono text-green-400">
                                            {MOCK_EVENT.isPaidEvent ? `₹${MOCK_EVENT.fees} ` : 'Free'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center sticky bottom-0 bg-gradient-to-t from-black/90 to-transparent">
                                <button className="hand-drawn-button text-xl px-12 pb-4 bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                                    COMING SOON
                                </button>
                            </div>
                        </HandDrawnCard>

                        <button
                            onClick={() => router.back()}
                            className="hidden md:flex hand-drawn-button w-max px-6 py-3 items-center gap-3 self-start hover:-translate-x-2 transition-transform"
                        >
                            <span className="text-2xl">←</span> <span>Abort / Back</span>
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
                                    <span className="text-xl font-bold uppercase">Rules & Regulations</span>
                                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
                                        <ScrollText />
                                    </div>
                                </div>
                            </HandDrawnCard>
                        </button>

                        {/* POC Button/Card */}
                        {MOCK_EVENT.pocs && MOCK_EVENT.pocs.length > 0 && (
                            <button
                                onClick={() => setShowPoc(true)}
                                className="group relative"
                            >
                                <HandDrawnCard className="p-6 transition-transform group-hover:-translate-y-1 bg-green-900/20 group-hover:bg-green-900/40 border-green-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold uppercase">Contact POCs</span>
                                        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
                                            <MessageSquare />
                                        </div>
                                    </div>
                                </HandDrawnCard>
                            </button>
                        )}

                        {/* Decorative Element */}

                        {/* Organized By Card */}
                        {MOCK_EVENT.clubs && MOCK_EVENT.clubs.length > 0 && (
                            <HandDrawnCard className="p-6 bg-purple-900/20 border-purple-300">
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 text-center">Organized By</p>
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-2xl font-bold text-purple-200 uppercase tracking-wide">
                                        {MOCK_EVENT.clubs[0]}
                                    </span>
                                    {MOCK_EVENT.clubs.length > 1 && (
                                        <>
                                            <span className="text-sm text-gray-500 font-mono">✕</span>
                                            <span className="text-2xl font-bold text-purple-200 uppercase tracking-wide">
                                                {MOCK_EVENT.clubs[1]}
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
                    rules={MOCK_EVENT.rules}
                    onClose={() => setShowRules(false)}
                />
            )}

            {showPoc && (
                <PocModal
                    pocs={MOCK_EVENT.pocs}
                    onClose={() => setShowPoc(false)}
                />
            )}
        </div>
    );
};

export default TestEventPage;
