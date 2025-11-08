import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ 
    displayName: 'João Silva', 
    email: 'joao@exemplo.com',
    accounts: [
      { type: 'checking', number: '12345-6', balance: 12560.75 },
      { type: 'savings', number: '78901-2', balance: 45890.20 }
    ]
  }); // Usuário mockado para teste

  const login = async (email, password) => {
    const userData = { 
      displayName: 'João Silva', 
      email: email,
      accounts: [
        { type: 'checking', number: '12345-6', balance: 12560.75 },
        { type: 'savings', number: '78901-2', balance: 45890.20 }
      ]
    };
    setUser(userData);
    return { success: true, user: userData };
  };

  const register = async (email, password, displayName) => {
    const userData = { 
      displayName, 
      email,
      accounts: [
        { type: 'checking', number: '12345-6', balance: 12560.75 },
        { type: 'savings', number: '78901-2', balance: 45890.20 }
      ]
    };
    setUser(userData);
    return { success: true, user: userData };
  };

  const logout = async () => {
    setUser(null);
    return { success: true };
  };

  const value = {
    user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};