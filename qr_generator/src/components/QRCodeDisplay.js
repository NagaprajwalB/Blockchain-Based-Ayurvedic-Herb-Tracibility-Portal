import React from 'react';
import QRCode from 'qrcode.react';
import './QRCodeDisplay.css';

const QRCodeDisplay = ({ qrValue, herbData, onDownloadPNG, onDownloadSVG, onReset }) => {
  return (
    <div className="qr-display-container">
      <h2>Herb Provenance QR Code</h2>
      
      <div className="qr-code-wrapper">
        <div id="qr-code" className="qr-code">
          <QRCode
            value={qrValue}
            size={256}
            level="M"
            includeMargin={true}
            renderAs="svg"
          />
        </div>
      </div>

      <div className="qr-details">
        <h3>Encoded Herb Information:</h3>
        <div className="details-preview">
          <div className="detail-section">
            <h4>Batch Information</h4>
            <p><strong>Batch ID:</strong> {herbData.batchId}</p>
            <p><strong>Farmer:</strong> {herbData.farmer}</p>
            <p><strong>Cooperative ID:</strong> {herbData.cooperativeId}</p>
            <p><strong>Species:</strong> {herbData.species}</p>
          </div>
          
          <div className="detail-section">
            <h4>Harvest Details</h4>
            <p><strong>Location:</strong> {herbData.harvestLocation}</p>
            <p><strong>Date/Time:</strong> {herbData.harvestDateTime}</p>
          </div>
          
          
          <div className="detail-section">
            <h4>Processing & Compliance</h4>
            <p><strong>Processing Steps:</strong> {herbData.processingSteps.join(', ')}</p>
            <p><strong>NMPB Compliant:</strong> {herbData.nmpbCompliance ? 'Yes' : 'No'}</p>
            {herbData.recallNotice && (
              <p className="recall-notice"><strong>Recall Notice:</strong> {herbData.recallNotice}</p>
            )}
          </div>
        </div>
      </div>

      <div className="qr-actions">
        <button onClick={onDownloadPNG} className="download-btn png-btn">
          Download as PNG
        </button>
        <button onClick={onDownloadSVG} className="download-btn svg-btn">
          Download as SVG
        </button>
        <button onClick={onReset} className="reset-btn">
          Generate New QR Code
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
