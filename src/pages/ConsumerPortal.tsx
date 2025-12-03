import React, { useState } from 'react';
import { QrCode, Search, Shield, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBlockchain } from '../context/BlockchainContext';

export const ConsumerPortal: React.FC = () => {
  const [qrInput, setQrInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const { batches } = useBlockchain();
  const navigate = useNavigate();

  const handleQrScan = () => {
    if (!qrInput.trim()) {
      setSearchError('Please enter a QR code');
      return;
    }

    // Extract batch ID from QR code
    const batchId = qrInput.replace('QR-', '').replace('-2024', '');
    const batch = batches.find(b => b.id === batchId);

    if (batch) {
      navigate(`/trace/${batch.id}`);
    } else {
      setSearchError('Product not found. Please check the QR code and try again.');
    }
  };

  const handleSampleScan = (batchId: string) => {
    navigate(`/trace/${batchId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="h-12 w-12 text-amber-600" />
              <h1 className="text-4xl font-bold text-gray-900">Verify Authenticity</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Scan the QR code on your Ayurvedic product to view its complete journey from harvest to your hands. 
              Verify authenticity, quality, and sustainability with blockchain-backed transparency.
            </p>
          </div>
        </div>

        {/* QR Scanner */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">Scan Product QR Code</h2>
          
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter QR Code or Batch ID
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={qrInput}
                  onChange={(e) => {
                    setQrInput(e.target.value);
                    setSearchError('');
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="QR-ASH-001-2024 or ASH-001"
                />
                <button
                  onClick={handleQrScan}
                  className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
              {searchError && (
                <p className="text-red-600 text-sm mt-2">{searchError}</p>
              )}
            </div>

            <div className="text-center">
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Camera scanning feature would be available in the mobile app
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Products */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Try Sample Products</h2>
          <p className="text-gray-600 mb-6">
            Click on any of these sample products to see their complete traceability information:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {batches.filter(batch => batch.status !== 'collected').map(batch => (
              <div
                key={batch.id}
                onClick={() => handleSampleScan(batch.id)}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-amber-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <img
                      src={`https://images.pexels.com/photos/159211/herb-spice-food-fresh-159211.jpeg?auto=compress&cs=tinysrgb&w=400`}
                      alt={batch.species}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{batch.species} Extract</h3>
                    <p className="text-sm text-gray-600">Batch: {batch.id}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        batch.status === 'manufactured' ? 'bg-green-100 text-green-800' :
                        batch.status === 'processed' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{batch.currentLocation}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{batch.sustainabilityScore}%</div>
                    <div className="text-xs text-gray-500">Sustainability</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-lg font-semibold mb-2">Blockchain Verified</h3>
              <p className="text-green-100 text-sm">
                Every product record is immutably stored on our permissioned blockchain network
              </p>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-lg font-semibold mb-2">GPS Tracked</h3>
              <p className="text-green-100 text-sm">
                From exact harvest location to your doorstep, every step is geo-tracked
              </p>
            </div>
            <div className="text-center">
              <QrCode className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-lg font-semibold mb-2">Lab Certified</h3>
              <p className="text-green-100 text-sm">
                Independent quality testing ensures purity and potency standards
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};