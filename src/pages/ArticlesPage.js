import React, { useState, useEffect, useCallback } from 'react';
import ArticlesTable from '../components/ArticlesTable';
import ArticleModal from '../components/ArticleModal';
import ArticleDetailsModal from '../components/ArticleDetailsModal';
import TaxModal from '../components/TaxModal';
import { searchArticles, createArticle, updateArticle, deleteArticle } from '../services/articleService';
import '../styles/ArticlesPage.css';

const DEFAULT_CODE_SOC = process.env.REACT_APP_CODE_SOC || 'SOC01';

function ArticlesPage() {
  const [articles, setArticles] = useState([]); // articles from API (filtered by designation only)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [viewingArticle, setViewingArticle] = useState(null);
  const [articleTaxes, setArticleTaxes] = useState([]);

   const fetchArticles = useCallback(async () => {
     setLoading(true);
     try {
       const data = await searchArticles({
         codeSoc: DEFAULT_CODE_SOC,
         designation: searchTerm,
         codeStatut: null
       });
       setArticles(data);
       setError('');
     } catch (err) {
       if (err.response?.status === 403 || err.response?.status === 401) {
         setError('Session expirée. Veuillez vous reconnecter.');
       } else {
         setError('Erreur lors du chargement des articles');
       }
       console.error(err);
     } finally {
       setLoading(false);
     }
   }, [searchTerm]);

   useEffect(() => {
     fetchArticles();
   }, [fetchArticles]);

  const handleAddArticle = () => {
    setEditingArticle(null);
    setShowModal(true);
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setShowModal(true);
  };

  const handleViewArticle = (article) => {
    setViewingArticle(article);
    setArticleTaxes(article.taxes || []);
    setShowDetailsModal(true);
  };

  const handleDeleteArticle = async (idArticle) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await deleteArticle(idArticle);
        setArticles(articles.filter(a => a.idArticle !== idArticle));
      } catch (err) {
        if (err.response?.status === 403 || err.response?.status === 401) {
          setError('Session expirée. Veuillez vous reconnecter.');
        } else {
          setError('Erreur lors de la suppression');
        }
        console.error(err);
      }
    }
  };

  const handleSaveArticle = async (articleData) => {
    try {
      const rawSousCategorie = articleData.idSfamille || articleData.sousCategorie;
      const idSfamille = (rawSousCategorie && Number(rawSousCategorie) > 0)
        ? Number(rawSousCategorie)
        : null;

      const payload = {
        codeSoc: DEFAULT_CODE_SOC,
        codeArticle: articleData.codeArticle || `ART-${Date.now()}`,
        designation: articleData.designation || 'Sans désignation',
        libArabe: articleData.libArabe || null,
        categorie: articleData.categorie || null,
        prix: articleData.prix != null ? Number(articleData.prix) : null,
        stock: articleData.stock != null ? Number(articleData.stock) : null,
        codeUnitMesAchat: articleData.codeUnitMesAchat || null,
        codeUnitMesStock: articleData.codeUnitMesStock || null,
        codeUnitMesVente: articleData.codeUnitMesVente || null,
        codeStatut: articleData.codeStatut || 'ETUD',
        codeGestionAchat: articleData.codeGestionAchat ?? false,
        codeGestionStock: articleData.codeGestionStock ?? false,
        codeGestionVente: articleData.codeGestionVente ?? false,
        compteComptable: articleData.compteComptable || null,
        ficheTechnique: articleData.ficheTechnique || null,
        codeBarre1: articleData.codeBarre1 || null,
        codeBarre2: articleData.codeBarre2 || null,
        idSfamille: idSfamille
      };

      let savedArticle;
      if (editingArticle) {
        savedArticle = await updateArticle(editingArticle.idArticle, payload);
        setArticles(articles.map(a => a.idArticle === editingArticle.idArticle ? savedArticle : a));
      } else {
        savedArticle = await createArticle(payload);
        setArticles([...articles, savedArticle]);
      }

      setShowModal(false);
      setEditingArticle(null);
      setError('');
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        setError('Session expirée. Veuillez vous reconnecter.');
      } else {
        const responseData = err.response?.data;
        const serverMsg = err.response?.statusText
          || (typeof responseData === 'string'
            ? responseData.replace(/<[^>]*>/g, '').trim() || err.message
            : JSON.stringify(responseData))
          || err.message;
        setError(`Erreur lors de la sauvegarde : ${serverMsg}`);
      }
      console.error('Erreur sauvegarde:', err.response || err);
    }
  };

  const handleAddTax = (taxData) => {
    setArticleTaxes([...articleTaxes, taxData]);
    setShowTaxModal(false);
  };

  // Filter articles by selected category (since API only filters by designation)
  const filteredArticles = articles.filter(article => {
    const currentCategory = article.idSfamille?.toString() || '';
    return !selectedCategory || currentCategory === selectedCategory;
  });

  return (
    <div className="articles-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Tableau de Bord des Achats</h1>
          <p>Gérez les produits à acheter et leurs informations</p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn-secondary-outline">Export</button>
          <button type="button" className="btn-primary" onClick={handleAddArticle}>Ajouter article +</button>
        </div>
      </div>

      {error && (
        <div className="error-alert">
          {error}
          {error.includes('reconnecter') && (
            <button
              onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              Se reconnecter
            </button>
          )}
        </div>
      )}

      {loading ? (
        <div className="loading-message">Chargement des articles...</div>
      ) : (
        <ArticlesTable
          articles={filteredArticles}
          onEdit={handleEditArticle}
          onView={handleViewArticle}
          onDelete={handleDeleteArticle}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          loading={false} // we handle loading at the page level
          error={false}   // we handle error at the page level
        />
      )}

      {showModal && (
        <ArticleModal
          article={editingArticle}
          onSave={handleSaveArticle}
          onClose={() => setShowModal(false)}
        />
      )}

      {showDetailsModal && viewingArticle && (
        <ArticleDetailsModal
          article={viewingArticle}
          taxes={articleTaxes}
          onEdit={handleEditArticle}
          onDelete={handleDeleteArticle}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {showTaxModal && (
        <TaxModal
          onClose={() => setShowTaxModal(false)}
          onSave={handleAddTax}
        />
      )}
    </div>
  );
}

export default ArticlesPage;