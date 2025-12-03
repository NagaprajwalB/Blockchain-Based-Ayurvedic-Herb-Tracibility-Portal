import React, { useState } from 'react';
import { QrCode, Camera, Upload, Search } from 'lucide-react';

export function QRScanner() {
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [manualInput, setManualInput] = useState('');

  const handleStartScan = () => {
    setIsScanning(true);
    // In a real implementation, you would integrate with a QR code scanning library
    // For now, we'll simulate a scan after 2 seconds
    setTimeout(() => {
      setScannedCode('BATCH001');
      setIsScanning(false);
    }, 2000);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      setScannedCode(manualInput.trim());
    }
  };

  const handleSearchProduct = () => {
    if (scannedCode) {
      // Navigate to product details or show traceability information
      console.log('Searching for product:', scannedCode);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <QrCode className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">QR Scanner</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Scanner Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Camera className="h-5 w-5 text-gray-500 mr-2" />
            Scan QR Code
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              {isScanning ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <QrCode className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Scanning for QR code...</p>
                  </div>
                  <button
                    onClick={handleStopScan}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Stop Scanning
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <QrCode className="h-24 w-24 text-gray-400 mx-auto" />
                  <p className="text-gray-600">Position QR code within the frame</p>
                  <button
                    onClick={handleStartScan}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 mx-auto"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Start Camera</span>
                  </button>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mx-auto">
                <Upload className="h-4 w-4" />
                <span>Upload QR Image</span>
              </button>
            </div>
          </div>
        </div>

        {/* Manual Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Manual Input
          </h2>
          
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Batch ID or Product Code
              </label>
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="e.g., BATCH001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Scanned Result */}
      {scannedCode && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Scanned Result
          </h2>
          
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <QrCode className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Code Scanned Successfully
                </p>
                <p className="text-sm text-green-700">
                  {scannedCode}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleSearchProduct}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Search className="h-4 w-4" />
              <span>View Product Details</span>
            </button>
            <button
              onClick={() => setScannedCode('')}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}