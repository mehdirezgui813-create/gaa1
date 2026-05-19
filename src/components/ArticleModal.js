import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import TaxModal from './TaxModal';
import '../styles/Modal.css';

const STATUS_OPTIONS = [
  { label: 'En préparation',   value: 'ETUD' },
  { label: 'En exploitation',  value: 'EXPL' },
  { label: 'Hors exploitation', value: 'HEXP' }
];

const CATEGORY_OPTIONS = [
  { label: 'Famille Test Informatique', value: 1 }
];

const SUBCATEGORIES = {
  1: [
    { label: 'Sous-Famille Ordinateurs', value: 1  },
    { label: 'Ordinateurs Portables',    value: 11 }
  ]
};

const UNIT_OPTIONS = ['PCE', 'KG', 'L', 'M', 'BOITE', 'PACK'];
const DEFAULT_CODE_SOC = process.env.REACT_APP_CODE_SOC || 'DEFAULT';

function ArticleModal({ article, onSave, onClose }) {
  const [formData, setFormData] = useState({
    codeSoc: DEFAULT_CODE_SOC,
    codeArticle: '',
    designation: '',
    libArabe: '',
    categorie: '',
    sousCategorie: '',
    prix: '',
    stock: '',
    codeUnitMesAchat: '',
    codeUnitMesStock: '',
    codeUnitMesVente: '',
    codeStatut: 'ETUD',
    codeGestionAchat: true,
    codeGestionStock: false,
    codeGestionVente: false,
    compteComptable: '',
    ficheTechnique: '',
    barcodes: [],
    barcodeInput: ''
  });
  const [taxes, setTaxes] = useState([]);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [showTaxAlert, setShowTaxAlert] = useState(false);

  useEffect(() => {
    if (article) {
      setFormData({
        codeSoc: article.codeSoc || DEFAULT_CODE_SOC,
        codeArticle: article.codeArticle || '',
        designation: article.designation || '',
        libArabe: article.libArabe || '',
        categorie: article.idFamille || '',
        sousCategorie: article.idSfamille || '',
        prix: article.prix || '',
        stock: article.stock || '',
        codeUnitMesAchat: article.codeUnitMesAchat || '',
        codeUnitMesStock: article.codeUnitMesStock || '',
        codeUnitMesVente: article.codeUnitMesVente || '',
        codeStatut: article.codeStatut || 'ETUD',
        codeGestionAchat: !!article.codeGestionAchat,
        codeGestionStock: !!article.codeGestionStock,
        codeGestionVente: !!article.codeGestionVente,
        compteComptable: article.compteComptable || '',
        ficheTechnique: article.ficheTechnique || '',
        barcodes: [article.codeBarre1, article.codeBarre2].filter(Boolean),
        barcodeInput: ''
      });
    } else {
      setFormData({
        codeSoc: DEFAULT_CODE_SOC,
        codeArticle: '',
        designation: '',
        libArabe: '',
        categorie: '',
        sousCategorie: '',
        prix: '',
        stock: '',
        codeUnitMesAchat: '',
        codeUnitMesStock: '',
        codeUnitMesVente: '',
        codeStatut: 'ETUD',
        codeGestionAchat: true,
        codeGestionStock: false,
        codeGestionVente: false,
        compteComptable: '',
        ficheTechnique: '',
        barcodes: [],
        barcodeInput: ''
      });
    }
  }, [article]);

  const generateCodeArticle = (designation) => {
    const normalized = (designation || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const base = normalized.slice(0, 8) || 'ART';
    return `${base}-${Date.now().toString().slice(-4)}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }

    // ✅ Réinitialiser la sous-catégorie quand la catégorie change
    if (name === 'categorie') {
      setFormData(prev => ({ ...prev, categorie: value, sousCategorie: '' }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBarcode = () => {
    const code = formData.barcodeInput.trim();
    if (!code || formData.barcodes.includes(code) || formData.barcodes.length >= 2) {
      setFormData(prev => ({ ...prev, barcodeInput: '' }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      barcodes: [...prev.barcodes, code],
      barcodeInput: ''
    }));
  };

  const handleRemoveBarcode = (index) => {
    setFormData(prev => ({
      ...prev,
      barcodes: prev.barcodes.filter((_, i) => i !== index)
    }));
  };

  const handleAddTax = (taxData) => {
    setTaxes([...taxes, taxData]);
    setShowTaxModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taxes.length === 0) {
      setShowTaxAlert(true);
      return;
    }

    const rawSousCategorie = formData.sousCategorie;
    const idSfamille = (rawSousCategorie && Number(rawSousCategorie) > 0)
      ? Number(rawSousCategorie)
      : null;

    onSave({
      codeSoc: formData.codeSoc,
      codeArticle: formData.codeArticle || generateCodeArticle(formData.designation),
      designation: formData.designation,
      libArabe: formData.libArabe,
      categorie: formData.categorie,
      prix: parseFloat(formData.prix) || null,
      stock: parseInt(formData.stock, 10) || null,
      codeUnitMesAchat: formData.codeUnitMesAchat || null,
      codeUnitMesStock: formData.codeUnitMesStock || null,
      codeUnitMesVente: formData.codeUnitMesVente || null,
      codeStatut: formData.codeStatut,
      codeGestionAchat: formData.codeGestionAchat,
      codeGestionStock: formData.codeGestionStock,
      codeGestionVente: formData.codeGestionVente,
      compteComptable: formData.compteComptable || null,
      ficheTechnique: formData.ficheTechnique || null,
      codeBarre1: formData.barcodes[0] || null,
      codeBarre2: formData.barcodes[1] || null,
      idSfamille: idSfamille,
      taxes: taxes
    });
  };

  // ✅ Sous-catégories de la famille sélectionnée
  const currentSubcategories = SUBCATEGORIES[formData.categorie] || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{article ? "Modifier l'article" : 'Ajouter un article'}</h2>
            <p>Créez un nouvel article pour votre catalogue</p>
          </div>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form article-form">
          <section className="section-group">
            <h3>Information de l'article</h3>
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="designation">Désignation</label>
                <input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="ex : chaise.."
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="libArabe">Désignation en arabe</label>
                <input
                  id="libArabe"
                  name="libArabe"
                  value={formData.libArabe}
                  onChange={handleChange}
                  placeholder="ex : كرسي"
                />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="categorie">Catégorie</label>
                <select
                  id="categorie"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleChange}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {CATEGORY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="sousCategorie">Sous-catégorie</label>
                <select
                  id="sousCategorie"
                  name="sousCategorie"
                  value={formData.sousCategorie}
                  onChange={handleChange}
                  disabled={!formData.categorie}
                >
                  <option value="">Sélectionner une sous-catégorie</option>
                  {currentSubcategories.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="prix">Prix</label>
                <input
                  id="prix"
                  name="prix"
                  type="number"
                  value={formData.prix}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>
          </section>

          <section className="section-group">
            <h3>Unités de mesure</h3>
            <div className="grid-3">
              <div className="form-group">
                <label htmlFor="codeUnitMesAchat">Unité d'achat</label>
                <select id="codeUnitMesAchat" name="codeUnitMesAchat" value={formData.codeUnitMesAchat} onChange={handleChange}>
                  <option value="">Sélectionner</option>
                  {UNIT_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="codeUnitMesStock">Unité de stock</label>
                <select id="codeUnitMesStock" name="codeUnitMesStock" value={formData.codeUnitMesStock} onChange={handleChange}>
                  <option value="">Sélectionner</option>
                  {UNIT_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="codeUnitMesVente">Unité de vente</label>
                <select id="codeUnitMesVente" name="codeUnitMesVente" value={formData.codeUnitMesVente} onChange={handleChange}>
                  <option value="">Sélectionner</option>
                  {UNIT_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="field-note">Les unités peuvent être différentes selon achat, stockage et vente</p>
          </section>

          <section className="section-group">
            <h3>Statut de l'article</h3>
            <div className="form-group">
              <select id="codeStatut" name="codeStatut" value={formData.codeStatut} onChange={handleChange}>
                {STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <p className="field-note">Article en cours de validation, pas encore utilisable</p>
          </section>

          <section className="section-group">
            <h3>Gestion activée</h3>
            <div className="toggle-grid">
              <label className="switch-field">
                <span>Gestion d'achat</span>
                <input type="checkbox" name="codeGestionAchat" checked={formData.codeGestionAchat} onChange={handleChange} />
                <span className="slider" />
              </label>
              <label className="switch-field">
                <span>Gestion stock</span>
                <input type="checkbox" name="codeGestionStock" checked={formData.codeGestionStock} onChange={handleChange} />
                <span className="slider" />
              </label>
              <label className="switch-field">
                <span>Gestion de vente</span>
                <input type="checkbox" name="codeGestionVente" checked={formData.codeGestionVente} onChange={handleChange} />
                <span className="slider" />
              </label>
            </div>
          </section>

          <section className="section-group">
            <h3>Informations avancées</h3>
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="compteComptable">Compte comptable</label>
                <input
                  id="compteComptable"
                  name="compteComptable"
                  value={formData.compteComptable}
                  onChange={handleChange}
                  placeholder="ex : 2566"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ficheTechnique">Fiche technique</label>
                <textarea
                  id="ficheTechnique"
                  name="ficheTechnique"
                  value={formData.ficheTechnique}
                  onChange={handleChange}
                  placeholder="Description détaillée de l'article..."
                />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group barcode-group">
                <label htmlFor="barcodeInput">Code à barre / QR Code</label>
                <div className="barcode-input-row">
                  <input
                    id="barcodeInput"
                    name="barcodeInput"
                    value={formData.barcodeInput}
                    onChange={handleChange}
                    placeholder="1256486922"
                  />
                  <button type="button" className="btn-secondary btn-small" onClick={handleAddBarcode}>+</button>
                </div>
                <div className="barcode-list">
                  {formData.barcodes.map((code, index) => (
                    <span key={index} className="barcode-chip">
                      {code}
                      <button type="button" onClick={() => handleRemoveBarcode(index)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section-group">
            <h3>Taxes</h3>
            <div className="tax-section">
              <button type="button" className="btn-secondary tax-add-btn" onClick={() => setShowTaxModal(true)}>
                <FaPlus /> Ajouter une taxe
              </button>
              {taxes.length > 0 && (
                <div className="tax-list">
                  {taxes.map((tax, index) => (
                    <div key={index} className="tax-chip">
                      {tax.taxType} ({tax.rate}%) - {tax.operation}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {showTaxAlert && (
            <div className="error-alert tax-alert">
              Aucune taxe ajoutée. Veuillez ajouter au moins une taxe avant de sauvegarder.
              <button type="button" className="alert-close" onClick={() => setShowTaxAlert(false)}>×</button>
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn-primary">
              {article ? "Modifier l'article" : 'Ajouter article'}
            </button>
          </div>
        </form>
      </div>
      {showTaxModal && (
        <TaxModal
          onClose={() => setShowTaxModal(false)}
          onSave={handleAddTax}
        />
      )}
    </div>
  );
}

export default ArticleModal;