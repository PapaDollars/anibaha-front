// ================================================================
// URL BACKEND - Routes centralisées pour l'API CamerShop
// Base configurée dans .env : VITE_API_URL=http://localhost:5000
// Toutes les routes sont préfixées /api
// ================================================================

const BASE = '/api';

export const API_ROUTES = {

  // ── 🔐 AUTH ───────────────────────────────────────────────────
  AUTH: {
    LOGIN:                  `${BASE}/auth/login`,
    REGISTER:               `${BASE}/auth/register`,
    LOGOUT:                 `${BASE}/auth/logout`,
    REFRESH:                `${BASE}/auth/refresh`,
    ME:                     `${BASE}/auth/me`,
    FORGOT_PASSWORD:        `${BASE}/auth/forgot-password`,
    RESET_PASSWORD:         `${BASE}/auth/reset-password`,
    VERIFY_FIREBASE_TOKEN:  `${BASE}/auth/verify-firebase-token`,
  },

  // ── 👤 USERS ──────────────────────────────────────────────────
  USERS: {
    LIST:             `${BASE}/users`,
    ME:               `${BASE}/users/me`,
    UPDATE_ME:        `${BASE}/users/me`,
    CHANGE_PASSWORD:  `${BASE}/users/me/password`,
    ADDRESSES:        `${BASE}/users/me/addresses`,
  },

  // ── 📦 PRODUCTS ───────────────────────────────────────────────
  PRODUCTS: {
    LIST:     `${BASE}/products`,
    FEATURED: `${BASE}/products/featured`,
    CREATE:   `${BASE}/products`,
  },

  // ── 🗂️ CATEGORIES ─────────────────────────────────────────────
  CATEGORIES: {
    LIST:     `${BASE}/categories`,
    FEATURED: `${BASE}/categories/featured`,
    CREATE:   `${BASE}/categories`,
  },

  // ── 🏢 COMPANIES ──────────────────────────────────────────────
  COMPANIES: {
    LIST:   `${BASE}/companies`,
    CREATE: `${BASE}/companies`,
  },

  // ── 🛒 ORDERS ─────────────────────────────────────────────────
  ORDERS: {
    LIST:   `${BASE}/orders`,
    CREATE: `${BASE}/orders`,
  },

  // ── 💝 WISHLIST ───────────────────────────────────────────────
  WISHLIST: {
    LIST: `${BASE}/wishlist`,
  },

  // ── 🔔 NOTIFICATIONS ──────────────────────────────────────────
  NOTIFICATIONS: {
    LIST:          `${BASE}/notifications`,
    UNREAD_COUNT:  `${BASE}/notifications/unread-count`,
    MARK_ALL_READ: `${BASE}/notifications/read-all`,
  },

  // ── 📤 UPLOAD ─────────────────────────────────────────────────
  UPLOAD: {
    AVATAR:          `${BASE}/upload/avatar`,
    PRODUCT_IMAGE:   `${BASE}/upload/product-image`,
    PRODUCT_IMAGES:  `${BASE}/upload/product-images`,
    COMPANY_LOGO:    `${BASE}/upload/company-logo`,
    DOCUMENT:        `${BASE}/upload/document`,
    DELETE:          `${BASE}/upload/delete`,
  },

  // ── ⚙️ SETTINGS ───────────────────────────────────────────────
  SETTINGS: {
    PUBLIC: `${BASE}/settings`,
    ADMIN:  `${BASE}/settings/admin`,
    UPDATE: `${BASE}/settings`,
  },

} as const;

// ── Générateurs pour les routes avec paramètres ────────────────
export const API_GENERATORS = {
  // Produits
  product:         (id: string) => `${BASE}/products/${id}`,
  productUpdate:   (id: string) => `${BASE}/products/${id}`,
  productDelete:   (id: string) => `${BASE}/products/${id}`,
  productReviews:  (id: string) => `${BASE}/products/${id}/reviews`,

  // Catégories
  category:         (id: string) => `${BASE}/categories/${id}`,
  categoryProducts: (id: string) => `${BASE}/categories/${id}/products`,
  categoryUpdate:   (id: string) => `${BASE}/categories/${id}`,

  // Entreprises
  company:       (id: string) => `${BASE}/companies/${id}`,
  companyUpdate: (id: string) => `${BASE}/companies/${id}`,
  companyStatus: (id: string) => `${BASE}/companies/${id}/status`,

  // Commandes
  order:        (id: string) => `${BASE}/orders/${id}`,
  orderStatus:  (id: string) => `${BASE}/orders/${id}/status`,
  orderTracking:(id: string) => `${BASE}/orders/${id}/tracking`,

  // Utilisateurs
  user:        (id: string) => `${BASE}/users/${id}`,
  userStatus:  (id: string) => `${BASE}/users/${id}/status`,
  userAddress: (id: string) => `${BASE}/users/me/addresses/${id}`,

  // Wishlist
  wishlistItem: (productId: string) => `${BASE}/wishlist/${productId}`,

  // Notifications
  notificationRead: (id: string) => `${BASE}/notifications/${id}/read`,
} as const;

export const ROUTES = {
  API: API_ROUTES,
  GENERATORS: API_GENERATORS,
} as const;

export type ApiRoute = typeof API_ROUTES[keyof typeof API_ROUTES];
export default ROUTES;