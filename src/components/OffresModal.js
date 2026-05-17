import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';

function OffresModal({ offre, articles, fournisseurs, onSave, onClose }) {
  const [formData, setFormData] = useState({
    numero_offre: '',
    article_id: '',
    fournisseur_id: '',
    prix_unitaire: '',
    quantite: '',
    date_offre: new Date().toISOString().split('T')[0],
    date_expiration: '',
    delai_livraison: '',
    statut: 'En attente',
    remarques: ''
  });

  useEffect(() => {
    if (offre) {
      setFormData({
        ...offre,
        article_id: offre.article?.id || '',
        fournisseur_id: offre.fournisseur?.id || ''
      });
    }
  }, [offre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const generateOffreNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000);
    return `OFF-${year}${month}${day}-${random}`;
  };

  const getTotalAmount = () => {
    return (parseFloat(formData.prix_unitaire) * parseInt(formData.quantite)) || 0;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{offre ? 'Modifier l\'Offre' : 'Nouvelle Offre'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Section Identification */}
          <div className="form-section">
            <h3>Identification de l'Offre</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="numero_offre">Numéro Offre *</label>
                <div className="input-with-button">
                  <input
                    id="numero_offre"
                    type="text"
                    name="numero_offre"
                    value={formData.numero_offre}
                    onChange={handleChange}
                    placeholder="OFF-YYYYMMDD-XXX"
                    required
                  />
                  <button 
                    type="button" 
                    className="btn-generate"
                    onClick={() => setFormData(prev => ({ ...prev, numero_offre: generateOffreNumber() }))}
                  >
                    Générer
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="statut">Statut *</label>
                <select
                  id="statut"
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  required
                >
                  <option value="En attente">En attente</option>
                  <option value="Acceptée">Acceptée</option>
                  <option value="Rejetée">Rejetée</option>
                  <option value="Expirée">Expirée</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Articles et Fournisseur */}
          <div className="form-section">
            <h3>Article et Fournisseur</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="article_id">Article *</label>
                <select
                  id="article_id"
                  name="article_id"
                  value={formData.article_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un article</option>
                  {articles.map(article => (
                    <option key={article.id} value={article.id}>
                      {article.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fournisseur_id">Fournisseur *</label>
                <select
                  id="fournisseur_id"
                  name="fournisseur_id"
                  value={formData.fournisseur_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un fournisseur</option>
                  {fournisseurs.map(fournisseur => (
                    <option key={fournisseur.id} value={fournisseur.id}>
                      {fournisseur.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section Pricing */}
          <div className="form-section">
            <h3>Tarification</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prix_unitaire">Prix Unitaire (DZD) *</label>
                <input
                  id="prix_unitaire"
                  type="number"
                  name="prix_unitaire"
                  value={formData.prix_unitaire}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantite">Quantité *</label>
                <input
                  id="quantite"
                  type="number"
                  name="quantite"
                  value={formData.quantite}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Montant Total (DZD)</label>
                <input
                  type="text"
                  value={getTotalAmount().toFixed(2)}
                  disabled
                  className="disabled-input"
                />
              </div>
            </div>
          </div>

          {/* Section Dates */}
          <div className="form-section">
            <h3>Validité</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date_offre">Date Offre *</label>
                <input
                  id="date_offre"
                  type="date"
                  name="date_offre"
                  value={formData.date_offre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date_expiration">Date Expiration *</label>
                <input
                  id="date_expiration"
                  type="date"
                  name="date_expiration"
                  value={formData.date_expiration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="delai_livraison">Délai Livraison (jours)</label>
                <input
                  id="delai_livraison"
                  type="number"
                  name="delai_livraison"
                  value={formData.delai_livraison}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Section Remarques */}
          <div className="form-section">
            <h3>Remarques et Conditions</h3>
            
            <div className="form-group">
              <label htmlFor="remarques">Remarques</label>
              <textarea
                id="remarques"
                name="remarques"
                value={formData.remarques}
                onChange={handleChange}
                placeholder="Conditions spéciales, notes, etc."
                rows="4"
              ></textarea>
            </div>
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

export default OffresModal;
