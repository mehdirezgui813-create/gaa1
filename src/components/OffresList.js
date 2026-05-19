import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/OffresList.css';

function OffresList({ offres, onEdit, onDelete }) {
  const getStatusColor = (statut) => {
    switch(statut) {
      case 'Acceptée': return '#4CAF50';
      case 'Rejetée': return '#f44336';
      case 'En attente': return '#2196F3';
      case 'Expirée': return '#FF9800';
      default: return '#757575';
    }
  };

  return (
    <div className="offres-list">
      {offres.length > 0 ? (
        offres.map((offre) => (
          <div key={offre.id} className="offre-card">
            <div className="offre-header">
              <div className="offre-info">
                <h3>{offre.article?.nom}</h3>
                <p className="numero-offre">{offre.numero_offre}</p>
              </div>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(offre.statut) }}
              >
                {offre.statut}
              </span>
            </div>

            <div className="offre-body">
              <div className="info-row">
                <div className="info-item">
                  <label>Fournisseur</label>
                  <p>{offre.fournisseur?.nom}</p>
                </div>
                <div className="info-item">
                  <label>Contact</label>
                  <p>{offre.fournisseur?.email}</p>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <label>Prix Unitaire</label>
                  <p className="price">{offre.prix_unitaire?.toFixed(2)} DZD</p>
                </div>
                <div className="info-item">
                  <label>Quantité</label>
                  <p>{offre.quantite}</p>
                </div>
                <div className="info-item">
                  <label>Montant Total</label>
                  <p className="price">{(offre.prix_unitaire * offre.quantite)?.toFixed(2)} DZD</p>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <label>Date Offre</label>
                  <p>{new Date(offre.date_offre).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="info-item">
                  <label>Date Expiration</label>
                  <p>{new Date(offre.date_expiration).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              {offre.delai_livraison && (
                <div className="info-row">
                  <div className="info-item">
                    <label>Délai de Livraison</label>
                    <p>{offre.delai_livraison} jours</p>
                  </div>
                </div>
              )}

              {offre.remarques && (
                <div className="remarks">
                  <label>Remarques</label>
                  <p>{offre.remarques}</p>
                </div>
              )}
            </div>

            <div className="offre-footer">
              <button 
                className="action-btn edit-btn"
                onClick={() => onEdit(offre)}
                title="Modifier"
              >
                <FaEdit /> Modifier
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => onDelete(offre.id)}
                title="Supprimer"
              >
                <FaTrash /> Supprimer
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state">
          <p>Aucune offre trouvée</p>
        </div>
      )}
    </div>
  );
}

export default OffresList;
