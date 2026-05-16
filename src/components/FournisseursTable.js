import React from 'react';
import '../styles/FournisseursTable.css';

function FournisseursTable({ fournisseurs, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fournisseurs.length > 0 ? (
            fournisseurs.map((fournisseur) => (
              <tr key={fournisseur.id}>
                <td className="id-cell">{fournisseur.id}</td>
                <td className="name-cell">{fournisseur.nom}</td>
                <td>
                  <span className={`category-badge ${fournisseur.categorie?.toLowerCase()}`}>
                    {fournisseur.categorie}
                  </span>
                </td>
                <td>{fournisseur.email}</td>
                <td>{fournisseur.telephone}</td>
                <td>
                  <span className={`status-badge ${fournisseur.statut?.toLowerCase()}`}>
                    {fournisseur.statut || 'Actif'}
                  </span>
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => onEdit(fournisseur)}
                    title="Modifier"
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => onDelete(fournisseur.id)}
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="empty-state">Aucun fournisseur trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <p>Total: {fournisseurs.length} fournisseur(s)</p>
      </div>
    </div>
  );
}

export default FournisseursTable;
