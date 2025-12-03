import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface SampleData {
  productName: string;
  provider: string;
  location: string;
  harvestSeason: string;
  moistureLevel: string;
  labTest: string;
  certification: string;
}

const SampleQR: React.FC = () => {
  const sampleData: SampleData = {
    productName: "Ashwagandha Root",
    provider: "Herbal Co-Op #42",
    location: "Uttarakhand, India (Altitude: 1,500m)",
    harvestSeason: "Winter 2025",
    moistureLevel: "7.8% (Within optimal range)",
    labTest: "Passed - Certificate #ASH2025-456",
    certification: "AYUSH Premium Grade",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Sample QR Code</h1>
      <QRCodeSVG
        value={JSON.stringify(sampleData)}
        size={256}
        level="H"
        includeMargin={true}
      />
      <p className="mt-4 text-gray-600">Scan this QR with your ScanQRPage</p>
    </div>
  );
};

export default SampleQR;