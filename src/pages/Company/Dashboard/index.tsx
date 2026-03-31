import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, faBox, faUsers, faArrowTrendUp,
  faArrowUp, faArrowDown, faEye, faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '@/store';
// ✅ Imports depuis slices/ (plus slices-test/)
import { fetchProducts } from '@/store/slices/productSlice';
// orderSlice et userSlice seront ajoutés plus tard
// import { fetchOrders } from '@/store/slices/orderSlice';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  // ✅ Produits depuis le store branché sur l'API
  const { products } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);

  // Commandes et users seront chargés quand les slices seront créés
  const orders: any[] = [];
  const users: any[] = [];

  useEffect(() => {
    dispatch(fetchProducts({ companyId: user?.companyId } as any));
  }, [dispatch, user]);

  const totalRevenue   = orders.reduce((sum, o) => sum + (o.total ?? 0), 0);
  const totalOrders    = orders.length;
  const totalProducts  = products.length;
  const totalUsers     = users.length;
  const recentOrders   = orders.slice(0, 5);
  const topProducts    = products.slice(0, 5);

  const stats = [
    { title: t('admin.dashboard.totalOrders'),   value: totalOrders.toString(),  change: '+8.2%',  isPositive: true,  icon: faShoppingCart, color: 'blue'   },
    { title: t('admin.dashboard.totalUsers'),    value: totalUsers.toString(),   change: '+15.7%', isPositive: true,  icon: faUsers,        color: 'green'  },
    { title: t('admin.dashboard.totalProducts'), value: totalProducts.toString(),change: '-3.1%',  isPositive: false, icon: faBox,          color: 'purple' },
    {
      title: t('admin.dashboard.revenue'),
      value: totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'XAF' }),
      change: '+15.3%', isPositive: true, icon: faChartLine, color: 'orange'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Livrée';
      case 'processing': return 'En cours';
      case 'pending': return 'En attente';
      default: return 'Annulée';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Vue d'ensemble
          </h1>
          <p className="text-gray-600 mt-2">Suivez les performances de votre boutique en temps réel</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600 font-medium">Données en temps réel</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}>
                <FontAwesomeIcon icon={stat.icon} className={`text-${stat.color}-500 text-xl`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <FontAwesomeIcon icon={stat.isPositive ? faArrowUp : faArrowDown} className={`text-sm ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm font-medium ml-1 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
              <span className="text-sm text-gray-500 ml-2">{t('admin.dashboard.vsLastMonth')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Commandes récentes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Commandes récentes</h2>
            </div>
            <div className="overflow-x-auto">
              {recentOrders.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <FontAwesomeIcon icon={faShoppingCart} className="text-4xl mb-4 text-gray-300" />
                  <p>Aucune commande pour le moment</p>
                </div>
              ) : (
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Commande</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Client</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Total</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <p className="font-semibold text-gray-900">#{order.orderNumber}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-gray-900">{order.user?.email ?? 'Client inconnu'}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-bold text-gray-900">
                            {(order.total ?? 0).toLocaleString('fr-FR')} XAF
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Top produits */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Mes produits</h2>
                <FontAwesomeIcon icon={faArrowTrendUp} className="text-emerald-500" />
              </div>
            </div>
            <div className="p-6 space-y-4">
              {topProducts.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <FontAwesomeIcon icon={faBox} className="text-4xl mb-4 text-gray-300" />
                  <p>Aucun produit</p>
                </div>
              ) : (
                topProducts.map((product, i) => (
                  <div key={product.id} className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="relative">
                      <img
                        src={(product as any).images?.[0]?.url || '/placeholder.png'}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-xl shadow-sm"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm font-bold text-emerald-600">
                        {product.price.toLocaleString('fr-FR')} XAF
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;