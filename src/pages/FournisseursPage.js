import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FournisseursTable from '../components/FournisseursTable';
import FournisseurModal from '../components/FournisseurModal';
import '../styles/FournisseursPage.css';

const API_BASE_URL = 'http://localhost:8080/api';

function FournisseursPage() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFournisseur, setEditingFournisseur] = useState(null);

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const fetchFournisseurs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/fournisseurs`);
      setFournisseurs(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des fournisseurs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFournisseur = () => {
    setEditingFournisseur(null);
    setShowModal(true);
  };

  const handleEditFournisseur = (fournisseur) => {
    setEditingFournisseur(fournisseur);
    setShowModal(true);
  };

  const handleDeleteFournisseur = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      try {
        await axios.delete(`${API_BASE_URL}/fournisseurs/${id}`);
        setFournisseurs(fournisseurs.filter(f => f.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleSaveFournisseur = async (fournisseurData) => {
    try {
      if (editingFournisseur) {
        await axios.put(`${API_BASE_URL}/fournisseurs/${editingFournisseur.id}`, fournisseurData);
        setFournisseurs(fournisseurs.map(f => f.id === editingFournisseur.id ? { ...fournisseurData, id: editingFournisseur.id } : f));
      } else {
        const response = await axios.post(`${API_BASE_URL}/fournisseurs`, fournisseurData);
        setFournisseurs([...fournisseurs, response.data]);
      }
      setShowModal(false);
      setEditingFournisseur(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
      console.error(err);
    }
  };

  const filteredFournisseurs = fournisseurs.filter(fournisseur => {
    const matchesSearch = fournisseur.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fournisseur.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || fournisseur.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fournisseurs-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Tableau de Bord des Fournisseurs</h1>
          <p>Gérez tous vos fournisseurs et prestataires</p>
        </div>
        <button className="btn-primary" onClick={handleAddFournisseur}>+ Ajouter Fournisseur</button>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un fournisseur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Toutes les catégories</option>
            <option value="Équipement">Équipement</option>
            <option value="Restauration">Restauration</option>
            <option value="Transport">Transport</option>
            <option value="Sécurité">Sécurité</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-message">Chargement des fournisseurs...</div>
      ) : (
        <FournisseursTable 
          fournisseurs={filteredFournisseurs} 
          onEdit={handleEditFournisseur}
          onDelete={handleDeleteFournisseur}
        />
      )}

      {showModal && (
        <FournisseurModal
          fournisseur={editingFournisseur}
          onSave={handleSaveFournisseur}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default FournisseursPage;
