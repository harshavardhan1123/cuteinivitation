import React, { useState } from 'react';

export default function SankrantiCelebration({ onBackToInvitation }) {
  const [extraHugGiven, setExtraHugGiven] = useState(false);

  // Confetti particles for short celebratory animation
  const confettiKites = [
    { id: 1, symbol: '🪁', x: -80, y: -70 },
    { id: 2, symbol: '💗', x: 85, y: -80 },
    { id: 3, symbol: '✨', x: -110, y: 30 },
    { id: 4, symbol: '💖', x: 100, y: 40 },
    { id: 5, symbol: '🪁', x: -60, y: 90 },
    { id: 6, symbol: '💕', x: 70, y: 85 },
    { id: 7, symbol: '☀️', x: 0, y: -105 },
    { id: 8, symbol: '🪁', x: 110, y: -20 },
  ];

  return (
    <main className="lock-page-wrapper">
      <div className="sankranti-celebration-card">
        {/* Short festive burst */}
        <div className="celebration-burst" aria-hidden="true">
          {confettiKites.map((p) => (
            <span
              key={p.id}
              className="burst-particle"
              style={{
                '--bx': `${p.x}px`,
                '--by': `${p.y}px`,
                '--br': '15deg',
              }}
            >
              {p.symbol}
            </span>
          ))}
        </div>

        {/* Central Festivity Badge */}
        <div className="celebration-badge-container" aria-hidden="true">
          <div className="celebration-ring" />
          <div className="celebration-icon-bubble">
            <span className="celebration-big-kite">🪁</span>
            <span className="celebration-heart-mini">💖</span>
          </div>
        </div>

        {/* Headings */}
        <div className="celebration-header">
          <h1 className="celebration-heading">AKKAAA, YAYYYYY! 😭❤️</h1>
          <p className="celebration-subheading">Best Sankranti ever is loading... 🪁💗</p>
        </div>

        {/* Heartfelt celebration message */}
        <div className="celebration-message-box">
          <p className="celebration-p">
            I can't wait to see you, spend time together, and celebrate Sankranti as a family.
          </p>
          <p className="celebration-p">
            Home is going to feel extra special with you here.
          </p>
          <p className="celebration-p highlight-p">
            Already waiting for your big hug, Akka! 🫂💕
          </p>
        </div>

        {/* "One More Hug!" Button & Message */}
        <div className="one-more-hug-section">
          <button
            type="button"
            className="hug-btn"
            onClick={() => setExtraHugGiven(true)}
          >
            <span>One More Hug! 🫂</span>
          </button>

          {extraHugGiven && (
            <div className="extra-hug-message" role="status" aria-live="polite">
              <span>Sending you the biggest virtual hug ever! 🤗💗</span>
            </div>
          )}
        </div>

        {/* Back to invitation link button */}
        <div className="celebration-back-wrapper">
          <button
            type="button"
            className="back-to-invite-btn"
            onClick={onBackToInvitation}
          >
            ← View Invitation Details
          </button>
        </div>

        {/* Bottom subtle signature */}
        <div className="bottom-signature">
          Made with ♡ just for you, akka 🎀
        </div>
      </div>

      <div className="bottom-decorative-line">
        counting down the days until Sankranti! 🪁🏡❤️
      </div>
    </main>
  );
}
