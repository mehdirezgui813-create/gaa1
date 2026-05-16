import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layout/DashboardLayout';
import ArtistesPage from './pages/ArtistesPage';
import FournisseursPage from './pages/FournisseursPage';
import './styles/App.css';

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <div className="loading-container"><p>Chargement...</p></div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard/artistes" /> : <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route path="artistes" element={<ArtistesPage />} />
                  <Route path="fournisseurs" element={<FournisseursPage />} />
                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard/artistes" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
