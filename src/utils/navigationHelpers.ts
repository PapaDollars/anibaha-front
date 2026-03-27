import { NavItem } from '@/types/navigation';
import { 
  faBox, faTags, faStore, faCog, faTachometerAlt, faUsers, 
  faShoppingBag, faClipboardCheck, faChartBar, faBell 
} from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '@/utils/url/url_frontend';

export const getNavigationItemsByRole = (role: string, t: any): NavItem[] => {
  const baseItems: NavItem[] = [
    { id: 'products', name: t('navigation.products'), href: ROUTES.PUBLIC.CATALOG.PRODUCTS, icon: faBox },
    { id: 'categories', name: t('navigation.categories'), href: ROUTES.PUBLIC.CATALOG.CATEGORIES, icon: faTags },
    { id: 'brands', name: t('navigation.brands'), href: ROUTES.PUBLIC.CATALOG.BRANDS, icon: faStore },
  ];

  switch (role) {
    case 'company':
      return [
        { id: 'dashboard', name: t('company.dashboard.title'), href: ROUTES.COMPANY.DASHBOARD.BASE, icon: faChartBar },
        { id: 'products', name: t('company.products.title'), href: ROUTES.COMPANY.PRODUCTS.LIST, icon: faBox },
        { id: 'orders', name: t('company.orders.title'), href: ROUTES.COMPANY.ORDERS.LIST, icon: faShoppingBag },
        { id: 'settings', name: t('company.settings.title'), href: ROUTES.COMPANY.SETTINGS.GENERAL, icon: faCog },
      ];

    case 'superAdmin':
      return [
        { id: 'dashboard', name: t('superAdmin.nav.dashboard'), href: ROUTES.SUPER_ADMIN.DASHBOARD.BASE, icon: faTachometerAlt },
        { id: 'approvals', name: t('superAdmin.nav.approvals'), href: ROUTES.SUPER_ADMIN.COMPANIES.APPROVED, icon: faClipboardCheck, badge: 23 },
        { id: 'brands', name: t('superAdmin.nav.brands'), href: ROUTES.SUPER_ADMIN.COMPANIES.LIST, icon: faStore, badge: 12 },
        { id: 'users', name: t('superAdmin.nav.users'), href: ROUTES.SUPER_ADMIN.USERS.LIST, icon: faUsers, badge: 3 },
        { id: 'orders', name: t('superAdmin.nav.orders'), href: ROUTES.SUPER_ADMIN.ORDERS.LIST, icon: faShoppingBag },
        { id: 'products', name: t('superAdmin.nav.products'), href: ROUTES.SUPER_ADMIN.PRODUCTS.LIST, icon: faBox },
        { id: 'notifications', name: t('superAdmin.nav.notifications'), href: ROUTES.SUPER_ADMIN.NOTIFICATIONS, icon: faBell, badge: 15 },
        { id: 'reports', name: t('superAdmin.nav.analytics'), href: ROUTES.SUPER_ADMIN.DASHBOARD.REPORTS, icon: faChartBar },
        { id: 'settings', name: t('superAdmin.nav.settings'), href: ROUTES.SUPER_ADMIN.SYSTEM.SETTINGS, icon: faCog },
      ];

    default:
      return baseItems;
  }
};
  