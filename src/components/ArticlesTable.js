import React from 'react';
import { FaEye, FaEdit, FaTrash, FaBox } from 'react-icons/fa';
import '../styles/ArticlesTable.css';

function ArticlesTable({ articles, onEdit, onDelete, onView, loading, error, searchTerm, onSearchChange, selectedCategory, onCategoryChange }) {
  const getCategoryLabel = (article) => {
    return article.categorie || 'N/A';
  };

  const getUtilisationLabels = (article) => {
    const labels = [];
    if (article.codeGestionAchat) {
      labels.push({ text: 'Achat', variant: 'achat' });
    }
    if (article.codeGestionVente) {
      labels.push({ text: 'Vente', variant: 'vente' });
    }
    if (article.codeGestionStock) {
      labels.push({ text: 'Stock', variant: 'stock' });
    }
    return labels;
  };

  const statutBadgeMap = {
    // Active states
    "EXPL":        { label: "Actif",         bg: "#DCFCE7", color: "#16A34A" },

    // En préparation states
    "ETUD":     { label: "En preparaton", bg: "#FEF3C7", color: "#F59E0B" },

    // Inactive/Hors exploitation states
    "HEXP":     { label: "inactive", bg: "#F3F4F6", color: "#6B7280" },
  };

  const getStatutBadge = (value) => {
    return statutBadgeMap[value] ?? {
      label: value,
      bg: "#F3F4F6",
      color: "#6B7280"
    };
  };

  const getUnitLabel = (unitCode) => {
    // All units are "Piece" according to spec
    return 'Piece';
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">Erreur lors du chargement des articles</div>;
  }

  if (articles.length === 0) {
    return (
      <div className="empty-state">
        <FaBox className="empty-state-icon" />
        <p className="empty-state-text">Aucun article trouvé</p>
        <p className="empty-state-subtext">Cliquez sur 'Ajouter article' pour commencer</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="card-header">
        <h2>Liste des articles</h2>
      </div>
      <div className="filters-row">
        <div className="search-box">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Rechercher une commande, un fournisseur..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-box">
          <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="">Toutes les catégories</option>
            <option value="1001">Électronique</option>
            <option value="1002">Autres</option>
          </select>
        </div>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Code article</th>
            <th>Designation</th>
            <th>Categories</th>
            <th>Utilisation</th>
            <th>Unité</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            const utilisationLabels = getUtilisationLabels(article);
            const statutBadge = getStatutBadge(article.codeStatut);
            return (
              <tr key={article.idArticle}>
                <td>
                  <span className="code-pill">{article.codeArticle}</span>
                </td>
                <td className="name-cell">{article.designation}</td>
                <td>
                  <span className="category-pill">{getCategoryLabel(article)}</span>
                </td>
                <td>
                  <div className="utilisation-tags">
                    {utilisationLabels.map((item) => (
                      <span key={item.text} className={`utilisation-tag ${item.variant}`}>
                        {item.text}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{getUnitLabel(article.codeUnitMesVente)}</td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: statutBadge.bg, color: statutBadge.color }}>
                    {statutBadge.label}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="action-btn view-btn"
                    onClick={() => onView && onView(article)}
                    title="Voir les détails"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => onEdit(article)}
                    title="Modifier"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(article.idArticle)}
                    title="Supprimer"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-bar">
        <button className="pagination-btn prev">‹ Previous</button>
        <span className="pagination-info">1 | 2 | 3</span>
        <button className="pagination-btn next">Next ›</button>
      </div>
      <div className="table-footer">
        <p>Total: {articles.length} article(s)</p>
      </div>
    </div>
  );
}

export default ArticlesTable;
