import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layout/DashboardLayout';
import ArticlesPage from './pages/ArticlesPage';
import FournisseursPage from './pages/FournisseursPage';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');

    const isValidString = (value) => {
      return value && value !== 'undefined' && value !== 'null';
    };

    if (isValidString(token) && isValidString(savedUser)) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setIsAuthenticated(true);
        setUser(parsedUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.warn('Utilisateur stocké invalide, suppression du localStorage', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    } else if (!isValidString(savedUser) || !isValidString(token)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
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
            isAuthenticated ? <Navigate to="/dashboard/articles" /> : <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <Routes>
                   <Route path="articles" element={<ArticlesPage />} />
                   <Route path="fournisseurs" element={<FournisseursPage />} />
                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
         <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard/articles" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
