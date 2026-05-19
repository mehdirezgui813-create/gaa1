import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/TaxModal.css';

function TaxModal({ onClose, onSave, existingTaxes = [] }) {
  const [formData, setFormData] = useState({
    idTaxe: '',
    codeOperation: 'ACHA',
    dateDebut: Math.floor(Date.now() / 1000),
    dateFin: null
  });

  const TAX_OPTIONS = [
    { id: 1, label: 'TVA 5%' },
    { id: 2, label: 'TVA 10%' },
    { id: 3, label: 'TVA 19%' },
    { id: 4, label: 'TVA 20%' },
    { id: 5, label: 'TCL' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'idTaxe') {
      setFormData(prev => ({ ...prev, idTaxe: parseInt(value) }));
    } else if (name === 'codeOperation') {
      setFormData(prev => ({ ...prev, codeOperation: value }));
    } else if (name === 'dateDebut') {
      const timestamp = new Date(value).getTime();
      setFormData(prev => ({ ...prev, dateDebut: timestamp }));
    } else if (name === 'dateFin') {
      const timestamp = value ? new Date(value).getTime() : null;
      setFormData(prev => ({ ...prev, dateFin: timestamp }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.idTaxe) {
      alert('Veuillez sélectionner une taxe');
      return;
    }

    const taxeData = {
      idTaxe: formData.idTaxe,
      codeOperation: formData.codeOperation,
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin
    };

    console.log('Taxe ajoutée:', taxeData);
    onSave(taxeData);
  };

  const getDateFromTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="tax-modal-overlay" onClick={onClose}>
      <div className="tax-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="tax-modal-header">
          <h3>Ajouter une taxe</h3>
          <button className="tax-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="tax-form">
          <div className="tax-form-row">
            <div className="tax-form-group">
              <label htmlFor="idTaxe">Sélectionner une taxe</label>
              <select
                id="idTaxe"
                name="idTaxe"
                value={formData.idTaxe}
                onChange={handleChange}
                required
              >
                <option value="">-- Choisir une taxe --</option>
                {TAX_OPTIONS.map(tax => (
                  <option key={tax.id} value={tax.id}>
                    {tax.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="tax-form-group">
              <label htmlFor="codeOperation">Type d'opération</label>
              <select
                id="codeOperation"
                name="codeOperation"
                value={formData.codeOperation}
                onChange={handleChange}
                required
              >
                <option value="ACHA">Achat</option>
                <option value="VENT">Vente</option>
              </select>
            </div>
          </div>

          <div className="tax-form-row">
            <div className="tax-form-group">
              <label htmlFor="dateDebut">Date début de validité</label>
              <input
                id="dateDebut"
                name="dateDebut"
                type="date"
                value={getDateFromTimestamp(formData.dateDebut)}
                onChange={handleChange}
                required
              />
            </div>

            <div className="tax-form-group">
              <label htmlFor="dateFin">Date fin de validité (optionnel)</label>
              <input
                id="dateFin"
                name="dateFin"
                type="date"
                value={getDateFromTimestamp(formData.dateFin)}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="tax-modal-footer">
            <button type="button" className="tax-btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="tax-btn-primary">
              Ajouter taxe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaxModal;
