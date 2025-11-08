import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useTheme } from '../contexts/ThemeContext';

const GlobalStyles = () => {
  const { fontSize, highContrast } = useAccessibility();
  const { theme } = useTheme();

  // Novas cores bancárias - Azul (confiança) e Verde (prosperidade)
  const getThemeVariables = () => {
    if (highContrast) {
      return {
        '--background': '#000000',
        '--surface': '#000000',
        '--primary': '#0066CC',
        '--primary-hover': '#0052A3',
        '--secondary': '#00A86B',
        '--accent': '#FF6B35',
        '--text': '#ffffff',
        '--heading': '#ffffff',
        '--border': '#ffffff',
        '--focus': '#0066CC',
        '--shadow': 'rgba(255, 255, 255, 0.5)',
        '--success': '#00FF00',
        '--warning': '#FFFF00',
        '--error': '#FF0000'
      };
    }
    
    if (theme === 'dark') {
      return {
        '--background': '#0A1A2F',
        '--surface': '#1E2B3E',
        '--primary': '#0066CC',
        '--primary-hover': '#0084FF',
        '--secondary': '#00A86B',
        '--accent': '#FF6B35',
        '--text': '#E8F4F8',
        '--heading': '#FFFFFF',
        '--border': '#2D3E50',
        '--focus': '#0084FF',
        '--shadow': 'rgba(0, 0, 0, 0.4)',
        '--success': '#00C853',
        '--warning': '#FFAB00',
        '--error': '#FF5252'
      };
    }
    
    // Tema light (padrão) - Cores bancárias profissionais
    return {
      '--background': '#F8FBFE',
      '--surface': '#FFFFFF',
      '--primary': '#0066CC',
      '--primary-hover': '#0052A3',
      '--secondary': '#00A86B',
      '--accent': '#FF6B35',
      '--text': '#2D3748',
      '--heading': '#1A365D',
      '--border': '#E2E8F0',
      '--focus': '#0066CC',
      '--shadow': 'rgba(0, 102, 204, 0.1)',
      '--success': '#00A86B',
      '--warning': '#FFA000',
      '--error': '#E53E3E'
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
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
      font-weight: 600;
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
      background-color: var(--success);
    }

    .btn-accent {
      background-color: var(--accent);
      color: white;
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
      transition: all 0.3s ease;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px var(--shadow);
    }

    h1, h2, h3, h4, h5, h6 {
      color: var(--heading);
      margin-bottom: 16px;
      font-weight: 600;
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