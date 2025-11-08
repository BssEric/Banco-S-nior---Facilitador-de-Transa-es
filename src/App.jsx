import React from 'react';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import AccountSummary from './components/AccountSummary/AccountSummary';
import QuickActions from './components/QuickActions/QuickActions';
import RecentContacts from './components/RecentContacts/RecentContacts';
import FinancialSummary from './components/FinancialSummary/FinancialSummary';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import AccessibilityControls from './components/AccessibilityControls/AccessibilityControls';
import Login from './components/Login/Login';
import GlobalStyles from './styles/GlobalStyles';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <div className="content-wrapper">
          <Navigation />
          <div className="main-content-area">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 col-xxl-10">
                  <div className="row g-4">
                    {/* Coluna Principal */}
                    <div className="col-12 col-lg-8">
                      <div className="d-flex flex-column gap-4">
                        <AccountSummary />
                        <FinancialSummary />
                        <TransactionHistory />
                      </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="col-12 col-lg-4">
                      <div className="d-flex flex-column gap-4">
                        <QuickActions />
                        <RecentContacts />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AccessibilityControls />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <AuthProvider>
          <GlobalStyles />
          <AppContent />
        </AuthProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;