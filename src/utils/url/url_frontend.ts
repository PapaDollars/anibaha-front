export const BASENAME = '/';
// export const BASENAME = '/emergent-market';

const BASE_PUBLIC = '/app';
const BASE_CLIENT = 'user';
const BASE_COMPANY = 'company';
const BASE_SUPER_ADMIN = 'super-admin';


export const PUBLIC_ROUTES = {
  HOME: '/',
  ABOUT: `${BASE_PUBLIC}/about`,
  CONTACT: `${BASE_PUBLIC}/contact`,
  FAQ: `${BASE_PUBLIC}/faq`,
  TERMS: `${BASE_PUBLIC}/terms`,
  PRIVACY: `${BASE_PUBLIC}/privacy`,
  HELP: `${BASE_PUBLIC}/help`,
  
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password/:token',
    VERIFY_EMAIL: '/auth/verify-email/:token',
    RESEND_VERIFICATION: '/auth/resend-verification'
  },

  CATALOG: {
    PRODUCTS: `/products`,
    PRODUCT_DETAILS: `/products/:id`,
    CATEGORIES: `${BASE_PUBLIC}/categories`,
    CATEGORY_PRODUCTS: `/categories/:id`,
    BRANDS: `${BASE_PUBLIC}/brands`,
    BRAND_PRODUCTS: `${BASE_PUBLIC}/brands/:slug`,
    SEARCH: `${BASE_PUBLIC}/search`,
    COMPARE: `${BASE_PUBLIC}/compare`,
    CART: `${BASE_PUBLIC}/cart`,
  }
} as const;

// Routes clients (nécessitent une authentification client)
export const USER_ROUTES = {

  PROFILE: {
    BASE: `${BASE_CLIENT}/profile`,
    EDIT: `${BASE_CLIENT}/profile/edit`,
    ADDRESSES: `${BASE_CLIENT}/profile/addresses`,
    SECURITY: `${BASE_CLIENT}/profile/security`,
    PREFERENCES: `${BASE_CLIENT}/profile/preferences`,
    DELETE_ACCOUNT: `${BASE_CLIENT}/profile/delete`
  },

  SHOPPING: {
    CART: `${BASE_CLIENT}/cart`,
    WISHLIST: `${BASE_CLIENT}/wishlist`,
    CHECKOUT: `/checkout`,
    PAYMENT: `${BASE_CLIENT}/payment`,
    PAYMENT_SUCCESS: `${BASE_CLIENT}/payment/success`,
    PAYMENT_FAILED: `${BASE_CLIENT}/payment/failed`
  },

  ORDERS: {
    LIST: `${BASE_CLIENT}/orders`,
    DETAILS: `${BASE_CLIENT}/orders/:id`,
    TRACKING: `${BASE_CLIENT}/orders/:id/tracking`,
    INVOICE: `${BASE_CLIENT}/orders/:id/invoice`,
    RETURN: `${BASE_CLIENT}/orders/:id/return`,
    REVIEW: `${BASE_CLIENT}/orders/:id/review`
  },

  COMMUNICATION: {
    NOTIFICATIONS: `${BASE_CLIENT}/notifications`,
    MESSAGES: `${BASE_CLIENT}/messages`,
    CHAT: `${BASE_CLIENT}/messages/:companyId`,
    SUPPORT: `${BASE_CLIENT}/support`,
    TICKETS: `${BASE_CLIENT}/tickets`
  },

  REWARDS: {
    POINTS: `${BASE_CLIENT}/rewards/points`,
    COUPONS: `${BASE_CLIENT}/rewards/coupons`,
    REFERRALS: `${BASE_CLIENT}/rewards/referrals`
  }
} as const;

