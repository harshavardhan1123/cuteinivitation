import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function GallerySection() {
  const pictures = [
    {
      id: 1,
      src: '/images/silly_adventures.jpg',
      title: 'Silly Sibling Adventures',
      caption: 'Unforgettable moments full of silly faces, giggles, jokes, and endless mischief! 😜💗',
    },
    {
      id: 2,
      src: '/images/memory2.svg',
      title: 'Late Night Food & Laughs',
      caption: 'Midnight snack runs and eating pizza while talking about everything 🍕',
    },
    {
      id: 3,
      src: '/images/studying_abroad.jpg',
      title: 'Studying Abroad Journey',
      caption: 'Seeing you off at the airport — so proud of your ambition as you began this journey! ✈️🎓💗',
    },
    {
      id: 4,
      src: '/images/memory4.svg',
      title: 'Sankranti Kites & Sunshine',
      caption: 'Festival mornings on the terrace, kite battles and celebrating together 🪁',
    },
    {
      id: 5,
      src: '/images/memory5.svg',
      title: 'Long Distance Video Calls',
      caption: 'No distance can ever change our bond, catching up across time zones 📞',
    },
    {
      id: 6,
      src: '/images/sibling_hug.jpg',
      title: 'Biggest Sibling Hug Waiting',
      caption: 'Can not wait to give you this exact tight bear hug the second you come home! 🫂💗',
    },
  ];

  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev + 1) % pictures.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev - 1 + pictures.length) % pictures.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, pictures.length]);

  return (
    <div className="gallery-section-wrapper">
      <div className="gallery-card">
        {/* Header */}
        <div className="gallery-header">
          <div className="gallery-icon-decor" aria-hidden="true">
            <span>📸</span>
            <span>🌸</span>
            <span>✨</span>
          </div>
          <h1 className="gallery-title">Our Little Memory Lane 💗</h1>
          <p className="gallery-subtitle">
            Little moments, endless love, and memories I'll always treasure.
          </p>
        </div>

        {/* 6 Individual Pictures Grid */}
        <div className="gallery-grid">
          {pictures.map((pic, idx) => (
            <div
              key={pic.id}
              className="gallery-item-card"
              onClick={() => setActiveLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveLightboxIndex(idx);
                }
              }}
              aria-label={`Open picture: ${pic.title}`}
            >
              <div className="gallery-img-container">
                <img
                  src={pic.src}
                  alt={pic.title}
                  className="gallery-thumbnail"
                  loading="lazy"
                />
                <div className="gallery-hover-overlay">
                  <ZoomIn size={24} className="zoom-icon" />
                  <span className="view-text">Click to view 💗</span>
                </div>
              </div>
              <div className="gallery-item-caption">
                <h3 className="item-title">{pic.title}</h3>
                <p className="item-desc">{pic.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-signature">
          Made with ♡ just for you, akka 🎀
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={() => setActiveLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setActiveLightboxIndex(null)}
              aria-label="Close Lightbox"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              className="lightbox-nav-btn prev-btn"
              onClick={() =>
                setActiveLightboxIndex(
                  (prev) => (prev - 1 + pictures.length) % pictures.length
                )
              }
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="lightbox-body">
              <img
                src={pictures[activeLightboxIndex].src}
                alt={pictures[activeLightboxIndex].title}
                className="lightbox-image"
              />
              <div className="lightbox-caption-box">
                <h2 className="lightbox-title">
                  {pictures[activeLightboxIndex].title}
                </h2>
                <p className="lightbox-desc">
                  {pictures[activeLightboxIndex].caption}
                </p>
                <span className="lightbox-counter">
                  {activeLightboxIndex + 1} of {pictures.length}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="lightbox-nav-btn next-btn"
              onClick={() =>
                setActiveLightboxIndex((prev) => (prev + 1) % pictures.length)
              }
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
