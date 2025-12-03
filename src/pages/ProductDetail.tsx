import React from 'react';
import { useParams } from 'react-router-dom';

export function ProductDetail() {
  const { batchId } = useParams<{ batchId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Product Details
          </h1>
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500">Batch ID:</span>
            <span className="ml-2 text-lg text-gray-900">{batchId || 'N/A'}</span>
          </div>
          <div className="text-gray-600">
            <p>Product details and traceability information will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}