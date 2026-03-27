// src/components/Cards/CategoryCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image?: string;
  description?: string;
  color?: string;
}

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onClick?: (categoryId: string) => void;
  href?: string;
  viewMode?: 'simple' | 'detailed';
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
  href = '',
  onClick,
  viewMode = 'simple',
  className = ''
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(category.id);
    }
  };

  if (viewMode === 'detailed') {
    return (
      <div
        className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
          isSelected ? 'ring-4 ring-primary-500 bg-primary-50' : ''
        } ${className}`}
      >
        {/* Image Background */}
        {category.image && (
          <div className="relative h-32 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 text-center">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
            {category.icon}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {category.name}
          </h3>
          
          {category.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {category.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">
              {category.count.toLocaleString()} produits
            </span>
            
            <button
              onClick={handleClick}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium flex items-center space-x-1"
            >
              <span>Explorer</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </button>
          </div>
        </div>

        {/* Hover Effect Arrow */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FontAwesomeIcon icon={faArrowRight} className="text-primary-500" />
        </div>
      </div>
    );
  }

  // Simple mode (original)
  return (
    <Link
      to={href}
      onClick={handleClick}
      className={`group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full ${
        isSelected ? 'ring-4 ring-primary-500 bg-primary-50' : ''
      } ${className}`}
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {category.icon}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {category.name}
      </h3>
      
      <p className="text-sm text-gray-500">
        {category.count.toLocaleString()} produits
      </p>
      
      {category.id !== 'all' && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FontAwesomeIcon icon={faArrowRight} className="text-primary-500" />
        </div>
      )}
    </Link>
  );
};

export default CategoryCard;