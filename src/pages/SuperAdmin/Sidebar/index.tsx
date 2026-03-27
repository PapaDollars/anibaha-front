// src/components/SuperAdmin/Sidebar/SuperAdminSidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faStore,
  faShoppingBag,
  faMoneyBillWave,
  faClipboardCheck,
  faChartBar,
  faCog,
  faUserShield,
  faExclamationTriangle,
  faBell,
  faHeadset,
  faFileAlt,
  faChevronLeft,
  faChevronRight,
  faSignOutAlt,
  faUserCircle,
  faSearch,
  faShoppingCart,
  faBox,
  faTags,
  faComments,
  faFlag
} from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  badge?: number;
  submenu?: MenuItem[];
}

interface SuperAdminSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({
  isCollapsed = false,
  onToggle
}) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Tableau de Bord',
      icon: faTachometerAlt,
      path: '/super-admin/dashboard'
    },
    {
      id: 'users',
      label: 'Utilisateurs',
      icon: faUsers,
      path: '/super-admin/users',
      badge: 3,
      submenu: [
        { id: 'all-users', label: 'Tous les utilisateurs', icon: faUsers, path: '/super-admin/users' },
        { id: 'admins', label: 'Administrateurs', icon: faUserShield, path: '/super-admin/users/admins' },
        { id: 'suspended', label: 'Suspendus', icon: faExclamationTriangle, path: '/super-admin/users/suspended' }
      ]
    },
    {
      id: 'companies',
      label: 'Entreprises',
      icon: faStore,
      path: '/super-admin/companies',
      badge: 12,
      submenu: [
        { id: 'all-companies', label: 'Toutes les entreprises', icon: faStore, path: '/super-admin/companies' },
        { id: 'pending-approval', label: 'En attente', icon: faClipboardCheck, path: '/super-admin/companies/pending' },
        { id: 'verified', label: 'Vérifiées', icon: faClipboardCheck, path: '/super-admin/companies/verified' }
      ]
    },
    {
      id: 'products',
      label: 'Produits',
      icon: faBox,
      path: '/super-admin/products',
      submenu: [
        { id: 'all-products', label: 'Tous les produits', icon: faBox, path: '/super-admin/products' },
        { id: 'categories', label: 'Catégories', icon: faTags, path: '/super-admin/products/categories' },
        { id: 'reported', label: 'Signalés', icon: faFlag, path: '/super-admin/products/reported' }
      ]
    },
    {
      id: 'orders',
      label: 'Commandes',
      icon: faShoppingBag,
      path: '/super-admin/orders',
      submenu: [
        { id: 'all-orders', label: 'Toutes les commandes', icon: faShoppingBag, path: '/super-admin/orders' },
        { id: 'pending-orders', label: 'En attente', icon: faShoppingCart, path: '/super-admin/orders/pending' },
        { id: 'disputes', label: 'Litiges', icon: faExclamationTriangle, path: '/super-admin/orders/disputes' }
      ]
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: faMoneyBillWave,
      path: '/super-admin/finance',
      submenu: [
        { id: 'revenue', label: 'Revenus', icon: faMoneyBillWave, path: '/super-admin/finance/revenue' },
        { id: 'transactions', label: 'Transactions', icon: faFileAlt, path: '/super-admin/finance/transactions' },
        { id: 'commissions', label: 'Commissions', icon: faChartBar, path: '/super-admin/finance/commissions' }
      ]
    },
    {
      id: 'approvals',
      label: 'Approbations',
      icon: faClipboardCheck,
      path: '/super-admin/approvals',
      badge: 23
    },
    {
      id: 'analytics',
      label: 'Analyses',
      icon: faChartBar,
      path: '/super-admin/analytics',
      submenu: [
        { id: 'reports', label: 'Rapports', icon: faFileAlt, path: '/super-admin/analytics/reports' },
        { id: 'performance', label: 'Performance', icon: faChartBar, path: '/super-admin/analytics/performance' }
      ]
    },
    {
      id: 'support',
      label: 'Support',
      icon: faHeadset,
      path: '/super-admin/support',
      badge: 7,
      submenu: [
        { id: 'tickets', label: 'Tickets', icon: faHeadset, path: '/super-admin/support/tickets' },
        { id: 'reviews', label: 'Avis & Commentaires', icon: faComments, path: '/super-admin/support/reviews' }
      ]
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: faBell,
      path: '/super-admin/notifications',
      badge: 15
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: faCog,
      path: '/super-admin/settings',
      submenu: [
        { id: 'general', label: 'Général', icon: faCog, path: '/super-admin/settings/general' },
        { id: 'security', label: 'Sécurité', icon: faUserShield, path: '/super-admin/settings/security' },
        { id: 'system', label: 'Système', icon: faCog, path: '/super-admin/settings/system' }
      ]
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

  return (
    <div className={`relative overflow-hidden left-0 top-0 h-full bg-white shadow-2xl border-r border-gray-200 z-50 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-72'
    }`}>
      
      {/* Header du Sidebar */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-primary-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faStore} className="text-primary-600 text-xl" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">AfriCommerce</h1>
              <p className="text-primary-100 text-xs">SuperAdmin</p>
            </div>
          </div>
        )}
        
        {isCollapsed && (
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto">
            <FontAwesomeIcon icon={faStore} className="text-primary-600 text-xl" />
          </div>
        )}

        {onToggle && (
          <button
            onClick={onToggle}
            className="text-white hover:bg-primary-500 p-2 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
          </button>
        )}
      </div>

      {/* Profil Admin */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUserCircle} className="text-white text-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-semibold truncate">Admin Principal</p>
              <p className="text-gray-500 text-sm truncate">admin@africommerce.cm</p>
            </div>
          </div>
        </div>
      )}

      {/* Menu de Navigation */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              {/* Menu Principal */}
              <div
                className={`relative flex items-center justify-between mx-2 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer group ${
                  isParentActive(item)
                    ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => item.submenu ? toggleSubmenu(item.id) : null}
              >
                <Link
                  to={item.path}
                  className="flex items-center space-x-3 flex-1"
                  onClick={(e) => item.submenu && e.preventDefault()}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isParentActive(item)
                      ? 'bg-primary-200 text-primary-700'
                      : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                  }`}>
                    <FontAwesomeIcon icon={item.icon} className="text-sm" />
                  </div>
                  
                  {!isCollapsed && (
                    <div className="flex-1">
                      <span className="font-medium">{item.label}</span>
                    </div>
                  )}
                </Link>

                {!isCollapsed && (
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        isParentActive(item)
                          ? 'bg-primary-200 text-primary-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    
                    {item.submenu && (
                      <FontAwesomeIcon
                        icon={expandedMenus.includes(item.id) ? faChevronRight : faChevronRight}
                        className={`text-xs transition-transform duration-200 ${
                          expandedMenus.includes(item.id) ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </div>
                )}

                {/* Indicateur actif */}
                {isParentActive(item) && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-primary-600 rounded-r-full"></div>
                )}
              </div>

              {/* Sous-menu */}
              {item.submenu && !isCollapsed && expandedMenus.includes(item.id) && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                        isActive(subItem.path)
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive(subItem.path)
                          ? 'bg-primary-100 text-primary-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <FontAwesomeIcon icon={subItem.icon} className="text-xs" />
                      </div>
                      <span className="text-sm">{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer du Sidebar */}
      <div className="border-t border-gray-200 p-4">
        {!isCollapsed ? (
          <div className="space-y-2">
            {/* Barre de recherche */}
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" 
              />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
            
            {/* Bouton de déconnexion */}
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
              <FontAwesomeIcon icon={faSignOutAlt} className="text-sm" />
              <span className="text-sm font-medium">Déconnexion</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors mx-auto">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors mx-auto">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        )}
      </div>

      {/* Tooltip pour mode collapsed */}
      {isCollapsed && (
        <div className="absolute left-full top-4 ml-2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-50 pointer-events-none transition-opacity">
          AfriCommerce SuperAdmin
        </div>
      )}
    </div>
  );
};

export default SuperAdminSidebar;