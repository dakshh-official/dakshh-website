"use client";

import HandDrawnCard from "@/app/components/HandDrawnCard";
import { useEffect } from "react";

interface InactiveEventModalProps {
  open: boolean;
  onClose: () => void;
  eventDate?: string;
}

const InactiveEventModal = ({
  open,
  onClose,
  eventDate = "the 13th",
}: InactiveEventModalProps) => {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full min-w-0 max-w-lg my-auto z-10 animate-scaleIn shrink-0">
        <HandDrawnCard className="p-0 overflow-hidden bg-zinc-900/90 border-2 border-white/80">
          <div className="bg-amber-600/90 px-4 py-3 sm:p-4 border-b-2 border-white/50">
            <h2 className="text-sm sm:text-base md:text-xl font-bold text-white uppercase tracking-wider hand-drawn-title text-left! break-words">
              Lobby is full
            </h2>
          </div>
          <div className="p-4 sm:p-6 max-h-[50vh] sm:max-h-none overflow-y-auto">
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed break-words">
              Game&apos;s starting — are you gonna be an imposter or a crewmate?
              Join us on {eventDate} to find out.
            </p>
          </div>
          <div className="px-4 py-3 sm:p-4 border-t-2 border-white/20 flex justify-end bg-black/40">
            <button
              onClick={onClose}
              className="hand-drawn-button px-6 py-2.5 sm:py-2 text-sm bg-zinc-700 hover:bg-zinc-600 border-zinc-400 w-full sm:w-auto min-w-[120px]"
            >
              Got it
            </button>
          </div>
        </HandDrawnCard>
      </div>
    </div>
  );
};

export default InactiveEventModal;
