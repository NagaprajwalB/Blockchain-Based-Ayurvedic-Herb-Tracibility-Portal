import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Search, ShoppingCart, Menu, X, QrCode, User, ChevronDown, Package } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);

  const navItems = [
    { path: 'http://localhost:8501/', label: 'Analyzer', icon: Package },
    { path: '/scan-qr', label: 'Scan QR', icon: QrCode }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProviderDropdown = () => {
    setIsProviderDropdownOpen(!isProviderDropdownOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-green-800 font-bold text-2xl">AyurTrace</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between w-full ml-10">
            {/* Search Bar - Center */}
            <div className="flex-1 max-w-md mx-auto">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search herbs, providers, products"
                  className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-2.5">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
              </form>
            </div>
            
            {/* Navigation Links - Right */}
            <div className="flex items-center space-x-6 ml-6">
              {navItems.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {label}
                </Link>
              ))}
              
              {/* Login/Register Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-green-600 focus:outline-none">
                  <span>Account</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/auth?role=consumer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                  <Link to="/auth?role=consumer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</Link>
                  <Link to="/auth?role=provider" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Provider Portal</Link>
                </div>
              </div>
              
              {/* Provider Dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleProviderDropdown}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-green-600 focus:outline-none"
                >
                  <span>Provider</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {isProviderDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                    <Link 
                      to="http://localhost:3000/" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProviderDropdownOpen(false)}
                    >
                      Host a Product
                    </Link>
                    <Link 
                      to="/update-geo" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProviderDropdownOpen(false)}
                    >
                      Update Geo Data
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Cart Icon */}
              <Link to="/auth?role=provider" className="relative p-2 text-gray-700 hover:text-green-600">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-600 rounded-full">0</span>
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 mr-4 text-gray-700">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-600 rounded-full">0</span>
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <form onSubmit={handleSearch} className="px-4 pb-4 pt-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search herbs, providers, products"
                className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-2.5">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </form>
          <div className="space-y-1 px-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 py-3 px-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
            <Link
              to="/auth?role=consumer"
              className="flex items-center space-x-2 py-3 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Login/Register</span>
            </Link>
            
            {/* Provider with dropdown */}
            <div className="px-3">
              <button
                onClick={toggleProviderDropdown}
                className="flex items-center space-x-2 py-3 px-3 w-full text-left rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
              >
                <User className="h-5 w-5" />
                <span>Provider</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isProviderDropdownOpen && (
                <div className="ml-5 mt-1 border-l-2 border-gray-200 pl-3">
                  <Link
                    to="/host-product"
                    className="flex items-center py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    onClick={() => {
                      setIsProviderDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Host a Product
                  </Link>
                  <Link
                    to="/update-geo"
                    className="flex items-center py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    onClick={() => {
                      setIsProviderDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Update Geo Data
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/cart"
              className="flex items-center space-x-2 py-3 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};