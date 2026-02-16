'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useEffect, useState, useRef } from 'react';

interface Event {
    _id: string;
    eventName: string;
    category: string;
    banner?: string;
}

interface DialCarouselProps {
    events: Event[];
    activeId: string;
}

const DialCarousel = ({ events, activeId }: DialCarouselProps) => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const mobileScrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Constants
    const ITEM_SIZE = 60;
    const RADIUS = 180;
    const ANGLE_PER_ITEM = 360 / Math.max(events.length, 1);

    // Local state for the visually selected item
    const [visualActiveIndex, setVisualActiveIndex] = useState(() => {
        const idx = events.findIndex(e => e._id === activeId);
        return idx !== -1 ? idx : 0;
    });

    // Update visual index if external activeId changes
    useEffect(() => {
        const targetIndex = events.findIndex(e => e._id === activeId);
        if (targetIndex !== -1) {
            setVisualActiveIndex(prev => {
                const len = events.length;
                if (len === 0) return 0;
                const currentEffective = ((prev % len) + len) % len;
                let diff = targetIndex - currentEffective;
                if (diff > len / 2) diff -= len;
                if (diff < -len / 2) diff += len;
                return prev + diff;
            });
        }
    }, [activeId, events]);

    // Scroll accumulator for smooth desktop wheel handling
    const scrollAccumulator = useRef(0);
    const SCROLL_THRESHOLD = 300;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            scrollAccumulator.current += e.deltaY;

            if (scrollAccumulator.current > SCROLL_THRESHOLD) {
                setVisualActiveIndex(prev => prev + 1);
                scrollAccumulator.current = 0;
            } else if (scrollAccumulator.current < -SCROLL_THRESHOLD) {
                setVisualActiveIndex(prev => prev - 1);
                scrollAccumulator.current = 0;
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    // Auto-scroll mobile strip to active item
    useEffect(() => {
        if (!mobileScrollRef.current) return;
        const activeBtn = mobileScrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
        if (activeBtn) {
            activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }, [activeId]);

    const targetRotation = -visualActiveIndex * ANGLE_PER_ITEM;
    const len = events.length;
    const normalizedActiveIndex = len > 0 ? ((visualActiveIndex % len) + len) % len : 0;

    return (
        <>
            {/* Dark blur overlay on hover */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 pointer-events-none hidden sm:block ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* ===== DESKTOP: Dial Carousel (hidden on small screens) ===== */}
            <div
                ref={containerRef}
                className="fixed left-[-160px] top-[75%] -translate-y-1/2 w-[320px] z-50 hidden sm:flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-500 ease-out"
                style={{
                    height: '320px',
                    transform: isHovered
                        ? 'translateY(-50%) scale(2.2)'
                        : 'translateY(-50%) scale(1)',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="w-[280px] h-[280px] rounded-full bg-black/60 backdrop-blur-md relative border-4 border-white"
                    style={{
                        filter: 'url(#wobbly-border)',
                        transformOrigin: "center center"
                    }}
                    animate={{ rotate: targetRotation }}
                    transition={{ type: "spring", stiffness: 45, damping: 15 }}
                >
                    {/* Center Decoration */}
                    <div className="absolute inset-0 m-auto w-24 h-24 rounded-full border-2 border-dashed border-white/20" />

                    {/* Items */}
                    {events.map((event, index) => {
                        const angle = index * ANGLE_PER_ITEM;
                        const isActive = index === normalizedActiveIndex;

                        return (
                            <motion.button
                                key={String(event._id)}
                                className={`
                                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                    w-14 h-14 rounded-full flex items-center justify-center
                                    border-2 transition-all duration-300
                                    ${featuredColor(event.category, isActive)}
                                `}
                                style={{
                                    rotate: `${angle}deg`,
                                    x: `${RADIUS * 0.8}px`,
                                }}
                                transformTemplate={({ rotate, x, scale }) => `rotate(${rotate}) translateX(${x}) scale(${scale})`}
                                onClick={() => {
                                    router.push(`/events/${event._id}`);
                                    setVisualActiveIndex(prev => {
                                        const currentEffective = ((prev % len) + len) % len;
                                        let diff = index - currentEffective;
                                        if (diff > len / 2) diff -= len;
                                        if (diff < -len / 2) diff += len;
                                        return prev + diff;
                                    });
                                }}
                                animate={{ scale: isActive ? 1.25 : 1 }}
                                whileHover={{ scale: isActive ? 1.35 : 1.15 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div
                                    className="w-full h-full rounded-full overflow-hidden"
                                    style={{ transform: `rotate(${-angle - targetRotation}deg)` }}
                                >
                                    {event.banner ? (
                                        <img
                                            src={event.banner}
                                            alt={event.eventName}
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[9px] font-bold text-center p-1 leading-tight">
                                            <span className="line-clamp-2">{event.eventName}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>

            {/* ===== MOBILE: Horizontal scrollable strip at bottom ===== */}
            <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
                {/* Gradient fade on edges */}
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={mobileScrollRef}
                        className="flex gap-2 overflow-x-auto px-4 py-3 bg-black/80 backdrop-blur-md border-t border-white/10 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {events.map((event) => {
                            const isActive = event._id === activeId;
                            return (
                                <button
                                    key={String(event._id)}
                                    data-active={isActive}
                                    onClick={() => router.push(`/events/${event._id}`)}
                                    className={`
                                        flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold
                                        border-2 transition-all duration-200 whitespace-nowrap
                                        ${isActive
                                            ? 'bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.6)] scale-105'
                                            : `${mobileColor(event.category)} hover:scale-105`
                                        }
                                    `}
                                >
                                    {event.eventName}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

// Helper for desktop dial colors
const featuredColor = (cat: string, active: boolean) => {
    if (active) return "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20 ring-2 ring-black";

    switch (cat) {
        case 'Software': return "bg-blue-900/90 text-blue-100 border-blue-400";
        case 'Hardware': return "bg-orange-900/90 text-orange-100 border-orange-400";
        case 'Entrepreneurship': return "bg-green-900/90 text-green-100 border-green-400";
        case 'Gaming': return "bg-purple-900/90 text-purple-100 border-purple-400";
        default: return "bg-gray-900/90 text-gray-100 border-gray-400";
    }
}

// Helper for mobile pill colors
const mobileColor = (cat: string) => {
    switch (cat) {
        case 'Software': return "bg-blue-900/80 text-blue-100 border-blue-400/60";
        case 'Hardware': return "bg-orange-900/80 text-orange-100 border-orange-400/60";
        case 'Entrepreneurship': return "bg-green-900/80 text-green-100 border-green-400/60";
        case 'Gaming': return "bg-purple-900/80 text-purple-100 border-purple-400/60";
        default: return "bg-gray-900/80 text-gray-100 border-gray-400/60";
    }
}

export default DialCarousel;
