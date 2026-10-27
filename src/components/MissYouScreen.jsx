import React, { useState, useRef, useEffect, useCallback } from 'react';

// Predefined safe, non-overlapping escape slots inside the button zone
// The YES button is on the left (col 1, row 1), so slots 1 to 5 place NO away from YES:
// Slot 0: default right slot next to YES
// Slot 1: far right shifted up
// Slot 2: bottom right
// Slot 3: bottom center
// Slot 4: bottom left below YES
// Slot 5: top right above
const ESCAPE_OFFSETS = [
  { x: 0, y: 0, rotate: 0 },         // 0: default
  { x: 40, y: -45, rotate: 6 },      // 1: top right
  { x: 30, y: 55, rotate: -6 },      // 2: bottom right
  { x: -75, y: 55, rotate: 5 },      // 3: bottom center
  { x: -160, y: 55, rotate: -5 },    // 4: bottom left (safely below YES)
  { x: -35, y: -50, rotate: -4 },    // 5: top center/right
  { x: 45, y: 15, rotate: 8 },       // 6: right edge
  { x: -130, y: -48, rotate: 6 },    // 7: top left
];

export default function MissYouScreen({ onProceedToInvitation }) {
  // state: null | 'yes' | 'no'
  const [response, setResponse] = useState(null);

  // Index into safe escape positions (0 is initial position next to YES button)
  const [slotIndex, setSlotIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const lastEscapeTimeRef = useRef(0);
  const containerRef = useRef(null);
  const noBtnRef = useRef(null);

  // Escaping trigger: selects the next safe, clearly distinct offset
  const triggerEscape = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (response === 'yes') return;

    const now = Date.now();
    if (now - lastEscapeTimeRef.current < 160) {
      return; // prevent event spamming within 160ms
    }
    lastEscapeTimeRef.current = now;

    setIsJumping(true);

    // Pick a new slot different from current
    setSlotIndex((prevIndex) => {
      // Pick randomly from slots 1..7 (avoiding 0 and current slot)
      let next;
      do {
        next = 1 + Math.floor(Math.random() * (ESCAPE_OFFSETS.length - 1));
      } while (next === prevIndex && ESCAPE_OFFSETS.length > 2);
      return next;
    });

    setTimeout(() => {
      setIsJumping(false);
    }, 280);
  }, [response]);

  const handleYesClick = () => {
    setResponse('yes');
    // Return NO button to default position once YES is clicked
    setSlotIndex(0);
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    triggerEscape(e);
  };

  const currentOffset = ESCAPE_OFFSETS[slotIndex] || ESCAPE_OFFSETS[0];

  return (
    <main className="lock-page-wrapper">
      <div className="miss-you-card">
        {/* Cute Central Illustration */}
        <div className="cute-illustration-container" aria-hidden="true">
          <div className="illustration-glow" />
          <div className="illustration-bubble">
            <span className="illustration-teddy">🧸</span>
            <span className="illustration-heart">💗</span>
            <span className="illustration-sparkle-star">✨</span>
            <span className="illustration-mini-star">⭐</span>
          </div>
        </div>

        {/* Headings */}
        <div className="miss-you-header">
          <h1 className="miss-you-main-title">Hey, Sissyyy! 💗</h1>
          <p className="miss-you-subtitle">I have a little question for you...</p>
          <h2 className="miss-you-question">Do you miss me? 🥺💕</h2>
        </div>

        {/* Action Buttons Zone: Dedicated Relative Container */}
        <div ref={containerRef} className="interactive-button-stage">
          {/* YES Button: Stays firmly in place */}
          <button
            type="button"
            className="yes-btn"
            onClick={handleYesClick}
            aria-label="Yes, of course!"
          >
            <span>Yes, of course! 💗</span>
          </button>

          {/* NO Button Anchor: Holds flow layout position */}
          <div className="no-btn-slot">
            <button
              ref={noBtnRef}
              type="button"
              className={`no-btn ${slotIndex !== 0 ? 'escaped-active' : ''} ${
                isJumping ? 'escaping-jump' : ''
              }`}
              style={{
                transform: `translate3d(${currentOffset.x}px, ${currentOffset.y}px, 0) rotate(${currentOffset.rotate}deg)`,
              }}
              onMouseEnter={triggerEscape}
              onPointerDown={triggerEscape}
              onTouchStart={triggerEscape}
              onClick={handleNoClick}
              aria-label="Nope"
            >
              <span>Nope 🙈</span>
            </button>
          </div>
        </div>

        {/* Inline Response Card */}
        {response === 'yes' && (
          <div className="response-box response-yes" role="status" aria-live="polite">
            <div className="response-hearts-decor" aria-hidden="true">
              <span>💗</span>
              <span>✨</span>
              <span>💖</span>
            </div>
            <h3 className="response-title">I KNEW ITTT! 🥹💗</h3>
            <p className="response-text">
              Sending you the biggest hug ever, akka! 🤗💕
            </p>

            {/* Seamless bridge to Sankranti invitation */}
            <div className="surprise-btn-wrapper">
              <button
                type="button"
                className="one-more-surprise-btn"
                onClick={onProceedToInvitation}
              >
                <span>One more surprise for you... 🪁✨</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom subtle footer */}
        <div className="bottom-signature">
          Made with ♡ just for you, akka 🎀
        </div>
      </div>

      <div className="bottom-decorative-line">
        psst... this little world is waiting for you 🎀
      </div>
    </main>
  );
}
