import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useTheme } from '../contexts/ThemeContext';

const GlobalStyles = () => {
  const { fontSize, highContrast } = useAccessibility();
  const { theme } = useTheme();

  // Novas cores marrom/bege - mais aconchegantes
  const getThemeVariables = () => {
    if (highContrast) {
      return {
        '--background': '#000000',
        '--surface': '#000000',
        '--primary': '#ffff00',
        '--primary-hover': '#ffff00',
        '--secondary': '#8B4513',
        '--accent': '#D2691E',
        '--text': '#ffffff',
        '--heading': '#ffffff',
        '--border': '#ffffff',
        '--focus': '#ffff00',
        '--shadow': 'rgba(255, 255, 255, 0.5)',
        '--success': '#00ff00',
        '--warning': '#ffff00',
        '--error': '#ff0000'
      };
    }
    
    if (theme === 'dark') {
      return {
        '--background': '#2C1810',
        '--surface': '#3D2B1F',
        '--primary': '#8B4513',
        '--primary-hover': '#A0522D',
        '--secondary': '#D2691E',
        '--accent': '#F4A460',
        '--text': '#F5F5DC',
        '--heading': '#FFFFFF',
        '--border': '#5D4037',
        '--focus': '#D2691E',
        '--shadow': 'rgba(0, 0, 0, 0.3)',
        '--success': '#8FBC8F',
        '--warning': '#F0E68C',
        '--error': '#CD5C5C'
      };
    }
    
    // Tema light marrom (padrão)
    return {
      '--background': '#FDF5E6',
      '--surface': '#FFFFFF',
      '--primary': '#8B4513',
      '--primary-hover': '#A0522D',
      '--secondary': '#D2691E',
      '--accent': '#F4A460',
      '--text': '#5D4037',
      '--heading': '#3E2723',
      '--border': '#D7CCC8',
      '--focus': '#D2691E',
      '--shadow': 'rgba(139, 69, 19, 0.1)',
      '--success': '#8FBC8F',
      '--warning': '#F0E68C',
      '--error': '#CD5C5C'
    };
  };

  const themeVariables = getThemeVariables();
  const fontSizes = {
    'small': '14px',
    'medium': '16px',
    'large': '18px',
    'x-large': '20px'
  };

  const styles = `
    :root {
      ${Object.entries(themeVariables).map(([key, value]) => `${key}: ${value};`).join('\n      ')}
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Arial', sans-serif;
      font-size: ${fontSizes[fontSize]};
      background-color: var(--background);
      color: var(--text);
      line-height: 1.6;
      transition: all 0.3s ease;
      min-height: 100vh;
    }

    #root {
      min-height: 100vh;
      background-color: var(--background);
    }

    .app {
      min-height: 100vh;
      background-color: var(--background);
    }

    button {
      font-size: ${fontSizes[fontSize]};
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: var(--primary);
      color: white;
      font-weight: bold;
    }

    button:hover:not(:disabled) {
      background-color: var(--primary-hover);
      transform: translateY(-1px);
    }

    button:focus {
      outline: 2px solid var(--focus);
      outline-offset: 2px;
    }

    .btn-secondary {
      background-color: var(--secondary);
    }

    .btn-secondary:hover {
      background-color: var(--accent);
    }

    .btn-accent {
      background-color: var(--accent);
      color: var(--heading);
    }

    input, select {
      font-size: ${fontSizes[fontSize]};
      padding: 12px;
      border: 2px solid var(--border);
      border-radius: 8px;
      background-color: var(--surface);
      color: var(--text);
      transition: border-color 0.3s ease;
    }

    input:focus, select:focus {
      outline: none;
      border-color: var(--focus);
    }

    .card {
      background-color: var(--surface);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px var(--shadow);
      margin-bottom: 20px;
      border: 1px solid var(--border);
    }

    h1, h2, h3, h4, h5, h6 {
      color: var(--heading);
      margin-bottom: 16px;
    }

    a {
      color: var(--primary);
      text-decoration: none;
    }

    a:hover, a:focus {
      text-decoration: underline;
      outline: 2px solid var(--focus);
    }

    /* Melhorias de acessibilidade para idosos */
    .large-target {
      min-height: 44px;
      min-width: 44px;
    }

    .high-visibility {
      border: 2px solid var(--focus);
    }

    /* Scroll suave */
    html {
      scroll-behavior: smooth;
    }

    /* Foco visível para navegação por teclado */
    *:focus-visible {
      outline: 2px solid var(--focus);
      outline-offset: 2px;
    }

    /* Novas classes utilitárias */
    .text-success { color: var(--success); }
    .text-warning { color: var(--warning); }
    .text-error { color: var(--error); }
    .text-accent { color: var(--accent); }

    .bg-success { background-color: var(--success); }
    .bg-warning { background-color: var(--warning); }
    .bg-error { background-color: var(--error); }

    .border-accent { border-color: var(--accent); }
  `;

  return <style>{styles}</style>;
};

export default GlobalStyles;