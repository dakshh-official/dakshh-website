import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-2 sm:py-4 md:py-6 border-t-2 sm:border-t-3 md:border-t-4 border-white mt-8 sm:mt-12 md:mt-16 text-left">
      <div className="max-w-1400 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-6 sm:mb-7 md:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-left">
              DAKSHH
            </h3>
            <p className="text-white/70 text-xs sm:text-sm">
              A premier tech festival by Heritage Institute of Technology,
              Kolkata. Building the next generation of innovators.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-left">
              Quick Links
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-white/70 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-cyan transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="hover:text-cyan transition-colors"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-cyan transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/seminars"
                  className="hover:text-cyan transition-colors"
                >
                  Seminars
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-left">
              Contact
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mb-2">
              Heritage Institute of Technology
              <br />
              Kolkata, West Bengal
            </p>
            <p className="text-white/70 text-xs sm:text-sm">
              hitkdakshhoc@gmail.com
              <br />
              +91 9434883745
            </p>
          </div>
        </div>
        <div className="pt-6 sm:pt-7 md:pt-8 border-t-2 border-white/20">
          <p className="text-white/60 text-xs sm:text-sm text-center sm:text-left">
            © 2026 DAKSHH Tech Fest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
