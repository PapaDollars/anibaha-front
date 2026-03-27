import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLock, 
  faCreditCard, 
  faUser, 
  faMapMarkerAlt, 
  faPhone,
  faShoppingCart,
  faArrowLeft,
  faCheck,
  faTruck,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState } from '@/store';
import { ROUTES } from '@/utils/url/url_frontend';
import { clearCart } from '@/store/slices-test/cartSlice';
import { createOrder } from '@/store/slices-test/orderSlice';
import PaymentStep from '@/pages/Client/Checkout/PaymentStep';
import ConfirmationStep from '@/pages/Client/Checkout/ConfirmationStep';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
  customPaymentMethod?: string;
}

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.orders);

  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: '',
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    cardName: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
  });

  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

  const validateShippingForm = () => {
    const newErrors: Partial<ShippingAddress> = {};
    
    if (!shippingAddress.firstName.trim()) {
      newErrors.firstName = t('validation.firstNameRequired', 'Le prénom est requis');
    }
    if (!shippingAddress.lastName.trim()) {
      newErrors.lastName = t('validation.lastNameRequired', 'Le nom est requis');
    }
    if (!shippingAddress.address.trim()) {
      newErrors.address = t('validation.addressRequired', "L'adresse est requise");
    }
    if (!shippingAddress.city.trim()) {
      newErrors.city = t('validation.cityRequired', 'La ville est requise');
    }
    if (!shippingAddress.postalCode.trim()) {
      newErrors.postalCode = t('validation.postalCodeRequired', 'Le code postal est requis');
    }
    if (!shippingAddress.country.trim()) {
      newErrors.country = t('validation.countryRequired', 'Le pays est requis');
    }
    if (!shippingAddress.phone.trim()) {
      newErrors.phone = t('validation.phoneRequired', 'Le téléphone est requis');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateOrder = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    try {
      const orderItems = items
        .filter(item => !!item.product)
        .map((item, idx) => ({
          id: `${item.product!.id}-${idx}`,
          productId: item.product!.id,
          product: item.product!,
          quantity: item.quantity,
          unitPrice: item.product!.price,
          totalPrice: item.product!.price * item.quantity,
          productSnapshot: {
            name: item.product!.name,
            image: item.product!.images && item.product!.images.length > 0 ? item.product!.images[0].url : '',
            sku: item.product!.metadata?.sku ?? undefined
          }
        }));
      const order = await (dispatch as any)(
        createOrder({
          items: orderItems,
          shippingAddress: {
            ...shippingAddress,
            street: shippingAddress.address
          },
          billingAddress: {
            ...shippingAddress,
            street: shippingAddress.address
          },
          companyId: user?.companyId || '',
          paymentMethod,
          totals: {
            subtotal,
            tax: 0,
            taxRate: 0,
            shipping,
            discount: 0,
            total: finalTotal,
            currency: 'EUR'
          }
        })
      ).unwrap();

      dispatch(clearCart());
      toast.success(t('order.success', 'Commande passée avec succès !'));
      navigate(`/orders/${order.id}`);
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      toast.error(t('order.error', 'Erreur lors de la création de la commande'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateShippingForm()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!items.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faShoppingCart} className="text-gray-400 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('cart.empty', 'Votre panier est vide')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('cart.emptyDescription', 'Ajoutez des articles à votre panier avant de passer à la caisse.')}
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

  const subtotal = items.reduce((sum, item) => sum + (item.product && typeof item.product.price === 'number' ? item.product.price * item.quantity : 0), 0);
  const shipping = 5.99;
  const finalTotal = subtotal + shipping;

  const steps = [
    { number: 1, title: t('checkout.shipping', 'Livraison'), icon: faTruck },
    { number: 2, title: t('checkout.payment', 'Paiement'), icon: faCreditCard },
    { number: 3, title: t('checkout.confirmation', 'Confirmation'), icon: faCheck },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(ROUTES.PUBLIC.CATALOG.CART)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>{t('common.back', 'Retour au panier')}</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('checkout.title', 'Finaliser la commande')}
          </h1>
          <p className="text-gray-600">
            {t('checkout.subtitle', 'Quelques étapes simples pour finaliser votre achat')}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center space-x-4 ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.number 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300'
                  }`}>
                    {currentStep > step.number ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={step.icon} />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium">{step.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faTruck} className="text-white" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {t('checkout.shippingAddress', 'Adresse de livraison')}
                    </h2>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('user.firstName', 'Prénom')}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={shippingAddress.firstName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        <FontAwesomeIcon 
                          icon={faUser} 
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                        />
                      </div>
                      {errors.firstName && (
                        <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('user.lastName', 'Nom')}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={shippingAddress.lastName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        <FontAwesomeIcon 
                          icon={faUser} 
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                        />
                      </div>
                      {errors.lastName && (
                        <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.address', 'Adresse')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={shippingAddress.address}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      <FontAwesomeIcon 
                        icon={faMapMarkerAlt} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>

                  {/* City, Postal Code, Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('user.city', 'Ville')}
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('user.postalCode', 'Code postal')}
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.postalCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="mt-2 text-sm text-red-600">{errors.postalCode}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('user.country', 'Pays')}
                      </label>
                      <select
                        name="country"
                        id="country"
                        value={shippingAddress.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.country ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Canada">Canada</option>
                      </select>
                      {errors.country && (
                        <p className="mt-2 text-sm text-red-600">{errors.country}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.phone', 'Téléphone')}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      <FontAwesomeIcon 
                        icon={faPhone} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Payment Method Selection */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {t('checkout.paymentMethod', 'Mode de paiement')}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <FontAwesomeIcon icon={faCreditCard} className="text-gray-600" />
                          <div>
                            <div className="font-medium">{t('payment.card', 'Carte bancaire')}</div>
                            <div className="text-sm text-gray-500">{t('payment.cardDescription', 'Visa, Mastercard, Amex')}</div>
                          </div>
                        </div>
                        {paymentMethod === 'card' && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                          </div>
                        )}
                      </label>

                      <label className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'other' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="other"
                          checked={paymentMethod === 'other'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <FontAwesomeIcon icon={faShieldAlt} className="text-gray-600" />
                          <div>
                            <div className="font-medium">{t('payment.other', 'Autre méthode de paiement')}</div>
                            <div className="text-sm text-gray-500">{t('payment.otherDescription', 'Spécifiez votre méthode de paiement')}</div>
                          </div>
                        </div>
                        {paymentMethod === 'other' && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                          </div>
                        )}
                      </label>
                    </div>
                  </div>


                  {/* Next Button */}
                  <div className="flex justify-end pt-6">
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <span>{t('checkout.continueToPayment', 'Continuer vers le paiement')}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <PaymentStep
                paymentMethod={paymentMethod}
                paymentData={paymentData}
                onPaymentDataChange={setPaymentData}
                onNext={handleNextStep}
                onBack={handlePreviousStep}
                loading={loading}
              />
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <ConfirmationStep
                items={items}
                shippingAddress={shippingAddress}
                paymentMethod={paymentMethod}
                paymentData={paymentData}
                subtotal={subtotal}
                shipping={shipping}
                total={finalTotal}
                onBack={handlePreviousStep}
                onEditShipping={() => setCurrentStep(1)}
                onEditPayment={() => setCurrentStep(2)}
                onConfirmOrder={handleCreateOrder}
                loading={loading}
              />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg sticky top-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('cart.orderSummary', 'Résumé de la commande')}
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product?.id} className="flex items-center space-x-3">
                      <img
                        src={item.product?.images[0].url}
                        alt={item.product?.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.png';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.product?.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {t('cart.quantity', 'Qté')}: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.product?.price && (item.product.price * item.quantity).toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('cart.subtotal', 'Sous-total')}</span>
                    <span className="font-medium">
                      {subtotal.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('cart.shipping', 'Livraison')}</span>
                    <span className="font-medium">
                      {shipping.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold">
                    <span>{t('cart.total', 'Total')}</span>
                    <span>
                      {finalTotal.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 pt-4">
                  <FontAwesomeIcon icon={faShieldAlt} />
                  <span>{t('checkout.securePayment', 'Paiement 100% sécurisé')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;