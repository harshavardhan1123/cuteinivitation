import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import PasswordLock from './components/PasswordLock';
import NavigationBar from './components/NavigationBar';
import MissYouScreen from './components/MissYouScreen';
import GallerySection from './components/GallerySection';
import SankrantiInvitation from './components/SankrantiInvitation';
import MissingYouLetterSection from './components/MissingYouLetterSection';
import CatchTheLoveGame from './components/CatchTheLoveGame';

export default function App() {
  // Authentication gate state
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Active navigation tab: 'miss-you' | 'pics' | 'invitation' | 'letter' | 'game'
  const [activeTab, setActiveTab] = useState('miss-you');

  const handleUnlock = () => {
    setIsUnlocked(true);
    setActiveTab('miss-you');
  };

  return (
    <>
      {/* Layered Animated Background with Floating Hearts, Orbs, and Sparkles */}
      <FloatingHearts count={24} />

      {!isUnlocked ? (
        <PasswordLock onUnlockSuccess={handleUnlock} />
      ) : (
        <div className="authenticated-app-container">
          {/* Beautiful Glassmorphic Top Navigation Bar with 4 Options */}
          <header className="site-header">
            <NavigationBar
              activeTab={activeTab}
              onSelectTab={(tabId) => setActiveTab(tabId)}
            />
          </header>

          {/* Main Content Area Rendering Current Section */}
          <main className="main-viewport-content">
            {activeTab === 'miss-you' && (
              <MissYouScreen
                onProceedToInvitation={() => setActiveTab('invitation')}
              />
            )}

            {activeTab === 'pics' && <GallerySection />}

            {activeTab === 'invitation' && (
              <SankrantiInvitation
                onBackToMissYou={() => setActiveTab('miss-you')}
              />
            )}

            {activeTab === 'letter' && <MissingYouLetterSection />}

            {activeTab === 'game' && <CatchTheLoveGame />}
          </main>
        </div>
      )}
    </>
  );
}
