import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTheme } from '../../contexts/ThemeContext';
import translations from '../../locales';
import './Navigation.css';

const Navigation = () => {
  const { language } = useAccessibility();
  const { theme } = useTheme();

  const t = translations[language];

  const menuItems = [

    { key: 'accounts', icon: '🏦' },
    { key: 'transfers', icon: '💸' },
    { key: 'payments', icon: '💰' },
    { key: 'cards', icon: '💳' },
    { key: 'help', icon: '❓' }
  ];

  return (
    <nav className={`navigation ${theme}`}>
      <ul className="nav-list">
        {menuItems.map(item => (
          <li key={item.key} className="nav-item">
            <button className="nav-button large-target">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{t.navigation[item.key]}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;