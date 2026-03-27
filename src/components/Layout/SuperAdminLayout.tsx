
// components/Layouts/SuperAdminLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faTimes, faTachometerAlt, faUsers, faStore, faShoppingBag,
  faClipboardCheck, faChartBar, faCog, faUserShield, faExclamationTriangle,
  faBell, faFileAlt, faChevronLeft, faChevronRight, faSignOutAlt, faHome,
  faSearch, faBox, faTags, faFlag, faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { RootState, AppDispatch } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { ROUTES } from '@/utils/url/url_frontend';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  badge?: number;
  submenu?: MenuItem[];
}

const SuperAdminLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
   const dispatch = useDispatch<AppDispatch>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success(t('auth.logoutSuccess', 'Déconnexion réussie'));
    navigate(ROUTES.PUBLIC.HOME);
  };



  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: t('superAdmin.nav.dashboard', 'Tableau de Bord'),
      icon: faTachometerAlt,
      path: ROUTES.SUPER_ADMIN.DASHBOARD.BASE
    },
    {
      id: 'approvals',
      label: t('superAdmin.nav.approvals', 'Approbations'),
      icon: faClipboardCheck,
      path: ROUTES.SUPER_ADMIN.COMPANIES.APPROVED,
      badge: 23
    },
    {
      id: 'brands',
      label: t('superAdmin.nav.brands', 'Marques'),
      icon: faStore,
      path: ROUTES.SUPER_ADMIN.COMPANIES.LIST,
      badge: 12,
      submenu: [
        { id: 'all-brands', label: 'Toutes les marques', icon: faStore, path: ROUTES.SUPER_ADMIN.COMPANIES.LIST },
        { id: 'pending-approval', label: 'En attente', icon: faClipboardCheck, path: ROUTES.SUPER_ADMIN.COMPANIES.PENDING_APPROVAL },
        { id: 'verified', label: 'Vérifiées', icon: faClipboardCheck, path: ROUTES.SUPER_ADMIN.COMPANIES.VERIFIED }
      ]
    },
    {
      id: 'users',
      label: t('superAdmin.nav.users', 'Utilisateurs'),
      icon: faUsers,
      path: ROUTES.SUPER_ADMIN.USERS.LIST,
      badge: 3,
      submenu: [
        { id: 'all-users', label: 'Tous les utilisateurs', icon: faUsers, path: ROUTES.SUPER_ADMIN.USERS.LIST },
        { id: 'admins', label: 'Administrateurs', icon: faUserShield, path: ROUTES.SUPER_ADMIN.USERS.ADMINS },
        { id: 'suspended', label: 'Suspendus', icon: faExclamationTriangle, path: ROUTES.SUPER_ADMIN.USERS.SUSPENDED }
      ]
    },
    {
      id: 'orders',
      label: t('superAdmin.nav.orders', 'Commandes'),
      icon: faShoppingBag,
      path: ROUTES.SUPER_ADMIN.ORDERS.LIST,
      submenu: [
        { id: 'all-orders', label: 'Toutes les commandes', icon: faShoppingBag, path: ROUTES.SUPER_ADMIN.ORDERS.LIST },
        { id: 'disputes', label: 'Litiges', icon: faExclamationTriangle, path: ROUTES.SUPER_ADMIN.ORDERS.DISPUTES }
      ]
    },
    {
      id: 'products',
      label: t('superAdmin.nav.products', 'Produits'),
      icon: faBox,
      path: ROUTES.SUPER_ADMIN.PRODUCTS.LIST,
      submenu: [
        { id: 'all-products', label: 'Tous les produits', icon: faBox, path: ROUTES.SUPER_ADMIN.PRODUCTS.LIST },
        { id: 'categories', label: 'Catégories', icon: faTags, path: ROUTES.SUPER_ADMIN.PRODUCTS.CATEGORIES },
        { id: 'reported', label: 'Signalés', icon: faFlag, path: ROUTES.SUPER_ADMIN.PRODUCTS.REPORTED }
      ]
    },
    {
      id: 'notifications',
      label: t('superAdmin.nav.notifications', 'Notifications'),
      icon: faBell,
      path: ROUTES.SUPER_ADMIN.NOTIFICATIONS,
      badge: 15
    },
    {
      id: 'reports',
      label: t('superAdmin.nav.analytics', 'Reports'),
      icon: faChartBar,
      path: ROUTES.SUPER_ADMIN.DASHBOARD.REPORTS,
      submenu: [
        { id: 'reports', label: 'Rapports', icon: faFileAlt, path: ROUTES.SUPER_ADMIN.DASHBOARD.REPORTS },
        { id: 'performance', label: 'Performance', icon: faChartBar, path: ROUTES.SUPER_ADMIN.DASHBOARD.REPORTS },
        { id: 'overview', label: "Vue d'ensemble", icon: faMoneyBillWave, path: ROUTES.SUPER_ADMIN.REPORTS.OVERVIEW },
        { id: 'commissions', label: 'Commissions', icon: faChartBar, path: ROUTES.SUPER_ADMIN.REPORTS.COMMISSIONS },
        { id: 'payouts', label: 'Paiements', icon: faMoneyBillWave, path: ROUTES.SUPER_ADMIN.REPORTS.PAYOUTS },
        { id: 'taxes', label: 'Taxes', icon: faChartBar, path: ROUTES.SUPER_ADMIN.REPORTS.TAXES },
        { id: 'finance-reports', label: 'Rapports', icon: faFileAlt, path: ROUTES.SUPER_ADMIN.REPORTS.REPORTS_FINANCE }
      ]
    },
    {
      id: 'settings',
      label: t('superAdmin.nav.settings', 'Paramètres'),
      icon: faCog,
      path: ROUTES.SUPER_ADMIN.SYSTEM.SETTINGS
    }
  ];

  const toggleSubmenu = (menuId: string) => {
    if (isCollapsed) return;
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isParentActive = (item: MenuItem) => {
    if (isActive(item.path)) return true;
    if (item.submenu) {
      return item.submenu.some(subItem => isActive(subItem.path));
    }
    return false;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} className="w-6 h-6" />
        </button>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)} />
            <div className="relative flex flex-col h-full w-72 bg-white shadow-2xl">
              {/* Mobile Header */}
              <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faStore} className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-lg"></h1>
                    <p className="text-blue-100 text-xs">SuperAdmin</p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 overflow-y-auto py-2">
                <nav className="space-y-1 px-2">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      <div
                        className={`relative flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer group ${
                          isParentActive(item)
                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={() => item.submenu ? toggleSubmenu(item.id) : handleNavigation(item.path)}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            isParentActive(item)
                              ? 'bg-blue-200 text-blue-700'
                              : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                          }`}>
                            <FontAwesomeIcon icon={item.icon} className="text-sm" />
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              isParentActive(item)
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          {item.submenu && (
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className={`text-xs transition-transform duration-200 ${
                                expandedMenus.includes(item.id) ? 'rotate-90' : ''
                              }`}
                            />
                          )}
                        </div>
                        {isParentActive(item) && (
                          <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-r-full"></div>
                        )}
                      </div>

                      {item.submenu && expandedMenus.includes(item.id) && (
                        <div className="ml-6 mt-2 space-y-1">
                          {item.submenu.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={() => handleNavigation(subItem.path)}
                              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 w-full ${
                                isActive(subItem.path)
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isActive(subItem.path)
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-gray-100 text-gray-400'
                              }`}>
                                <FontAwesomeIcon icon={subItem.icon} className="text-xs" />
                              </div>
                              <span className="text-sm">{subItem.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Mobile Footer */}
              <div className="border-t border-gray-200 p-4">
                <Link
                  to={ROUTES.PUBLIC.HOME}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors mb-2"
                >
                  <FontAwesomeIcon icon={faHome} className="text-sm" />
                  <span className="text-sm font-medium">{t('admin.backToSite', 'Retour au site')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-sm" />
                  <span className="text-sm font-medium">{t('common.logout', 'Déconnexion')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className={`relative overflow-hidden h-full bg-white shadow-2xl border-r border-gray-200 z-50 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}>
          {/* Desktop Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faStore} className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg">ANIBAHA</h1>
                  <p className="text-blue-100 text-xs">SuperAdmin</p>
                </div>
              </div>
            )}

            {isCollapsed && (
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto">
                <FontAwesomeIcon icon={faStore} className="text-blue-600 text-xl" />
              </div>
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white hover:bg-blue-500 p-2 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
            </button>
          </div>

          {/* User Profile */}
          {!isCollapsed && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-semibold truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-gray-500 text-sm truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <nav className="space-y-1 px-2">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className={`relative flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer group ${
                        isParentActive(item)
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => item.submenu ? toggleSubmenu(item.id) : handleNavigation(item.path)}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isParentActive(item)
                            ? 'bg-blue-200 text-blue-700'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                        }`}>
                          <FontAwesomeIcon icon={item.icon} className="text-sm" />
                        </div>
                        {!isCollapsed && <span className="font-medium">{item.label}</span>}
                      </div>

                      {!isCollapsed && (
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              isParentActive(item)
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          {item.submenu && (
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className={`text-xs transition-transform duration-200 ${
                                expandedMenus.includes(item.id) ? 'rotate-90' : ''
                              }`}
                            />
                          )}
                        </div>
                      )}

                      {isParentActive(item) && (
                        <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-r-full"></div>
                      )}
                    </div>

                    {item.submenu && !isCollapsed && expandedMenus.includes(item.id) && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavigation(subItem.path)}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 w-full ${
                              isActive(subItem.path)
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isActive(subItem.path)
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              <FontAwesomeIcon icon={subItem.icon} className="text-xs" />
                            </div>
                            <span className="text-sm">{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="border-t border-gray-200 p-4 mt-6">
            {!isCollapsed ? (
              <div className="space-y-2">
                <Link
                  to={ROUTES.PUBLIC.HOME}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faHome} className="text-sm" />
                  <span className="text-sm font-medium">{t('admin.backToSite', 'Retour au site')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-sm" />
                  <span className="text-sm font-medium">{t('common.logout', 'Déconnexion')}</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to={ROUTES.PUBLIC.HOME}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors mx-auto"
                >
                  <FontAwesomeIcon icon={faHome} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors mx-auto"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;