import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Clock, RotateCcw, Heart, Sparkles, Play } from 'lucide-react';

const GAME_DURATION = 30; // 30 seconds

export default function CatchTheLoveGame() {
  const [gameState, setGameState] = useState('welcome'); // 'welcome' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [basketX, setBasketX] = useState(50); // percentage 0 to 100
  const [hearts, setHearts] = useState([]); // falling items

  const gameAreaRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);
  const heartIdCounter = useRef(0);
  const lastSpawnRef = useRef(0);
  const keysPressed = useRef({ left: false, right: false });

  // Start fresh game
  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setBasketX(50);
    setHearts([]);
    heartIdCounter.current = 0;
    lastSpawnRef.current = performance.now();
    lastTimeRef.current = performance.now();
    setGameState('playing');
  }, []);

  // Keyboard controls for Arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'Left') {
        e.preventDefault();
        keysPressed.current.left = true;
      } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        e.preventDefault();
        keysPressed.current.right = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'Left') {
        keysPressed.current.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        keysPressed.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Pointer & Touch movement
  const handlePointerMove = (e) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(10, Math.min(90, relativeX)));
  };

  // 1-second countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setGameState('gameover');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameState]);

  // Game Loop using requestAnimationFrame
  const updateGame = useCallback(
    (now) => {
      if (gameState !== 'playing') return;

      const delta = (now - (lastTimeRef.current || now)) / 1000;
      lastTimeRef.current = now;

      // Handle arrow keys movement
      if (keysPressed.current.left) {
        setBasketX((prev) => Math.max(10, prev - 75 * delta));
      }
      if (keysPressed.current.right) {
        setBasketX((prev) => Math.min(90, prev + 75 * delta));
      }

      // Spawn falling hearts every ~650ms
      if (now - lastSpawnRef.current > 650) {
        lastSpawnRef.current = now;
        const isGolden = Math.random() < 0.22; // 22% golden heart
        const newHeart = {
          id: ++heartIdCounter.current,
          x: 8 + Math.random() * 84, // horizontal percentage
          y: -8, // start above top
          speed: 38 + Math.random() * 25, // vertical fall speed % per sec
          isGolden,
          points: isGolden ? 5 : 1,
          symbol: isGolden ? '💛' : ['💗', '💖', '💕'][Math.floor(Math.random() * 3)],
        };
        setHearts((prev) => [...prev, newHeart]);
      }

      // Move hearts & detect collision with basket
      setHearts((prevHearts) => {
        const nextHearts = [];
        let pointsToAdd = 0;

        for (const item of prevHearts) {
          const newY = item.y + item.speed * delta;

          // Catch zone: near bottom y >= 82% and y <= 94%
          if (newY >= 82 && newY <= 94) {
            // Check horizontal collision with basket (basket width is approx 18% wide)
            if (Math.abs(item.x - basketX) < 11) {
              pointsToAdd += item.points;
              continue; // Caught! Don't keep falling
            }
          }

          // If still within bounds, keep it
          if (newY < 102) {
            nextHearts.push({ ...item, y: newY });
          }
        }

        if (pointsToAdd > 0) {
          setScore((s) => s + pointsToAdd);
        }

        return nextHearts;
      });

      requestRef.current = requestAnimationFrame(updateGame);
    },
    [gameState, basketX]
  );

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, updateGame]);

  // Encouraging feedback messages based on score
  const getEncouragement = () => {
    if (score >= 25) return 'Maximum sibling love unlocked! 🫂💖 You are unstoppable, Akka!';
    if (score >= 15) return 'Akkaaa, you are so good at this! 🥹💕 Collecting all my love!';
    if (score >= 5) return "Awww, you're collecting my love! 💗";
    return 'Every heart is a little reminder that your brother misses you! 🥹❤️';
  };

  return (
    <div className="game-section-wrapper">
      <div className="game-main-card">
        {/* Game Title & Header */}
        <div className="game-header">
          <div className="game-icon-badge" aria-hidden="true">
            <span>🎮</span>
            <span>💗</span>
            <span>⭐</span>
          </div>
          <h1 className="game-title">Catch the Love! 💗</h1>
          <p className="game-subtitle">
            Move your basket to catch as many hearts as you can!
          </p>
        </div>

        {/* WELCOME SCREEN */}
        {gameState === 'welcome' && (
          <div className="game-welcome-screen">
            <div className="welcome-instructions-box">
              <h2 className="instructions-title">How To Play:</h2>
              <ul className="instructions-list">
                <li>💗 Regular pink hearts = <strong>1 Point</strong></li>
                <li>💛 Special golden hearts = <strong>5 Points</strong></li>
                <li>🎮 Move with <strong>Left / Right Arrow keys</strong>, mouse, or touch!</li>
                <li>⏱️ You have <strong>30 seconds</strong> to catch all the love!</li>
              </ul>
            </div>

            <button
              type="button"
              className="start-game-btn"
              onClick={startGame}
            >
              <Play size={20} fill="currentColor" />
              <span>Start Game 🎮</span>
            </button>
          </div>
        )}

        {/* PLAYING SCREEN */}
        {gameState === 'playing' && (
          <div className="game-play-area-wrapper">
            {/* Top Scorebar */}
            <div className="game-status-bar">
              <div className="status-item score-pill">
                <Trophy size={18} className="status-icon" />
                <span>Score: <strong>{score}</strong></span>
              </div>
              <div className="status-item timer-pill">
                <Clock size={18} className="status-icon" />
                <span>Time: <strong>{timeLeft}s</strong></span>
              </div>
            </div>

            {/* Live Encouragement Toast */}
            <div className="live-feedback-strip" aria-live="polite">
              <span>{getEncouragement()}</span>
            </div>

            {/* Active Play Canvas / Area */}
            <div
              ref={gameAreaRef}
              className="game-canvas"
              onMouseMove={handlePointerMove}
              onTouchMove={handlePointerMove}
              role="region"
              aria-label="Catch the Love game board"
            >
              {/* Falling Hearts */}
              {hearts.map((h) => (
                <div
                  key={h.id}
                  className={`falling-heart-item ${h.isGolden ? 'golden' : ''}`}
                  style={{
                    left: `${h.x}%`,
                    top: `${h.y}%`,
                  }}
                >
                  <span className="heart-emoji">{h.symbol}</span>
                  {h.isGolden && <Sparkles size={12} className="golden-sparkle" />}
                </div>
              ))}

              {/* Player Basket */}
              <div
                className="player-basket"
                style={{
                  left: `${basketX}%`,
                }}
              >
                <div className="basket-visual">
                  <span className="basket-emoji">🧺</span>
                  <span className="basket-label">Akka</span>
                </div>
              </div>
            </div>

            <p className="controls-hint-text">
              💻 Use ⬅️ ➡️ arrow keys or drag mouse / finger to move basket
            </p>
          </div>
        )}

        {/* GAME OVER SCREEN */}
        {gameState === 'gameover' && (
          <div className="game-over-screen">
            <div className="game-over-badge" aria-hidden="true">
              🏆
            </div>
            <h2 className="game-over-title">Time's Up! 🎉</h2>
            <div className="final-score-box">
              <span className="final-score-label">Final Love Score:</span>
              <span className="final-score-number">{score} Points! 💗</span>
            </div>

            <p className="final-encouragement-message">
              {score >= 10
                ? 'You caught so much love! Sending it all to you across the miles, Akka! 💗'
                : 'Every heart is a little reminder that your brother misses you! 🥹❤️'}
            </p>

            <button
              type="button"
              className="play-again-btn"
              onClick={startGame}
            >
              <RotateCcw size={18} />
              <span>Play Again 💗</span>
            </button>
          </div>
        )}

        {/* Bottom subtle sibling footer */}
        <div className="bottom-signature">
          Made with ♡ just for you, akka 🎀
        </div>
      </div>
    </div>
  );
}
