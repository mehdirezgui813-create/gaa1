import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';

function FournisseurModal({ fournisseur, onSave, onClose }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    categorie: '',
    adresse: '',
    statut: 'Actif'
  });

  useEffect(() => {
    if (fournisseur) {
      setFormData(fournisseur);
    }
  }, [fournisseur]);

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
          <h2>{fournisseur ? 'Modifier le Fournisseur' : 'Ajouter un Fournisseur'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Nom de l'Entreprise *</label>
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
              <option value="Équipement">Équipement</option>
              <option value="Restauration">Restauration</option>
              <option value="Transport">Transport</option>
              <option value="Sécurité">Sécurité</option>
            </select>
          </div>

          <div className="form-group">
            <label>Adresse</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Statut</label>
            <select name="statut" value={formData.statut} onChange={handleChange}>
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
              <option value="Suspendu">Suspendu</option>
            </select>
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

export default FournisseurModal;
