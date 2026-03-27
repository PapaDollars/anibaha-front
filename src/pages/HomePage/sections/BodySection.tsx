import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faShield,
  faTruck,
  faHeadset,
  faUsers,
  faStore,
  faGlobe,
  faTags,
  faRobot
} from '@fortawesome/free-solid-svg-icons';

// Import des composants modulaires
import { ProductCard } from '@/components/common/cards/product-card';
import { CategoryCard } from '@/components/common/cards/category-card';
import { CompanyCard } from '@/components/common/cards/company-card';
import { addToCart } from '@/store/slices-test/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices-test/wishlistSlice';
import { RootState } from '@/store';
import { ROUTES } from '@/utils/url/url_frontend';
import { Product } from '@/types/product';

function normalizeProduct(raw: any): Product {
  return {
    id: raw.id ?? '',
    name: raw.name ?? '',
    slug: raw.slug ?? '',
    description: raw.description ?? '',
    price: raw.price ?? 0,
    comparePrice: raw.comparePrice,
    costPrice: raw.costPrice,
    currency: raw.currency ?? 'EUR',
    images: Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images
      : (raw.image ? [{ id: '', url: raw.image, isPrimary: true, order: 0 }] : []),
    videos: raw.videos ?? [],
    category: raw.category ?? '',
    subcategory: raw.subcategory,
    tags: raw.tags ?? [],
    brand: raw.brand,
    companyId: raw.companyId ?? '',
    company: raw.company,
    stock: raw.stock ?? 0,
    trackQuantity: raw.trackQuantity ?? true,
    allowBackorder: raw.allowBackorder ?? false,
    hasVariants: raw.hasVariants ?? false,
    isActive: raw.isActive ?? true,
    status: raw.status ?? 'active',
    isFeatured: raw.isFeatured ?? false,
    isDigital: raw.isDigital ?? false,
    rating: raw.rating ?? 0,
    reviewCount: raw.reviewCount ?? 0,
    totalRatings: raw.totalRatings ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    shippingInfo: raw.shippingInfo,
    views: raw.views ?? 0,
    wishlistCount: raw.wishlistCount ?? 0,
    cartAddCount: raw.cartAddCount ?? 0,
    purchaseCount: raw.purchaseCount ?? 0,
    createdAt: raw.createdAt ?? '',
    updatedAt: raw.updatedAt ?? '',
    metadata: raw.metadata,
  };
}

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   rating: number;
//   reviews: number;
//   company: string;
//   category: string;
//   isNew?: boolean;
//   isTrending?: boolean;
//   discount?: number;
// }

// interface Company {
//   id: string;
//   name: string;
//   logo: string;
//   rating: number;
//   products: number;
//   verified: boolean;
// }

export const BodySection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 156,
      company: 'TechCorp',
      category: 'Electronics',
      description: 'Le dernier iPhone avec une technologie de pointe et des performances exceptionnelles.',
      stock: 25,
      isNew: true,
      isTrending: true
    },
    {
      id: '2',
      name: 'Robe Wax Moderne',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 89,
      company: 'Fashion Hub',
      category: 'Fashion',
      description: 'Une magnifique robe en tissu wax traditionnel avec une coupe moderne et élégante.',
      stock: 12,
      discount: 15
    },
    {
      id: '3',
      name: 'MacBook Pro M3',
      price: 2800000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 234,
      company: 'TechCorp',
      category: 'Electronics',
      description: 'Ordinateur portable puissant avec la puce M3 pour les professionnels créatifs.',
      stock: 8,
      isTrending: true
    },
    {
      id: '4',
      name: 'Crème Karité Bio',
      price: 18500,
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 67,
      company: 'BeautyLux',
      category: 'Beauty',
      description: 'Crème hydratante naturelle au beurre de karité bio, parfaite pour tous types de peau.',
      stock: 45,
      isNew: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Tout', icon: '🛍️', count: 1250, href: ROUTES.PUBLIC.CATALOG.CATEGORIES },
    { id: 'electronics', name: 'Électronique', icon: '📱', count: 340 },
    { id: 'fashion', name: 'Mode', icon: '👗', count: 520 },
    { id: 'beauty', name: 'Beauté', icon: '💄', count: 180 },
    { id: 'home', name: 'Maison', icon: '🏠', count: 210 }
  ];

  const topCompanies = [
    {
      id: '1',
      name: 'TechCorp Cameroun',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      rating: 4.8,
      products: 156,
      verified: true,
      description: 'Leader en technologie et innovation au Cameroun. Spécialisé dans les appareils électroniques haut de gamme.',
      location: 'Douala, Cameroun',
      category: 'Technologie'
    },
    {
      id: '2',
      name: 'Fashion Hub Africa',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
      rating: 4.6,
      products: 89,
      verified: true,
      description: 'Créateur de mode africaine moderne, alliant tradition et tendances contemporaines.',
      location: 'Yaoundé, Cameroun',
      category: 'Mode & Style'
    },
    {
      id: '3',
      name: 'BeautyLux Cosmetics',
      logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop',
      rating: 4.7,
      products: 245,
      verified: true,
      description: 'Produits de beauté naturels et bio, inspirés des traditions africaines.',
      location: 'Bafoussam, Cameroun',
      category: 'Beauté & Bien-être'
    }
  ];

  // Fonctions de gestion
  const handleAddToCart = (product: any, quantity: number) => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleAddToWishlist = (product: any) => {
    dispatch(addToWishlist({ product, userId: user?.id || '' }));
  };

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item?.product?.id === productId && item?.userId === user?.id);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId !== 'all') {
      navigate(`${ROUTES.PUBLIC.CATALOG.CATEGORY_PRODUCTS}?category=${categoryId}`);
    }
  };

  return (
    <div>
      {/* Features Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: faShield,
                title: 'Paiements Sécurisés',
                description: 'Orange Money, MTN, Cartes bancaires',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: faTruck,
                title: 'Livraison Rapide',
                description: 'Livraison en 24h dans les grandes villes',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: faHeadset,
                title: 'Support 24/7',
                description: 'Assistance par WhatsApp et chat',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: faRobot,
                title: 'IA Shopping',
                description: 'Assistant intelligent personnalisé',
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explorez Nos Catégories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre large sélection de produits dans toutes les catégories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                href={category.href}
                isSelected={selectedCategory === category.id}
                onClick={handleCategoryClick}
                viewMode="simple"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Produits Vedettes
              </h2>
              <p className="text-xl text-gray-600">
                Les meilleures ventes sélectionnées pour vous
              </p>
            </div>
            <Link
              to={ROUTES.PUBLIC.CATALOG.PRODUCTS}
              className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
            >
              <span>Voir Tout</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={normalizeProduct(product)}
                viewMode="grid"
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                isInWishlist={isInWishlist(product.id)}
                isAuthenticated={isAuthenticated}
                showQuickActions={true}
                showBadges={true}
              />
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="lg:hidden text-center mt-8">
            <Link
              to={ROUTES.PUBLIC.CATALOG.PRODUCTS}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
            >
              <span>Voir Tous les Produits</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Companies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Entreprises de Confiance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez nos partenaires vérifiés qui offrent les meilleurs produits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                viewMode="detailed"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '50,000+', label: 'Produits', icon: faTags },
              { number: '1,200+', label: 'Entreprises', icon: faStore },
              { number: '25,000+', label: 'Clients', icon: faUsers },
              { number: '15+', label: 'Pays', icon: faGlobe }
            ].map((stat, index) => (
              <div key={index} className="group">
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