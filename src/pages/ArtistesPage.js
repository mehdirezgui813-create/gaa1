import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArtistesTable from '../components/ArtistesTable';
import ArtistModal from '../components/ArtistModal';
import '../styles/ArtistesPage.css';

const API_BASE_URL = 'http://localhost:8080/api';

function ArtistesPage() {
  const [artistes, setArtistes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingArtiste, setEditingArtiste] = useState(null);

  useEffect(() => {
    fetchArtistes();
  }, []);

  const fetchArtistes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/artistes`);
      setArtistes(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des artistes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddArtiste = () => {
    setEditingArtiste(null);
    setShowModal(true);
  };

  const handleEditArtiste = (artiste) => {
    setEditingArtiste(artiste);
    setShowModal(true);
  };

  const handleDeleteArtiste = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet artiste ?')) {
      try {
        await axios.delete(`${API_BASE_URL}/artistes/${id}`);
        setArtistes(artistes.filter(a => a.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleSaveArtiste = async (artisteData) => {
    try {
      if (editingArtiste) {
        await axios.put(`${API_BASE_URL}/artistes/${editingArtiste.id}`, artisteData);
        setArtistes(artistes.map(a => a.id === editingArtiste.id ? { ...artisteData, id: editingArtiste.id } : a));
      } else {
        const response = await axios.post(`${API_BASE_URL}/artistes`, artisteData);
        setArtistes([...artistes, response.data]);
      }
      setShowModal(false);
      setEditingArtiste(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
      console.error(err);
    }
  };

  const filteredArtistes = artistes.filter(artiste => {
    const matchesSearch = artiste.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artiste.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || artiste.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="artistes-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Tableau de Bord des Artistes</h1>
          <p>Gérez tous vos artistes et performeurs</p>
        </div>
        <button className="btn-primary" onClick={handleAddArtiste}>+ Ajouter Artiste</button>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un artiste..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Toutes les catégories</option>
            <option value="Musicien">Musicien</option>
            <option value="Danseur">Danseur</option>
            <option value="Chanteur">Chanteur</option>
            <option value="Acteur">Acteur</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-message">Chargement des artistes...</div>
      ) : (
        <ArtistesTable 
          artistes={filteredArtistes} 
          onEdit={handleEditArtiste}
          onDelete={handleDeleteArtiste}
        />
      )}

      {showModal && (
        <ArtistModal
          artiste={editingArtiste}
          onSave={handleSaveArtiste}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ArtistesPage;
