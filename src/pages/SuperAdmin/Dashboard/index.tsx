// src/pages/SuperAdmin/Dashboard/SuperAdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faStore,
  faShoppingBag,
  faMoneyBillWave,
  faExclamationTriangle,
  faCheckCircle,
  faEye,
  faBan,
  faArrowUp,
  faArrowDown,
  faDownload,
  faRefresh,
  faBell,
  faChevronRight,
  faStar,
  faComment,
  faUserCheck,
  faUserTimes,
  faCog,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import SuperAdminSidebar from '@/pages/SuperAdmin/Sidebar';

// Types
interface DashboardStats {
  totalUsers: number;
  totalCompanies: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingApprovals: number;
  monthlyGrowth: {
    users: number;
    companies: number;
    orders: number;
    revenue: number;
  };
}

interface RecentActivity {
  id: string;
  type: 'user' | 'company' | 'order' | 'product' | 'review';
  message: string;
  timestamp: string;
  user?: string;
  severity?: 'info' | 'warning' | 'success' | 'danger';
}

interface TopCompany {
  id: string;
  name: string;
  logo: string;
  revenue: number;
  growth: number;
  status: 'active' | 'pending' | 'suspended';
  orders: number;
  rating: number;
}

interface PendingApproval {
  id: string;
  type: 'company' | 'product';
  name: string;
  submittedBy: string;
  submittedAt: string;
  category?: string;
  priority: 'low' | 'medium' | 'high';
}

