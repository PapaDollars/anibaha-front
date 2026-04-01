import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faCamera, faShoppingCart, faHeart, faBell, faBars, faTimes,
  faChevronDown, faGlobe, faShoppingBag, faStore, faTags, faMicrophone,
  faUserCircle, faSignOutAlt, faBox, faFilter, faStar, faUser, faHome,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { COMPANY_ROUTES, SUPER_ADMIN_ROUTES } from '@/utils/url/url_frontend';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { ROUTES } from '@/utils/url/url_frontend';
import { BaseNavbarProps } from '@/types/navigation';
import { useError } from '@/context/ErrorContext';

const BaseNavbar: React.FC<BaseNavbarProps> = ({
  user,
  onLogin,
  onLogout,
  onSearch = () => { },
  onVoiceSearch = () => { },
  onImageSearch = () => { },
  cartItems = 0,
  notifications = 0,
  customNavItems = [],
  showSearch,
  showTopBar,
  logoText,
  logoSubtext
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { addError } = useError();

  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [isImageListening, setIsImageListening] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  useEffect(() => { setNavigatingTo(null); }, [location.pathname]);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTopBarState, setShowTopBarState] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Refs
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Default navigation items
  const getDefaultNavItems = () => {
    const baseItems: { id: string; name: string; href: string; icon: any }[] = [
      { id: 'products', name: t('navigation.products'), href: ROUTES.PUBLIC.CATALOG.PRODUCTS, icon: faBox },
      { id: 'categories', name: t('navigation.categories'), href: ROUTES.PUBLIC.CATALOG.CATEGORIES, icon: faTags },
      { id: 'brands', name: t('navigation.brands'), href: ROUTES.PUBLIC.CATALOG.BRANDS, icon: faStore },
    ];

    if (user?.role === 'company') {
      baseItems.push({
        id: 'company',
        name: t('navigation.company'),
        href: COMPANY_ROUTES.DASHBOARD.BASE,
        icon: faCog
      });
    }

    if (user?.role === 'superAdmin') {
      baseItems.push({
        id: 'superAdmin',
        name: t('navigation.superAdmin'),
        href: SUPER_ADMIN_ROUTES.DASHBOARD.BASE,
        icon: faCog
      });
    }

    return baseItems;
  };

  const navigationItems = customNavItems.length > 0 ? customNavItems : getDefaultNavItems();

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Pour l'effet de scroll général
      setIsScrolled(currentScrollY > 10);

      // Pour la top bar - masquer quand on scrolle vers le bas, afficher quand on scrolle vers le haut
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        // Scrolling down & pas tout en haut
        setShowTopBarState(false);
      } else if (currentScrollY < lastScrollY || currentScrollY < 300) {
        // Scrolling up ou proche du haut
        setShowTopBarState(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (mobileUserMenuRef.current && !mobileUserMenuRef.current.contains(event.target as Node)) {
        setShowMobileUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      // Fermer le menu mobile si clic en dehors
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lastScrollY]);

  // Search suggestions
  useEffect(() => {
    if (searchQuery.length > 2) {
      const suggestions = [
        'iPhone 15 Pro Max', 'MacBook Pro M3', 'Robe wax africaine',
        'Samsung Galaxy S24', 'Nike Air Max'
      ].filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleVoiceSearch = () => {
    setIsVoiceListening(true);

    addError({
      type: 'timeout',
      severity: 'info',
      title: 'Fonctionnalité en développement',
      message: 'La recherche vocale sera bientôt disponible',
      canDismiss: true,
      metadata: {
        icon: 'microphone',
        variant: 'banner'
      },
      actionButton: {
        text: 'Compris',
        action: () => { },
        variant: 'primary'
      }
    });
    setIsVoiceListening(false);
  };

  const handleImageSearch = () => {
    setIsImageListening(true);

    addError({
      type: 'timeout',
      severity: 'info',
      title: 'Fonctionnalité en développement',
      message: 'La recherche par image sera bientôt disponible',
      canDismiss: true,
      actionButton: {
        text: 'Compris',
        action: () => { },
        variant: 'primary'
      }
    });
    setIsImageListening(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  const mockNotifications = [
    { id: 1, title: 'Nouvelle commande', message: 'Votre commande #1234 a été confirmée', time: '2 min' },
    { id: 2, title: 'Promotion', message: '20% de réduction sur les électroniques', time: '1h' },
    { id: 3, title: 'Livraison', message: 'Votre colis sera livré demain', time: '3h' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-lg border-b border-gray-300/50">
      {/* Top Bar - Disparition complète */}
      {showTopBar && showTopBarState && (
        <div className="hidden lg:block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span>🚚 Livraison gratuite dès 50 000 XAF</span>
              <span>📞 Support 24/7</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faGlobe} />
                <select
                  value={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="bg-transparent border-none text-white text-sm focus:outline-none cursor-pointer"
                >
                  <option value="fr" className="text-black">Français</option>
                  <option value="en" className="text-black">English</option>
                  <option value="es" className="text-black">Español</option>
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <a href="https://facebook.com" className="hover:text-blue-300 transition-colors">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://instagram.com" className="hover:text-purple-300 transition-colors">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://whatsapp.com" className="hover:text-green-300 transition-colors">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to={ROUTES.PUBLIC.HOME} className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-500 to-blue-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">ABH</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {logoText}
                </h1>
                <p className="text-xs text-gray-500 -mt-1">{logoSubtext}</p>
              </div>
            </Link>
          </div>

          {/* Search Bar Desktop */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
              <div className="relative w-full">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className={`
                    flex items-center bg-blue-100 rounded-xl border-2 transition-all duration-300
                    ${isSearchActive ? 'border-blue-500 shadow-lg scale-105' : 'border-transparent hover:border-gray-300'}
                  `}>
                    <div className="flex items-center pl-4">
                      <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchActive(true)}
                      onBlur={() => setTimeout(() => setIsSearchActive(false), 200)}
                      placeholder={t('search.placeholder')}
                      className="flex-1 py-3 px-3 bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-500"
                    />
                    <div className="flex items-center pr-2">
                      <button
                        type="button"
                        onClick={handleVoiceSearch}
                        className={`p-2 rounded-lg transition-all duration-300 ${isVoiceListening
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                          }`}
                        title="Recherche vocale"
                      >
                        <FontAwesomeIcon icon={faMicrophone} />
                      </button>
                      <button
                        type="button"
                        onClick={handleImageSearch}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Recherche par image"
                      >
                        <FontAwesomeIcon icon={faCamera} />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-3 border-b border-gray-100">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FontAwesomeIcon icon={faSearch} className="text-blue-500" />
                        <span>Suggestions populaires</span>
                      </div>
                    </div>
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          onSearch(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                      >
                        <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
                        <span className="text-gray-900">{suggestion}</span>
                        <div className="ml-auto flex items-center space-x-1">
                          <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
                          <span className="text-xs text-gray-500">Populaire</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 group relative
                    ${location.pathname === item.href
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-sm group-hover:scale-110 transition-transform ${location.pathname === item.href ? 'text-blue-600' : ''
                      }`}
                  />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Search Bar Mobile - À côté des autres boutons */}
            {showSearch && (
              <div className="md:hidden w-48 mx-2 flex-shrink-0">
                <form onSubmit={handleSearchSubmit}>
                  <div className="flex items-center bg-blue-100 rounded-xl border-2 border-transparent hover:border-gray-300 transition-all duration-300">
                    <div className="flex items-center pl-3">
                      <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('search.placeholder')}
                      className="flex-1 py-2 px-2 bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-500 text-sm min-w-0"
                    />
                    <div className="flex items-center pr-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={handleVoiceSearch}
                        className={`p-1.5 rounded-xl transition-all duration-300 ${isVoiceListening
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                          }`}
                        title="Recherche vocale"
                      >
                        <FontAwesomeIcon icon={faMicrophone} className="text-xs" />
                      </button>
                      <button
                        type="button"
                        onClick={handleImageSearch}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Recherche par image"
                      >
                        <FontAwesomeIcon icon={faCamera} className="text-xs" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {/* Cart - for authenticated users (Mobile + Desktop) */}
              {user && user.role !== 'visitor' && (
                <Link
                  to={ROUTES.PUBLIC.CATALOG.CART}
                  className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
                  title="Mon panier"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="group-hover:scale-110 transition-transform" />
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {cartItems}
                    </span>
                  )}
                </Link>
              )}

              {/* Notifications - for authenticated users (Mobile + Desktop) */}
              {user && (
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
                    title="Notifications"
                  >
                    <FontAwesomeIcon icon={faBell} className="group-hover:scale-110 transition-transform" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-ping">
                        {notifications}
                      </span>
                    )}
                  </button>

                  {/* Notifications Menu */}
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {mockNotifications.map((notif) => (
                          <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm">{notif.title}</p>
                                <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
                                <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-gray-50">
                        <Link to="/notifications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Voir toutes les notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}



              {/* User Menu Desktop */}
              {user ? (
                <div className="relative hidden md:block" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2 hover:bg-blue-100 rounded-full transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        user.firstName.charAt(0).toUpperCase()
                      )}
                    </div>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="py-2">
                        {[
                          { to: ROUTES.USER.PROFILE.BASE, icon: faUserCircle, label: "Mon profil" },
                          { to: ROUTES.USER.ORDERS.LIST, icon: faShoppingBag, label: "Mes commandes" },
                          { to: ROUTES.USER.SHOPPING.WISHLIST, icon: faHeart, label: "Mes favoris" },
                        ].map(({ to, icon, label }) => (
                          <Link
                            key={to}
                            to={to}
                            onClick={() => { setNavigatingTo(to); setShowUserMenu(false); }}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            {navigatingTo === to ? (
                              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <FontAwesomeIcon icon={icon} className="text-gray-400" />
                            )}
                            <span>{label}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={onLogout}
                          className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button
                    onClick={onLogin}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Connexion
                  </button>
                  <button
                    onClick={() => navigate(ROUTES.PUBLIC.AUTH.REGISTER)}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    S'inscrire
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
              >
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200" ref={mobileMenuRef}>
          <div className="px-6 py-6 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-3 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={item.icon} />
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
              </Link>
            ))}

            {/* Mobile User Menu - À l'intérieur du menu hamburger */}
            {user ? (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="relative" ref={mobileUserMenuRef}>
                  <button
                    onClick={() => setShowMobileUserMenu(!showMobileUserMenu)}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          user.firstName.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-gray-400 text-xs transition-transform duration-200 ${showMobileUserMenu ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Menu déroulant utilisateur dans le menu hamburger */}
                  {showMobileUserMenu && (
                    <div className="mt-2 ml-4 space-y-1 bg-gray-50 rounded-xl p-2">
                      <Link
                        to={ROUTES.USER.PROFILE.BASE}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-white rounded-xl transition-colors text-sm"
                        onClick={() => {
                          setShowMobileUserMenu(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                        <span>Mon profil</span>
                      </Link>

                      <Link
                        to={ROUTES.USER.SHOPPING.WISHLIST}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-white rounded-xl transition-colors text-sm"
                        onClick={() => {
                          setShowMobileUserMenu(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faHeart} className="text-gray-400" />
                        <span>Mes favoris</span>
                      </Link>

                      <Link
                        to={ROUTES.USER.ORDERS.LIST}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-white rounded-xl transition-colors text-sm"
                        onClick={() => {
                          setShowMobileUserMenu(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} className="text-gray-400" />
                        <span>Mes commandes</span>
                      </Link>

                      <Link
                        to={ROUTES.USER.SHOPPING.CART}
                        className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-white rounded-xl transition-colors text-sm"
                        onClick={() => {
                          setShowMobileUserMenu(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <FontAwesomeIcon icon={faShoppingCart} className="text-gray-400" />
                          <span>Panier</span>
                        </div>
                        {cartItems > 0 && (
                          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                            {cartItems}
                          </span>
                        )}
                      </Link>

                      <button
                        onClick={() => {
                          onLogout();
                          setShowMobileUserMenu(false);
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    onLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-center text-blue-600 border border-blue-600 rounded-xl font-medium"
                >
                  Connexion
                </button>
                <button
                  onClick={() => {
                    navigate(ROUTES.PUBLIC.AUTH.REGISTER);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl font-medium"
                >
                  S'inscrire
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default BaseNavbar;