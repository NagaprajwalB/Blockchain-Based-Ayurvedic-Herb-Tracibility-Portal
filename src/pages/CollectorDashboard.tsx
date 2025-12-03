import React, { useState } from 'react';
import { MapPin, Camera, Calendar, Leaf, CheckCircle, AlertTriangle } from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';

interface CollectionForm {
  batchId: string;
  species: string;
  collectorId: string;
  gpsCoordinates: { lat: number; lng: number };
  location: string;
  quantity: number;
  moisture: number;
  appearance: string;
  aroma: string;
}

export const CollectorDashboard: React.FC = () => {
  const { addCollectionEvent, validateSmartContract } = useBlockchain();
  const [form, setForm] = useState<CollectionForm>({
    batchId: '',
    species: 'Ashwagandha',
    collectorId: 'COL-001',
    gpsCoordinates: { lat: 19.0760, lng: 72.8777 },
    location: '',
    quantity: 0,
    moisture: 0,
    appearance: '',
    aroma: ''
  });
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setValidationStatus('validating');
    
    // Simulate smart contract validation
    const isValid = validateSmartContract(form.batchId, 'collection', {
      gpsCoordinates: form.gpsCoordinates,
      species: form.species
    });
    
    setTimeout(() => {
      if (isValid) {
        addCollectionEvent({
          batchId: form.batchId,
          species: form.species,
          collectorId: form.collectorId,
          gpsCoordinates: form.gpsCoordinates,
          timestamp: new Date().toISOString(),
          location: form.location,
          quantity: form.quantity,
          initialQuality: {
            moisture: form.moisture,
            appearance: form.appearance,
            aroma: form.aroma
          },
          photos: []
        });
        setValidationStatus('valid');
        
        // Reset form
        setForm({
          ...form,
          batchId: '',
          location: '',
          quantity: 0,
          moisture: 0,
          appearance: '',
          aroma: ''
        });
      } else {
        setValidationStatus('invalid');
      }
    }, 1500);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setForm({
          ...form,
          gpsCoordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-8">
          <Leaf className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Collector Dashboard</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch ID
              </label>
              <input
                type="text"
                value={form.batchId}
                onChange={(e) => setForm({ ...form, batchId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="ASH-001"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Species
              </label>
              <select
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Ashwagandha">Ashwagandha</option>
                <option value="Tulsi">Tulsi</option>
                <option value="Brahmi">Brahmi</option>
                <option value="Neem">Neem</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPS Coordinates
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  step="0.000001"
                  value={form.gpsCoordinates.lat}
                  onChange={(e) => setForm({ 
                    ...form, 
                    gpsCoordinates: { ...form.gpsCoordinates, lat: parseFloat(e.target.value) }
                  })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Latitude"
                />
                <input
                  type="number"
                  step="0.000001"
                  value={form.gpsCoordinates.lng}
                  onChange={(e) => setForm({ 
                    ...form, 
                    gpsCoordinates: { ...form.gpsCoordinates, lng: parseFloat(e.target.value) }
                  })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Longitude"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Description
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Village, District, State"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moisture Content (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={form.moisture}
                onChange={(e) => setForm({ ...form, moisture: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appearance
              </label>
              <input
                type="text"
                value={form.appearance}
                onChange={(e) => setForm({ ...form, appearance: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Fresh, dried, color notes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aroma Notes
              </label>
              <input
                type="text"
                value={form.aroma}
                onChange={(e) => setForm({ ...form, aroma: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Characteristic smell description"
              />
            </div>
          </div>

          {/* Validation Status */}
          {validationStatus !== 'idle' && (
            <div className={`flex items-center space-x-2 p-4 rounded-md ${
              validationStatus === 'validating' ? 'bg-yellow-50 text-yellow-800' :
              validationStatus === 'valid' ? 'bg-green-50 text-green-800' :
              'bg-red-50 text-red-800'
            }`}>
              {validationStatus === 'validating' && <Calendar className="h-5 w-5 animate-spin" />}
              {validationStatus === 'valid' && <CheckCircle className="h-5 w-5" />}
              {validationStatus === 'invalid' && <AlertTriangle className="h-5 w-5" />}
              <span className="font-medium">
                {validationStatus === 'validating' && 'Validating smart contract rules...'}
                {validationStatus === 'valid' && 'Collection event recorded on blockchain!'}
                {validationStatus === 'invalid' && 'Validation failed: Check geo-fencing or seasonal rules'}
              </span>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={validationStatus === 'validating'}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Record Collection Event
            </button>
            
            <button
              type="button"
              className="px-6 py-3 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors font-medium"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Smart Contract Rules Info */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Smart Contract Validation Rules</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700">Geo-fencing Rules:</h4>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Ashwagandha: 15°N-30°N, 75°E-85°E</li>
                <li>• Tulsi: 10°N-35°N, 70°E-90°E</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Seasonal Rules:</h4>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Ashwagandha: Nov-Feb harvest</li>
                <li>• Tulsi: Mar-Oct harvest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};