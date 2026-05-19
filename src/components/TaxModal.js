import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/TaxModal.css';

function TaxModal({ onClose, onSave, existingTaxes = [] }) {
  const [formData, setFormData] = useState({
    taxType: 'TVA',
    operation: 'ACHAT',
    rate: '5', // default to 5%
    rateValue: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'rate-value') {
      setFormData(prev => ({ ...prev, rateValue: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let rate = parseFloat(formData.rate);
    if (formData.rate === 'other') {
      rate = parseFloat(formData.rateValue);
    }
    onSave({
      taxType: formData.taxType,
      operation: formData.operation,
      rate: rate,
      startDate: formData.startDate,
      endDate: formData.endDate
    });
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
              <label htmlFor="taxType">Type de taxe</label>
              <select
                id="taxType"
                name="taxType"
                value={formData.taxType}
                onChange={handleChange}
                required
              >
                <option value="TVA">TVA</option>
                <option value="TCL">TCL</option>
              </select>
            </div>
            
            <div className="tax-form-group">
              <label htmlFor="operation">Opération</label>
              <div className="operation-toggle">
                <button
                  type="button"
                  className={formData.operation === 'ACHAT' ? 'operation-btn active' : 'operation-btn'}
                  onClick={() => setFormData(prev => ({ ...prev, operation: 'ACHAT' }))}
                >
                  Achat
                </button>
                <button
                  type="button"
                  className={formData.operation === 'VENTE' ? 'operation-btn active' : 'operation-btn'}
                  onClick={() => setFormData(prev => ({ ...prev, operation: 'VENTE' }))}
                >
                  Vente
                </button>
              </div>
            </div>
          </div>
          
          <div className="tax-form-row">
            <div className="tax-form-group">
              <label htmlFor="rate">Taux (%)</label>
              <select
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
              >
                <option value="5">5%</option>
                <option value="2">2%</option>
                <option value="10">10%</option>
                <option value="20">20%</option>
                <option value="other">Autre</option>
              </select>
              {formData.rate === 'other' && (
                <input
                  type="number"
                  id="rate-value"
                  name="rate-value"
                  value={formData.rateValue || ''}
                  onChange={handleChange}
                  placeholder="ex: 2.5"
                  min="0"
                  max="100"
                  step="0.01"
                  style={{ marginTop: '8px', width: '100%', padding: '8px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px' }}
                />
              )}
            </div>
          </div>
          
          <div className="tax-form-row">
            <div className="tax-form-group">
              <label htmlFor="startDate">Date début</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                placeholder="dd/mm/yy"
              />
            </div>
            
            <div className="tax-form-group">
              <label htmlFor="endDate">Date fin</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
                placeholder="dd/mm/yy"
              />
            </div>
          </div>
          
          <div className="tax-modal-footer">
            <button type="button" className="tax-btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="tax-btn-primary">
              Ajouter article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaxModal;