import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OffresList from '../components/OffresList';
import OffresTable from '../components/OffresTable';
import OffresModal from '../components/OffresModal';
import '../styles/OffresPage.css';

const API_BASE_URL = 'http://localhost:8080/api';

function OffresPage() {
  const [offres, setOffres] = useState([]);
  const [articles, setArticles] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedView, setSelectedView] = useState('list');
  const [showModal, setShowModal] = useState(false);
  const [editingOffre, setEditingOffre] = useState(null);

  useEffect(() => {
    fetchOffres();
    fetchArticles();
    fetchFournisseurs();
  }, []);

  const fetchOffres = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/offres`);
      setOffres(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des offres');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`);
      setArticles(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFournisseurs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fournisseurs`);
      setFournisseurs(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOffre = () => {
    setEditingOffre(null);
    setShowModal(true);
  };

  const handleEditOffre = (offre) => {
    setEditingOffre(offre);
    setShowModal(true);
  };

  const handleDeleteOffre = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      try {
        await axios.delete(`${API_BASE_URL}/offres/${id}`);
        setOffres(offres.filter(o => o.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleSaveOffre = async (offreData) => {
    try {
      if (editingOffre) {
        await axios.put(`${API_BASE_URL}/offres/${editingOffre.id}`, offreData);
        setOffres(offres.map(o => o.id === editingOffre.id ? { ...offreData, id: editingOffre.id } : o));
      } else {
        const response = await axios.post(`${API_BASE_URL}/offres`, offreData);
        setOffres([...offres, response.data]);
      }
      setShowModal(false);
      setEditingOffre(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
      console.error(err);
    }
  };

  const filteredOffres = offres.filter(offre => {
    const matchesSearch = 
      offre.article?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offre.fournisseur?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offre.numero_offre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || offre.statut === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="offres-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des Offres</h1>
          <p>Gérez les offres fournisseurs sur vos articles</p>
        </div>
        <button className="btn-primary" onClick={handleAddOffre}>+ Nouvelle Offre</button>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher une offre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Acceptée">Acceptée</option>
            <option value="Rejetée">Rejetée</option>
            <option value="Expirée">Expirée</option>
          </select>
        </div>
        <div className="view-toggle">
          <button 
            className={`view-btn ${selectedView === 'list' ? 'active' : ''}`}
            onClick={() => setSelectedView('list')}
            title="Vue liste"
          >
            📋
          </button>
          <button 
            className={`view-btn ${selectedView === 'table' ? 'active' : ''}`}
            onClick={() => setSelectedView('table')}
            title="Vue tableau"
          >
            📊
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-message">Chargement des offres...</div>
      ) : selectedView === 'list' ? (
        <OffresList 
          offres={filteredOffres} 
          onEdit={handleEditOffre}
          onDelete={handleDeleteOffre}
        />
      ) : (
        <OffresTable 
          offres={filteredOffres} 
          onEdit={handleEditOffre}
          onDelete={handleDeleteOffre}
        />
      )}

      {showModal && (
        <OffresModal
          offre={editingOffre}
          articles={articles}
          fournisseurs={fournisseurs}
          onSave={handleSaveOffre}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default OffresPage;
