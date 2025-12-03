import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConsumerLayout } from '../components/ConsumerLayout';
import { ProductCatalog } from '../components/consumer/ProductCatalog';
import { QRScanner } from '../components/consumer/QRScanner';

export const ConsumerDashboard: React.FC = () => {
  return (
    <ConsumerLayout>
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/scan" element={<QRScanner />} />
      </Routes>
    </ConsumerLayout>
  );
};