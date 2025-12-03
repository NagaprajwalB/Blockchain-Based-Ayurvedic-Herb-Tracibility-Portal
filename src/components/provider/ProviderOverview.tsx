import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  Plus,
  Package,
  FileText,
  TrendingUp
} from 'lucide-react';

export const ProviderOverview: React.FC = () => {

  // Mock provider status - in real app this would come from API
  const providerStatus = 'PENDING'; // PENDING | VERIFIED | REJECTED

  if (providerStatus === 'PENDING') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div>
              <h2 className="text-xl font-semibold text-yellow-900">Registration Under Review</h2>
              <p className="text-yellow-700 mt-1">
                Your provider registration is being reviewed. You'll be able to create products once verified.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/provider/register"
              className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
            >
              Complete Registration
            </Link>
          </div>
        </div>

        {/* Registration Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Checklist</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">Basic information provided</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-gray-700">Documents under review</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-500">Geo-provenance verification pending</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your products and track performance.</p>
        </div>
        <Link
          to="/provider/add-product"
          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Package className="h-8 w-8 text-amber-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Listings</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Products</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-md">
                <div>
                  <p className="font-medium text-gray-900">Ashwagandha Batch ASH-{i.toString().padStart(3, '0')}</p>
                  <p className="text-sm text-gray-600">Created 2 days ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Listed
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/provider/add-product"
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-5 w-5 text-amber-600" />
              <span className="text-gray-900">Create New Product Batch</span>
            </Link>
            <Link
              to="/provider/documents"
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="text-gray-900">Upload Documents</span>
            </Link>
            <Link
              to="/provider/batches"
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Package className="h-5 w-5 text-green-600" />
              <span className="text-gray-900">View All Batches</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};