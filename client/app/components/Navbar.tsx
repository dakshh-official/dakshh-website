'use client';

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Events', href: '#events' },
    { name: 'Stats', href: '#stats' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-1400 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
            <a href="#home" className="text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-cyan transition-colors">
              DAKSHH
            </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hand-drawn-button text-xs xl:text-sm"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.7)',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.85rem'
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            className="lg:hidden hand-drawn-button px-2 py-1.5 sm:px-3 sm:py-2"
            style={{ 
              background: 'rgba(0, 0, 0, 0.7)',
              minWidth: 'auto',
              padding: '0.5rem 0.75rem'
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="text-white text-lg sm:text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile/Tablet Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 sm:mt-4 hand-drawn-card p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-cyan transition-colors py-2 sm:py-3 px-3 sm:px-4 border-b-2 border-white/20 text-sm sm:text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
