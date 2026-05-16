import React, { useState } from 'react';
import '../styles/Navbar.css';

function Navbar({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="search-bar">
          <input type="text" placeholder="Rechercher une commande, un artiste..." />
        </div>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">
          <span className="bell-icon">🔔</span>
          <span className="notification-badge">3</span>
        </button>

        <div className="user-profile">
          <button 
            className="profile-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.nom || 'User'}&background=random`}
              alt="Profile"
              className="profile-avatar"
            />
            <span className="profile-name">{user?.nom || 'Utilisateur'}</span>
          </button>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <a href="#profile" className="dropdown-item">Mon Profil</a>
              <a href="#settings" className="dropdown-item">Paramètres</a>
              <hr />
              <button 
                onClick={onLogout}
                className="dropdown-item logout-item"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
