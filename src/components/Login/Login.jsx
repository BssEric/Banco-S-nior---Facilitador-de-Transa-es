import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTheme } from '../../contexts/ThemeContext';
import translations from '../../locales';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const { language } = useAccessibility();
  const { theme } = useTheme();

  const t = translations[language];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError(t.login.errors.fillAllFields);
      setLoading(false);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError(t.login.errors.passwordMismatch);
      setLoading(false);
      return;
    }

    if (!isLogin && !formData.displayName) {
      setError(t.login.errors.nameRequired);
      setLoading(false);
      return;
    }

    try {
      let result;
      
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.email, formData.password, formData.displayName);
      }

      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      setError(t.login.errors.generic);
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      email: '',
      password: '',
      displayName: '',
      confirmPassword: ''
    });
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className="login-card card">
        <div className="login-header">
          <h1>{t.app.title}</h1>
          <p>{isLogin ? t.login.welcomeBack : t.login.createAccount}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="displayName">{t.login.name}</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder={t.login.namePlaceholder}
                required={!isLogin}
                className="large-target"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">{t.login.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.login.emailPlaceholder}
              required
              className="large-target"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t.login.password}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t.login.passwordPlaceholder}
              required
              className="large-target"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">{t.login.confirmPassword}</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t.login.confirmPasswordPlaceholder}
                required={!isLogin}
                className="large-target"
              />
            </div>
          )}

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="login-button large-target"
          >
            {loading ? t.login.loading : isLogin ? t.login.signIn : t.login.signUp}
          </button>
        </form>

        <div className="login-footer">
          <button 
            type="button" 
            onClick={toggleMode}
            className="toggle-mode-button large-target"
          >
            {isLogin ? t.login.noAccount : t.login.haveAccount}
          </button>
        </div>

        <div className="accessibility-note">
          <p>{t.login.accessibilityNote}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;