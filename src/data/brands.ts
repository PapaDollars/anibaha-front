import { Company } from '@/types/company';

export const companies: Company[] = [
  
  {
    id: '9',
    name: 'Beauty Care Cameroun',
    slug: 'beauty-care-cameroun',
    description: 'Reveal your beauty - Soins et cosmétiques naturels made in Cameroun',
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    status: 'approved',
    isActive: true,
    isVerified: true,
    ownerId: '4', // Patricia Essomba
    owner: undefined,
    businessInfo: {
      registrationNumber: 'CM-DLA-2020-BC001',
      taxNumber: 'CM-TVA-M012345678',
      businessType: 'company',
      foundedYear: 2020,
      employeeCount: '5-10',
      annualRevenue: '50M-100M',
      industry: 'Cosmétiques & Beauté',
      website: 'https://www.beautycare.cm'
    },
    contactInfo: {
      email: 'contact@beautycare.cm',
      phone: '+237 654 456 789',
      whatsapp: '+237 654 456 789',
      address: {
        id: 'beauty-addr-1',
        street: 'Rue de la Réunification, Akwa',
        city: 'Douala',
        postalCode: '5963',
        country: 'Cameroun',
        region: 'Littoral',
        isDefault: true,
        label: 'Boutique Principale',
        coordinates: {
          latitude: 4.0511,
          longitude: 9.7011
        }
      },
      workingHours: {
        monday: { open: '08:00', close: '18:00', isOpen: true },
        tuesday: { open: '08:00', close: '18:00', isOpen: true },
        wednesday: { open: '08:00', close: '18:00', isOpen: true },
        thursday: { open: '08:00', close: '18:00', isOpen: true },
        friday: { open: '08:00', close: '18:00', isOpen: true },
        saturday: { open: '08:00', close: '16:00', isOpen: true },
        sunday: { open: '10:00', close: '14:00', isOpen: true }
      }
    },
    socialMedia: {
      facebook: 'https://facebook.com/beautycarecm',
      instagram: 'https://instagram.com/beautycare_cm',
      whatsapp: '+237654456789',
      tiktok: 'https://tiktok.com/@beautycarecm'
    },
    settings: {
      theme: {
        primaryColor: '#E91E63',
        secondaryColor: '#FFC107',
        logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80',
        banner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80'
      },
      policies: {
        returnPolicy: 'Retour sous 15 jours si produit non ouvert',
        shippingPolicy: 'Livraison Douala/Yaoundé sous 48h',
        privacyPolicy: 'Respect total de la confidentialité client',
        termsOfService: 'Conditions générales Beauty Care'
      },
      integrations: {
        paymentGateways: ['orange_money', 'mtn_money', 'express_union'],
        shippingProviders: ['cam_post', 'express_union', 'bike_delivery'],
        analytics: ['google_analytics']
      }
    },
    stats: {
      totalProducts: 4,
      totalOrders: 89,
      totalRevenue: 1250000, // 1.25M FCFA
      averageRating: 4.8,
      totalReviews: 156,
      responseTime: 5,
      responseRate: 96
    },
    verificationDocuments: ['registre_commerce.pdf', 'patente.pdf', 'certificat_origine.pdf'],
    verifiedAt: '2024-01-10T16:00:00.000Z',
    subscription: {
      plan: 'premium',
      expiresAt: '2024-12-31T23:59:59.000Z',
      features: ['unlimited_products', 'priority_support', 'analytics', 'whatsapp_integration']
    },
    metadata: {
      localBrand: true,
      certifications: ['Produits Naturels', 'Made in Cameroun'],
      deliveryZones: ['Douala', 'Yaoundé', 'Bafoussam']
    },
    tags: ['local_brand', 'cosmetics', 'natural', 'women_owned', 'verified'],
    createdAt: '2024-01-10T15:30:00.000Z',
    updatedAt: '2024-03-15T08:20:00.000Z'
  },
  {
    id: '15',
    name: 'Tech Pro Cameroun',
    slug: 'tech-pro-cameroun',
    description: 'Technology redefined - Innovation technologique accessible au Cameroun',
    logo: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80',
    status: 'approved',
    isActive: true,
    isVerified: true,
    ownerId: '3', // Alice Admin (multi-company)
    owner: undefined,
    businessInfo: {
      registrationNumber: 'CM-YDE-2022-TP001',
      taxNumber: 'CM-TVA-M087654321',
      businessType: 'company',
      foundedYear: 2022,
      employeeCount: '10-25',
      annualRevenue: '100M-500M',
      industry: 'Électronique & Technologie',
      website: 'https://www.techpro.cm'
    },
    contactInfo: {
      email: 'info@techpro.cm',
      phone: '+237 699 123 789',
      whatsapp: '+237 699 123 789',
      address: {
        id: 'tech-addr-1',
        street: 'Immeuble CCEI, Rue 1.750, Bastos',
        city: 'Yaoundé',
        postalCode: '8020',
        country: 'Cameroun',
        region: 'Centre',
        isDefault: true,
        label: 'Siège Social & Showroom',
        coordinates: {
          latitude: 3.8667,
          longitude: 11.5167
        }
      },
      workingHours: {
        monday: { open: '08:30', close: '17:30', isOpen: true },
        tuesday: { open: '08:30', close: '17:30', isOpen: true },
        wednesday: { open: '08:30', close: '17:30', isOpen: true },
        thursday: { open: '08:30', close: '17:30', isOpen: true },
        friday: { open: '08:30', close: '17:30', isOpen: true },
        saturday: { open: '09:00', close: '15:00', isOpen: true },
        sunday: { open: '00:00', close: '00:00', isOpen: false }
      }
    },
    socialMedia: {
      facebook: 'https://facebook.com/techprocm',
      instagram: 'https://instagram.com/techpro_cm',
      linkedin: 'https://linkedin.com/company/techprocm',
      whatsapp: '+237699123789',
      youtube: 'https://youtube.com/@techprocm'
    },
    settings: {
      theme: {
        primaryColor: '#2196F3',
        secondaryColor: '#FF9800',
        logo: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=200&q=80',
        banner: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80'
      },
      policies: {
        returnPolicy: 'Garantie constructeur + SAV local',
        shippingPolicy: 'Installation à domicile disponible',
        privacyPolicy: 'Données clients sécurisées',
        termsOfService: 'Conditions Tech Pro Cameroun'
      },
      integrations: {
        paymentGateways: ['orange_money', 'mtn_money', 'express_union', 'visa', 'mastercard'],
        shippingProviders: ['cam_post', 'dhl', 'fedex', 'installation_team'],
        analytics: ['google_analytics', 'facebook_pixel']
      }
    },
    stats: {
      totalProducts: 6,
      totalOrders: 145,
      totalRevenue: 3200000, // 3.2M FCFA
      averageRating: 4.6,
      totalReviews: 234,
      responseTime: 8,
      responseRate: 94
    },
    verificationDocuments: ['registre_commerce.pdf', 'patente.pdf', 'agrement_distributeur.pdf'],
    verifiedAt: '2024-02-01T10:00:00.000Z',
    subscription: {
      plan: 'premium',
      expiresAt: '2025-02-01T00:00:00.000Z',
      features: ['unlimited_products', 'priority_support', 'analytics', 'installation_service']
    },
    metadata: {
      localBrand: true,
      certifications: ['Distributeur Agréé', 'SAV Certifié'],
      serviceZones: ['Centre', 'Littoral', 'Ouest'],
      warranty: 'Garantie locale 2 ans'
    },
    tags: ['electronics', 'local_distributor', 'warranty', 'installation', 'verified'],
    createdAt: '2024-02-01T10:00:00.000Z',
    updatedAt: '2024-03-15T12:30:00.000Z'
  },
  {
    id: '16',
    name: 'CamerShop Local',
    slug: 'camershop-local',
    description: 'Marketplace locale - Produits 100% camerounais',
    logo: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    status: 'pending',
    isActive: true,
    isVerified: false,
    ownerId: '5', // Paul Kamdem (nouveau vendeur)
    owner: undefined,
    businessInfo: {
      registrationNumber: 'CM-YDE-2024-CS001',
      taxNumber: 'Pending',
      businessType: 'individual',
      foundedYear: 2024,
      employeeCount: '1-5',
      annualRevenue: '10M-50M',
      industry: 'Marketplace Locale',
      website: 'https://www.camershop-local.cm'
    },
    contactInfo: {
      email: 'paul@camershop-local.cm',
      phone: '+237 682 567 890',
      whatsapp: '+237 682 567 890',
      address: {
        id: 'local-addr-1',
        street: 'Quartier Melen, Rue 4.321',
        city: 'Yaoundé',
        postalCode: '8020',
        country: 'Cameroun',
        region: 'Centre',
        isDefault: true,
        label: 'Domicile/Bureau',
        coordinates: {
          latitude: 3.8480,
          longitude: 11.5021
        }
      },
      workingHours: {
        monday: { open: '09:00', close: '17:00', isOpen: true },
        tuesday: { open: '09:00', close: '17:00', isOpen: true },
        wednesday: { open: '09:00', close: '17:00', isOpen: true },
        thursday: { open: '09:00', close: '17:00', isOpen: true },
        friday: { open: '09:00', close: '17:00', isOpen: true },
        saturday: { open: '10:00', close: '15:00', isOpen: true },
        sunday: { open: '00:00', close: '00:00', isOpen: false }
      }
    },
    socialMedia: {
      whatsapp: '+237682567890',
      facebook: 'https://facebook.com/camershoplocal'
    },
    settings: {
      theme: {
        primaryColor: '#4CAF50',
        secondaryColor: '#FF5722',
        logo: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80',
        banner: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      },
      policies: {
        returnPolicy: 'Échange sous 7 jours',
        shippingPolicy: 'Livraison Yaoundé uniquement',
        privacyPolicy: 'Respect de la vie privée',
        termsOfService: 'Conditions CamerShop Local'
      },
      integrations: {
        paymentGateways: ['orange_money', 'mtn_money'],
        shippingProviders: ['bike_delivery', 'pickup'],
        analytics: []
      }
    },
    stats: {
      totalProducts: 8,
      totalOrders: 12,
      totalRevenue: 185000, // 185k FCFA
      averageRating: 4.2,
      totalReviews: 8,
      responseTime: 45,
      responseRate: 75
    },
    verificationDocuments: ['cni.pdf', 'justificatif_domicile.pdf'],
    verifiedAt: undefined,
    subscription: {
      plan: 'basic',
      expiresAt: '2024-06-01T00:00:00.000Z',
      features: ['basic_listing', 'whatsapp_support']
    },
    metadata: {
      newSeller: true,
      needsVerification: true,
      trialPeriod: true
    },
    tags: ['new_seller', 'local', 'individual', 'trial'],
    createdAt: '2024-03-10T16:45:00.000Z',
    updatedAt: '2024-03-15T14:20:00.000Z'
  }
];