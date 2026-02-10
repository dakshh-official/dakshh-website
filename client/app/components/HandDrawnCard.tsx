import React from 'react';

interface HandDrawnCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HandDrawnCard({ children, className = '' }: HandDrawnCardProps) {
  return (
    <div className={`hand-drawn-card ${className}`}>
      {children}
    </div>
  );
}
