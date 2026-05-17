import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';

function ArticleModal({ article, onSave, onClose }) {
  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    stock: '',
    categorie: '',
    statut: 'Disponible',
    description: ''
  });

  useEffect(() => {
    if (article) {
      setFormData(article);
    } else {
      setFormData({
        nom: '',
        prix: '',
        stock: '',
        categorie: '',
        statut: 'Disponible',
        description: ''
      });
    }
  }, [article]);

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
          <h2>{article ? 'Modifier l\'Article' : 'Ajouter un Article'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="nom">Nom *</label>
            <input
              id="nom"
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom de l'article"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prix">Prix *</label>
            <input
              id="prix"
              type="number"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock *</label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categorie">Catégorie *</label>
            <select
              id="categorie"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Vêtements">Vêtements</option>
              <option value="Électronique">Électronique</option>
              <option value="Alimentation">Alimentation</option>
              <option value="Maison">Maison</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="statut">Statut</label>
            <select 
              id="statut"
              name="statut" 
              value={formData.statut} 
              onChange={handleChange}
            >
              <option value="Disponible">Disponible</option>
              <option value="Épuisé">Épuisé</option>
              <option value="En cours de réapprovisionnement">En cours de réapprovisionnement</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Description de l'article"
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

export default ArticleModal;
