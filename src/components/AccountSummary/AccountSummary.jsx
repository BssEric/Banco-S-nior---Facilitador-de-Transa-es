import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import translations from '../../locales';
import './AccountSummary.css';

const AccountSummary = () => {
  const { language } = useAccessibility();
  const { theme } = useTheme();
  const { user } = useAuth();
  
  const t = translations[language];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(
      language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'pt-BR', 
      {
        style: 'currency',
        currency: language === 'en' ? 'USD' : language === 'es' ? 'EUR' : 'BRL'
      }
    ).format(value);
  };

  const accounts = user?.accounts || [
    { type: 'checking', number: '12345-6', balance: 12560.75 },
    { type: 'savings', number: '78901-2', balance: 45890.20 }
  ];

  return (
    <div className={`account-summary card ${theme}`}>
      <h2 className="text-center mb-4">{t.account.summary}</h2>
      
      <div className="row g-4 justify-content-center">
        {accounts.map((account, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-12 col-xl-6 d-flex justify-content-center">
            <div className="account-card text-center w-100">
              <h3 className="mb-3">
                {account.type === 'checking' ? t.account.accountNumber : t.account.savings}
              </h3>
              <p className="account-number mb-2">{account.number}</p>
              <p className="balance mb-2">
                {formatCurrency(account.balance)}
              </p>
              <p className="balance-label">{t.account.balance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSummary;