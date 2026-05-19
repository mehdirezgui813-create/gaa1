import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const API_BASE_URL = 'http://localhost:8080/api';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password
      });

      // ✅ Structure : { success, message, data: AuthResponse }
      const authResponse = response.data.data;

      const token    = authResponse.token;
      const codeSoc  = authResponse.codeSoc;
      const user = {
        username:      authResponse.username,
        nom:           authResponse.nom,
        prenom:        authResponse.prenom,
        email:         authResponse.email,
        role:          authResponse.role,
        codeSoc:       authResponse.codeSoc,
        idUtilisateur: authResponse.idUtilisateur
      };

      // ✅ Sauvegarde du codeSoc pour l'utiliser dans ArticlesPage
      if (codeSoc) localStorage.setItem('codeSoc', codeSoc);

      if (onLogin) onLogin(token, user);
      navigate('/dashboard/articles');

    } catch (err) {
      console.error('Erreur login:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-icon">G</span>
            <span className="logo-text">Gestin Achat</span>
          </div>
          <nav className="navbar-nav">
            <a href="#accueil" className="nav-link">Accueil</a>
            <a href="#fonctionnalites" className="nav-link">Fonctionnalités</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
          <div className="navbar-actions">
            <a href="#inscription" className="nav-link inscription-link">Inscription</a>
            <button className="nav-button" disabled>Se connecter</button>
          </div>
        </div>
      </header>

      <main className="login-main">
        <div className="login-container">
          <div className="login-content">
            <div className="login-header">
              <h1 className="login-title">Connexion</h1>
              <p className="login-subtitle">Connectez-vous à votre compte</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                <input
                  id="username"
                  type="text"
                  className="form-input"
                  placeholder="Votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-footer">
                <div className="remember-me">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember" className="remember-label">Se souvenir de moi</label>
                </div>
                <a href="#forgot" className="forgot-password-link">Mot de passe oublié ?</a>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>

            <div className="login-signup">
              <p className="signup-text">
                Vous n'avez pas de compte ?{' '}
                <a href="#inscription" className="signup-link">Inscription</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="login-footer">
        <p className="footer-text">© GAA 2026</p>
      </footer>
    </div>
  );
}

export default LoginPage;