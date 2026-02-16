"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeUnit({
  value,
  label,
  showColonAfter,
}: {
  value: number;
  label: string;
  showColonAfter?: boolean;
}) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="bg-black/80 border-2 border-red rounded-lg px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 min-w-17.5 sm:min-w-20 md:min-w-22.5 lg:min-w-25">
            <motion.span
              key={value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white block text-center hand-drawn-title"
              style={{
                textShadow:
                  "0 0 10px rgba(255, 70, 85, 0.8), 0 0 20px rgba(255, 70, 85, 0.5)",
                fontWeight: 900,
              }}
            >
              {value.toString().padStart(2, "0")}
            </motion.span>
          </div>
          {/* Decorative corner pieces */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan" />
        </div>
        <span className="text-xs sm:text-sm md:text-base text-cyan mt-2 uppercase tracking-wider font-semibold">
          {label}
        </span>
      </div>
      {showColonAfter && (
        <span
          className="text-red text-2xl sm:text-3xl md:text-4xl font-bold self-start pt-5 sm:pt-6 md:pt-7"
          style={{
            textShadow: "0 0 10px rgba(255, 70, 85, 0.6)",
          }}
        >
          :
        </span>
      )}
    </motion.div>
  );
}

function FloatingCrewmate({
  delay,
  side,
}: {
  delay: number;
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      animate={{
        opacity: [0.6, 1, 0.6],
        x: 0,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 2, repeat: Infinity, delay },
        y: { duration: 3, repeat: Infinity, delay, ease: "easeInOut" },
      }}
      className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-0" : "right-0"} hidden sm:block`}
      style={{
        [side]: "-20px",
        zIndex: 10,
      }}
    >
      {/* <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
        <Image
          src={side === "left" ? "/peeking.png" : "/peeking2.png"}
          alt="Crewmate"
          fill
          className="object-contain"
          style={{
            transform: side === "right" ? "scaleX(-1)" : undefined,
          }}
        />
      </div> */}
    </motion.div>
  );
}

export default function CountdownTimer({
  targetDate,
  title = "MISSION STARTS IN",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate),
  );
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative hand-drawn-text"
      >
        <div className="bg-black/80 border-3 border-red rounded-2xl px-8 py-6 md:px-12 md:py-8">
          <h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-red"
            style={{
              textShadow: "0 0 20px rgba(255, 70, 85, 0.8)",
              fontFamily: "var(--font-space-grotesk), sans-serif",
            }}
          >
            🚨 EVENT LIVE! 🚨
          </h3>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      {/* Emergency meeting header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6 md:mb-8"
      >
        <div className="inline-flex items-center gap-2 sm:gap-3">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            🚨
          </motion.span>
          <h3
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red uppercase tracking-wider"
            style={{
              textShadow:
                "0 0 15px rgba(255, 70, 85, 0.7), 0 0 30px rgba(255, 70, 85, 0.4)",
              fontFamily: "var(--font-space-grotesk), sans-serif",
              filter: "url(#wobbly-text)",
            }}
          >
            {title}
          </h3>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            🚨
          </motion.span>
        </div>
      </motion.div>

      {/* Timer display */}
      <div className="relative">
        <FloatingCrewmate delay={0} side="left" />
        <FloatingCrewmate delay={1} side="right" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-start gap-2 sm:gap-3 md:gap-4 lg:gap-6"
        >
          <TimeUnit value={timeLeft.days} label="Days" showColonAfter />
          <TimeUnit value={timeLeft.hours} label="Hours" showColonAfter />
          <TimeUnit value={timeLeft.minutes} label="Mins" showColonAfter />
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </motion.div>
      </div>

      {/* Pulsing emergency line */}
      {/* <motion.div
        animate={{
          boxShadow: ["0 0 5px #FF4655", "0 0 20px #FF4655", "0 0 5px #FF4655"],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-red rounded-full mt-4"
        style={{ maxWidth: "80%", margin: "1rem auto 0" }}
      /> */}
    </div>
  );
}
