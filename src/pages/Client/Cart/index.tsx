import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrash, 
  faArrowLeft, 
  faCreditCard, 
  faPlus, 
  faMinus,
  faShoppingBag,
  faHeart,
  faTruck,
  faShield
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState, AppDispatch } from '@/store';
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from '@/store/slices-test/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices-test/wishlistSlice';
import { ROUTES } from '@/utils/url/url_frontend';
import { Product } from '@/types';

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    dispatch(removeFromCart(productId));
    toast.success(t('cart.itemRemoved', '{{name}} retiré du panier', { name: productName }));
  };

  const handleAddToWishlist = (product: Product) => {
    if (!isAuthenticated || !user?.id) {
      toast.error(t('auth.loginRequired', 'Veuillez vous connecter pour ajouter aux favoris'));
      navigate(ROUTES.PUBLIC.AUTH.LOGIN);
      return;
    }

    const isInWishlist = wishlistItems.some(item => item?.product?.id === product?.id && item?.userId === user?.id);
    
    if (isInWishlist) {
      const wishlistItem = wishlistItems.find(item => item?.product?.id === product?.id && item?.userId === user?.id);
      if (wishlistItem) {
        dispatch(removeFromWishlist(wishlistItem.id));
      toast.success(t('wishlist.removeSuccess'));
      }
    } else {
      dispatch(addToWishlist({ 
        product, 
        userId: user.id 
      }));
      toast.success(t('wishlist.addSuccess'));
    }
  };

  const handleClearCart = () => {
    if (window.confirm(t('cart.confirmClear', 'Êtes-vous sûr de vouloir vider le panier ?'))) {
      dispatch(clearCart());
      toast.success(t('cart.cartCleared', 'Panier vidé'));
    }
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate(ROUTES.USER.SHOPPING.CHECKOUT);
    } else {
      navigate(ROUTES.PUBLIC.AUTH.LOGIN + '?redirect=' + encodeURIComponent(ROUTES.USER.SHOPPING.CHECKOUT));
    }
  };

  const shipping = total >= 50 ? 0 : 5.99;
  const finalTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FontAwesomeIcon icon={faShoppingBag} className="text-gray-400 text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('cart.empty', 'Votre panier est vide')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('cart.emptyDescription', 'Découvrez nos produits et commencez vos achats')}
            </p>
            <div className="space-y-4">
              <Link
                to={ROUTES.PUBLIC.CATALOG.PRODUCTS}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <FontAwesomeIcon icon={faShoppingBag} className="mr-3" />
                {t('cart.startShopping', 'Commencer mes achats')}
              </Link>
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to={ROUTES.PUBLIC.CATALOG.PRODUCTS}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('cart.title', 'Mon Panier')}
              </h1>
              <p className="text-gray-600 mt-1">
                {items.length} {items.length === 1 ? t('cart.item', 'article') : t('cart.items', 'articles')}
              </p>
            </div>
          </div>
          
          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-colors"
            >
              {t('cart.clearCart', 'Vider le panier')}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product?.id || ''} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center space-x-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={item.product?.images?.[0].url}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link
                          to={ROUTES.GENERATORS.getProductDetails(item.product?.id || '')}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {item.product?.name}
                        </Link>
                        <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                          {item.product?.description}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {t('product.category', 'Catégorie')}: {item.product?.category}
                        </p>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-gray-900">
                          {(item.product?.price || 0 * item.quantity).toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR',
                          })}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.product?.price?.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR',
                          })} / unité
                        </div>
                      </div>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.product?.id || '', item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <FontAwesomeIcon icon={faMinus} className="text-sm" />
                        </button>
                        
                        <span className="w-12 text-center font-semibold text-lg">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityChange(item.product?.id || '', item.quantity + 1)}
                          className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-sm" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => item.product && handleAddToWishlist(item.product)}
                          className={`p-2 rounded-xl transition-colors ${
                            wishlistItems.some(wishlistItem => wishlistItem?.product?.id === item?.product?.id && wishlistItem?.userId === user?.id)
                              ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
                              : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                          }`}
                          title={wishlistItems.some(wishlistItem => wishlistItem?.product?.id === item?.product?.id && wishlistItem?.userId === user?.id)
                            ? t('wishlist.removeFromWishlist')
                            : t('cart.addToWishlist')
                          }
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </button>
                        
                        <button
                          onClick={() => handleRemoveItem(item.product?.id || '', item.product?.name || '')}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title={t('cart.remove', 'Supprimer')}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {t('checkout.orderSummary', 'Récapitulatif de la commande')}
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal', 'Sous-total')}</span>
                  <span>
                    {total.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faTruck} className="mr-2" />
                    {t('cart.shipping', 'Livraison')}
                  </span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">
                        {t('cart.freeShipping', 'Gratuite')}
                      </span>
                    ) : (
                      shipping.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <p className="text-sm text-blue-600">
                      {t('cart.freeShippingInfo', 'Livraison gratuite dès 50€ d\'achat')}
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>{t('cart.total', 'Total')}</span>
                    <span>
                      {finalTotal.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <FontAwesomeIcon icon={faShield} className="mr-2 text-green-500" />
                  {t('cart.securePayment', 'Paiement 100% sécurisé')}
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <FontAwesomeIcon icon={faCreditCard} className="mr-3" />
                {isAuthenticated
                  ? t('cart.checkout', 'Passer la commande')
                  : t('cart.loginToCheckout', 'Se connecter pour commander')
                }
              </button>

              <div className="mt-4 text-center">
                <Link
                  to={ROUTES.PUBLIC.CATALOG.PRODUCTS}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {t('cart.continueShopping', 'Continuer mes achats')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;