'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

const PARTICLE_COUNT = 30;

export default function NumberCounter() {
  const [number, setNumber] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate random particle data only once on the client
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 2 + Math.random() * 3,
    }));
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setNumber(prev => prev + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.animationDelay}s`,
              animationDuration: `${p.animationDuration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content - Big centered number, responsive */}
      <div className="relative z-10 text-center w-full flex items-center justify-center">
        <div className="font-bold text-black animate-glow animate-swipe select-none leading-none truncate w-full"
          style={{
            fontSize: 'clamp(4rem, 25vw, 20rem)',
            maxWidth: '100vw',
            wordBreak: 'break-all',
          }}
        >
          {number}
        </div>
      </div>
    </div>
  );
}
