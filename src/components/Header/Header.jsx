import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTheme } from '../../contexts/ThemeContext';
import translations from '../../locales';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { language } = useAccessibility();
  const { theme } = useTheme();

  const t = translations[language];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className={`header ${theme}`}>
      <div className="header-content">
        <div className="header-info">
          <h1>{t.app.title}</h1>
          <p>{t.app.welcome}, {user?.displayName}!</p>
        </div>
        
        <div className="header-actions">
          <button 
            onClick={handleLogout}
            className="logout-button large-target"
          >
            {t.header.logout}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;