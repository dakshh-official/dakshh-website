'use client';

import HandDrawnCard from '@/app/components/HandDrawnCard';
import { BookOpen, CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

const RulesModal = ({ rules = [], onClose }: any) => {

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
                    <div className="bg-red-600/90 p-4 border-b-2 border-white/50 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-base sm:text-xl font-bold text-white uppercase tracking-wider hand-drawn-title !text-left break-words">
                                Rules & Regs
                            </h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {(!rules || rules.length === 0) ? (
                            <p className="text-gray-400 text-center italic">No specific rules mentioned.</p>
                        ) : (
                            <ul className="space-y-4">
                                {rules.map((rule: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-200">
                                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                        <span className="font-medium break-words">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t-2 border-white/20 flex justify-end bg-black/40">
                        <button
                            onClick={onClose}
                            className="hand-drawn-button px-6 py-2 text-sm bg-zinc-700 hover:bg-zinc-600 border-zinc-400 w-full sm:w-auto"
                        >
                            Understood
                        </button>
                    </div>

                </HandDrawnCard>
            </div>
        </div>
    );
};

export default RulesModal;