// Routes entreprise/admin (gestion d'entreprise)
export const COMPANY_ROUTES = {
  
  DASHBOARD: {
    BASE: `${BASE_COMPANY}/dashboard`,
    ANALYTICS: `${BASE_COMPANY}/dashboard/analytics`,
    REPORTS: `${BASE_COMPANY}/dashboard/reports`
  },

  PRODUCTS: {
    LIST: `${BASE_COMPANY}/products/:id`,
    CREATE: `${BASE_COMPANY}/products/create`,
    EDIT: `${BASE_COMPANY}/products/:id/edit`,
    DETAILS: `${BASE_COMPANY}/products/:id/:slug`,
    CATEGORIES: `${BASE_COMPANY}/products/categories`,
    INVENTORY: `${BASE_COMPANY}/products/inventory`,
    BULK_UPLOAD: `${BASE_COMPANY}/products/bulk-upload`
  },

  ORDERS: {
    LIST: `${BASE_COMPANY}/orders`,
    DETAILS: `${BASE_COMPANY}/orders/:id`,
    PROCESSING: `${BASE_COMPANY}/orders/processing`,
    SHIPPED: `${BASE_COMPANY}/orders/shipped`,
    RETURNS: `${BASE_COMPANY}/orders/returns`,
    DISPUTES: `${BASE_COMPANY}/orders/disputes`
  },

  CUSTOMERS: {
    LIST: `${BASE_COMPANY}/customers`,
    DETAILS: `${BASE_COMPANY}/customers/:id`,
    SEGMENTS: `${BASE_COMPANY}/customers/segments`,
    COMMUNICATIONS: `${BASE_COMPANY}/customers/communications`
  },

  MARKETING: {
    PROMOTIONS: `${BASE_COMPANY}/marketing/promotions`,
    COUPONS: `${BASE_COMPANY}/marketing/coupons`,
    CAMPAIGNS: `${BASE_COMPANY}/marketing/campaigns`,
    EMAIL_MARKETING: `${BASE_COMPANY}/marketing/emails`,
    SEO: `${BASE_COMPANY}/marketing/seo`
  },

  FINANCE: {
    SALES: `${BASE_COMPANY}/finance/sales`,
    PAYMENTS: `${BASE_COMPANY}/finance/payments`,
    INVOICES: `${BASE_COMPANY}/finance/invoices`,
    TAXES: `${BASE_COMPANY}/finance/taxes`,
    REPORTS: `${BASE_COMPANY}/finance/reports`
  },

  LOGISTICS: {
    SHIPPING: `${BASE_COMPANY}/logistics/shipping`,
    WAREHOUSES: `${BASE_COMPANY}/logistics/warehouses`,
    SUPPLIERS: `${BASE_COMPANY}/logistics/suppliers`,
    TRACKING: `${BASE_COMPANY}/logistics/tracking`
  },

  COMPANY_PROFILE: {
    BASE: `${BASE_COMPANY}/profile`,
    EDIT: `${BASE_COMPANY}/profile/edit`,
    BRANDING: `${BASE_COMPANY}/profile/branding`,
    CONTACT_INFO: `${BASE_COMPANY}/profile/contact`,
    BUSINESS_INFO: `${BASE_COMPANY}/profile/business`,
    CERTIFICATIONS: `${BASE_COMPANY}/profile/certifications`
  },

  TEAM: {
    MEMBERS: `${BASE_COMPANY}/team/members`,
    ROLES: `${BASE_COMPANY}/team/roles`,
    PERMISSIONS: `${BASE_COMPANY}/team/permissions`,
    INVITATIONS: `${BASE_COMPANY}/team/invitations`
  },

  SETTINGS: {
    GENERAL: `${BASE_COMPANY}/settings/general`,
    PAYMENT_METHODS: `${BASE_COMPANY}/settings/payments`,
    SHIPPING_METHODS: `${BASE_COMPANY}/settings/shipping`,
    NOTIFICATIONS: `${BASE_COMPANY}/settings/notifications`,
    INTEGRATIONS: `${BASE_COMPANY}/settings/integrations`,
    API: `${BASE_COMPANY}/settings/api`
  }
} as const;

