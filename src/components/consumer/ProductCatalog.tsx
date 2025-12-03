import React, { useState } from 'react';
import { Search, Filter, Package, Calendar, MapPin } from 'lucide-react';

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with real data from your API
  const products = [
    {
      id: '1',
      name: 'Organic Apples',
      batchId: 'BATCH001',
      category: 'food',
      provider: 'ABC Farm Co.',
      location: 'California, USA',
      date: '2024-01-15',
      price: '$4.99/kg',
      image: '/api/placeholder/200/150'
    },
    {
      id: '2',
      name: 'Fresh Milk',
      batchId: 'BATCH002',
      category: 'food',
      provider: 'Dairy Fresh Inc.',
      location: 'Vermont, USA',
      date: '2024-01-12',
      price: '$3.49/L',
      image: '/api/placeholder/200/150'
    },
    {
      id: '3',
      name: 'Vitamin C Tablets',
      batchId: 'BATCH003',
      category: 'pharmaceutical',
      provider: 'HealthCorp',
      location: 'New York, USA',
      date: '2024-01-10',
      price: '$12.99',
      image: '/api/placeholder/200/150'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'food', label: 'Food' },
    { value: 'pharmaceutical', label: 'Pharmaceutical' },
    { value: 'cosmetics', label: 'Cosmetics' },
    { value: 'electronics', label: 'Electronics' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.batchId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Package className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products or batch IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Package className="h-16 w-16 text-gray-400" />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <span className="text-lg font-bold text-green-600">{product.price}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">Batch: {product.batchId}</p>
              <p className="text-sm text-gray-600 mb-2">Provider: {product.provider}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {product.location}
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {product.date}
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  View Details
                </button>
                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Trace
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}