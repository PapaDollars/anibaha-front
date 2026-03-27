// src/utils/constants.ts

export const APP_CONFIG = {
  NAME: 'AfriCommerce',
  VERSION: '1.0.0',
  DESCRIPTION: 'Plateforme e-commerce pour l\'Afrique',
  AUTHOR: 'AfriCommerce Team',
  CONTACT: {
    EMAIL: 'contact@africommerce.com',
    PHONE: '+237 6XX XXX XXX',
    ADDRESS: 'Douala, Cameroun',
    WHATSAPP: '+237600000000'
  },
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/africommerce',
    TWITTER: 'https://twitter.com/africommerce',
    INSTAGRAM: 'https://instagram.com/africommerce',
    LINKEDIN: 'https://linkedin.com/company/africommerce',
    YOUTUBE: 'https://youtube.com/africommerce'
  }
} as const;

// Rôles des utilisateurs
export const USER_ROLES = {
  VISITOR: 'visitor',
  CLIENT: 'client',
  COMPANY: 'company', // Entreprise
  SUPER_ADMIN: 'superAdmin'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Statuts des utilisateurs
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  DELETED: 'deleted'
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];

// Statuts des commandes
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  RETURNED: 'returned'
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

// Méthodes de paiement
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  MOBILE_MONEY: 'mobile_money',
  BANK_TRANSFER: 'bank_transfer',
  CASH_ON_DELIVERY: 'cash_on_delivery',
  ORANGE_MONEY: 'orange_money',
  MTN_MONEY: 'mtn_money',
  BITCOIN: 'bitcoin',
  MANUAL: 'manual', // Saisie manuelle
  DIRECT_CONTACT: 'direct_contact' // Contact direct avec l'entreprise
} as const;

export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];

// Statuts de paiement
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

// Méthodes de livraison
export const SHIPPING_METHODS = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  OVERNIGHT: 'overnight',
  PICKUP: 'pickup',
  INTERNATIONAL: 'international',
  SAME_DAY: 'same_day'
} as const;

export type ShippingMethod = typeof SHIPPING_METHODS[keyof typeof SHIPPING_METHODS];

// Catégories de produits
export const PRODUCT_CATEGORIES = {
  ELECTRONICS: 'electronics',
  FASHION: 'fashion',
  HOME: 'home',
  BEAUTY: 'beauty',
  SPORTS: 'sports',
  BOOKS: 'books',
  TOYS: 'toys',
  AUTOMOTIVE: 'automotive',
  FOOD: 'food',
  HEALTH: 'health',
  AGRICULTURE: 'agriculture',
  SERVICES: 'services'
} as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[keyof typeof PRODUCT_CATEGORIES];

// Statuts des produits
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISCONTINUED: 'discontinued',
  OUT_OF_STOCK: 'out_of_stock',
  PENDING_APPROVAL: 'pending_approval'
} as const;

export type ProductStatus = typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];

// Types de notifications
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  ORDER: 'order',
  PAYMENT: 'payment',
  PRODUCT: 'product',
  SYSTEM: 'system',
  PROMOTION: 'promotion'
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

// Langues supportées
export const SUPPORTED_LANGUAGES = {
  FR: 'fr',
  EN: 'en',
  ES: 'es' // Espagnol pour certains pays d'Afrique
} as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[keyof typeof SUPPORTED_LANGUAGES];

// Devises supportées
export const SUPPORTED_CURRENCIES = {
  XAF: 'XAF', // Franc CFA
  EUR: 'EUR',
  USD: 'USD',
  GHS: 'GHS', // Ghana Cedi
  NGN: 'NGN', // Nigerian Naira
  KES: 'KES', // Kenyan Shilling
  ZAR: 'ZAR'  // South African Rand
} as const;

export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[keyof typeof SUPPORTED_CURRENCIES];

// Pays africains principaux
export const AFRICAN_COUNTRIES = {
  CM: 'Cameroun',
  NG: 'Nigeria',
  GH: 'Ghana',
  KE: 'Kenya',
  ZA: 'Afrique du Sud',
  MA: 'Maroc',
  EG: 'Égypte',
  ET: 'Éthiopie',
  TZ: 'Tanzanie',
  UG: 'Ouganda',
  RW: 'Rwanda',
  SN: 'Sénégal',
  CI: 'Côte d\'Ivoire',
  BF: 'Burkina Faso',
  ML: 'Mali'
} as const;