// Routes super admin (gestion de la plateforme)
export const SUPER_ADMIN_ROUTES = {

  NOTIFICATIONS: `${BASE_SUPER_ADMIN}/notifications`,
  
  DASHBOARD: {
    BASE: `${BASE_SUPER_ADMIN}/dashboard`,
    OVERVIEW: `${BASE_SUPER_ADMIN}/dashboard/overview`,
    ANALYTICS: `${BASE_SUPER_ADMIN}/dashboard/analytics`,
    REPORTS: `${BASE_SUPER_ADMIN}/dashboard/reports`
  },

  USERS: {
    LIST: `${BASE_SUPER_ADMIN}/users`,
    DETAILS: `${BASE_SUPER_ADMIN}/users/:id`,
    CREATE: `${BASE_SUPER_ADMIN}/users/create`,
    CLIENTS: `${BASE_SUPER_ADMIN}/users/clients`,
    ADMINS: `${BASE_SUPER_ADMIN}/users/admins`,
    SUSPENDED: `${BASE_SUPER_ADMIN}/users/suspended`,
    BULK_ACTIONS: `${BASE_SUPER_ADMIN}/users/bulk-actions`
  },

  COMPANIES: {
    LIST: `${BASE_SUPER_ADMIN}/companies`,
    DETAILS: `${BASE_SUPER_ADMIN}/companies/:id`,
    PENDING_APPROVAL: `${BASE_SUPER_ADMIN}/companies/pending`,
    APPROVED: `${BASE_SUPER_ADMIN}/companies/approved`,
    SUSPENDED: `${BASE_SUPER_ADMIN}/companies/suspended`,
    VERIFIED: `${BASE_SUPER_ADMIN}/companies/verification`
  },

  PRODUCTS: {
    LIST: `${BASE_SUPER_ADMIN}/products`,
    DETAILS: `${BASE_SUPER_ADMIN}/products/:id`,
    REPORTED: `${BASE_SUPER_ADMIN}/products/reported`,
    PENDING_APPROVAL: `${BASE_SUPER_ADMIN}/products/pending`,
    CATEGORIES: `${BASE_SUPER_ADMIN}/products/categories`,
    BULK_ACTIONS: `${BASE_SUPER_ADMIN}/products/bulk-actions`
  },

  ORDERS: {
    LIST: `${BASE_SUPER_ADMIN}/orders`,
    DETAILS: `${BASE_SUPER_ADMIN}/orders/:id`,
    DISPUTES: `${BASE_SUPER_ADMIN}/orders/disputes`,
    REFUNDS: `${BASE_SUPER_ADMIN}/orders/refunds`,
    FRAUD_DETECTION: `${BASE_SUPER_ADMIN}/orders/fraud`
  },

  CONTENT: {
    BANNERS: `${BASE_SUPER_ADMIN}/content/banners`,
    PROMOTIONS: `${BASE_SUPER_ADMIN}/content/promotions`,
    NEWSLETTERS: `${BASE_SUPER_ADMIN}/content/newsletters`,
    PAGES: `${BASE_SUPER_ADMIN}/content/pages`,
    BLOG: `${BASE_SUPER_ADMIN}/content/blog`,
    SEO: `${BASE_SUPER_ADMIN}/content/seo`
  },

  SUPPORT: {
    TICKETS: `${BASE_SUPER_ADMIN}/support/tickets`,
    CHAT: `${BASE_SUPER_ADMIN}/support/chat`,
    FAQ: `${BASE_SUPER_ADMIN}/support/faq`,
    KNOWLEDGE_BASE: `${BASE_SUPER_ADMIN}/support/knowledge-base`,
    FEEDBACK: `${BASE_SUPER_ADMIN}/support/feedback`
  },

  SYSTEM: {
    SETTINGS: `${BASE_SUPER_ADMIN}/system/settings`,
    INTEGRATIONS: `${BASE_SUPER_ADMIN}/system/integrations`,
    API_MANAGEMENT: `${BASE_SUPER_ADMIN}/system/api`,
    LOGS: `${BASE_SUPER_ADMIN}/system/logs`,
    BACKUPS: `${BASE_SUPER_ADMIN}/system/backups`,
    MAINTENANCE: `${BASE_SUPER_ADMIN}/system/maintenance`
  },

  SECURITY: {
    OVERVIEW: `${BASE_SUPER_ADMIN}/security/overview`,
    PERMISSIONS: `${BASE_SUPER_ADMIN}/security/permissions`,
    AUDIT_LOGS: `${BASE_SUPER_ADMIN}/security/audit-logs`,
    BLOCKED_IPS: `${BASE_SUPER_ADMIN}/security/blocked-ips`,
    SECURITY_REPORTS: `${BASE_SUPER_ADMIN}/security/reports`
  },

  REPORTS: {
    SALES: `${BASE_SUPER_ADMIN}/reports/sales`,
    USERS: `${BASE_SUPER_ADMIN}/reports/users`,
    PRODUCTS: `${BASE_SUPER_ADMIN}/reports/products`,
    COMPANIES: `${BASE_SUPER_ADMIN}/reports/companies`,
    FINANCIAL: `${BASE_SUPER_ADMIN}/reports/financial`,
    CUSTOM: `${BASE_SUPER_ADMIN}/reports/custom`,

    OVERVIEW: `${BASE_SUPER_ADMIN}/finance/overview`,
    COMMISSIONS: `${BASE_SUPER_ADMIN}/finance/commissions`,
    PAYOUTS: `${BASE_SUPER_ADMIN}/finance/payouts`,
    TAXES: `${BASE_SUPER_ADMIN}/finance/taxes`,
    REPORTS_FINANCE: `${BASE_SUPER_ADMIN}/finance/reports`
  }
} as const;

// Routes externes
export const EXTERNAL_ROUTES = {
  WHATSAPP: (phone: string, message?: string) => 
    `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`,
  
  FACEBOOK: (username: string) => `https://facebook.com/${username}`,
  INSTAGRAM: (username: string) => `https://instagram.com/${username}`,
  TWITTER: (username: string) => `https://twitter.com/${username}`,
  LINKEDIN: (username: string) => `https://linkedin.com/in/${username}`,
  
  PAYMENT_GATEWAYS: {
    PAYPAL: 'https://www.paypal.com',
    STRIPE: 'https://stripe.com',
    FLUTTERWAVE: 'https://flutterwave.com',
    PAYSTACK: 'https://paystack.com'
  }
} as const;

