import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { RootState, AppDispatch } from '@/store';
import { fetchOrderById } from '@/store/slices-test/orderSlice';
import { ROUTES } from '@/utils/url/url_frontend';
import OrderStatus from '@/components/common/OrderStatus';
import ShippingInfo from '@/components/common/ShippingInfo'; 
import PaymentInfo from '@/components/common/PaymentInfo';

const OrderDetail: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { currentOrder: order, loading, error } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

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

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('orders.notFound', 'Commande non trouvée')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('orders.notFoundDescription', 'La commande que vous recherchez n\'existe pas ou a été supprimée.')}
            </p>
            <button
              onClick={() => navigate(ROUTES.USER.ORDERS.LIST)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>{t('navigation.backToOrders', 'Retour aux commandes')}</span>
            </button>
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
              to={ROUTES.USER.ORDERS.LIST}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('orders.details.title', 'Détails de la commande')}
              </h1>
              <p className="text-gray-600 mt-1">
                {t('orders.orderNumber', 'Commande')} #{order.orderNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <OrderStatus status={order.status} className="text-xl" />
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <ShippingInfo address={order.shippingAddress} />
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <PaymentInfo method={order.payment.method} total={order.totals?.total ?? 0} />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {t('orders.details.orderItems', 'Articles commandés')}
              </h3>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.product?.images[0].url}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder.png';
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.product?.name}</h4>
                      <p className="text-sm text-gray-500">
                        {t('orders.details.quantity', 'Quantité')}: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t('orders.details.price', 'Prix')}: {item.product?.price.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {item.product?.price && (item.product.price * item.quantity).toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('orders.details.subtotal', 'Sous-total')}</span>
                    <span>
                      {(order.totals?.total ?? 0).toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t('orders.details.shipping', 'Livraison')}</span>
                    <span>5.99 €</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
                    <span>{t('orders.details.total', 'Total')}</span>
                    <span>
                      {(order.totals?.total ?? 0 + 5.99).toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail; 