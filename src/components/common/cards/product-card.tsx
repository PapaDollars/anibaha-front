// src/components/Cards/EnhancedProductCard.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faStar,
  faHeart,
  faEye,
  faFire,
  faShield,
  faTag
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { ROUTES } from '@/utils/url/url_frontend';
import { LazyImage } from '@/components/common/LazyImage';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list' | 'featured';
  className?: string;
  showQuickActions?: boolean;
  showBadges?: boolean;
  onAddToCart?: (product: Product, quantity: number) => void;
  onAddToWishlist?: (product: Product) => void;
  onRemoveFromWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
  isAuthenticated?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
  className = '',
  showQuickActions = true,
  showBadges = true,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  isInWishlist = false,
  isAuthenticated = false
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getProductImage = () => {
    return product.images && product.images.length > 0 ? product.images[0]?.url : '/placeholder-image.jpg';
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder-image.jpg';
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error(t('auth.loginRequired', 'Veuillez vous connecter pour ajouter aux favoris'));
      navigate(ROUTES.PUBLIC.AUTH.LOGIN);
      return;
    }

    if (isInWishlist) {
      onRemoveFromWishlist?.(product.id);
      toast.success(t('wishlist.removed', 'Produit retiré des favoris'));
    } else {
      onAddToWishlist?.(product);
      toast.success(t('wishlist.added', 'Produit ajouté aux favoris'));
    }
  };

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!isAuthenticated) {
      toast.error(t('auth.loginRequired', 'Veuillez vous connecter pour ajouter au panier'));
      navigate(ROUTES.PUBLIC.AUTH.LOGIN);
      return;
    }

    onAddToCart?.(product, quantity);
    toast.success(t('cart.added', 'Produit ajouté au panier'));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateDiscountedPrice = () => {
    if (product.comparePrice && product.comparePrice > product.price) {
      return product.price;
    }
    return product.price;
  };

  // Featured view for hero sections
  if (viewMode === 'featured') {
    return (
      <div
        className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={ROUTES.GENERATORS.getProductDetails(product.id)} className="block">
          {/* Image Container - Larger for featured */}
          <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
              </div>
            )}

            <LazyImage
              src={getProductImage()}
              alt={product.name}
              className="w-full h-full object-cover"
              showHoverScale={true}
              onError={handleImageError}
              fallbackSrc="https://via.placeholder.com/400x300?text=Produit+non+disponible"
              placeholder="Chargement..."
            />

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Enhanced Badges */}
            {showBadges && (
              <div className="absolute top-6 left-6 flex flex-col space-y-3">
                {product.isFeatured && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                    ⭐ Vedette
                  </span>
                )}
              </div>
            )}

            {/* Enhanced Quick Actions */}
            {showQuickActions && (
              <div className={`absolute top-6 right-6 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                }`}>
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleAddToWishlist}
                    className={`w-12 h-12 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-300 ${isInWishlist ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                  >
                    <FontAwesomeIcon icon={faHeart} className="text-lg" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(ROUTES.GENERATORS.getProductDetails(product.id));
                    }}
                    className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center text-gray-600 hover:text-primary-500 hover:scale-110 hover:bg-white transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faEye} className="text-lg" />
                  </button>
                </div>
              </div>
            )}

            {/* Out of stock overlay */}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                <span className="bg-red-500 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl">
                  {t('product.outOfStock', 'Rupture de stock')}
                </span>
              </div>
            )}
          </div>

          {/* Enhanced Content */}
          <div className="p-8">
            {/* Category & Company */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-primary-600 font-bold uppercase tracking-wider">
                {product.category}
              </span>
              {product.company?.name && (
                <span className="text-sm text-gray-500 font-medium">
                  {product.company.name}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
              {product.name}
            </h3>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                  />
                ))}
                <span className="ml-3 text-lg font-semibold text-gray-700">
                  {product.rating}
                </span>
                <span className="ml-2 text-gray-500">
                  ({product.reviewCount} {t('product.reviews', 'avis')})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
                {product.stock > 0 && (
                  <span className="text-sm text-green-600 font-medium mt-1">
                    {product.stock} {t('product.inStock', 'en stock')}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            {product.stock > 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                <span>{t('product.addToCart', 'Ajouter au panier')}</span>
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-4 px-6 rounded-2xl font-bold text-lg cursor-not-allowed flex items-center justify-center space-x-3"
              >
                <span>{t('product.outOfStock', 'Rupture de stock')}</span>
              </button>
            )}
          </div>
        </Link>
      </div>
    );
  }

  // List view
  if (viewMode === 'list') {
    return (
      <div
        className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={ROUTES.GENERATORS.getProductDetails(product.id)} className="block md:w-1/3">
          <div className="relative h-64 md:h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            )}

            <LazyImage
              src={getProductImage()}
              alt={product.name}
              className="w-full h-full object-cover"
              showHoverScale={true}
              onError={handleImageError}
              fallbackSrc="https://via.placeholder.com/400x300?text=Produit+non+disponible"
              placeholder="Chargement..."
            />
            {/* Out of stock overlay */}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <span className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                  {t('product.outOfStock', 'Rupture de stock')}
                </span>
              </div>
            )}

            {/* Quick Actions */}
            {showQuickActions && (
              <div className={`absolute top-4 right-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={handleAddToWishlist}
                    className={`w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-200 ${isInWishlist ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(ROUTES.GENERATORS.getProductDetails(product.id));
                    }}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-500 hover:scale-110 hover:bg-white transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Content - Version Liste */}
        <div className="p-6 md:w-2/3 flex flex-col">
          <div className="flex-1">
            {/* Category */}
            <div className="text-sm text-primary-600 font-semibold mb-2 uppercase tracking-wider">
              {product.category}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              <Link to={ROUTES.GENERATORS.getProductDetails(product.id)}>
                {product.name}
              </Link>
            </h3>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                {product.description}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 font-medium">
                  {product.rating} ({product.views} {t('product.views', 'avis')})
                </span>
              </div>
            </div>
          </div>

          {/* Bottom section with price and button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-gray-100">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              {product.stock > 0 && (
                <div className="text-sm text-green-600 font-medium">
                  {product.stock} {t('product.inStock', 'en stock')}
                </div>
              )}
            </div>

            {/* Add to Cart Button - Version Liste */}
            {product.stock > 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>{t('product.addToCart', 'Ajouter au panier')}</span>
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-300 text-gray-500 py-2 px-6 rounded-lg font-semibold cursor-not-allowed flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>{t('product.outOfStock', 'Rupture de stock')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid mode (default)
  return (
    <div
      className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={ROUTES.GENERATORS.getProductDetails(product.id)} className="block">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          )}

          <LazyImage
            src={getProductImage()}
            alt={product.name}
            className="w-full h-full object-cover"
            showHoverScale={true}
            onError={handleImageError}
            fallbackSrc="https://via.placeholder.com/400x300?text=Produit+non+disponible"
            placeholder="Chargement..."
          />

          {/* Badges */}
          {showBadges && (
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {false && (
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                  <FontAwesomeIcon icon={faFire} className="mr-1" />
                  Nouveau
                </span>
              )}
              {false && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                  <FontAwesomeIcon icon={faFire} className="mr-1" />
                  Tendance
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  ⭐ Vedette
                </span>
              )}
              {product.stock <= 5 && product.stock > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {t('product.limitedStock', 'Stock limité')}
                </span>
              )}
            </div>
          )}

          {/* Out of stock overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <span className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                {t('product.outOfStock', 'Rupture de stock')}
              </span>
            </div>
          )}

          {/* Quick Actions */}
          {showQuickActions && (
            <div className={`absolute top-4 right-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleAddToWishlist}
                  className={`w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-200 ${isInWishlist ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                    }`}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <div className="text-sm text-primary-600 font-semibold mb-2 uppercase tracking-wider">
            {product.category}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors leading-tight">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-1 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600 font-medium">
                {product.rating} ({product.views})
              </span>
            </div>
          </div>

          {/* Price and Stock */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              {product.stock > 0 && (
                <span className="text-sm text-green-600 font-medium">
                  {product.stock} {t('product.inStock', 'en stock')}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          {product.stock > 0 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart();
              }}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>{t('product.addToCart', 'Ajouter au panier')}</span>
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>{t('product.outOfStock', 'Rupture de stock')}</span>
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;