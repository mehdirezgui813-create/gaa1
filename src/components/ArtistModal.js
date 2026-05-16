import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';

function ArtistModal({ artiste, onSave, onClose }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    categorie: '',
    statut: 'Actif',
    bio: ''
  });

  useEffect(() => {
    if (artiste) {
      setFormData(artiste);
    }
  }, [artiste]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{artiste ? 'Modifier l\'Artiste' : 'Ajouter un Artiste'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Nom *</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Catégorie *</label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Musicien">Musicien</option>
              <option value="Danseur">Danseur</option>
              <option value="Chanteur">Chanteur</option>
              <option value="Acteur">Acteur</option>
            </select>
          </div>

          <div className="form-group">
            <label>Statut</label>
            <select name="statut" value={formData.statut} onChange={handleChange}>
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
              <option value="Suspendu">Suspendu</option>
            </select>
          </div>

          <div className="form-group">
            <label>Biographie</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArtistModal;
