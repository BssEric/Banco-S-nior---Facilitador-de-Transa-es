import React, { useState, useRef } from 'react';
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

  // Estado para posição arrastável
  const [position, setPosition] = useState({ x: 20, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragRef.current = {
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragRef.current) return;
    
    const newX = e.clientX - dragRef.current.offsetX;
    const newY = e.clientY - dragRef.current.offsetY;
    
    // Limitar dentro da tela
    const maxX = window.innerWidth - 300;
    const maxY = window.innerHeight - 400;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragRef.current = null;
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Adicionar event listeners para dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div 
      className={`accessibility-controls ${theme} ${isDragging ? 'dragging' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000
      }}
    >
      {/* Handle para arrastar e minimizar */}
      <div 
        className="drag-handle"
        onMouseDown={handleMouseDown}
        title="Arraste para mover | Clique para minimizar/expandir"
      >
        <div className="handle-content">
          <span className="handle-icon">⚙️</span>
          <span className="handle-title">
            {t.accessibility?.title || 'Configurações'}
          </span>
        </div>
        <div className="handle-actions">
          <button 
            className="minimize-btn"
            onClick={toggleMinimize}
            aria-label={isMinimized ? 'Expandir configurações' : 'Minimizar configurações'}
            title={isMinimized ? 'Expandir' : 'Minimizar'}
          >
            {isMinimized ? '➕' : '➖'}
          </button>
        </div>
      </div>
      
      {/* Conteúdo - só mostra quando não estiver minimizado */}
      {!isMinimized && (
        <div className="controls-container">
          <div className="control-group">
            <label className="form-label">{t.accessibility.language}</label>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              aria-label={t.accessibility.language}
              className="form-select large-target"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div className="control-group">
            <label className="form-label">{t.accessibility.fontSize}</label>
            <div className="font-controls d-flex align-items-center gap-2">
              <button 
                onClick={decreaseFontSize} 
                aria-label={t.accessibility.decreaseFont}
                className="btn btn-outline-secondary control-button large-target"
                disabled={fontSize === 'small'}
              >
                A-
              </button>
              <span className="font-size-indicator flex-grow-1 text-center">
                {fontSize === 'small' && 'Pequeno'}
                {fontSize === 'medium' && 'Médio'}
                {fontSize === 'large' && 'Grande'}
                {fontSize === 'x-large' && 'Muito Grande'}
              </span>
              <button 
                onClick={increaseFontSize} 
                aria-label={t.accessibility.increaseFont}
                className="btn btn-outline-secondary control-button large-target"
                disabled={fontSize === 'x-large'}
              >
                A+
              </button>
            </div>
          </div>

          <div className="control-group">
            <label className="form-label">{t.accessibility.theme}</label>
            <button 
              onClick={toggleTheme}
              className="btn btn-primary theme-toggle large-target w-100"
              aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            >
              {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
            </button>
          </div>

          <div className="control-group">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input large-target"
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
      )}
    </div>
  );
};

export default AccessibilityControls;