import React from 'react';
import { Image, Mail, FileText, Gamepad2 } from 'lucide-react';

export default function NavigationBar({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'pics', label: 'Pics', icon: '💗', LucideIcon: Image },
    { id: 'invitation', label: 'Invitation', icon: '💌', LucideIcon: Mail },
    { id: 'letter', label: 'Missing You Letter', icon: '🥹', LucideIcon: FileText },
    { id: 'game', label: "Let's Play!", icon: '🎮', LucideIcon: Gamepad2 },
  ];

  return (
    <nav className="site-navigation-bar" aria-label="Main Navigation">
      <div className="nav-container">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`nav-tab-button ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="nav-tab-icon" aria-hidden="true">
                {tab.icon}
              </span>
              <span className="nav-tab-label">{tab.label}</span>
              {isActive && <span className="nav-active-pill" layoutid="activePill" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
