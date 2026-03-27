// src/components/Cards/CompanyCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faStar,
  faShield,
  faMapMarkerAlt,
  faUsers,
  faStore,
  faHeart,
  faEye
} from '@fortawesome/free-solid-svg-icons';

interface Company {
  id: string;
  name: string;
  logo: string;
  rating: number;
  products: number;
  verified: boolean;
  description?: string;
  location?: string;
  followers?: number;
  category?: string;
  coverImage?: string;
  isFollowing?: boolean;
}

interface CompanyCardProps {
  company: Company;
  viewMode?: 'compact' | 'detailed' | 'list';
  onFollow?: (companyId: string) => void;
  className?: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  viewMode = 'compact',
  onFollow,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFollow) {
      onFollow(company.id);
    }
  };

  if (viewMode === 'detailed') {
    return (
      <div
        className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cover Image */}
        {company.coverImage && (
          <div className="relative h-24 overflow-hidden">
            <img
              src={company.coverImage}
              alt={company.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Quick Actions */}
            <div className={`absolute top-4 right-4 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              <div className="flex space-x-2">
                <button
                  onClick={handleFollow}
                  className={`w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 ${
                    company.isFollowing ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <FontAwesomeIcon icon={faHeart} className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Company Info */}
        <div className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            {/* Logo */}
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 ring-4 ring-white shadow-lg">
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Company Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                  {company.name}
                </h3>
                {company.verified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faShield} className="text-white text-xs" />
                  </div>
                )}
              </div>

              {/* Category */}
              {company.category && (
                <div className="text-sm text-blue-600 font-medium mb-1">
                  {company.category}
                </div>
              )}

              {/* Rating & Stats */}
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  <span className="font-medium">{company.rating}</span>
                </div>
                <span className="mx-2">•</span>
                <span>{company.products} produits</span>
                {company.followers && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{company.followers} abonnés</span>
                  </>
                )}
              </div>

              {/* Location */}
              {company.location && (
                <div className="flex items-center text-sm text-gray-500">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                  <span>{company.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {company.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {company.description}
            </p>
          )}

          {/* Action Button */}
          <Link
            to={`/companies/${company.id}`}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center justify-center space-x-2 group"
          >
            <FontAwesomeIcon icon={faStore} />
            <span>Voir la boutique</span>
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </Link>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <Link
        to={`/companies/${company.id}`}
        className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex items-center space-x-4 ${className}`}
      >
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
              {company.name}
            </h3>
            {company.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faShield} className="text-white text-xs" />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1 mb-1">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
            <span className="text-sm font-medium text-gray-700">{company.rating}</span>
            <span className="text-xs text-gray-500">• {company.products} produits</span>
          </div>

          {company.description && (
            <p className="text-gray-600 text-sm line-clamp-1">
              {company.description}
            </p>
          )}
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <FontAwesomeIcon 
            icon={faArrowRight} 
            className="text-primary-500 group-hover:translate-x-1 transition-transform" 
          />
        </div>
      </Link>
    );
  }

  // Compact mode (original)
  return (
    <Link
      to={`/companies/${company.id}`}
      className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 ${className}`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {company.name}
            </h3>
            {company.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faShield} className="text-white text-xs" />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
            <span className="text-sm font-medium text-gray-700">{company.rating}</span>
            <span className="text-xs text-gray-500">• {company.products} produits</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">Voir la boutique</span>
        <FontAwesomeIcon 
          icon={faArrowRight} 
          className="text-primary-500 group-hover:translate-x-1 transition-transform" 
        />
      </div>
    </Link>
  );
};

export default CompanyCard;