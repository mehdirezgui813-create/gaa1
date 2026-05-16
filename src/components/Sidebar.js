import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ open, onToggle }) {
  const location = useLocation();

  const menuItems = [
    { label: 'Tableau de Bord', path: '/dashboard/artistes', icon: '📊' },
    { label: 'Artistes', path: '/dashboard/artistes', icon: '🎭' },
    { label: 'Fournisseurs', path: '/dashboard/fournisseurs', icon: '🏢' },
    { label: 'Commandes', path: '/dashboard/commandes', icon: '📋' },
    { label: 'Rapports', path: '/dashboard/rapports', icon: '📈' },
    { label: 'Paramètres', path: '/dashboard/parametres', icon: '⚙️' },
  ];

  return (
    <div className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎭</span>
          {open && <span className="logo-text">GAA</span>}
        </div>
        <button className="toggle-btn" onClick={onToggle}>
          {open ? '◀' : '▶'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            title={!open ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {open && <span className="nav-label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="support-item" title="Aide & Support">
          <span className="icon">❓</span>
          {open && <span>Aide & Support</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