// Fonctions utilitaires pour générer des routes dynamiques
export const ROUTE_GENERATORS = {
  // Routes publiques
  getProductDetails: (id: string) => `/products/${id}`,
  getCategoryProducts: (id: string) => `/categories/${id}`,
  getBrandProducts: (slug: string) => `${BASE_PUBLIC}/brands/${slug}`,
  getResetPassword: (token: string) => `${BASE_PUBLIC}/auth/reset-password/${token}`,
  getVerifyEmail: (token: string) => `${BASE_PUBLIC}/auth/verify-email/${token}`,

  // Routes client
  getOrderDetails: (id: string) => `${BASE_CLIENT}/orders/${id}`,
  getOrderTracking: (id: string) => `/orders/${id}/tracking`,
  getOrderInvoice: (id: string) => `${BASE_CLIENT}/orders/${id}/invoice`,
  getOrderReturn: (id: string) => `${BASE_CLIENT}/orders/${id}/return`,
  getOrderReview: (id: string) => `${BASE_CLIENT}/orders/${id}/review`,
  getChat: (companyId: string) => `${BASE_CLIENT}/messages/${companyId}`,

  // Routes entreprise
  getCompanyProductCreate: (id: string) => `${BASE_COMPANY}/products/${id}/create`,
  getCompanyProductEdit: (id: string) => `${BASE_COMPANY}/products/${id}/edit`,
  getCompanyProduct: (id: string) => `${BASE_COMPANY}/products/${id}`,
  getCompanyProductDetails: (id: string) => `${BASE_COMPANY}/products/${id}/details`,
  getCompanyOrderDetails: (id: string) => `${BASE_COMPANY}/orders/${id}`,
  getCompanyCustomerDetails: (id: string) => `${BASE_COMPANY}/customers/${id}`,

  // Routes super admin
  getSuperAdminUserDetails: (id: string) => `${BASE_SUPER_ADMIN}/users/${id}`,
  getSuperAdminUserEdit: (id: string) => `${BASE_SUPER_ADMIN}/users/${id}`,
  getSuperAdminCompanyDetails: (id: string) => `${BASE_SUPER_ADMIN}/companies/${id}`,
  getSuperAdminProductDetails: (id: string) => `${BASE_SUPER_ADMIN}/products/${id}`,
  getSuperAdminOrderDetails: (id: string) => `${BASE_SUPER_ADMIN}/orders/${id}`,

  // WhatsApp
  getWhatsAppLink: (phone: string, message?: string) => 
    EXTERNAL_ROUTES.WHATSAPP(phone, message)
} as const;

// Configuration des redirections
export const REDIRECTS = {
  AFTER_LOGIN: {
    [USER_ROLES.CLIENT]: PUBLIC_ROUTES.CATALOG.PRODUCTS,
    [USER_ROLES.COMPANY]: COMPANY_ROUTES.DASHBOARD.BASE,
    [USER_ROLES.SUPER_ADMIN]: SUPER_ADMIN_ROUTES.DASHBOARD.BASE,
    [USER_ROLES.VISITOR]: PUBLIC_ROUTES.HOME
  },
  
  AFTER_LOGOUT: PUBLIC_ROUTES.HOME,
  
  UNAUTHORIZED: PUBLIC_ROUTES.AUTH.LOGIN,
  
  FORBIDDEN: PUBLIC_ROUTES.HOME,
  
  NOT_FOUND: PUBLIC_ROUTES.HOME
} as const;

// Regroupement de toutes les routes
export const ROUTES = {
  PUBLIC: PUBLIC_ROUTES,
  USER: USER_ROUTES,
  COMPANY: COMPANY_ROUTES,
  SUPER_ADMIN: SUPER_ADMIN_ROUTES,
  EXTERNAL: EXTERNAL_ROUTES,
  GENERATORS: ROUTE_GENERATORS,
  REDIRECTS
} as const;

// Export des constantes utilisées
import { USER_ROLES } from '@/utils/constants';

// Types TypeScript pour une meilleure sécurité de type
export type PublicRoute = typeof PUBLIC_ROUTES[keyof typeof PUBLIC_ROUTES];
export type ClientRoute = typeof USER_ROUTES[keyof typeof USER_ROUTES];
export type CompanyRoute = typeof COMPANY_ROUTES[keyof typeof COMPANY_ROUTES];
export type SuperAdminRoute = typeof SUPER_ADMIN_ROUTES[keyof typeof SUPER_ADMIN_ROUTES];

// Export par défaut
export default ROUTES;