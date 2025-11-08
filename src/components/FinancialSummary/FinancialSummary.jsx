import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTheme } from '../../contexts/ThemeContext';
import translations from '../../locales';
import './FinancialSummary.css';

const FinancialSummary = () => {
  const { language } = useAccessibility();
  const { theme } = useTheme();

  const t = translations[language];

  const financialData = {
    totalBalance: 58450.95,
    monthlyIncome: 3250.00,
    monthlyExpenses: 2870.50,
    investments: 12500.00
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(
      language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'pt-BR', 
      {
        style: 'currency',
        currency: language === 'en' ? 'USD' : language === 'es' ? 'EUR' : 'BRL'
      }
    ).format(value);
  };

  const getProgressPercentage = () => {
    return Math.min((financialData.monthlyExpenses / financialData.monthlyIncome) * 100, 100);
  };

  return (
    <div className={`financial-summary card ${theme}`}>
      <h2 className="text-center mb-4">{t.financialSummary?.title || 'Resumo Financeiro'}</h2>
      
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-sm-6 col-lg-12 col-xl-6 d-flex justify-content-center">
          <div className="summary-item total-balance w-100">
            <div className="summary-icon">💰</div>
            <div className="summary-info">
              <div className="summary-label">
                {t.financialSummary?.totalBalance || 'Saldo Total'}
              </div>
              <div className="summary-value">
                {formatCurrency(financialData.totalBalance)}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-12 col-xl-6 d-flex justify-content-center">
          <div className="summary-item monthly-income w-100">
            <div className="summary-icon">📈</div>
            <div className="summary-info">
              <div className="summary-label">
                {t.financialSummary?.monthlyIncome || 'Renda Mensal'}
              </div>
              <div className="summary-value text-success">
                {formatCurrency(financialData.monthlyIncome)}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-12 col-xl-6 d-flex justify-content-center">
          <div className="summary-item monthly-expenses w-100">
            <div className="summary-icon">📉</div>
            <div className="summary-info">
              <div className="summary-label">
                {t.financialSummary?.monthlyExpenses || 'Despesas Mensais'}
              </div>
              <div className="summary-value text-error">
                {formatCurrency(financialData.monthlyExpenses)}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-12 col-xl-6 d-flex justify-content-center">
          <div className="summary-item investments w-100">
            <div className="summary-icon">📊</div>
            <div className="summary-info">
              <div className="summary-label">
                {t.financialSummary?.investments || 'Investimentos'}
              </div>
              <div className="summary-value text-accent">
                {formatCurrency(financialData.investments)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;