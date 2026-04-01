// ================================================================
// Categories.tsx - Migré : fakeData → Redux + API
// Changements :
//   AVANT : import { categories } from '@/data/categories'
//   APRÈS : useSelector(state => state.category.categories)
// ================================================================
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faSearch } from '@fortawesome/free-solid-svg-icons';

import { ROUTES } from '@/utils/url/url_frontend';
import { RootState, AppDispatch } from '@/store';
import { fetchCategories } from '@/store/slices/categorySlice';

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Données viennent de l'API via Redux (plus de fakeData)
  const { categories, loading, error } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);

  // Charger les catégories au montage si pas encore chargées
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // Enrichir avec le comptage de produits (calculé côté front depuis le store)
  const categoriesWithCount = categories.map(category => ({
    ...category,
    productCount: products.filter(p => p.category === category.slug).length,
  }));

  // Filtrer selon la recherche
  const filteredCategories = categoriesWithCount.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── Skeleton loader ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="py-6">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="h-8 w-72 bg-gray-200 rounded animate-pulse mb-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-36 bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Erreur API ────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchCategories())}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="py-6">
          <Link
            to={ROUTES.PUBLIC.HOME}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span>{t('common.back', "Retour à l'accueil")}</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {t('categories.title', 'Nos catégories')}
              </h1>
              <p className="text-xl text-gray-600">
                {t('categories.subtitle', 'Explorez notre gamme complète de produits')}
              </p>
            </div>

            <div className="relative inline-flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('categories.searchPlaceholder', 'Rechercher une catégorie...')}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm transition-all duration-200"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Grille des catégories */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredCategories.map(category => (
              <Link
                key={category.id}
                to={ROUTES.GENERATORS.getCategoryProducts(category.id)}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                      {category.name}
                      {(category.featured || category.isFeatured) && (
                        <span className="ml-2 text-yellow-400">
                          <FontAwesomeIcon icon={faStar} />
                        </span>
                      )}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {category.productCount ?? 0} {t('categories.products', 'produits')}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="text-blue-600 font-medium flex items-center">
                    <span>{t('categories.explore', 'Explorer')}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-3">
              {t('categories.noResults.title', 'Aucune catégorie trouvée')}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {t('categories.noResults.description', "Essayez d'autres termes de recherche.")}
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              {t('categories.noResults.reset', 'Réinitialiser la recherche')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;