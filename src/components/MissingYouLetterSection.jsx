import React, { useState } from 'react';
import { Mail, Heart } from 'lucide-react';

export default function MissingYouLetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [hugSent, setHugSent] = useState(false);
  const [floatingHugs, setFloatingHugs] = useState([]);

  const handleOpenLetter = () => {
    setIsOpen(true);
  };

  const handleSendHug = () => {
    setHugSent(true);
    // Generate floating hearts
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() * 120 - 60).toFixed(0),
      y: -(Math.random() * 80 + 40).toFixed(0),
      symbol: ['💗', '💖', '🫂', '💕', '✨'][i % 5],
    }));
    setFloatingHugs(newHearts);
    setTimeout(() => {
      setFloatingHugs([]);
    }, 2000);
  };

  return (
    <div className="letter-section-wrapper">
      {!isOpen ? (
        /* Envelope Closed View */
        <div className="envelope-card">
          <div className="envelope-illustration" aria-hidden="true">
            <div className="envelope-glow" />
            <div className="envelope-icon-box">
              <span className="envelope-stamp">💌</span>
              <span className="envelope-heart-badge">💗</span>
            </div>
          </div>

          <h1 className="envelope-title">A Letter For My Sister 💌</h1>
          <p className="envelope-subtitle">
            Written from the heart, just for you, Akka.
          </p>

          <button
            type="button"
            className="open-letter-btn"
            onClick={handleOpenLetter}
          >
            <span>Open My Letter 💌</span>
          </button>

          <div className="bottom-signature">
            Made with ♡ just for you, akka 🎀
          </div>
        </div>
      ) : (
        /* Letter Revealed View */
        <div className="opened-letter-card">
          {/* Header & Close/Back Button */}
          <div className="letter-top-bar">
            <span className="letter-badge">Personal Letter 💌</span>
            <button
              type="button"
              className="fold-envelope-btn"
              onClick={() => setIsOpen(false)}
            >
              ← Close Letter
            </button>
          </div>

          {/* Letter Parchment Sheet */}
          <article className="parchment-sheet">
            <header className="parchment-header">
              <h2 className="letter-salutation">Dear Akka, 💗</h2>
              <time className="letter-date">Thinking of you today & always</time>
            </header>

            <div className="parchment-body">
              <p>
                I don't think I tell you this enough, but I miss you so much.
              </p>

              <p>
                It's been a whole year since you've been away, and sometimes I wish I could just walk up to you, annoy you for no reason, laugh with you, and spend time together like we used to.
              </p>

              <p>
                Even though we're far apart, you're still such an important part of my life. I miss your presence, our little conversations, the silly moments, and simply having you around.
              </p>

              <p>
                I know you're working hard for your future, and I'm genuinely proud of you. I hope you're taking care of yourself, eating well, getting enough rest, and finding happiness in the little things.
              </p>

              <p className="highlight-sentence">
                But honestly, home feels a little different without you.
              </p>

              <p>
                I hope we get to make more memories together soon. And if you come home for Sankranti, I'll probably be happier than I can explain. 🥹❤️
              </p>

              <p>
                Until then, imagine me sending you the biggest, tightest hug ever.
              </p>

              <p>
                No matter how far away you are, you'll always be my akka, and I'll always be your annoying little brother. 😂💗
              </p>

              <p className="letter-closing-line">
                Miss you loads, Akka.
              </p>

              <p className="letter-callout">
                Come home soon! 🏡🫂
              </p>
            </div>

            <footer className="parchment-signoff">
              <p>With lots and lots of love,</p>
              <p className="signoff-name">Your little brother 💗</p>
            </footer>
          </article>

          {/* Send a Hug Interactive Button */}
          <div className="letter-action-area">
            <div className="hug-burst-container" aria-hidden="true">
              {floatingHugs.map((h) => (
                <span
                  key={h.id}
                  className="floating-hug-emoji"
                  style={{
                    '--hx': `${h.x}px`,
                    '--hy': `${h.y}px`,
                  }}
                >
                  {h.symbol}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="send-hug-btn"
              onClick={handleSendHug}
            >
              <span>Send a Hug 🫂</span>
              <Heart size={18} fill="currentColor" strokeWidth={0} />
            </button>

            {hugSent && (
              <div className="hug-feedback-pill" role="status" aria-live="polite">
                <span>A giant virtual hug, just for you, Akka! 🤗💗</span>
              </div>
            )}
          </div>

          <div className="bottom-signature">
            Made with ♡ just for you, akka 🎀
          </div>
        </div>
      )}
    </div>
  );
}
