import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTheme } from '../../contexts/ThemeContext';
import translations from '../../locales';
import './QuickActions.css';

const QuickActions = () => {
  const { language } = useAccessibility();
  const { theme } = useTheme();

  const t = translations[language] || translations.pt;

  const quickActions = [
    { 
      icon: '💸', 
      label: t.quickActions?.transfer || 'Transferir', 
      action: 'transfer',
      color: 'primary'
    },
    { 
      icon: '💰', 
      label: t.quickActions?.pay || 'Pagar', 
      action: 'pay',
      color: 'secondary'
    },
    { 
      icon: '📱', 
      label: t.quickActions?.pix || 'PIX', 
      action: 'pix',
      color: 'accent'
    },
    { 
      icon: '📄', 
      label: t.quickActions?.extract || 'Extrato', 
      action: 'extract',
      color: 'primary'
    }
  ];

  const handleAction = (action) => {
    alert(`${t.quickActions?.opening || 'Abrindo'} ${action}`);
  };

  return (
    <div className={`quick-actions card ${theme}`}>
      <h2 className="text-center mb-4">{t.quickActions?.title || 'Ações Rápidas'}</h2>
      
      <div className="row g-3 justify-content-center">
        {quickActions.map((action, index) => (
          <div key={index} className="col-6 d-flex justify-content-center">
            <button
              onClick={() => handleAction(action.action)}
              className={`action-button large-target ${action.color} w-100`}
              aria-label={action.label}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-label">{action.label}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;