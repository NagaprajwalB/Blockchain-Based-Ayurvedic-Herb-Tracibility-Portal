import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Award, ExternalLink } from 'lucide-react';

interface ProviderCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  verificationLevel: 'gold' | 'silver' | 'bronze';
  productCount: number;
  specialties: string[];
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  id,
  name,
  location,
  image,
  verificationLevel,
  productCount,
  specialties,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBadgeColor = () => {
    switch (verificationLevel) {
      case 'gold':
        return 'bg-amber-500';
      case 'silver':
        return 'bg-gray-300';
      case 'bronze':
        return 'bg-amber-700';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Provider Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={`${name} - Ayurvedic Provider`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        
        {/* Verification Badge */}
        <div className="absolute top-3 right-3">
          <div className={`flex items-center px-2 py-1 rounded-full ${getBadgeColor()} text-white text-xs font-medium`}>
            <Award size={14} className="mr-1" />
            <span>{verificationLevel.charAt(0).toUpperCase() + verificationLevel.slice(1)} Verified</span>
          </div>
        </div>
      </div>

      {/* Provider Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{productCount}</span> Products Available
          </p>
        </div>
        
        {/* Specialties */}
        <div className="flex flex-wrap gap-1 mb-3">
          {specialties.slice(0, 3).map((specialty, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
            >
              {specialty}
            </span>
          ))}
          {specialties.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
              +{specialties.length - 3} more
            </span>
          )}
        </div>
        
        {/* View Provider Button */}
        <Link 
          to={`/providers/${id}`} 
          className="flex items-center justify-center w-full py-2 mt-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          View Provider <ExternalLink size={14} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};