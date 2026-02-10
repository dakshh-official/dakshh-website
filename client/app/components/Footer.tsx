import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 border-t-4 border-white mt-16 text-left">
      <div className="max-w-1400 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 text-left">DAKSHH</h3>
            <p className="text-white/70 text-sm">
              A premier tech festival by Heritage Institute of Technology, Kolkata.
              Building the next generation of innovators.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4 text-left">Quick Links</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#" className="hover:text-cyan transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-cyan transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-cyan transition-colors">Schedule</a></li>
              <li><a href="#" className="hover:text-cyan transition-colors">Sponsors</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4 text-left">Contact</h3>
            <p className="text-white/70 text-sm mb-2">
              Heritage Institute of Technology<br />
              Kolkata, West Bengal
            </p>
            <p className="text-white/70 text-sm">
              contact@dakshh-hitk.com<br />
              +91 9110966189
            </p>
          </div>
        </div>
        <div className="pt-8 border-t-2 border-white/20">
          <p className="text-white/60 text-sm">
            © 2026 DAKSHH Tech Fest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
