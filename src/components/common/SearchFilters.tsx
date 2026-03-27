// src/components/common/SearchFilters.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { categories } from '@/data/categories';

interface SearchFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  onClear: () => void;
  onSearch: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onClear,
  onSearch
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 p-3 w-64">
      {/* Category Filter - Style amélioré */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm">
          {t('product.category', 'Catégorie')}
        </h4>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200"
        >
          <option value="all" className="dark:bg-gray-700">
            {t('products.allCategories', 'Toutes les catégories')}
          </option>
          {categories.map(category => (
            <option 
              key={category.id} 
              value={category.slug}
              className="dark:bg-gray-700"
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range - Style amélioré */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm">
          {t('products.priceRange', 'Gamme de prix')}
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
              className="w-20 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-white transition-all duration-200"
            />
            <span className="text-gray-500 dark:text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 2000 })}
              className="w-20 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-white transition-all duration-200"
            />
            <span className="text-gray-500 dark:text-gray-400">XAF</span>
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>

      {/* Sort Options - Style amélioré */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm">
          {t('products.sortBy', 'Trier par')}
        </h4>
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-white transition-all duration-200"
          >
            <option value="name" className="dark:bg-gray-700">{t('products.sortByName', 'Nom')}</option>
            <option value="price" className="dark:bg-gray-700">{t('products.sortByPrice', 'Prix')}</option>
            <option value="rating" className="dark:bg-gray-700">{t('products.sortByRating', 'Note')}</option>
            <option value="newest" className="dark:bg-gray-700">{t('products.sortByNewest', 'Plus récent')}</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 h-[42px] w-[42px] flex items-center justify-center border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label={sortOrder === 'asc' ? 'Ascendant' : 'Descendant'}
          >
            <FontAwesomeIcon 
              icon={sortOrder === 'asc' ? faArrowUp : faArrowDown} 
              className="text-gray-700 dark:text-gray-300"
            />
          </button>
        </div>
      </div>

      {/* Actions - Style amélioré */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClear}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          {t('products.clearFilters', 'Effacer')}
        </button>
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-sm"
        >
          {t('search.applyFilters', 'Appliquer')}
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;