import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faShoppingCart, 
  faMapMarkerAlt,
  faCreditCard,
  faEdit,
  faLock,
  faTruck,
  faCalendarAlt,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

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

import { Product } from '@/types/product';

interface CartItem {
  product?: Product;
  quantity: number;
}

interface ConfirmationStepProps {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentData: PaymentData;
  subtotal: number;
  shipping: number;
  total: number;
  onBack: () => void;
  onEditShipping: () => void;
  onEditPayment: () => void;
  onConfirmOrder: () => void;
  loading: boolean;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  items,
  shippingAddress,
  paymentMethod,
  paymentData,
  subtotal,
  shipping,
  total,
  onBack,
  onEditShipping,
  onEditPayment,
  onConfirmOrder,
  loading
}) => {
  const { t } = useTranslation();

  const formatCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    return `**** **** **** ${cleaned.slice(-4)}`;
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 3); // 3 jours de livraison
    return deliveryDate.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faShoppingCart} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {t('confirmation.orderSummary', 'Résumé de la commande')}
            </h2>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {items.filter(item => !!item.product).map((item) => (
  <div key={item.product!.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
    <img
      src={item.product!.images && item.product!.images.length > 0 ? item.product!.images[0].url : '/placeholder-image.jpg'}
      alt={item.product!.name}
      className="w-16 h-16 object-cover rounded-lg"
    />
    <div className="flex-1">
      <h4 className="font-medium text-gray-900">{item.product!.name}</h4>
      <p className="text-sm text-gray-500">
        {t('cart.quantity', 'Quantité')}: {item.quantity}
      </p>
      <p className="text-sm text-gray-500">
        {t('cart.unitPrice', 'Prix unitaire')}: {item.product!.price.toFixed(2)} €
      </p>
    </div>
    <div className="text-right">
      <span className="font-semibold text-lg text-gray-900">
        {(item.product!.price * item.quantity).toFixed(2)} €
      </span>
    </div>
  </div>
))}
          </div>

          {/* Pricing Summary */}
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
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
                {total.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('confirmation.shippingAddress', 'Adresse de livraison')}
              </h2>
            </div>
            <button
              onClick={onEditShipping}
              className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <FontAwesomeIcon icon={faEdit} />
              <span>{t('common.edit', 'Modifier')}</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="space-y-1">
              <div className="font-semibold text-gray-900">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </div>
              <div className="text-gray-700">{shippingAddress.address}</div>
              <div className="text-gray-700">
                {shippingAddress.postalCode} {shippingAddress.city}
              </div>
              <div className="text-gray-700">{shippingAddress.country}</div>
              <div className="text-gray-700">{shippingAddress.phone}</div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="mt-4 flex items-center space-x-3 text-sm">
            <FontAwesomeIcon icon={faTruck} className="text-green-600" />
            <span className="text-gray-600">
              {t('confirmation.estimatedDelivery', 'Livraison estimée le')}
            </span>
            <span className="font-semibold text-gray-900">{getEstimatedDelivery()}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faCreditCard} className="text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('confirmation.paymentMethod', 'Mode de paiement')}
              </h2>
            </div>
            <button
              onClick={onEditPayment}
              className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <FontAwesomeIcon icon={faEdit} />
              <span>{t('common.edit', 'Modifier')}</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-4">
            {paymentMethod === 'card' ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faCreditCard} className="text-gray-600" />
                  <span className="font-semibold text-gray-900">
                    {t('payment.card', 'Carte bancaire')}
                  </span>
                </div>
                <div className="text-gray-600">
                  {formatCardNumber(paymentData.cardNumber)}
                </div>
                <div className="text-gray-600">
                  {paymentData.cardName}
                </div>
                <div className="text-gray-600">
                  {t('payment.expires', 'Expire le')} {paymentData.expiryDate}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
              <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-gray-600" />
                  <span className="font-semibold text-gray-900">
                    {t('payment.other', 'Autre méthode de paiement')}
                  </span>
                </div>
                <div className="text-gray-600">
                  {paymentData.customPaymentMethod}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <input
              id="terms"
              type="checkbox"
              className="mt-0.5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              {t('confirmation.termsAcceptance', 'J\'accepte les')}{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                {t('footer.terms', 'conditions générales de vente')}
              </a>{' '}
              {t('confirmation.and', 'et la')}{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                {t('confirmation.privacy', 'politique de confidentialité')}
              </a>
            </label>
          </div>
        </div>
      </div>

      {/* Final Confirmation */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faCheck} className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t('confirmation.finalStep', 'Dernière étape !')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('confirmation.finalStepDescription', 'Vérifiez toutes les informations ci-dessus et confirmez votre commande.')}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
        >
          {t('common.back', 'Retour')}
        </button>
        
        <button
          onClick={onConfirmOrder}
          disabled={loading}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-3 text-lg font-semibold"
        >
          <FontAwesomeIcon icon={faLock} />
          <span>
            {loading 
              ? t('order.processing', 'Commande en cours...')
              : t('order.confirm', 'Confirmer la commande')
            }
          </span>
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;