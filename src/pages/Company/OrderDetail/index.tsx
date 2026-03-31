import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { RootState, AppDispatch } from '@/store';
import { fetchOrderById } from '@/store/slices/orderSlice';
import OrderStatus from '@/components/common/OrderStatus';
import ShippingInfo from '@/components/common/ShippingInfo';
import PaymentInfo from '@/components/common/PaymentInfo';

const AdminOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const { selectedOrder: order, loading, error } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center text-red-600">
        {t('admin.orders.loadError', 'Erreur lors du chargement de la commande')}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('admin.orders.orderId', 'Commande')} #{order.orderNumber}
            </h1>
            <p className="text-gray-600">
              {new Date(order.createdAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
        <OrderStatus status={order.status} />
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t('admin.orders.customerInfo', 'Informations client')}
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">{t('admin.users.firstName', 'Prénom')}</p>
              <p className="font-medium">{order.user?.firstName ?? ''}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('admin.users.lastName', 'Nom')}</p>
              <p className="font-medium">{order.user?.lastName ?? ''}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('admin.users.email', 'Email')}</p>
              <p className="font-medium">{order.user?.email ?? ''}</p>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <ShippingInfo address={order.shippingAddress} />
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <PaymentInfo method={order.payment?.method ?? ''} total={order.totals?.total ?? 0} />
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('admin.orders.items', 'Articles commandés')}
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={item.product?.images?.[0]?.url || ''}
                  alt={item.product?.name || ''}
                  className="w-16 h-16 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.png';
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.product?.name || ''}</h3>
                  <p className="text-sm text-gray-600">
                    {t('order.quantity', 'Quantité')}: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('order.each', 'Prix unitaire')}: {(item.product?.price ?? 0).toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {((item.product?.price ?? 0) * item.quantity).toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail; 