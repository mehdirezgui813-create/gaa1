import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const API_BASE_URL = 'http://localhost:8080/api';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;
      onLogin(token, user);
      navigate('/dashboard/artistes');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-form-section">
          <div className="login-header">
            <h1>Connexion</h1>
            <p>Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="exemple@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <a href="#forgot" className="forgot-password">Mot de passe oublié ?</a>
              <a href="#signup" className="signup-link">S'inscrire</a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <footer className="login-footer">
            <p>© GAA 2026</p>
          </footer>
        </div>

        <div className="login-image-section">
          <div className="image-placeholder"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
