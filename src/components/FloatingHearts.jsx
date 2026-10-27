import React, { useMemo } from 'react';

const HEART_SYMBOLS = ['💗', '💕', '💖', '💘', '🤍'];

export default function FloatingHearts({ count = 22 }) {
  // Generate randomized, deterministic properties for smooth floating hearts
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const symbol = HEART_SYMBOLS[i % HEART_SYMBOLS.length];
      const left = Math.floor((i / count) * 100) + (Math.random() * 8 - 4);
      const size = 16 + Math.floor(Math.random() * 26); // 16px to 42px
      const duration = 12 + Math.random() * 16; // 12s to 28s
      const delay = Math.random() * 12; // staggered appearance
      const opacity = (0.25 + Math.random() * 0.45).toFixed(2);
      const blur = Math.random() > 0.65 ? Math.random() * 2 : 0;
      const driftX = (Math.random() * 80 - 40).toFixed(0);
      const rotation = (Math.random() * 60 - 30).toFixed(0);

      return {
        id: i,
        symbol,
        left: Math.max(2, Math.min(96, left)),
        size,
        duration,
        delay,
        opacity,
        blur,
        driftX,
        rotation,
      };
    });
  }, [count]);

  // Generate a few tiny background sparkle points
  const sparkles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      top: Math.random() * 95,
      left: Math.random() * 95,
      size: 3 + Math.random() * 4,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="background-container" aria-hidden="true">
      {/* Soft blurred ambient glow orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      {/* Twinkling sparkles */}
      {sparkles.map((sp) => (
        <div
          key={`sparkle-${sp.id}`}
          className="sparkle-dot"
          style={{
            top: `${sp.top}%`,
            left: `${sp.left}%`,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
            animationDuration: `${sp.duration}s`,
            animationDelay: `${sp.delay}s`,
          }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((h) => (
        <span
          key={`heart-${h.id}`}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            filter: h.blur ? `blur(${h.blur}px)` : 'none',
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            '--target-opacity': h.opacity,
            '--drift-x': `${h.driftX}px`,
            '--rot': `${h.rotation}deg`,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}
