import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight, faShield, faTruck, faHeadset,
  faRobot, faUsers, faStore, faGlobe, faTags
} from '@fortawesome/free-solid-svg-icons';

import { ProductCard }  from '@/components/common/cards/product-card';
import { CategoryCard } from '@/components/common/cards/category-card';
import { CompanyCard }  from '@/components/common/cards/company-card';

import { RootState, AppDispatch } from '@/store';
import { fetchProducts }   from '@/store/slices/productSlice';
import { fetchCategories } from '@/store/slices/categorySlice';
import { ROUTES } from '@/utils/url/url_frontend';
import { Product } from '@/types/product';

function normalizeProduct(raw: any): Product {
  return {
    id: raw.id ?? '', name: raw.name ?? '', slug: raw.slug ?? raw.id ?? '',
    description: raw.description ?? '', price: raw.price ?? 0,
    comparePrice: raw.comparePrice, costPrice: raw.costPrice,
    currency: raw.currency ?? 'XAF',
    images: Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images
      : (raw.image ? [{ id: '', url: raw.image, isPrimary: true, order: 0 }] : []),
    videos: raw.videos ?? [], category: raw.category ?? '',
    subcategory: raw.subcategory, tags: raw.tags ?? [], brand: raw.brand,
    companyId: raw.companyId ?? '', company: raw.company, stock: raw.stock ?? 0,
    trackQuantity: raw.trackQuantity ?? true, allowBackorder: raw.allowBackorder ?? false,
    hasVariants: raw.hasVariants ?? false, isActive: raw.isActive ?? true,
    status: raw.status ?? 'active', isFeatured: raw.isFeatured ?? false,
    isDigital: raw.isDigital ?? false, rating: raw.rating ?? 0,
    reviewCount: raw.reviewCount ?? 0,
    totalRatings: raw.totalRatings ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    shippingInfo: raw.shippingInfo, views: raw.views ?? 0,
    wishlistCount: raw.wishlistCount ?? 0, cartAddCount: raw.cartAddCount ?? 0,
    purchaseCount: raw.purchaseCount ?? 0,
    createdAt: raw.createdAt ?? '', updatedAt: raw.updatedAt ?? '',
    metadata: raw.metadata,
  };
}

export const BodySection: React.FC = () => {
  const navigate  = useNavigate();
  const dispatch  = useDispatch<AppDispatch>();

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { products, loading: productsLoading }   = useSelector((state: RootState) => state.product);
  const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.category);
  const wishlistItems = useSelector((state: RootState) => (state as any).wishlist?.items ?? []);

  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchProducts({ featured: true, limit: 4 } as any));
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddToCart      = (_product: any, _quantity: number) => {};
  const handleAddToWishlist  = (_product: any) => {};
  const handleRemoveFromWishlist = (_productId: string) => {};
  const isInWishlist = (productId: string) =>
    wishlistItems.some((item: any) => item?.product?.id === productId && item?.userId === user?.id);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId !== 'all') navigate(`${ROUTES.PUBLIC.CATALOG.PRODUCTS}?category=${categoryId}`);
  };

  const displayProducts = products.slice(0, 4);
  const displayCategories = [
    { id: 'all', name: 'Tout', icon: '🛍️', count: products.length, href: ROUTES.PUBLIC.CATALOG.CATEGORIES },
    ...categories.slice(0, 4).map(c => ({
      id: c.id, name: c.name, icon: (c as any).icon || '📦',
      count: (c as any).productsCount || 0,
      href: `${ROUTES.PUBLIC.CATALOG.PRODUCTS}?category=${c.slug}`,
    })),
  ];

  return (
    <div>
      {/* Features */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: faShield,  title: 'Paiements Sécurisés', description: 'Orange Money, MTN, Cartes bancaires', gradient: 'from-green-500 to-emerald-500' },
              { icon: faTruck,   title: 'Livraison Rapide',    description: 'Livraison en 24h dans les grandes villes', gradient: 'from-blue-500 to-cyan-500' },
              { icon: faHeadset, title: 'Support 24/7',        description: 'Assistance par WhatsApp et chat', gradient: 'from-purple-500 to-pink-500' },
              { icon: faRobot,   title: 'IA Shopping',         description: 'Assistant intelligent personnalisé', gradient: 'from-orange-500 to-red-500' },
            ].map((f, i) => (
              <div key={i} className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-r ${f.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={f.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explorez Nos Catégories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Découvrez notre large sélection de produits dans toutes les catégories</p>
          </div>
          {categoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {displayCategories.map(category => (
                <CategoryCard
                  key={category.id} category={category} href={category.href}
                  isSelected={selectedCategory === category.id}
                  onClick={handleCategoryClick} viewMode="simple"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Produits Vedettes</h2>
              <p className="text-xl text-gray-600">Les meilleures ventes sélectionnées pour vous</p>
            </div>
            <Link to={ROUTES.PUBLIC.CATALOG.PRODUCTS} className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold">
              <span>Voir Tout</span><FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />)}
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayProducts.map(product => (
                <ProductCard
                  key={product.id} product={normalizeProduct(product)} viewMode="grid"
                  onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                  isInWishlist={isInWishlist(product.id)}
                  isAuthenticated={isAuthenticated} showQuickActions showBadges
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">Aucun produit disponible pour le moment</div>
          )}
          <div className="lg:hidden text-center mt-8">
            <Link to={ROUTES.PUBLIC.CATALOG.PRODUCTS} className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold">
              <span>Voir Tous les Produits</span><FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '50,000+', label: 'Produits',    icon: faTags  },
              { number: '1,200+',  label: 'Entreprises', icon: faStore },
              { number: '25,000+', label: 'Clients',     icon: faUsers },
              { number: '15+',     label: 'Pays',        icon: faGlobe },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={stat.icon} className="text-white text-2xl" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BodySection;