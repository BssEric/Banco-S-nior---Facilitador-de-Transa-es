import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTheme } from '../../contexts/ThemeContext';
import translations from '../../locales';
import './AccessibilityControls.css';

const AccessibilityControls = () => {
  const { 
    language, 
    setLanguage, 
    fontSize, 
    increaseFontSize, 
    decreaseFontSize,
    highContrast,
    setHighContrast
  } = useAccessibility();

  const { theme, toggleTheme } = useTheme();

  const t = translations[language];

  return (
    <header className={`accessibility-header ${theme}`}>
      <div className="header-container">
        {/* Logo ou título do site */}
        <div className="header-brand">
          <span className="brand-icon">🏦</span>
          <span className="brand-title">
            {t.accessibility?.title || 'Configurações de Acessibilidade'}
          </span>
        </div>

        {/* Controles de acessibilidade */}
        <div className="header-controls">
          {/* Seletor de Idioma */}
          <div className="control-item">
            <label className="control-label" htmlFor="language-select">
              {t.accessibility.language}
            </label>
            <select 
              id="language-select"
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              aria-label={t.accessibility.language}
              className="form-select header-select"
            >
              <option value="pt">🇧🇷 PT</option>
              <option value="en">🇺🇸 EN</option>
              <option value="es">🇪🇸 ES</option>
            </select>
          </div>

          {/* Controle de Tamanho de Fonte */}
          <div className="control-item">
            <label className="control-label">
              {t.accessibility.fontSize}
            </label>
            <div className="font-controls">
              <button 
                onClick={decreaseFontSize} 
                aria-label={t.accessibility.decreaseFont}
                className="btn btn-outline-light control-button"
                disabled={fontSize === 'small'}
              >
                A-
              </button>
              <span className="font-size-indicator">
                {fontSize === 'small' && 'Pequeno'}
                {fontSize === 'medium' && 'Médio'}
                {fontSize === 'large' && 'Grande'}
                {fontSize === 'x-large' && 'Muito Grande'}
              </span>
              <button 
                onClick={increaseFontSize} 
                aria-label={t.accessibility.increaseFont}
                className="btn btn-outline-light control-button"
                disabled={fontSize === 'x-large'}
              >
                A+
              </button>
            </div>
          </div>

          {/* Toggle de Tema */}
          <div className="control-item">
            <button 
              onClick={toggleTheme}
              className="btn btn-light theme-toggle"
              aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            >
              {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
            </button>
          </div>

          {/* Checkbox Alto Contraste */}
          <div className="control-item">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                id="highContrast"
              />
              <label className="form-check-label" htmlFor="highContrast">
                {t.accessibility.contrast}
              </label>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AccessibilityControls;