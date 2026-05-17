import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticlesTable from '../components/ArticlesTable';
import ArticleModal from '../components/ArticleModal';
import '../styles/ArticlesPage.css';

const API_BASE_URL = 'http://localhost:8080/api';

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`);
      setArticles(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddArticle = () => {
    setEditingArticle(null);
    setShowModal(true);
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setShowModal(true);
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await axios.delete(`${API_BASE_URL}/articles/${id}`);
        setArticles(articles.filter(a => a.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleSaveArticle = async (articleData) => {
    try {
      if (editingArticle) {
        await axios.put(`${API_BASE_URL}/articles/${editingArticle.id}`, articleData);
        setArticles(articles.map(a => a.id === editingArticle.id ? { ...articleData, id: editingArticle.id } : a));
      } else {
        const response = await axios.post(`${API_BASE_URL}/articles`, articleData);
        setArticles([...articles, response.data]);
      }
      setShowModal(false);
      setEditingArticle(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
      console.error(err);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.nom?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || article.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="articles-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Tableau de Bord des Articles</h1>
          <p>Gérez tous vos articles et produits</p>
        </div>
        <button className="btn-primary" onClick={handleAddArticle}>+ Ajouter Article</button>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Toutes les catégories</option>
            <option value="Vêtements">Vêtements</option>
            <option value="Électronique">Électronique</option>
            <option value="Alimentation">Alimentation</option>
            <option value="Maison">Maison</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-message">Chargement des articles...</div>
      ) : (
        <ArticlesTable 
          articles={filteredArticles} 
          onEdit={handleEditArticle}
          onDelete={handleDeleteArticle}
        />
      )}

      {showModal && (
        <ArticleModal
          article={editingArticle}
          onSave={handleSaveArticle}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ArticlesPage;
