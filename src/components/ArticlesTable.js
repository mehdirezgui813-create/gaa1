import React from 'react';
import '../styles/ArticlesTable.css';

function ArticlesTable({ articles, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Stock</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.length > 0 ? (
            articles.map((article) => (
              <tr key={article.id}>
                <td className="id-cell">{article.id}</td>
                <td className="name-cell">{article.nom}</td>
                <td>
                  <span className={`category-badge ${article.categorie?.toLowerCase()}`}>
                    {article.categorie}
                  </span>
                </td>
                <td>{article.prix ? `${article.prix.toFixed(2)} DZD` : 'N/A'}</td>
                <td>{article.stock}</td>
                <td>
                  <span className={`status-badge ${article.statut?.toLowerCase()}`}>
                    {article.statut || 'Disponible'}
                  </span>
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => onEdit(article)}
                    title="Modifier"
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => onDelete(article.id)}
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="empty-state">Aucun article trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <p>Total: {articles.length} article(s)</p>
      </div>
    </div>
  );
}

export default ArticlesTable;
