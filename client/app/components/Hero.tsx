"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LandingEjection from "./LandingEjection";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, letterVariants } from "@/constants/animation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

const ANIMATIONS_SEEN_KEY = "dakshh_animations_seen";

// Custom hook to safely check if component is mounted on client
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function Hero() {
  const { status } = useSession();
  const isMounted = useIsMounted();
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const [displayHeroSection, setDisplayHeroSection] = useState(false);
  const [shouldShowEjection, setShouldShowEjection] = useState(false);

  // Run ONLY on client after mount
  useEffect(() => {
    let animationsSeen = false;
    try {
      animationsSeen = sessionStorage.getItem(ANIMATIONS_SEEN_KEY) === "true";
    } catch {
      animationsSeen = false;
    }

    if (animationsSeen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayHeroSection(true);
      setShouldShowEjection(false);
      return;
    }

    // We want the ejection to start only after SpaceLoader finishes.
    const startEjection = () => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldShowEjection(true);
    };

    if (document.body.classList.contains("loader-complete")) {
      startEjection();
      return;
    }

    const onLoaderComplete = () => {
      window.removeEventListener("dakshh:loaderComplete", onLoaderComplete);
      startEjection();
    };

    window.addEventListener("dakshh:loaderComplete", onLoaderComplete);
    return () => {
      window.removeEventListener("dakshh:loaderComplete", onLoaderComplete);
    };
  }, []);

  const handleEjectionComplete = () => {
    try {
      sessionStorage.setItem(ANIMATIONS_SEEN_KEY, "true");
    } catch {
      // Ignore storage write failures.
    }
    setDisplayHeroSection(true);
    setShouldShowEjection(false);
  };

  const handleViewAllClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);

    setTimeout(() => {
      router.push("/events");
    }, 1000);
  };

  // 🚨 Prevent SSR/CSR mismatch
  if (!isMounted) return null;

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 md:pt-20 px-4 sm:px-6 lg:px-8">
      {shouldShowEjection && (
        <LandingEjection setDisplayHeroSection={handleEjectionComplete} />
      )}

      {isNavigating && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
          <div className="relative p-8 rounded-2xl flex flex-col items-center">
            <Image
              src="/venting-in.gif"
              alt="Loading Events"
              className="object-contain drop-shadow-2xl"
              height={120}
              width={120}
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {displayHeroSection && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center z-10 w-full max-w-4xl mx-auto"
          >
            <div className="hand-drawn-card inline-block mb-6 md:mb-8 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:px-12 lg:py-10 xl:px-16 xl:py-12">
              <motion.h1
                className="hand-drawn-title text-white mb-3 md:mb-4 lg:mb-6 flex justify-center overflow-hidden"
                style={{ letterSpacing: "0.1em" }}
              >
                {"DAKSHH".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                    whileHover={{
                      scale: 1.2,
                      color: "#00ffff",
                      rotate: index % 2 === 0 ? 5 : -5,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <span className="text-cyan text-3xl font-bold mb-2 lg:mb-3">
                Tech Fest 2026
              </span>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-yellow font-semibold">
                Heritage Institute of Technology, Kolkata
              </p>
            </div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-6 md:mb-8"
            >
              <CountdownTimer
                targetDate={new Date("2026-03-13T09:00:00")}
                title="Event Starts In"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 md:mt-8"
            >
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white/90 max-w-2xl mx-auto px-4">
                A premier tech festival building the next generation of
                innovators
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center flex-wrap px-4">
                <button
                  onClick={handleViewAllClick}
                  className="hand-drawn-button w-full sm:w-auto text-sm sm:text-base px-6 py-3 md:px-8 md:py-4 text-center no-underline"
                >
                  Browse Events
                </button>

                {status !== "authenticated" && (
                  <Link
                    href="/auth"
                    className="hand-drawn-button w-full sm:w-auto text-sm sm:text-base px-6 py-3 md:px-8 md:py-4 text-center no-underline"
                    style={{ background: "rgba(0, 0, 255, 0.9)" }}
                  >
                    Join the Room
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
