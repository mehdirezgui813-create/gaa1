import React, { useState } from 'react';
import { FaBell, FaSearch } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher une commande, un fournisseur..."
            />
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <button
            className="profile-section"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src="https://i.pravatar.cc/36"
              alt="Profile"
              className="profile-avatar"
            />
            <div className="profile-info">
              <span className="profile-name">Olivia Rhye</span>
              <span className="profile-role">Admin</span>
            </div>
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
