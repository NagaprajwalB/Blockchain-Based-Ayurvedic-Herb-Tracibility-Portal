import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProviderLayout } from '../components/ProviderLayout';
import { ProviderOverview } from '../components/provider/ProviderOverview';
import { ProviderRegistration } from '../components/provider/ProviderRegistration';
import { AddProduct } from '../components/provider/AddProduct';
import { MyBatches } from '../components/provider/MyBatches';
import { Documents } from '../components/provider/Documents';
import { Settings } from '../components/provider/Settings';

export const ProviderDashboard: React.FC = () => {
  return (
    <ProviderLayout>
      <Routes>
        <Route path="/" element={<ProviderOverview />} />
        <Route path="/register" element={<ProviderRegistration />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/batches" element={<MyBatches />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </ProviderLayout>
  );
};