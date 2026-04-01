import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faStar,
  faHeart,
  faPlus,
  faMinus,
  faArrowLeft,
  faShareAlt,
  faBox,
  faShieldAlt,
  faTruck
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState, AppDispatch } from '@/store';
import { fetchProductById } from '@/store/slices/productSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { ajouterWishlist, retirerWishlist } from '@/store/slices/wishlistSlice';
import { ROUTES } from '@/utils/url/url_frontend';
import { useError } from '@/context/ErrorContext';

const ProductDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
   const { addError } = useError();

  const { products, loading, error } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user;
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Find product from the products array
  const product = products.find(p => p.id === id);
  const isInWishlist = wishlistItems.some(item => item?.productId === product?.id);

  useEffect(() => {
    if (id && (!product || products.length === 0)) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, product, products.length]);

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock === 0) {
      toast.error(t('product.outOfStock', 'Produit en rupture de stock'));
      return;
    }

    if (quantity > product.stock) {
      toast.error(t('product.insufficientStock', 'Stock insuffisant'));
      return;
    }

    dispatch(addToCart({ product, quantity }));
    toast.success(t('cart.productAdded', '{{quantity}} x {{name}} ajouté au panier', {
      quantity,
      name: product.name
    }));
  };

  const handleAddToWishlist = () => {
    if (!product) return;

    if (isInWishlist) {
      dispatch(retirerWishlist(product.id));
      toast.success(t('wishlist.removeSuccess'));
    } else {
      dispatch(ajouterWishlist(product.id));
      toast.success(t('wishlist.addSuccess'));
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (product && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleShare = () => {
    addError({
      type: 'timeout',
      severity: 'info',
      title: 'Fonctionnalité en développement',
      message: 'La fonctionnalité de partage sera bientôt disponible',
      canDismiss: true,
      actionButton: {
        text: 'Compris',
        action: () => { },
        variant: 'primary'
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading', 'Chargement...')}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faBox} className="text-red-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('product.notFound', 'Produit introuvable')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('product.notFoundDescription', 'Le produit que vous recherchez n\'existe pas ou a été supprimé.')}
            </p>
            <button
              onClick={() => navigate(ROUTES.PUBLIC.CATALOG.PRODUCTS)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>{t('navigation.products', 'Voir les produits')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Prepare images array (main image + additional images)
  const allImages = [product.images[0]?.url || '', ...(product.images.slice(1).map(img => img.url))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>{t('common.back', 'Retour')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={allImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600?text=Image+non+disponible';
                  }}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isFeatured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      ⭐ {t('product.featured', 'Vedette')}
                    </div>
                  )}

                  {product.stock <= 5 && product.stock > 0 && (
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {t('product.limitedStock', 'Stock limité')}
                    </div>
                  )}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faShareAlt} />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${selectedImageIndex === index
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x150?text=Image+non+disponible';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wider">
                {product.category}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-medium text-gray-900">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({product.views} {t('product.reviews', 'avis')})
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {product.price.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </div>
              <div className="flex items-center space-x-4">
                <div className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {product.stock > 0
                    ? `${product.stock} ${t('product.inStock', 'en stock')}`
                    : t('product.outOfStock', 'Rupture de stock')
                  }
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            {product.stock > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('product.quantity', 'Quantité')}
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-l-lg flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {t('product.maxQuantity', 'Maximum')} {product.stock}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!isAuthenticated}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>{t('product.addToCart', 'Ajouter au panier')}</span>
                  </button>

                  <button
                    onClick={handleAddToWishlist}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${isInWishlist
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    <FontAwesomeIcon icon={faHeart} className={isInWishlist ? 'text-red-500' : 'text-gray-500'} />
                    <span>
                      {isInWishlist
                        ? t('wishlist.removeFromWishlist', 'Retirer des favoris')
                        : t('wishlist.addToWishlist', 'Ajouter aux favoris')
                      }
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 