import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTheme } from '../../contexts/ThemeContext';
import translations from '../../locales';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const { language } = useAccessibility();
  const { theme } = useTheme();

  const t = translations[language];

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Supermercado',
      amount: -156.75,
      type: 'compra'
    },
    {
      id: 2,
      date: '2024-01-14',
      description: 'Depósito Salário',
      amount: 2500.00,
      type: 'depósito'
    },
    {
      id: 3,
      date: '2024-01-12',
      description: 'Farmácia',
      amount: -45.20,
      type: 'compra'
    },
    {
      id: 4,
      date: '2024-01-10',
      description: 'Transferência Recebida',
      amount: 300.00,
      type: 'transferência'
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(
      language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'pt-BR', 
      {
        style: 'currency',
        currency: language === 'en' ? 'USD' : language === 'es' ? 'EUR' : 'BRL'
      }
    ).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'pt-BR'
    );
  };

  return (
    <div className={`transaction-history card ${theme}`}>
      <h2>{t.transactions.title}</h2>
      
      <div className="transactions-table">
        <div className="table-header">
          <div className="table-cell">{t.transactions.date}</div>
          <div className="table-cell">{t.transactions.description}</div>
          <div className="table-cell">{t.transactions.amount}</div>
          <div className="table-cell">{t.transactions.type}</div>
        </div>
        
        <div className="table-body">
          {transactions.map(transaction => (
            <div key={transaction.id} className="table-row">
              <div className="table-cell">{formatDate(transaction.date)}</div>
              <div className="table-cell">{transaction.description}</div>
              <div className={`table-cell amount ${transaction.amount >= 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(transaction.amount)}
              </div>
              <div className="table-cell">
                <span className={`type-badge ${transaction.type}`}>
                  {transaction.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;