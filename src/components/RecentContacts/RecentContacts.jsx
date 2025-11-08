import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTheme } from '../../contexts/ThemeContext';
import translations from '../../locales';
import './RecentContacts.css';

const RecentContacts = () => {
  const { language } = useAccessibility();
  const { theme } = useTheme();

  const t = translations[language] || translations.pt;

  const contacts = [
    { id: 1, name: 'Maria Silva', bank: '001', account: '1234-5', avatar: '👵' },
    { id: 2, name: 'José Santos', bank: '033', account: '5678-9', avatar: '👴' },
    { id: 3, name: 'Ana Oliveira', bank: '237', account: '9876-5', avatar: '👩' },
    { id: 4, name: 'Carlos Souza', bank: '341', account: '5432-1', avatar: '👨' }
  ];

  const handleContactClick = (contact) => {
    alert(`${t.recentContacts?.transferringTo || 'Transferindo para'} ${contact.name}`);
  };

  return (
    <div className={`recent-contacts card ${theme}`}>
      <h2>{t.recentContacts?.title || 'Contatos Recentes'}</h2>
      
      <div className="contacts-list">
        {contacts.map(contact => (
          <button
            key={contact.id}
            onClick={() => handleContactClick(contact)}
            className="contact-item large-target"
          >
            <div className="contact-avatar">
              {contact.avatar}
            </div>
            <div className="contact-info">
              <div className="contact-name">{contact.name}</div>
              <div className="contact-details">
                Banco: {contact.bank} - Conta: {contact.account}
              </div>
            </div>
            <div className="contact-action">
              <span className="transfer-icon">➡️</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentContacts;