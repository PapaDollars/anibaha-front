import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faSearch,
  faShoppingCart,
  faCalendar,
  faEuroSign,
  faCheckCircle,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState, AppDispatch } from '@/store';
import { fetchOrders, updateOrderStatus } from '@/store/slices/orderSlice';
import { ROUTES } from '@/utils/url/url_frontend';

const AdminOrders: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.order);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await dispatch(updateOrderStatus({ id: orderId, status: newStatus })).unwrap();
      toast.success(`Statut mis à jour : ${newStatus}`);
    } catch {
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const statusLabels = {
      pending: t('admin.orders.status.pending'),
      processing: t('admin.orders.status.processing'),
      completed: t('admin.orders.status.completed'),
      cancelled: t('admin.orders.status.cancelled')
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}>
        {statusLabels[status as keyof typeof statusLabels] || status}
      </span>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${order.user?.firstName} ${order.user?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user?.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totals?.total ?? 0), 0);
  const completedOrders = orders.filter(order => order.status === 'delivered').length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const processingOrders = orders.filter(order => order.status === 'processing').length;
  const completedRevenue = orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + (order.totals?.total ?? 0), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{t('admin.orders.loadError', 'Erreur lors du chargement des commandes')}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('admin.orders.title', 'Gestion des commandes')}
        </h1>
        <p className="text-gray-600">
          {t('admin.orders.description', 'Gérez et suivez toutes les commandes')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faShoppingCart} className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t('admin.orders.totalOrders', 'Total commandes')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faCalendar} className="text-yellow-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t('admin.orders.pendingOrders', 'En attente')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faShoppingCart} className="text-orange-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t('admin.orders.processingOrders', 'En cours')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{processingOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t('admin.orders.completedOrders', 'Terminées')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faEuroSign} className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t('admin.orders.completedRevenue', 'CA terminées')}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {completedRevenue.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder={t('admin.orders.searchPlaceholder', 'Rechercher par ID, client, email...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="lg:w-64">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('admin.orders.allStatuses')}</option>
              <option value="pending">{t('admin.orders.status.pending')}</option>
              <option value="processing">{t('admin.orders.status.processing')}</option>
              <option value="completed">{t('admin.orders.status.completed')}</option>
              <option value="cancelled">{t('admin.orders.status.cancelled')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.orders.orderId', 'ID Commande')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.orders.customer', 'Client')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.orders.date', 'Date')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.orders.total', 'Total')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.orders.status.title', 'Statut')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.actions', 'Actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{order.id.slice(-6)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.user?.firstName ?? ''} {order.user?.lastName ?? ''}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.user?.email ?? ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {(order.totals?.total ?? 0).toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative inline-block">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="appearance-none pl-3 pr-8 py-1.5 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer bg-transparent"
                          style={{ backgroundImage: 'none' }}
                        >
                          <option value="pending">En attente</option>
                          <option value="processing">En cours</option>
                          <option value="shipped">Expédiée</option>
                          <option value="delivered">Livrée</option>
                          <option value="cancelled">Annulée</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
                          <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
                        </div>
                        <div className={`absolute inset-0 rounded-full -z-10 ${
                          order.status === 'delivered'  ? 'bg-green-100'  :
                          order.status === 'shipped'    ? 'bg-purple-100' :
                          order.status === 'processing' ? 'bg-blue-100'   :
                          order.status === 'cancelled'  ? 'bg-red-100'    : 'bg-yellow-100'
                        }`} />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={ROUTES.GENERATORS.getCompanyOrderDetails(order.id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        {t('common.view', 'Voir')}
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <FontAwesomeIcon icon={faShoppingCart} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        {t('admin.orders.noOrders', 'Aucune commande')}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {t('admin.orders.noOrdersDescription', 'Aucune commande ne correspond aux critères de recherche.')}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;