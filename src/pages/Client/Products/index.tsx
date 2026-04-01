// ================================================================
// Products.tsx - Migré : fakeData → Redux + API
// Changements :
//   AVANT : import { categories } from '@/data/categories'  (sidebar)
//   APRÈS : useSelector(state => state.category.categories)
//   Les produits étaient déjà dans Redux mais sans appel API réel
//   APRÈS : dispatch(fetchProducts({ category, search, ... })) envoie les filtres à l'API
// ================================================================
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTh, faList, faArrowUp, faArrowDown,
  faSearch, faTimes, faFilter, faSlidersH, faArrowLeft, faGrin
} from '@fortawesome/free-solid-svg-icons';

import { RootState, AppDispatch } from '@/store';
import { fetchProducts } from '@/store/slices/productSlice';
import { fetchCategories } from '@/store/slices/categorySlice';
import { addToCart } from '@/store/slices/cartSlice';
import { ajouterWishlist, retirerWishlist } from '@/store/slices/wishlistSlice';
import { ProductCard } from '@/components/common/cards/product-card';
import ROUTES from '@/utils/url/url_frontend';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { products } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user;
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  // ✅ Catégories viennent du store Redux (plus de fakeData)
  const { categories } = useSelector((state: RootState) => state.category);

  const searchQuery    = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'all';
  const minPrice       = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice       = parseInt(searchParams.get('maxPrice') || '2000000');
  const sortBy         = searchParams.get('sort') || 'name';
  const sortOrderParam = searchParams.get('order') || 'asc';

  const [viewMode, setViewMode]     = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder]   = useState<'asc' | 'desc'>(sortOrderParam as 'asc' | 'desc');
  const [showFilters, setShowFilters] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  // Charger les catégories au montage si vides
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // ✅ Envoyer les filtres directement à l'API (plus de filtrage côté client uniquement)
  useEffect(() => {
    dispatch(fetchProducts({
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      search: searchQuery || undefined,
      minPrice: minPrice > 0 ? minPrice : undefined,
      maxPrice: maxPrice < 2000000 ? maxPrice : undefined,
    }));
  }, [dispatch, selectedCategory, searchQuery, minPrice, maxPrice]);

  // Synchroniser l'ordre de tri dans l'URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('order', sortOrder);
    setSearchParams(params);
  }, [sortOrder]);

  // Sidebar : catégories avec comptage calculé localement
  const categoriesWithAll = [
    { id: 'all', name: 'Toutes les catégories', icon: '🛍️', count: products.length },
    ...categories.map(cat => ({
      id: cat.slug,
      name: cat.name,
      icon: cat.icon || '📦',
      count: products.filter(p => p.category === cat.slug).length,
    })),
  ];

  // Tri côté client (les filtres principaux sont gérés par l'API)
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      let aVal: string | number, bVal: string | number;
      switch (sortBy) {
        case 'price':   aVal = a.price; bVal = b.price; break;
        case 'rating':  aVal = a.rating ?? 0; bVal = b.rating ?? 0; break;
        case 'newest':
          aVal = new Date(a.createdAt || 0).getTime();
          bVal = new Date(b.createdAt || 0).getTime();
          break;
        default:        aVal = a.name.toLowerCase(); bVal = b.name.toLowerCase();
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [products, sortBy, sortOrder]);

  const clearFilters = () => navigate('/products');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    setSearchParams(params);
  };

  const handleCategorySelect = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === 'all') params.delete('category');
    else params.set('category', categoryId);
    setSearchParams(params);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set('minPrice', localMinPrice.toString());
    params.set('maxPrice', localMaxPrice.toString());
    setSearchParams(params);
    setShowFilters(false);
  };

  const handleAddToCart = (product: any, quantity: number) => dispatch(addToCart({ product, quantity }));
  const handleAddToWishlist = (product: any) => dispatch(ajouterWishlist(product.id));
  const handleRemoveFromWishlist = (productId: string) => dispatch(retirerWishlist(productId));
  const isInWishlist = (productId: string) =>
    wishlistItems.some(item => item?.product?.id === productId);

  // Pas de full-page spinner — le contenu reste visible pendant le rechargement

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Link to={ROUTES.PUBLIC.HOME} className="inline-flex items-center pt-6 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          <span>{t('common.back', "Retour à l'accueil")}</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'all'
                  ? t('navigation.products', 'Nos Produits')
                  : categories.find(c => c.slug === selectedCategory)?.name}
              </h1>
              <p className="text-xl text-gray-600">
                {selectedCategory === 'all'
                  ? t('products.subtitle', 'Découvrez notre sélection de produits de qualité')
                  : `${sortedProducts.length} produits disponibles`}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {selectedCategory !== 'all' && (
                <button onClick={clearFilters} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-all duration-200 shadow-sm">
                  <FontAwesomeIcon icon={faTimes} className="mr-2" />
                  {t('products.clearFilter', 'Toutes les catégories')}
                </button>
              )}
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200">
                <FontAwesomeIcon icon={faFilter} className="mr-2" />Filtres
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faGrin} className="mr-2 text-primary-600" />Catégories
              </h3>
              <div className="space-y-3">
                {categoriesWithAll.map(category => (
                  <button key={category.id} onClick={() => handleCategorySelect(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${selectedCategory === category.id ? 'bg-primary-50 text-primary-700 border-2 border-primary-200' : 'hover:bg-gray-50 border-2 border-transparent'}`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faSlidersH} className="mr-2 text-primary-600" />Prix
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix minimum</label>
                  <input type="number" value={localMinPrice} onChange={(e) => setLocalMinPrice(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix maximum</label>
                  <input type="number" value={localMaxPrice} onChange={(e) => setLocalMaxPrice(parseInt(e.target.value) || 2000000)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="2000000" />
                </div>
                <button onClick={applyPriceFilter} className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Appliquer
                </button>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-gray-600">
                  <span className="font-semibold text-gray-900">{sortedProducts.length}</span> {t('common.results', 'résultats')}
                  {searchQuery && (
                    <span className="ml-2 inline-flex items-center">
                      pour "<span className="font-medium text-gray-900">{searchQuery}</span>"
                      <button onClick={() => { const p = new URLSearchParams(searchParams); p.delete('search'); setSearchParams(p); }} className="ml-2 text-red-500 hover:text-red-700 p-1">
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <select value={sortBy} onChange={handleSortChange} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
                      <option value="name">{t('products.sortByName', 'Nom')}</option>
                      <option value="price">{t('products.sortByPrice', 'Prix')}</option>
                      <option value="rating">{t('products.sortByRating', 'Note')}</option>
                      <option value="newest">{t('products.sortByNewest', 'Plus récent')}</option>
                    </select>
                    <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowUp : faArrowDown} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'hover:bg-gray-200 text-gray-600'}`}>
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'hover:bg-gray-200 text-gray-600'}`}>
                      <FontAwesomeIcon icon={faList} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {sortedProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
                {sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    isInWishlist={isInWishlist(product.id)}
                    isAuthenticated={isAuthenticated}
                    showQuickActions={true}
                    showBadges={true}
                    className={viewMode === 'grid' ? 'transform hover:scale-105 transition-transform duration-200' : 'w-full'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('products.noResults', 'Aucun produit trouvé')}</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {searchQuery ? `Aucun produit correspondant à "${searchQuery}"` : 'Aucun produit ne correspond aux filtres sélectionnés'}
                </p>
                <button onClick={clearFilters} className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold">
                  <FontAwesomeIcon icon={faTimes} className="mr-2" />
                  {t('products.clearFilters', 'Réinitialiser les filtres')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;