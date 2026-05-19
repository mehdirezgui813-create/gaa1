import React, { useState } from 'react';
import { FaTimes, FaBarcode, FaTag, FaInfoCircle, FaTrash, FaEdit } from 'react-icons/fa';
import '../styles/ArticleDetailsModal.css';

function ArticleDetailsModal({ article, onClose, onEdit, onDelete, taxes = [] }) {
  const [activeTab, setActiveTab] = useState('details');

  const getStatusLabel = (codeStatut) => {
    switch (codeStatut) {
      case 'ETUD': return { text: 'En préparation', variant: 'preparation' };
      case 'EXPL': return { text: 'En exploitation', variant: 'active' };
      case 'HEXP': return { text: 'Hors exploitation', variant: 'inactive' };
      default: return { text: codeStatut || 'Inconnu', variant: 'default' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      onDelete(article.idArticle);
    }
  };

  const handleEdit = () => {
    onEdit(article);
  };

  const status = getStatusLabel(article.codeStatut);

  return (
    <div className="article-details-overlay" onClick={onClose}>
      <div className="article-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="details-header">
          <div className="details-header-top">
            <div className="details-title-section">
              <h2>{article.designation || article.nom}</h2>
              <span className={`status-badge ${status.variant}`}>{status.text}</span>
            </div>
            <button className="details-close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
          <div className="details-actions">
            <button className="details-btn details-btn-edit" onClick={handleEdit}>
              <FaEdit /> Modifier
            </button>
            <button className="details-btn details-btn-delete" onClick={handleDelete}>
              <FaTrash /> Supprimer
            </button>
          </div>
        </div>

        <div className="details-tabs">
          <button
            className={`details-tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            <FaInfoCircle /> Détails
          </button>
          <button
            className={`details-tab ${activeTab === 'taxes' ? 'active' : ''}`}
            onClick={() => setActiveTab('taxes')}
          >
            <FaTag /> Taxes
          </button>
          <button
            className={`details-tab ${activeTab === 'codes' ? 'active' : ''}`}
            onClick={() => setActiveTab('codes')}
          >
            <FaBarcode /> Codes
          </button>
        </div>

        <div className="details-content">
          {activeTab === 'details' && (
            <div className="details-tab-content">
              <div className="details-section">
                <h3>Informations générales</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Code article</span>
                    <span className="detail-value">{article.codeArticle}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Désignation</span>
                    <span className="detail-value">{article.designation || article.nom}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Désignation arabe</span>
                    <span className="detail-value">{article.libArabe || '-'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Catégorie</span>
                    <span className="detail-value">{article.categorie || article.idSfamille || '-'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Prix</span>
                    <span className="detail-value">{article.prix ? `${article.prix} €` : '-'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Stock</span>
                    <span className="detail-value">{article.stock ?? '-'}</span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Unités de mesure</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Unité d'achat</span>
                    <span className="detail-value">{article.codeUnitMesAchat || '-'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Unité de stock</span>
                    <span className="detail-value">{article.codeUnitMesStock || '-'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Unité de vente</span>
                    <span className="detail-value">{article.codeUnitMesVente || '-'}</span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Gestion</h3>
                <div className="management-tags">
                  {article.codeGestionAchat && <span className="management-tag">Achat</span>}
                  {article.codeGestionVente && <span className="management-tag">Vente</span>}
                  {article.codeGestionStock && <span className="management-tag">Stock</span>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'taxes' && (
            <div className="details-tab-content">
              <div className="details-section">
                <h3>Taxes associées</h3>
                {taxes.length > 0 ? (
                  <div className="taxes-list">
                    {taxes.map((tax, index) => (
                      <div key={index} className="tax-item">
                        <div className="tax-info">
                          <span className="tax-type">{tax.taxType}</span>
                          <span className="tax-rate">{tax.rate}%</span>
                          <span className="tax-operation">{tax.operation}</span>
                        </div>
                        <div className="tax-dates">
                          <span>Du {formatDate(tax.startDate)} au {formatDate(tax.endDate)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">Aucune taxe associée à cet article</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'codes' && (
            <div className="details-tab-content">
              <div className="details-section">
                <h3>Codes à barres</h3>
                <div className="codes-grid">
                  {article.codeBarre1 && (
                    <div className="code-item">
                      <FaBarcode className="code-icon" />
                      <span>{article.codeBarre1}</span>
                    </div>
                  )}
                  {article.codeBarre2 && (
                    <div className="code-item">
                      <FaBarcode className="code-icon" />
                      <span>{article.codeBarre2}</span>
                    </div>
                  )}
                  {!article.codeBarre1 && !article.codeBarre2 && (
                    <p className="no-data">Aucun code à barres</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleDetailsModal;