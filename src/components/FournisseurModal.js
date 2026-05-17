import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';

function FournisseurModal({ fournisseur, onSave, onClose }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    categorie: '',
    adresse: '',
    ville: '',
    codePostal: '',
    pays: '',
    personne_contact: '',
    titre_contact: '',
    telephone_contact: '',
    email_contact: '',
    entreprise_nom: '',
    numero_identification: '',
    site_web: '',
    description: '',
    statut: 'Actif'
  });

  useEffect(() => {
    if (fournisseur) {
      setFormData(fournisseur);
    } else {
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        categorie: '',
        adresse: '',
        ville: '',
        codePostal: '',
        pays: '',
        personne_contact: '',
        titre_contact: '',
        telephone_contact: '',
        email_contact: '',
        entreprise_nom: '',
        numero_identification: '',
        site_web: '',
        description: '',
        statut: 'Actif'
      });
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
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{fournisseur ? 'Modifier le Fournisseur' : 'Ajouter un Fournisseur'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Section Informations Générales */}
          <div className="form-section">
            <h3>Informations Générales</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nom">Nom de l'Entreprise *</label>
                <input
                  id="nom"
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Nom de l'entreprise"
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
                  <option value="Équipement">Équipement</option>
                  <option value="Restauration">Restauration</option>
                  <option value="Transport">Transport</option>
                  <option value="Sécurité">Sécurité</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="numero_identification">Numéro d'Identification</label>
                <input
                  id="numero_identification"
                  type="text"
                  name="numero_identification"
                  value={formData.numero_identification}
                  onChange={handleChange}
                  placeholder="N° de SIRET/SIREN"
                />
              </div>
              <div className="form-group">
                <label htmlFor="site_web">Site Web</label>
                <input
                  id="site_web"
                  type="url"
                  name="site_web"
                  value={formData.site_web}
                  onChange={handleChange}
                  placeholder="https://exemple.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description de l'entreprise"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Section Adresse */}
          <div className="form-section">
            <h3>Adresse</h3>
            
            <div className="form-group">
              <label htmlFor="adresse">Adresse *</label>
              <input
                id="adresse"
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                placeholder="Adresse complète"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="codePostal">Code Postal</label>
                <input
                  id="codePostal"
                  type="text"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleChange}
                  placeholder="Code postal"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ville">Ville</label>
                <input
                  id="ville"
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  placeholder="Ville"
                />
              </div>
              <div className="form-group">
                <label htmlFor="pays">Pays</label>
                <input
                  id="pays"
                  type="text"
                  name="pays"
                  value={formData.pays}
                  onChange={handleChange}
                  placeholder="Pays"
                />
              </div>
            </div>
          </div>

          {/* Section Contact Entreprise */}
          <div className="form-section">
            <h3>Contact Entreprise</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@entreprise.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Téléphone *</label>
                <input
                  id="telephone"
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="+213 XX XX XX XX"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section Personne de Contact */}
          <div className="form-section">
            <h3>Personne de Contact</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="personne_contact">Nom Complet</label>
                <input
                  id="personne_contact"
                  type="text"
                  name="personne_contact"
                  value={formData.personne_contact}
                  onChange={handleChange}
                  placeholder="Nom de la personne"
                />
              </div>
              <div className="form-group">
                <label htmlFor="titre_contact">Titre/Fonction</label>
                <input
                  id="titre_contact"
                  type="text"
                  name="titre_contact"
                  value={formData.titre_contact}
                  onChange={handleChange}
                  placeholder="Directeur, Gérant, etc."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email_contact">Email</label>
                <input
                  id="email_contact"
                  type="email"
                  name="email_contact"
                  value={formData.email_contact}
                  onChange={handleChange}
                  placeholder="email_contact@entreprise.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telephone_contact">Téléphone</label>
                <input
                  id="telephone_contact"
                  type="tel"
                  name="telephone_contact"
                  value={formData.telephone_contact}
                  onChange={handleChange}
                  placeholder="+213 XX XX XX XX"
                />
              </div>
            </div>
          </div>

          {/* Section Statut */}
          <div className="form-section">
            <h3>Statut</h3>
            
            <div className="form-group">
              <label htmlFor="statut">Statut du Fournisseur</label>
              <select 
                id="statut"
                name="statut" 
                value={formData.statut} 
                onChange={handleChange}
              >
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
                <option value="Suspendu">Suspendu</option>
              </select>
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

export default FournisseurModal;
