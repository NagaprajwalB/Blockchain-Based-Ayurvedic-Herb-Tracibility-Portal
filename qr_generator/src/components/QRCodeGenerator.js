import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import PersonalDetailsForm from './PersonalDetailsForm';
import QRCodeDisplay from './QRCodeDisplay';
import './QRCodeGenerator.css';

const QRCodeGenerator = () => {
  const [herbData, setHerbData] = useState({
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
  const [qrValue, setQrValue] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleFormSubmit = (details) => {
    setHerbData(details);
    
    // Combine all herb provenance details into a structured string
    const combinedDetails = `AYURVEDIC HERB PROVENANCE TRACKER
=====================================

BATCH INFORMATION:
------------------
Batch ID: ${details.batchId}
Farmer: ${details.farmer}
Cooperative ID: ${details.cooperativeId}
Species: ${details.species}

HARVEST DETAILS:
----------------
Location: ${details.harvestLocation}
Date/Time: ${details.harvestDateTime}

PROCESSING STEPS:
-----------------
${details.processingSteps.map(step => `• ${step}`).join('\n')}

COMPLIANCE:
-----------
NMPB Guidelines: ${details.nmpbCompliance ? 'COMPLIANT' : 'NON-COMPLIANT'}
${details.recallNotice ? `\nRECALL NOTICE: ${details.recallNotice}` : ''}

GENERATION INFO:
----------------
Generated: ${new Date().toLocaleString()}
QR Code Version: 1.0

=====================================
Ministry of AYUSH | All-India Institute of Ayurveda`;
    
    setQrValue(combinedDetails);
    setShowQR(true);
  };

  const handleDownloadPNG = () => {
    const qrElement = document.getElementById('qr-code');
    if (qrElement) {
      html2canvas(qrElement, {
        backgroundColor: '#ffffff',
        scale: 4,
        useCORS: true
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const handleDownloadSVG = () => {
    const qrElement = document.getElementById('qr-code');
    if (qrElement) {
      const svg = qrElement.querySelector('svg');
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const link = document.createElement('a');
          link.download = 'qr-code.svg';
          link.href = 'data:image/svg+xml;base64,' + btoa(svgData);
          link.click();
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      }
    }
  };

  const handleReset = () => {
    setHerbData({
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
    setQrValue('');
    setShowQR(false);
  };

  return (
    <div className="qr-generator">
      <div className="qr-generator-container">
        <PersonalDetailsForm onSubmit={handleFormSubmit} />
        
        {showQR && (
          <QRCodeDisplay
            qrValue={qrValue}
            herbData={herbData}
            onDownloadPNG={handleDownloadPNG}
            onDownloadSVG={handleDownloadSVG}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