// Configuration de pagination
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [6, 12, 24, 48],
  MAX_PAGE_SIZE: 100
} as const;

// Configuration des fichiers
export const FILE_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  MAX_IMAGES_PER_PRODUCT: 10
} as const;

// Configuration des évaluations
export const RATING_CONFIG = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  DEFAULT_RATING: 0
} as const;

// Configuration des promotions
export const PROMOTION_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount',
  FREE_SHIPPING: 'free_shipping',
  BUY_ONE_GET_ONE: 'buy_one_get_one'
} as const;

// Configuration des taxes
export const TAX_CONFIG = {
  DEFAULT_TAX_RATE: 0.1925, // 19.25% TVA au Cameroun
  TAX_RATES_BY_COUNTRY: {
    CM: 0.1925, // Cameroun
    NG: 0.075,  // Nigeria
    GH: 0.15,   // Ghana
    KE: 0.16,   // Kenya
    ZA: 0.15    // Afrique du Sud
  }
} as const;

// Configuration des frais de livraison
export const SHIPPING_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 50000, // 50,000 XAF
  DEFAULT_SHIPPING_COST: 2500,    // 2,500 XAF
  EXPRESS_SHIPPING_COST: 5000,    // 5,000 XAF
  INTERNATIONAL_SHIPPING_COST: 15000 // 15,000 XAF
} as const;

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion réseau',
  SERVER_ERROR: 'Erreur serveur, veuillez réessayer',
  UNAUTHORIZED: 'Accès non autorisé',
  FORBIDDEN: 'Action interdite',
  NOT_FOUND: 'Ressource non trouvée',
  VALIDATION_ERROR: 'Données invalides',
  UNKNOWN_ERROR: 'Une erreur inconnue s\'est produite'
} as const;

// Messages de succès
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Connexion réussie',
  LOGOUT_SUCCESS: 'Déconnexion réussie',
  REGISTER_SUCCESS: 'Inscription réussie',
  PROFILE_UPDATED: 'Profil mis à jour',
  PRODUCT_ADDED: 'Produit ajouté avec succès',
  PRODUCT_UPDATED: 'Produit mis à jour',
  ORDER_PLACED: 'Commande passée avec succès',
  PAYMENT_SUCCESS: 'Paiement effectué avec succès'
} as const;

// Configuration de l'application
export const APP_SETTINGS = {
  THEME: {
    DEFAULT: 'light',
    OPTIONS: ['light', 'dark', 'system']
  },
  LANGUAGE: {
    DEFAULT: 'fr',
    OPTIONS: Object.values(SUPPORTED_LANGUAGES)
  },
  CURRENCY: {
    DEFAULT: 'XAF',
    OPTIONS: Object.values(SUPPORTED_CURRENCIES)
  }
} as const;

// Configuration des URLs d'images par défaut
export const DEFAULT_IMAGES = {
  PRODUCT_PLACEHOLDER: '/images/product-placeholder.png',
  USER_AVATAR: '/images/user-avatar.png',
  COMPANY_LOGO: '/images/company-logo.png',
  BANNER_PLACEHOLDER: '/images/banner-placeholder.jpg'
} as const;

// Configuration des réseaux sociaux mobiles
export const MOBILE_NETWORKS = {
  MTN: 'mtn',
  ORANGE: 'orange',
  CAMTEL: 'camtel',
  NEXTTEL: 'nexttel'
} as const;

// Configuration WhatsApp
export const WHATSAPP_CONFIG = {
  BASE_URL: 'https://wa.me/',
  DEFAULT_MESSAGE: 'Bonjour, je suis intéressé par vos produits.'
} as const;

// Intervalles de mise à jour
export const UPDATE_INTERVALS = {
  NOTIFICATIONS: 30000, // 30 secondes
  ORDERS: 60000,        // 1 minute
  STATS: 300000         // 5 minutes
} as const;