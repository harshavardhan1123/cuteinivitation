import React, { useState } from 'react';
import SankrantiCelebration from './SankrantiCelebration';

export default function SankrantiInvitation({ onBackToMissYou }) {
  // choice: null | 'yes' | 'not-sure'
  const [choice, setChoice] = useState(null);

  const handleYes = () => {
    setChoice('yes');
  };

  const handleNotSure = () => {
    setChoice('not-sure');
  };

  const handleResetChoice = () => {
    setChoice(null);
  };

  // If YES is clicked, show celebration screen
  if (choice === 'yes') {
    return <SankrantiCelebration onBackToInvitation={handleResetChoice} />;
  }

  return (
    <main className="lock-page-wrapper">
      <div className="sankranti-card">
        {/* Festive Indian Sankranti-inspired visual badge with kites, sunshine & sparkles */}
        <div className="sankranti-badge-container" aria-hidden="true">
          <div className="sankranti-sun-glow" />
          <div className="sankranti-kite-circle">
            <span className="festive-kite kite-main">🪁</span>
            <span className="festive-sparkle">✨</span>
            <span className="festive-kite kite-sub">🪁</span>
            <span className="festive-sun">☀️</span>
          </div>
        </div>

        {/* Festive Invitation Headings */}
        <div className="sankranti-header">
          <h1 className="sankranti-heading">Akkaaa, One Little Question! 🥹💗</h1>
          <p className="sankranti-subheading">Sankranti is coming... 🪁✨</p>
          <h2 className="sankranti-invitation-prompt">
            Will you come home to India for Sankranti? 🏡❤️
          </h2>
        </div>

        {/* If user clicked 'I'M NOT SURE YET' show gentle response */}
        {choice === 'not-sure' ? (
          <div className="gentle-response-card" role="status" aria-live="polite">
            <div className="gentle-icon" aria-hidden="true">
              <span>🫂</span>
              <span>💗</span>
              <span>✨</span>
            </div>
            <h3 className="gentle-title">That's okay, Akka. ❤️</h3>
            <div className="gentle-message">
              <p>I know you've got things to think about, and that's completely okay.</p>
              <p>I just wanted you to know how much I'd love to have you home for Sankranti.</p>
              <p>Whatever you decide, I'm always cheering for you. Sending you a big hug! 🫂💗</p>
            </div>
            <button
              type="button"
              className="back-invitation-btn"
              onClick={handleResetChoice}
            >
              <span>Back to the Invitation 💗</span>
            </button>
          </div>
        ) : (
          /* Personal Heartfelt Message Card */
          <>
            <div className="personal-message-card">
              <p className="personal-p lead-p">
                It's been a whole year since you've been away, Akka. 🥹❤️
              </p>
              <p className="personal-p">
                Home just isn't the same without you around. I miss having you here, sharing little moments, laughing together, and spending time as a family.
              </p>
              <p className="personal-p">
                Sankranti would feel so much more special if we could celebrate it together this year.
              </p>
              <p className="personal-p highlight-p">
                I really hope you can come home. We'll be waiting for you! 🫂💗
              </p>
            </div>

            {/* Action Buttons: Primary (YES) & Secondary (NOT SURE) */}
            <div className="sankranti-buttons-wrapper">
              <button
                type="button"
                className="primary-sankranti-btn"
                onClick={handleYes}
              >
                <span>YESSS, I'M COMING HOME! 🏡❤️</span>
              </button>

              <button
                type="button"
                className="secondary-sankranti-btn"
                onClick={handleNotSure}
              >
                <span>I'M NOT SURE YET 🥺</span>
              </button>
            </div>
          </>
        )}

        {/* Bottom subtle sibling signature */}
        <div className="bottom-signature">
          Made with ♡ just for you, akka 🎀
        </div>
      </div>

      <div className="bottom-decorative-line">
        psst... home is wherever you are 🪁✨
      </div>
    </main>
  );
}
