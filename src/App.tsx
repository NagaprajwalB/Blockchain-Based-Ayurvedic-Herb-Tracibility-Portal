import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewHomePage from './pages/NewHomePage';
import { AuthPage } from './pages/AuthPage';
import { ProviderDashboard } from './pages/ProviderDashboard';
import { ConsumerDashboard } from './pages/ConsumerDashboard';
import { ProductDetail } from './pages/ProductDetail';
import ScanQRPage from './pages/ScanQRPage';
import SampleQR from './pages/SampleQR.tsx';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { BlockchainProvider } from './context/BlockchainContext';

function App() {
  return (
    <AuthProvider>
      <BlockchainProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<NewHomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/scan-qr" element={<ScanQRPage />} />
              <Route path="/sampleqr" element={<SampleQR />} />
              <Route 
                path="/provider/*" 
                element={
                  <ProtectedRoute role="PROVIDER">
                    <ProviderDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/consumer/*" 
                element={
                  <ProtectedRoute role="CONSUMER">
                    <ConsumerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/product/:batchId" element={<ProductDetail />} />
            </Routes>
          </div>
        </Router>
      </BlockchainProvider>
    </AuthProvider>
  );
}

export default App;