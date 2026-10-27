import React, { useState, useRef } from 'react';
import { LockKeyhole, Eye, EyeOff, Sparkles, Heart } from 'lucide-react';

const CORRECT_PASSWORD = 'iloveyouakka';

export default function PasswordLock({ onUnlockSuccess }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'error' | 'success'
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);
  const [celebrationParticles, setCelebrationParticles] = useState([]);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setPassword(e.target.value);
    // Clear error message when user begins typing again
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const triggerCelebration = () => {
    // Generate celebratory confetti hearts bursting outward
    const hearts = ['💗', '💖', '💕', '✨', '🤍', '💘'];
    const particles = Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * 2 * Math.PI;
      const distance = 80 + Math.random() * 80;
      const bx = Math.cos(angle) * distance;
      const by = Math.sin(angle) * distance;
      const br = Math.random() * 90 - 45;
      const symbol = hearts[i % hearts.length];
      return { id: i, symbol, bx, by, br };
    });
    setCelebrationParticles(particles);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // Prevent multiple submissions during success state
    if (status === 'success') return;

    const trimmedPassword = password.trim();

    if (trimmedPassword === CORRECT_PASSWORD) {
      setStatus('success');
      setErrorMessage('');
      triggerCelebration();
    } else {
      setStatus('error');
      setErrorMessage("Oopsie! That's not the secret password! 🥺💕");
      setShake(true);
      setTimeout(() => setShake(false), 500);

      // Keep focus on input for immediate retry
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleEnterWorld = () => {
    if (onUnlockSuccess) {
      onUnlockSuccess();
    }
  };

  return (
    <main className="lock-page-wrapper">
      <div className={`lock-card ${shake ? 'shake' : ''}`}>
        {/* Celebration burst elements */}
        {celebrationParticles.length > 0 && (
          <div className="celebration-burst" aria-hidden="true">
            {celebrationParticles.map((p) => (
              <span
                key={p.id}
                className="burst-particle"
                style={{
                  '--bx': `${p.bx}px`,
                  '--by': `${p.by}px`,
                  '--br': `${p.br}deg`,
                }}
              >
                {p.symbol}
              </span>
            ))}
          </div>
        )}

        {/* Top Decoration: Heart Lock Illustration */}
        <div className="heart-lock-illustration" aria-hidden="true">
          <div className="heart-glow-ring" />
          <div className={`heart-bubble ${status === 'success' ? 'success-pulse' : ''}`}>
            <span className="main-heart-icon">💗</span>
            <div className={`lock-badge ${status === 'success' ? 'unlocked' : ''}`}>
              <LockKeyhole size={14} strokeWidth={2.6} />
            </div>
          </div>
          {/* Subtle sparkles */}
          <Sparkles className="sparkle-icon sparkle-1" size={14} />
          <Sparkles className="sparkle-icon sparkle-2" size={16} />
          <Sparkles className="sparkle-icon sparkle-3" size={13} />
        </div>

        {/* Heading & Subtitle */}
        <h1 className="lock-heading">A Little Secret</h1>
        <p className="lock-subtitle">Just for you, with lots of love 💗</p>
        <p className="lock-description">
          Enter the secret password to unlock something special.
        </p>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="password-form" noValidate>
          <div className="input-group">
            <span className="input-icon-left" aria-hidden="true">
              <LockKeyhole size={18} strokeWidth={2.2} />
            </span>

            <label htmlFor="secret-password-input" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
              Secret Password
            </label>

            <input
              id="secret-password-input"
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleInputChange}
              placeholder="Enter the secret password..."
              className={`password-input ${status === 'error' ? 'input-error' : ''}`}
              autoComplete="current-password"
              disabled={status === 'success'}
              aria-invalid={status === 'error'}
              aria-describedby="password-feedback"
            />

            <button
              type="button"
              className="toggle-visibility-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Validation Feedback with aria-live */}
          <div
            id="password-feedback"
            className="feedback-container"
            role="status"
            aria-live="polite"
          >
            {status === 'error' && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
            {status === 'success' && (
              <div className="success-message">
                Yayyy! You unlocked the secret! 💗
              </div>
            )}
          </div>

          {/* Button: Unlock or Enter World depending on state */}
          {status !== 'success' ? (
            <button type="submit" className="unlock-btn">
              <span className="unlock-btn-shine" aria-hidden="true" />
              <span>Unlock My Heart</span>
              <Heart size={18} fill="currentColor" strokeWidth={0} />
            </button>
          ) : (
            <button
              type="button"
              className="enter-world-btn"
              onClick={handleEnterWorld}
            >
              <span>Enter My Little World 💖</span>
            </button>
          )}
        </form>

        {/* Bottom Messages */}
        <div className="bottom-signature">
          Made with ♡ just for you
        </div>
      </div>

      <div className="bottom-decorative-line">
        psst... this little world is waiting for you 🎀
      </div>
    </main>
  );
}
