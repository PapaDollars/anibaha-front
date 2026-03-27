import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingBag, 
  faArrowLeft,
  faBox,
  faTruck,
  faCheckCircle,
  faTimesCircle,
  faClock
} from '@fortawesome/free-solid-svg-icons';

import { RootState, AppDispatch } from '@/store';
import { fetchUserOrders } from '@/store/slices-test/orderSlice';
import { ROUTES } from '@/utils/url/url_frontend';
import { formatDate } from '@/utils/date';
import type { Order } from '@/types/order';

const Orders: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FontAwesomeIcon icon={faClock} className="text-yellow-500" />;
      case 'processing':
        return <FontAwesomeIcon icon={faBox} className="text-blue-500" />;
      case 'shipped':
        return <FontAwesomeIcon icon={faTruck} className="text-purple-500" />;
      case 'delivered':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'cancelled':
        return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />;
      default:
        return <FontAwesomeIcon icon={faBox} className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="text-red-500 mb-4">
              <FontAwesomeIcon icon={faTimesCircle} className="text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('orders.error', 'Erreur lors du chargement des commandes')}
            </h2>
            <button
              onClick={() => dispatch(fetchUserOrders())}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              {t('common.retry', 'Réessayer')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FontAwesomeIcon icon={faShoppingBag} className="text-gray-400 text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('orders.empty')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('orders.emptyDescription')}
            </p>
            <Link
              to={ROUTES.PUBLIC.CATALOG.PRODUCTS}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <FontAwesomeIcon icon={faShoppingBag} className="mr-3" />
              {t('orders.startShopping')}
            </Link>
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
              to={ROUTES.USER.PROFILE.BASE}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('orders.title')}
              </h1>
              <p className="text-gray-600 mt-1">
                {orders.length} {orders.length === 1 ? t('orders.order', 'commande') : t('orders.orders', 'commandes')}
              </p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order: Order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t('orders.orderNumber', { number: order.id })}
                      </h3>
                      <p className="text-gray-600">
                        {t('orders.orderDate', { date: formatDate(order.createdAt) })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{t('orders.orderStatus')}</p>
                    <p className="font-semibold text-gray-900">
                      {t(`orders.status.${order.status}`)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600">{t('orders.orderTotal')}</p>
                    <p className="font-semibold text-gray-900">
                      {order.totals.total.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(ROUTES.GENERATORS.getOrderDetails(order.id))}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    {t('orders.viewDetails')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders; 