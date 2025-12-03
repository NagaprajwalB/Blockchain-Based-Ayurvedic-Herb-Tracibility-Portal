import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: string;
  weight?: string;
  quantity?: string;
  provider?: string;
  harvestInfo?: string;
  qualityInfo?: string;
  imageSrc?: string;
  image?: string;
  productImage?: string;
  verified?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  weight,
  quantity,
  provider,
  harvestInfo,
  qualityInfo,
  imageSrc,
  image,
  productImage,
  verified = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={imageSrc || image || productImage} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        
        {/* Quick View Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white p-4 rounded-md shadow-lg max-w-xs">
              <h4 className="font-medium text-gray-900 mb-2">{name}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{harvestInfo}</p>
                <p>{qualityInfo}</p>
                <p className="flex items-center"><Check className="h-4 w-4 text-green-500 mr-1" /> QR Verified</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Verified Badge */}
        {verified && (
          <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
            <Check className="h-3 w-3 mr-1" />
            Verified
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{name}</h3>
        <div className="flex justify-between items-center mb-3">
          <div className="text-green-700 font-bold">₹{price} <span className="text-sm text-gray-500 font-normal">/ {weight || quantity}</span></div>
          <div className="flex items-center text-xs text-green-600">
            <Check className="h-3 w-3 mr-1" />
            Verified Provider
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mb-4 space-y-1">
          {provider && <p>Provider: {provider}</p>}
          {harvestInfo && <p>{harvestInfo}</p>}
          {qualityInfo && <p>{qualityInfo}</p>}
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-3 rounded-md flex items-center justify-center transition-colors">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </button>
          <Link 
            to="/product/123" 
            className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 text-sm py-2 px-3 rounded-md flex items-center justify-center transition-colors"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;