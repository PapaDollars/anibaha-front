import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faShoppingCart, 
  faTrash, 
  faArrowLeft,
  faHeartBroken,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState } from '@/store';
import { addToCart } from '@/store/slices-test/cartSlice';
import { removeFromWishlist, clearWishlist } from '@/store/slices-test/wishlistSlice';
import { ROUTES } from '@/utils/url/url_frontend';
import { Product } from '@/types';
import { showToast } from '@/utils/toast';
import { WishlistItem } from '@/types/wishlist';

const Wishlist: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleAddToCart = (item: WishlistItem) => {
    if (!isAuthenticated) {
      toast.error(t('auth.loginRequired', 'Veuillez vous connecter pour ajouter au panier'));
      navigate(ROUTES.PUBLIC.AUTH.LOGIN);
      return;
    }

    if (item.product.stock === 0) {
      toast.error(t('product.outOfStock', 'Produit en rupture de stock'));
      return;
    }

    dispatch(addToCart({ product: item.product, quantity: 1 }));
    toast.success(t('cart.added', 'Produit ajouté au panier'));
  };

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
    showToast('custom', 'success', t('wishlist.removeSuccess', 'Produit retiré de la liste de souhaits'), '', { duration: 3000 });
  };

  const handleAddAllToCart = () => {
    if (!isAuthenticated) {
      toast.error(t('auth.loginRequired', 'Veuillez vous connecter pour ajouter au panier'));
      navigate(ROUTES.PUBLIC.AUTH.LOGIN);
      return;
    }

    const availableItems = wishlistItems.filter(item => item.product.stock > 0);
    
    if (availableItems.length === 0) {
      toast.error(t('wishlist.noAvailableItems', 'Aucun article disponible'));
      return;
    }

    availableItems.forEach(item => {
      dispatch(addToCart({ product: item.product, quantity: 1 }));
    });

    toast.success(t('wishlist.allAddedToCart', '{{count}} articles ajoutés au panier', { 
      count: availableItems.length 
    }));
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success(t('wishlist.cleared', 'Liste des favoris vidée'));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faHeart} className="text-red-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('auth.loginRequired', 'Connexion requise')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('wishlist.loginDescription', 'Connectez-vous pour accéder à vos favoris')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(ROUTES.PUBLIC.AUTH.LOGIN)}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                {t('auth.login', 'Se connecter')}
              </button>
              <button
                onClick={() => navigate(ROUTES.PUBLIC.CATALOG.PRODUCTS)}
                className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
              >
                {t('navigation.products', 'Voir les produits')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>{t('common.back', 'Retour')}</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                <span>{t('navigation.wishlist', 'Mes Favoris')}</span>
              </h1>
              <p className="text-gray-600">
                {wishlistItems.length > 0 
                  ? t('wishlist.itemCount', '{{count}} article(s) dans vos favoris', { count: wishlistItems.length })
                  : t('wishlist.empty', 'Votre liste de favoris est vide')
                }
              </p>
            </div>

            {wishlistItems.length > 0 && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAddAllToCart}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>{t('wishlist.addAllToCart', 'Tout ajouter au panier')}</span>
                </button>
                
                <button
                  onClick={handleClearWishlist}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>{t('wishlist.clear', 'Vider la liste')}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faHeartBroken} className="text-gray-400 text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('wishlist.emptyTitle', 'Aucun favori pour le moment')}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {t('wishlist.emptyDescription', 'Découvrez nos produits et ajoutez vos articles préférés à votre liste de favoris')}
            </p>
            <button
              onClick={() => navigate(ROUTES.PUBLIC.CATALOG.PRODUCTS)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>{t('wishlist.startShopping', 'Commencer le shopping')}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              item.product ? (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={item.product.images[0]?.url || '/images/placeholder.png'}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.png';
                    }}
                  />
                  
                  {/* Remove from wishlist button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.product.name}
                  </h3>
                  
                    <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">
                          {item.product.rating.toFixed(1)}
                        </span>
                    </div>
                      <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                        {item.product.views} {t('product.reviews', 'avis')}
                    </span>
                  </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {item.product.comparePrice ? (
                          <>
                            <span className="text-lg font-bold text-red-600">
                              {item.product.comparePrice?.toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR'
                              })}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              {item.product.price.toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR'
                              })}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                    {item.product.price.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                          </span>
                        )}
                      </div>
                      <span className={`text-sm ${item.product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.product.stock > 0 
                          ? t('product.inStock', 'En stock')
                          : t('product.outOfStock', 'Rupture de stock')
                        }
                      </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                      disabled={item.product.stock === 0}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                      <span>
                        {item.product.stock > 0
                          ? t('cart.addToCart', 'Ajouter au panier')
                          : t('product.outOfStock', 'Rupture de stock')
                        }
                      </span>
                  </button>
                </div>
              </div>
              ) : null
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;