// Composant principal
export const SuperAdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  
  // States
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [realtimeData, setRealtimeData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Données simulées
  const dashboardStats: DashboardStats = {
    totalUsers: 25678,
    totalCompanies: 1245,
    totalProducts: 45891,
    totalOrders: 8934,
    totalRevenue: 2847395000,
    pendingApprovals: 23,
    monthlyGrowth: {
      users: 15.2,
      companies: 8.7,
      orders: 23.1,
      revenue: 18.9
    }
  };

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'company',
      message: 'Nouvelle entreprise "BeautyLux Cosmetics" en attente d\'approbation',
      timestamp: '2024-01-15T10:30:00Z',
      user: 'Grace Mballa',
      severity: 'warning'
    },
    {
      id: '2',
      type: 'user',
      message: 'Utilisateur signalé pour activité suspecte',
      timestamp: '2024-01-15T10:15:00Z',
      user: 'Paul Owono',
      severity: 'danger'
    },
    {
      id: '3',
      type: 'order',
      message: 'Commande de 2.8M XAF passée',
      timestamp: '2024-01-15T09:45:00Z',
      user: 'Marie Nguyen',
      severity: 'success'
    },
    {
      id: '4',
      type: 'product',
      message: 'Produit retiré pour violation des règles',
      timestamp: '2024-01-15T09:30:00Z',
      severity: 'warning'
    },
    {
      id: '5',
      type: 'review',
      message: 'Avis inapproprié signalé par la communauté',
      timestamp: '2024-01-15T09:00:00Z',
      severity: 'info'
    },
    {
      id: '6',
      type: 'user',
      message: 'Nouvel utilisateur premium inscrit',
      timestamp: '2024-01-15T08:45:00Z',
      user: 'Sophie Durand',
      severity: 'success'
    },
    {
      id: '7',
      type: 'company',
      message: 'Entreprise suspendue pour non-conformité',
      timestamp: '2024-01-15T08:30:00Z',
      severity: 'danger'
    },
    {
      id: '8',
      type: 'order',
      message: 'Remboursement traité automatiquement',
      timestamp: '2024-01-15T08:15:00Z',
      severity: 'info'
    }
  ];

  const topCompanies: TopCompany[] = [
    {
      id: '1',
      name: 'TechCorp Cameroun',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop',
      revenue: 45000000,
      growth: 23.5,
      status: 'active',
      orders: 1250,
      rating: 4.8
    },
    {
      id: '2',
      name: 'BeautyLux Cosmetics',
      logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=50&h=50&fit=crop',
      revenue: 125000000,
      growth: 45.2,
      status: 'active',
      orders: 2890,
      rating: 4.7
    },
    {
      id: '3',
      name: 'Fashion Hub Africa',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=50&h=50&fit=crop',
      revenue: 18500000,
      growth: -5.1,
      status: 'active',
      orders: 567,
      rating: 4.5
    },
    {
      id: '4',
      name: 'Agro-Business Solutions',
      logo: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=50&h=50&fit=crop',
      revenue: 850000,
      growth: 0,
      status: 'pending',
      orders: 5,
      rating: 0
    },
    {
      id: '5',
      name: 'Digital Marketing Pro',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=50&h=50&fit=crop',
      revenue: 2200000,
      growth: 12.3,
      status: 'active',
      orders: 234,
      rating: 4.6
    },
    {
      id: '6',
      name: 'Eco-Friendly Solutions',
      logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=50&h=50&fit=crop',
      revenue: 1800000,
      growth: 8.7,
      status: 'active',
      orders: 189,
      rating: 4.4
    }
  ];

  const pendingApprovals: PendingApproval[] = [
    {
      id: '1',
      type: 'company',
      name: 'Agro-Business Solutions',
      submittedBy: 'Amadou Diop',
      submittedAt: '2024-01-10T00:00:00Z',
      priority: 'high'
    },
    {
      id: '2',
      type: 'product',
      name: 'Semences de Maïs Hybride',
      submittedBy: 'Agro-Business Solutions',
      submittedAt: '2024-01-12T00:00:00Z',
      category: 'Agriculture',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'company',
      name: 'Tech Innovation Hub',
      submittedBy: 'Samuel Fokou',
      submittedAt: '2024-01-14T00:00:00Z',
      priority: 'low'
    },
    {
      id: '4',
      type: 'product',
      name: 'Application Mobile Banking',
      submittedBy: 'FinTech Solutions',
      submittedAt: '2024-01-13T00:00:00Z',
      category: 'Finance',
      priority: 'high'
    },
    {
      id: '5',
      type: 'company',
      name: 'Green Energy Corp',
      submittedBy: 'Marie Ekotto',
      submittedAt: '2024-01-11T00:00:00Z',
      priority: 'medium'
    }
  ];

  // Fonctions utilitaires
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return faArrowUp;
    if (growth < 0) return faArrowDown;
    return faArrowDown;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-500';
    if (growth < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return faUsers;
      case 'company': return faStore;
      case 'order': return faShoppingBag;
      case 'product': return faShoppingBag;
      case 'review': return faComment;
      default: return faBell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    console.log(`${action} approval:`, id);
  };

  // Simulations temps réel
  useEffect(() => {
    if (realtimeData) {
      const interval = setInterval(() => {
        console.log('Mise à jour des données en temps réel');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [realtimeData]);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex overflow-hidden">
      
      {/* Contenu Principal */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-20' : ''
      }`}>
        
        {/* Header Fixe du Contenu Principal */}
        <div className="flex-shrink-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm z-40">
          <div className="px-6 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Tableau de Bord
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Vue d'ensemble de la plateforme AfriCommerce
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                {/* Période de temps */}
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                >
                  <option value="24h">Dernières 24h</option>
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">3 derniers mois</option>
                </select>

                {/* Bouton de rafraîchissement */}
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 text-sm"
                >
                  <FontAwesomeIcon 
                    icon={faRefresh} 
                    className={`${refreshing ? 'animate-spin' : ''}`} 
                  />
                  <span className="hidden sm:inline">Actualiser</span>
                </button>

                {/* Toggle temps réel */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 hidden sm:inline">Temps réel</span>
                  <button
                    onClick={() => setRealtimeData(!realtimeData)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      realtimeData ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        realtimeData ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            
          </div>
        </div>

        {/* Contenu Scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">

{/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Utilisateurs Totaux',
                  value: formatNumber(dashboardStats.totalUsers),
                  growth: dashboardStats.monthlyGrowth.users,
                  icon: faUsers,
                  color: 'from-blue-500 to-blue-600',
                  link: '/super-admin/users'
                },
                {
                  title: 'Entreprises',
                  value: formatNumber(dashboardStats.totalCompanies),
                  growth: dashboardStats.monthlyGrowth.companies,
                  icon: faStore,
                  color: 'from-green-500 to-green-600',
                  link: '/super-admin/companies'
                },
                {
                  title: 'Commandes',
                  value: formatNumber(dashboardStats.totalOrders),
                  growth: dashboardStats.monthlyGrowth.orders,
                  icon: faShoppingBag,
                  color: 'from-purple-500 to-purple-600',
                  link: '/super-admin/orders'
                },
                {
                  title: 'Revenus',
                  value: formatCurrency(dashboardStats.totalRevenue).replace('XAF', '').trim() + ' XAF',
                  growth: dashboardStats.monthlyGrowth.revenue,
                  icon: faMoneyBillWave,
                  color: 'from-orange-500 to-orange-600',
                  link: '/super-admin/finance'
                }
              ].map((stat, index) => (
                <Link
                  key={index}
                  to={stat.link}
                  className="group relative bg-white rounded-xl my-4 p-4 border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                      <div className={`flex items-center space-x-1 ${getGrowthColor(stat.growth)}`}>
                        <FontAwesomeIcon 
                          icon={getGrowthIcon(stat.growth)} 
                          className="text-sm" 
                        />
                        <span className="text-sm font-medium">
                          {Math.abs(stat.growth)}% ce mois
                        </span>
                      </div>
                    </div>
                    
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <FontAwesomeIcon icon={stat.icon} className="text-white text-xl" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Alertes */}
            {dashboardStats.pendingApprovals > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-r-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-600 text-xl" />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800">
                        {dashboardStats.pendingApprovals} approbations en attente
                      </h3>
                      <p className="text-yellow-700">
                        Des entreprises et produits nécessitent votre attention
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/super-admin/approvals"
                    className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                  >
                    Examiner
                  </Link>
                </div>
              </div>
            )}

            {/* Layout Principal avec Contenus à Headers Fixes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Activités Récentes avec Header Fixe */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg h-96 flex flex-col">
                {/* Header Fixe */}
                <div className="flex-shrink-0 p-6 border-b border-gray-100 bg-white rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Activités Récentes</h2>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${realtimeData ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
                      <span className="text-sm text-gray-500">
                        {realtimeData ? 'En direct' : 'Statique'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Contenu Scrollable */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-6 space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.severity === 'success' ? 'bg-green-100' :
                          activity.severity === 'warning' ? 'bg-yellow-100' :
                          activity.severity === 'danger' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <FontAwesomeIcon 
                            icon={getActivityIcon(activity.type)} 
                            className={`text-sm ${
                              activity.severity === 'success' ? 'text-green-600' :
                              activity.severity === 'warning' ? 'text-yellow-600' :
                              activity.severity === 'danger' ? 'text-red-600' : 'text-blue-600'
                            }`}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 font-medium text-sm">{activity.message}</p>
                          {activity.user && (
                            <p className="text-sm text-gray-500">Par: {activity.user}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(activity.timestamp).toLocaleString('fr-FR')}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          {activity.severity === 'danger' && (
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                              <FontAwesomeIcon icon={faBan} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Footer Fixe */}
                <div className="flex-shrink-0 p-6 border-t border-gray-100 text-center bg-white rounded-b-2xl">
                  <Link
                    to="/super-admin/activities"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Voir toutes les activités
                  </Link>
                </div>
              </div>

              {/* Sidebar Droite avec Contenus à Headers Fixes */}
              <div className="space-y-6">
                
                {/* Approbations en Attente */}
                <div className="bg-white rounded-2xl shadow-lg h-80 flex flex-col">
                  {/* Header Fixe */}
                  <div className="flex-shrink-0 p-6 border-b border-gray-100 bg-white rounded-t-2xl">
                    <h3 className="text-lg font-bold text-gray-900">Approbations Requises</h3>
                  </div>
                  
                  {/* Contenu Scrollable */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-4">
                      {pendingApprovals.map((approval) => (
                        <div key={approval.id} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1 flex-wrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  approval.type === 'company' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                }`}>
                                  {approval.type === 'company' ? 'Entreprise' : 'Produit'}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(approval.priority)}`}>
                                  {approval.priority}
                                </span>
                              </div>
                              <h4 className="font-semibold text-gray-900 text-sm">{approval.name}</h4>
                              <p className="text-xs text-gray-500">Par: {approval.submittedBy}</p>
                              <p className="text-xs text-gray-400">
                                {new Date(approval.submittedAt).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-3">
                            <button
                              onClick={() => handleApproval(approval.id, 'approve')}
                              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                              Approuver
                            </button>
                            <button
                              onClick={() => handleApproval(approval.id, 'reject')}
                              className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                              <FontAwesomeIcon icon={faBan} className="mr-1" />
                              Rejeter
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Footer Fixe */}
                  <div className="flex-shrink-0 p-6 border-t border-gray-100 text-center bg-white rounded-b-2xl">
                    <Link
                      to="/super-admin/approvals"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Voir toutes ({dashboardStats.pendingApprovals})
                    </Link>
                  </div>
                </div>

                {/* Top Entreprises */}
                <div className="bg-white rounded-2xl shadow-lg h-80 flex flex-col">
                  {/* Header Fixe */}
                  <div className="flex-shrink-0 p-6 border-b border-gray-100 bg-white rounded-t-2xl">
                    <h3 className="text-lg font-bold text-gray-900">Top Entreprises</h3>
                  </div>
                  
                  {/* Contenu Scrollable */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-4">
                      {topCompanies.map((company, index) => (
                        <div key={company.id} className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              src={company.logo}
                              alt={company.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {company.name}
                              </p>
                              {company.status === 'active' && (
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xs" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500">
                                {formatCurrency(company.revenue)}
                              </span>
                              <div className={`flex items-center space-x-1 ${getGrowthColor(company.growth)}`}>
                                <FontAwesomeIcon icon={getGrowthIcon(company.growth)} className="text-xs" />
                                <span className="text-xs">{Math.abs(company.growth)}%</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-semibold text-gray-900">#{index + 1}</div>
                            <div className="flex items-center space-x-1">
                              <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
                              <span className="text-xs text-gray-500">{company.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Footer Fixe */}
                  <div className="flex-shrink-0 p-6 border-t border-gray-100 text-center bg-white rounded-b-2xl">
                    <Link
                      to="/super-admin/companies"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Voir toutes les entreprises
                    </Link>
                  </div>
                </div>

                {/* Actions Rapides */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Actions Rapides</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { 
                        label: 'Nouvel Admin', 
                        icon: faUserCheck, 
                        color: 'bg-blue-500 hover:bg-blue-600',
                        link: '/super-admin/users/create'
                      },
                      { 
                        label: 'Bannir Utilisateur', 
                        icon: faUserTimes, 
                        color: 'bg-red-500 hover:bg-red-600',
                        link: '/super-admin/users?action=ban'
                      },
                      { 
                        label: 'Rapports', 
                        icon: faDownload, 
                        color: 'bg-green-500 hover:bg-green-600',
                        link: '/super-admin/reports'
                      },
                      { 
                        label: 'Paramètres', 
                        icon: faCog, 
                        color: 'bg-purple-500 hover:bg-purple-600',
                        link: '/super-admin/settings'
                      }
                    ].map((action, index) => (
                      <Link
                        key={index}
                        to={action.link}
                        className={`${action.color} text-white p-4 rounded-xl text-center transition-colors group`}
                      >
                        <FontAwesomeIcon 
                          icon={action.icon} 
                          className="text-xl mb-2 group-hover:scale-110 transition-transform" 
                        />
                        <p className="text-xs font-medium">{action.label}</p>
                      </Link>
                    ))}
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

export default SuperAdminDashboard;