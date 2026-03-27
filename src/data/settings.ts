import { Settings } from '@/types/settings';

export const settings: Settings = {
  id: '1',
  siteName: 'CamerShop',
  siteDescription: 'La première marketplace du Cameroun - Votre boutique en ligne de confiance',
  logo: '/images/logo.png',
  favicon: '/images/favicon.ico',
  primaryColor: '#FF6B35',
  secondaryColor: '#2E8B57',
  currency: 'XAF',
  currencySymbol: 'FCFA',
  taxRate: 19.25, // TVA Cameroun
  shippingCost: 2500, // 2500 FCFA
  freeShippingThreshold: 50000, // 50 000 FCFA
  contactEmail: 'contact@camershop.cm',
  contactPhone: '+237 6 XX XX XX XX',
  phoneNumber: '+237 6 XX XX XX XX',
  address: 'Avenue Kennedy, Quartier Bonanjo',
  language: 'fr',
  timezone: 'Africa/Douala',
  socialMedia: {
    facebook: 'https://facebook.com/camershop',
    twitter: 'https://twitter.com/camershop',
    instagram: 'https://instagram.com/camershop',
    linkedin: 'https://linkedin.com/company/camershop'
  },
  email: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'noreply@camershop.cm',
    smtpPassword: 'your-app-password',
    fromEmail: 'noreply@camershop.cm',
    fromName: 'CamerShop'
  },
  payment: {
    stripePublicKey: 'pk_test_xxxxxxxxxxxxxxxxxxxx',
    stripeSecretKey: 'sk_test_xxxxxxxxxxxxxxxxxxxx',
    paypalClientId: 'AXxxxxxxxxxxxxxxxxxxxxxxxxx',
    paypalSecret: 'ELxxxxxxxxxxxxxxxxxxxxxxxxx'
  },
  shipping: {
    shippingMethods: [
      {
        name: 'Livraison Standard',
        price: 2500,
        description: 'Livraison sous 3-5 jours ouvrables'
      },
      {
        name: 'Livraison Express',
        price: 5000,
        description: 'Livraison sous 24-48h'
      },
      {
        name: 'Livraison Premium',
        price: 7500,
        description: 'Livraison le jour même (Douala/Yaoundé)'
      },
      {
        name: 'Point Relais',
        price: 1500,
        description: 'Retrait en point relais sous 2-4 jours'
      },
      {
        name: 'Livraison Gratuite',
        price: 0,
        description: 'Livraison gratuite pour les commandes de plus de 50 000 FCFA'
      }
    ],
    freeShippingThreshold: 50000
  },
  seo: {
    title: 'CamerShop - Marketplace #1 au Cameroun | Electronics, Mode, Maison',
    description: 'Découvrez CamerShop, la première marketplace du Cameroun. Large choix de produits : électronique, mode, maison, beauté. Livraison rapide à Douala, Yaoundé et partout au Cameroun.',
    keywords: [
      'cameroun',
      'marketplace',
      'e-commerce',
      'douala',
      'yaoundé',
      'électronique',
      'mode',
      'maison',
      'beauté',
      'livraison',
      'shopping',
      'boutique en ligne',
      'cameroun shopping',
      'achats en ligne'
    ]
  },
  maintenance: false,
  updatedAt: '2024-03-15T10:30:00.000Z'
};