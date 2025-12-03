import React, { useState, useRef } from 'react';
import { Shield, MapPin, Calendar, Droplets, FileCheck, Award, Upload } from 'lucide-react';
import { QrReader } from 'react-qr-reader';

const ScanQRPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [hasResult, setHasResult] = useState(false);
  const [qrData, setQrData] = useState<string>('');
  const [scanError, setScanError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Function for handling file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          // In a real app, this would process the QR code image
          // For now, we'll simulate a successful scan with the file name as data
          const simulatedData = JSON.stringify({
            productName: 'Ashwagandha Root Powder',
            provider: 'Himalayan Herbs Ltd.',
            location: 'Uttarakhand, India (Altitude: 1,500m)',
            harvestSeason: 'Winter 2023',
            moistureLevel: '8.2% (Within optimal range)',
            labTest: 'Passed - Certificate #ASH2023-456',
            certification: 'AYUSH Premium Grade'
          });
          
          setQrData(simulatedData);
          setIsScanning(false);
          setHasResult(true);
        }
      };
      
      reader.onerror = () => {
        setScanError('Failed to read file');
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  // Handle QR code scan result
  const handleScanResult = (result: any, error: any) => {
    if (result) {
      try {
        // Assuming the QR code contains JSON data
        // In a real app, you would validate and process this data
        setQrData(result?.text || JSON.stringify({
          productName: 'Ashwagandha Root Powder',
          provider: 'Himalayan Herbs Ltd.',
          location: 'Uttarakhand, India (Altitude: 1,500m)',
          harvestSeason: 'Winter 2023',
          moistureLevel: '8.2% (Within optimal range)',
          labTest: 'Passed - Certificate #ASH2023-456',
          certification: 'AYUSH Premium Grade'
        }));
        setIsScanning(false);
        setHasResult(true);
        setScanError('');
      } catch (e) {
        setScanError('Invalid QR code format');
      }
    }
    
    if (error) {
      console.error('QR Scan error:', error);
    }
  };
  
  // Reset scanning state
  const resetScan = () => {
    setIsScanning(true);
    setHasResult(false);
    setQrData('');
    setScanError('');
  };
  
  // Trigger file input click
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Scan Your Product QR</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Camera Feed */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
          
          {isScanning ? (
            <div className="relative">
              {/* QR Reader Camera Feed */}
              <div className="w-1/2 h-[400px] flex items-center justify-center mx-auto rounded-xl border-4 border-green-600 shadow-lg overflow-hidden relative">
                {/* QR Reader */}
                <QrReader
                  constraints={{ facingMode: 'environment' }}
                  onResult={handleScanResult}
                  className="w-full h-full object-cover"
                  scanDelay={500}
                />
                
                {/* Scanning overlay with animated border */}
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="w-48 h-48 relative">
                    {/* Animated corner borders */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white animate-pulse"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white animate-pulse"></div>
                  </div>
                  
                  {/* Scanning line animation */}
                  <div className="absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-green-500 animate-bounce opacity-80"></div>
                </div>
              </div>
              
              {scanError && (
                <div className="mt-2 text-red-500 text-sm text-center">
                  {scanError}
                </div>
              )}
              
              <p className="mt-4 text-gray-600 text-center">Position QR code within the frame</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                <p className="font-medium">QR Code Scanned Successfully!</p>
              </div>
              <button 
                onClick={resetScan}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Scan Another QR Code
              </button>
            </div>
          )}
          
          <div className="mt-6">
            <p className="text-gray-600 mb-2">Or upload QR code image:</p>
            <button 
              onClick={triggerFileUpload}
              className="flex items-center justify-center w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" /> Upload QR Image
            </button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
        
        {/* Right Column - Result Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          
          {hasResult ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  {qrData ? JSON.parse(qrData).productName : 'Ashwagandha Root Powder'}
                </h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <Shield className="h-3 w-3 mr-1" /> Verified
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <Shield className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Provider</p>
                    <p className="text-gray-600">
                      {qrData ? JSON.parse(qrData).provider : 'Himalayan Herbs Ltd.'} <span className="text-green-600">✅</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Geo-tag Location</p>
                    <p className="text-gray-600">
                      {qrData ? JSON.parse(qrData).location : 'Uttarakhand, India (Altitude: 1,500m)'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Harvest Season</p>
                    <p className="text-gray-600">
                      {qrData ? JSON.parse(qrData).harvestSeason : 'Winter 2023'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <Droplets className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Moisture Level</p>
                    <p className="text-gray-600">
                      {qrData ? JSON.parse(qrData).moistureLevel : '8.2% (Within optimal range)'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <FileCheck className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lab Test Status</p>
                    <p className="text-gray-600">
                      {qrData ? JSON.parse(qrData).labTest : 'Passed - Certificate #ASH2023-456'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <Award className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Certification</p>
                    <p className="text-gray-600">
                      {qrData ? JSON.parse(qrData).certification : 'AYUSH Premium Grade'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">This product has been verified on blockchain. Each step from harvest to packaging has been recorded and is immutable.</p>
                <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors w-full">
                  View Complete Traceability
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Shield className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Product Scanned</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                Scan a product QR code or upload an image to view detailed product information and verify authenticity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanQRPage;