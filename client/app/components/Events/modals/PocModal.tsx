'use client';

import HandDrawnCard from '@/app/components/HandDrawnCard';
import { Phone, User, X, MessageSquare } from 'lucide-react';
import { useEffect } from 'react';

const PocModal = ({ pocs, onClose }: any) => {

    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-lg z-10 animate-scaleIn">
                <HandDrawnCard className="p-0 overflow-hidden bg-zinc-900/90 border-2 border-white/80">

                    {/* Header */}
                    <div className="bg-green-600/90 p-4 border-b-2 border-white/50 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-base sm:text-xl font-bold text-white uppercase tracking-wider hand-drawn-title !text-left break-words text-center item-center ">
                                Comms
                            </h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {(!pocs || pocs.length === 0) ? (
                            <p className="text-gray-400 text-center italic">No points of contact available.</p>
                        ) : (
                            <div className="grid gap-4">
                                {pocs.map((poc: any, i: number) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                                <User className="w-5 h-5 text-blue-300" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-white font-bold break-words">{poc.name}</p>
                                                <p className="text-xs text-gray-400 uppercase tracking-widest break-words">
                                                    Event Convener
                                                </p>
                                                <p className="text-xs text-gray-400 uppercase tracking-widest break-words">
                                                    {poc.mobile}
                                                </p>
                                            </div>
                                        </div>
                                        <a href={`tel:${poc.mobile}`} className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center hover:bg-green-500/40 transition-colors shrink-0 mx-2" title="Call">
                                            <Phone className="w-5 h-5 text-green-300" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t-2 border-white/20 flex justify-end bg-black/40">
                        <button
                            onClick={onClose}
                            className="hand-drawn-button px-6 py-2 text-sm bg-zinc-700 hover:bg-zinc-600 border-zinc-400 w-full sm:w-auto"
                        >
                            Close Comms
                        </button>
                    </div>

                </HandDrawnCard>
            </div>
        </div>
    );
};

export default PocModal;