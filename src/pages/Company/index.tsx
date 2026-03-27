import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faShoppingCart, 
  faUsers, 
  faChartBar, 
  faCog,
  faBars,
  faTimes,
  faHome,
  faSignOutAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import type { RootState } from '@/store';
import { ROUTES } from '@/utils/url/url_frontend';
// Admin Components
import AdminDashboard from '@/pages/Company/Dashboard';
import AdminProducts from '@/pages/Company/Products';
import AdminOrders from '@/pages/Company/Orders';
import AdminUsers from '@/pages/Company/Sidebar';
import AdminSettings from '@/pages/Company/Settings';

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state: RootState) => state.auth as { user: { role: string; name?: string; email?: string } });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate(ROUTES.PUBLIC.HOME);
    }
  }, [user, navigate]);

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname.split('/')[2] || 'dashboard';
    setActiveTab(path);
  }, [location]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: faChartBar, path: '/admin/dashboard' },
    { id: 'products', label: 'Produits', icon: faBox, path: '/admin/products' },
    { id: 'orders', label: 'C ommandes', icon: faShoppingCart, path: '/admin/orders' },
    { id: 'brand', label: 'Utilisateurs', icon: faUsers, path: '/admin/users' },
    { id: 'settings', label: 'Paramètres', icon: faCog, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    // Dispatch logout action here
    navigate(ROUTES.PUBLIC.HOME);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faCog} className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Administration</h1>
                <p className="text-sm text-gray-500">Panel de contrôle</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUserCircle} className="text-white text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.name || 'Administrateur'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email || 'admin@example.com'}
                </p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                  Admin
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`
                  group flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1'
                  }
                `}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Ne pas fermer la sidebar sur desktop
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
              >
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors
                  ${activeTab === tab.id
                    ? 'bg-white bg-opacity-20'
                    : 'bg-gray-100 group-hover:bg-gray-200'
                  }
                `}>
                  <FontAwesomeIcon 
                    icon={tab.icon} 
                    className={`
                      ${activeTab === tab.id ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'}
                    `}
                  />
                </div>
                <span className="text-sm">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link
              to={ROUTES.PUBLIC.HOME}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center mr-3 transition-colors">
                <FontAwesomeIcon icon={faHome} className="text-gray-600 group-hover:text-gray-800" />
              </div>
              <span className="text-sm font-medium">Retour au site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center mr-3 transition-colors">
                <FontAwesomeIcon icon={faSignOutAlt} className="text-red-600" />
              </div>
              <span className="text-sm font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Top Header - Fixed */}
        <header className="fixed top-0 right-0 left-0 lg:left-80 bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 z-40">
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3 rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm bg-white/10 border border-white/20"
              >
                <FontAwesomeIcon icon={faBars} className="text-gray-700" />
              </button>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  {tabs.find(tab => tab.id === activeTab)?.label || 'Tableau de bord'}
                </h2>
                <p className="text-sm text-gray-600 mt-1 font-medium">
                  Gérez et surveillez votre plateforme e-commerce
                </p>
              </div>
            </div>
            
            {/* Enhanced Quick Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-blue-200/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-xs text-gray-600 font-medium">Commandes</div>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-green-200/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-xs text-gray-600 font-medium">Produits</div>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-purple-200/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">89</div>
                    <div className="text-xs text-gray-600 font-medium">Utilisateurs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-20 p-6">
          <div className="max-w-7xl mx-auto">
          <Routes>
              <Route path={ROUTES.SUPER_ADMIN.DASHBOARD.BASE} element={<AdminDashboard />} />
              <Route path={ROUTES.SUPER_ADMIN.PRODUCTS.LIST} element={<AdminProducts />} />
              <Route path={ROUTES.SUPER_ADMIN.ORDERS.LIST} element={<AdminOrders />} />
              <Route path={ROUTES.SUPER_ADMIN.USERS.LIST} element={<AdminUsers />} />
              <Route path={ROUTES.SUPER_ADMIN.SYSTEM.SETTINGS} element={<AdminSettings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;