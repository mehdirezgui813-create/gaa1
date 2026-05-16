import React from 'react';
import '../styles/ArtistesTable.css';

function ArtistesTable({ artistes, onEdit, onDelete }) {
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
          {artistes.length > 0 ? (
            artistes.map((artiste) => (
              <tr key={artiste.id}>
                <td className="id-cell">{artiste.id}</td>
                <td className="name-cell">{artiste.nom}</td>
                <td>
                  <span className={`category-badge ${artiste.categorie?.toLowerCase()}`}>
                    {artiste.categorie}
                  </span>
                </td>
                <td>{artiste.email}</td>
                <td>{artiste.telephone}</td>
                <td>
                  <span className={`status-badge ${artiste.statut?.toLowerCase()}`}>
                    {artiste.statut || 'Actif'}
                  </span>
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => onEdit(artiste)}
                    title="Modifier"
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => onDelete(artiste.id)}
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="empty-state">Aucun artiste trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <p>Total: {artistes.length} artiste(s)</p>
      </div>
    </div>
  );
}

export default ArtistesTable;
