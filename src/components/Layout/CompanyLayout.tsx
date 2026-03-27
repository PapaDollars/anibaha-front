
// components/Layouts/CompanyLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartBar, faBox, faShoppingCart, faCog, faHome, faSignOutAlt,
  faBars, faTimes, faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState, AppDispatch } from '@/store';
import { logout } from '@/store/slices-test/authSlice';
import { ROUTES } from '@/utils/url/url_frontend';

const CompanyLayout: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success(t('auth.logoutSuccess', 'Déconnexion réussie'));
    navigate(ROUTES.PUBLIC.HOME);
  };

  const companyNavItems = [
    {
      label: t('company.dashboard.title', 'Tableau de bord'),
      path: ROUTES.COMPANY.DASHBOARD.BASE,
      icon: faChartBar,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      label: t('company.products.title', 'Produits'),
      path: ROUTES.COMPANY.PRODUCTS.LIST,
      icon: faBox,
      gradient: 'from-green-500 to-green-600'
    },
    {
      label: t('company.orders.title', 'Commandes'),
      path: ROUTES.COMPANY.ORDERS.LIST,
      icon: faShoppingCart,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      label: t('company.settings.title', 'Paramètres'),
      path: ROUTES.COMPANY.SETTINGS.GENERAL,
      icon: faCog,
      gradient: 'from-gray-500 to-gray-600'
    }
  ];

  const isActiveRoute = (path: string) => {
    if (path === ROUTES.COMPANY.DASHBOARD.BASE) {
      return location.pathname === '/company' || location.pathname === '/company/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} className="text-gray-600" />
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-start h-16 px-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faUserCircle} className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">ANIBAHA</h1>
                <p className="text-blue-100 text-xs">Entreprise</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 space-y-2 overflow-y-auto">
            {companyNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 rounded-lg transition-all duration-300 group
                  ${isActiveRoute(item.path)
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1'
                  }
                `}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors ${
                  isActiveRoute(item.path)
                    ? 'bg-white/20'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                }`}>
                  <FontAwesomeIcon icon={item.icon} className="text-sm" />
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                  {t('company.administrator', 'Gestionnaire')}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Link
                to={ROUTES.PUBLIC.HOME}
                className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-3" />
                <span className="text-sm font-medium">{t('company.backToSite', 'Retour au site')}</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-3" />
                <span className="text-sm font-medium">{t('auth.logout', 'Déconnexion')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar for Mobile */}
        <div className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <h1 className="text-lg font-semibold text-gray-900">
            {companyNavItems.find(item => isActiveRoute(item.path))?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.firstName?.[0]}
              </span>
            </div>
          </div>
        </div>

        <main className="p-4 lg:p-8">
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default CompanyLayout;