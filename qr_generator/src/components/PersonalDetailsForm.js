import React, { useState } from 'react';
import './PersonalDetailsForm.css';

const PersonalDetailsForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    batchId: '',
    farmer: '',
    cooperativeId: '',
    harvestLocation: '',
    harvestDateTime: '',
    species: '',
    processingSteps: [],
    nmpbCompliance: false,
    recallNotice: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleProcessingStepsChange = (step) => {
    setFormData(prev => ({
      ...prev,
      processingSteps: prev.processingSteps.includes(step)
        ? prev.processingSteps.filter(s => s !== step)
        : [...prev.processingSteps, step]
    }));
    
    // Clear error when user makes selection
    if (errors.processingSteps) {
      setErrors(prev => ({
        ...prev,
        processingSteps: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.batchId.trim()) {
      newErrors.batchId = 'Batch ID is required';
    }
    
    if (!formData.farmer.trim()) {
      newErrors.farmer = 'Farmer name is required';
    }
    
    if (!formData.cooperativeId.trim()) {
      newErrors.cooperativeId = 'Cooperative ID is required';
    }
    
    if (!formData.harvestLocation.trim()) {
      newErrors.harvestLocation = 'Harvest location is required';
    }
    
    if (!formData.harvestDateTime.trim()) {
      newErrors.harvestDateTime = 'Harvest date/time is required';
    }
    
    if (!formData.species.trim()) {
      newErrors.species = 'Species is required';
    }
    
    if (formData.processingSteps.length === 0) {
      newErrors.processingSteps = 'At least one processing step is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-container">
      <h2>Ayurvedic Herb Provenance Data</h2>
      <p className="form-subtitle">Enter herb tracking information to generate QR code</p>
      <form onSubmit={handleSubmit} className="personal-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="batchId">Batch ID *</label>
            <input
              type="text"
              id="batchId"
              name="batchId"
              value={formData.batchId}
              onChange={handleChange}
              className={errors.batchId ? 'error' : ''}
              placeholder=""
            />
            {errors.batchId && <span className="error-message">{errors.batchId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="farmer">Farmer Name *</label>
            <input
              type="text"
              id="farmer"
              name="farmer"
              value={formData.farmer}
              onChange={handleChange}
              className={errors.farmer ? 'error' : ''}
              placeholder=""
            />
            {errors.farmer && <span className="error-message">{errors.farmer}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cooperativeId">Cooperative ID *</label>
            <input
              type="text"
              id="cooperativeId"
              name="cooperativeId"
              value={formData.cooperativeId}
              onChange={handleChange}
              className={errors.cooperativeId ? 'error' : ''}
              placeholder=""
            />
            {errors.cooperativeId && <span className="error-message">{errors.cooperativeId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="species">Species *</label>
            <input
              type="text"
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className={errors.species ? 'error' : ''}
              placeholder=""
            />
            {errors.species && <span className="error-message">{errors.species}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="harvestLocation">Harvest Location *</label>
            <input
              type="text"
              id="harvestLocation"
              name="harvestLocation"
              value={formData.harvestLocation}
              onChange={handleChange}
              className={errors.harvestLocation ? 'error' : ''}
              placeholder=""
            />
            {errors.harvestLocation && <span className="error-message">{errors.harvestLocation}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="harvestDateTime">Harvest Date & Time *</label>
            <input
              type="datetime-local"
              id="harvestDateTime"
              name="harvestDateTime"
              value={formData.harvestDateTime}
              onChange={handleChange}
              className={errors.harvestDateTime ? 'error' : ''}
            />
            {errors.harvestDateTime && <span className="error-message">{errors.harvestDateTime}</span>}
          </div>
        </div>


        <div className="form-section">
          <h3>Processing & Compliance</h3>
          <div className="form-group">
            <label>Processing Steps *</label>
            <div className="checkbox-grid">
              {[
                'Collection',
                'Cleaning',
                'Sorting',
                'Cutting / Chopping',
                'Drying',
                'Grinding / Pulverizing',
                'Sieving',
                'Roasting / Frying',
                'Boiling / Decoction',
                'Fermentation',
                'Extraction',
                'Mixing / Blending',
                'Formulation',
                'Packing',
                'Storage'
              ].map((step) => (
                <label key={step} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.processingSteps.includes(step)}
                    onChange={() => handleProcessingStepsChange(step)}
                  />
                  <span className="checkmark"></span>
                  {step}
                </label>
              ))}
            </div>
            {errors.processingSteps && <span className="error-message">{errors.processingSteps}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="nmpbCompliance"
                checked={formData.nmpbCompliance}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              NMPB Guidelines Compliant
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="recallNotice">Recall Notice (Optional)</label>
            <input
              type="text"
              id="recallNotice"
              name="recallNotice"
              value={formData.recallNotice}
              onChange={handleChange}
              placeholder=""
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Generate Herb Provenance QR Code
        </button>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
