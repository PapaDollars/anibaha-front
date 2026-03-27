import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faSearch, faBox } from '@fortawesome/free-solid-svg-icons';

import { ROUTES } from '@/utils/url/url_frontend';
import { categories } from '@/data/categories';
import { products } from '@/data/products';

const CategoryDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');

  // Recherche de la catégorie par id ou slug
  const category = categories.find(c => c.id === id || c.slug === id);

  // Produits appartenant à cette catégorie
  const categoryProducts = products.filter(
    p => p.category === category?.slug || p.category === category?.id
  );

  // Filtrage selon la recherche
  const filteredProducts = categoryProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Catégorie introuvable
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faBox} className="text-gray-400 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {t('categories.notFound', 'Catégorie introuvable')}
          </h2>
          <p className="text-gray-500 mb-6">
            {t('categories.notFoundDesc', "Cette catégorie n'existe pas ou a été supprimée.")}
          </p>
          <Link
            to={ROUTES.PUBLIC.CATALOG.CATEGORIES}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            {t('categories.backToList', 'Voir toutes les catégories')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Bouton retour vers la liste des catégories */}
        <Link
          to={ROUTES.PUBLIC.CATALOG.CATEGORIES}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 my-6 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          <span>{t('categories.backToList', 'Retour aux catégories')}</span>
        </Link>

        {/* Bannière de la catégorie */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 h-56">
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-8xl">{category.icon}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-4xl">{category.icon}</span>
              <h1 className="text-4xl font-bold text-white">{category.name}</h1>
              {category.featured && (
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-2xl" />
              )}
            </div>
            {category.description && (
              <p className="text-white/90 text-lg max-w-2xl">{category.description}</p>
            )}
          </div>
        </div>

        {/* Barre de recherche + compteur de résultats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <p className="text-gray-600 text-lg">
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span>{' '}
            {t('categories.productsFound', 'produit(s) trouvé(s)')}
          </p>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('products.searchPlaceholder', 'Rechercher un produit...')}
              className="w-full md:w-80 px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Grille de produits */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image du produit */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faBox} className="text-gray-300 text-4xl" />
                    </div>
                  )}
                </div>

                {/* Informations du produit */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      {product.price?.toLocaleString('fr-FR')} FCFA
                    </span>
                    {product.rating && (
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* État vide : aucun produit */
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t('categories.noProducts', 'Aucun produit trouvé')}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? `Aucun produit ne correspond à "${searchTerm}"`
                : 'Cette catégorie ne contient pas encore de produits.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Voir tous les produits
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;