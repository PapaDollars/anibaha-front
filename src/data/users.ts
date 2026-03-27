import { User, Address, UserPreferences, SocialMediaLinks } from '@/types/user';
import { USER_ROLES, USER_STATUS } from '@/utils/constants';

export const users: User[] = [
  {
    id: '1',
    password: 'password123', // Hashed password
    email: 'user@test.com',
    firstName: 'Marie',
    lastName: 'Kouam',
    displayName: 'Marie K.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    phone: '+237 690 123 456',
    role: USER_ROLES.CLIENT,
    status: USER_STATUS.ACTIVE,
    isVerified: true,
    isActive: true,
    lastLogin: '2024-03-15T09:30:00.000Z',
    loginCount: 45,
    dateOfBirth: '1992-08-15',
    gender: 'female',
    addresses: [
      {
        id: 'addr-1',
        street: 'Rue 1.234, Quartier Bastos',
        city: 'Yaoundé',
        postalCode: '8020',
        country: 'Cameroun',
        region: 'Centre',
        isDefault: true,
        label: 'Domicile',
        coordinates: {
          latitude: 3.8667,
          longitude: 11.5167
        }
      },
      {
        id: 'addr-2',
        street: 'Avenue Charles de Gaulle, Bonanjo',
        city: 'Douala',
        postalCode: '5963',
        country: 'Cameroun',
        region: 'Littoral',
        isDefault: false,
        label: 'Bureau',
        coordinates: {
          latitude: 4.0511,
          longitude: 9.7679
        }
      }
    ],
    preferences: {
      language: 'fr',
      currency: 'XAF',
      theme: 'light',
      notifications: {
        email: true,
        sms: true,
        push: true,
        whatsapp: true,
        marketing: false,
        orders: true,
        promotions: true,
        security: true
      },
      privacy: {
        profileVisibility: 'private',
        showOnlineStatus: true,
        allowMessages: true
      }
    },
    socialMedia: {
      facebook: 'https://facebook.com/marie.kouam',
      instagram: 'https://instagram.com/mariekouam',
      whatsapp: '+237690123456'
    },
    companyId: undefined,
    company: undefined,
    totalOrders: 12,
    totalSpent: 485000, // 485 000 FCFA
    averageOrderValue: 40416, // ~40 000 FCFA
    loyaltyPoints: 1250,
    referralCode: 'MARIE2024',
    referredBy: undefined,
    twoFactorEnabled: false,
    emailVerifiedAt: '2024-01-15T14:20:00.000Z',
    phoneVerifiedAt: '2024-01-15T14:25:00.000Z',
    passwordChangedAt: '2024-02-10T16:45:00.000Z',
    metadata: {
      preferredPaymentMethod: 'mobile_money',
      favoriteCategories: ['beauty', 'fashion'],
      customerSegment: 'premium'
    },
    tags: ['premium_customer', 'frequent_buyer', 'beauty_enthusiast'],
    createdAt: '2024-01-15T14:20:00.000Z',
    updatedAt: '2024-03-15T09:30:00.000Z'
  },
  {
    id: '2',
    password: 'password123',
    email: 'user2@test.com',
    firstName: 'Jean',
    lastName: 'Mballa',
    displayName: 'Jean M.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '+237 677 234 567',
    role: USER_ROLES.CLIENT,
    status: USER_STATUS.ACTIVE,
    isVerified: true,
    isActive: true,
    lastLogin: '2024-03-14T18:45:00.000Z',
    loginCount: 28,
    dateOfBirth: '1987-03-22',
    gender: 'male',
    addresses: [
      {
        id: 'addr-3',
        street: 'Rue Joss, Quartier Deido',
        city: 'Douala',
        postalCode: '5963',
        country: 'Cameroun',
        region: 'Littoral',
        isDefault: true,
        label: 'Domicile',
        coordinates: {
          latitude: 4.0611,
          longitude: 9.7011
        }
      }
    ],
    preferences: {
      language: 'fr',
      currency: 'XAF',
      theme: 'dark',
      notifications: {
        email: true,
        sms: false,
        push: true,
        whatsapp: true,
        marketing: true,
        orders: true,
        promotions: true,
        security: true
      },
      privacy: {
        profileVisibility: 'public',
        showOnlineStatus: false,
        allowMessages: true
      }
    },
    socialMedia: {
      facebook: 'https://facebook.com/jean.mballa',
      linkedin: 'https://linkedin.com/in/jeanmballa',
      whatsapp: '+237677234567'
    },
    companyId: undefined,
    company: undefined,
    totalOrders: 8,
    totalSpent: 320000,
    averageOrderValue: 40000,
    loyaltyPoints: 800,
    referralCode: 'JEAN2024',
    referredBy: undefined,
    twoFactorEnabled: true,
    emailVerifiedAt: '2024-01-20T10:15:00.000Z',
    phoneVerifiedAt: '2024-01-20T10:20:00.000Z',
    passwordChangedAt: '2024-01-20T10:15:00.000Z',
    metadata: {
      preferredPaymentMethod: 'card',
      favoriteCategories: ['electronics', 'sports'],
      customerSegment: 'regular'
    },
    tags: ['tech_enthusiast', 'sports_lover'],
    createdAt: '2024-01-20T10:15:00.000Z',
    updatedAt: '2024-03-14T18:45:00.000Z'
  },
  {
    id: '3',
    password: 'password123',
    email: 'admin@test.com',
    firstName: 'Alice',
    lastName: 'Ngo Biyack',
    displayName: 'Alice Admin',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    phone: '+237 699 345 678',
    role: USER_ROLES.SUPER_ADMIN,
    status: USER_STATUS.ACTIVE,
    isVerified: true,
    isActive: true,
    lastLogin: '2024-03-15T11:00:00.000Z',
    loginCount: 156,
    dateOfBirth: '1985-11-10',
    gender: 'female',
    addresses: [
      {
        id: 'addr-4',
        street: 'Avenue Kennedy, Quartier Bonanjo',
        city: 'Douala',
        postalCode: '5963',
        country: 'Cameroun',
        region: 'Littoral',
        isDefault: true,
        label: 'Bureau CamerShop',
        coordinates: {
          latitude: 4.0511,
          longitude: 9.7679
        }
      }
    ],
    preferences: {
      language: 'fr',
      currency: 'XAF',
      theme: 'system',
      notifications: {
        email: true,
        sms: true,
        push: true,
        whatsapp: true,
        marketing: false,
        orders: true,
        promotions: false,
        security: true
      },
      privacy: {
        profileVisibility: 'private',
        showOnlineStatus: false,
        allowMessages: false
      }
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/in/alicengobiyack',
      whatsapp: '+237699345678'
    },
    companyId: '1',
    company: undefined, // Would be populated with company data
    totalOrders: 0,
    totalSpent: 0,
    averageOrderValue: 0,
    loyaltyPoints: 0,
    referralCode: undefined,
    referredBy: undefined,
    twoFactorEnabled: true,
    emailVerifiedAt: '2024-01-01T12:00:00.000Z',
    phoneVerifiedAt: '2024-01-01T12:05:00.000Z',
    passwordChangedAt: '2024-03-01T08:30:00.000Z',
    metadata: {
      adminLevel: 'super',
      permissions: ['all'],
      lastAdminAction: '2024-03-15T10:45:00.000Z'
    },
    tags: ['admin', 'super_admin', 'founder'],
    createdAt: '2024-01-01T12:00:00.000Z',
    updatedAt: '2024-03-15T11:00:00.000Z'
  },
  {
    id: '4',
    password: 'password123',
    email: 'company@test.com',
    firstName: 'Patricia',
    lastName: 'Essomba',
    displayName: 'Patricia Beauty',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    phone: '+237 654 456 789',
    role: USER_ROLES.COMPANY,
    status: USER_STATUS.ACTIVE,
    isVerified: true,
    isActive: true,
    lastLogin: '2024-03-15T08:20:00.000Z',
    loginCount: 89,
    dateOfBirth: '1990-06-18',
    gender: 'female',
    addresses: [
      {
        id: 'addr-5',
        street: 'Rue de la Réunification, Akwa',
        city: 'Douala',
        postalCode: '5963',
        country: 'Cameroun',
        region: 'Littoral',
        isDefault: true,
        label: 'Boutique Beauty Care',
        coordinates: {
          latitude: 4.0511,
          longitude: 9.7011
        }
      }
    ],
    preferences: {
      language: 'fr',
      currency: 'XAF',
      theme: 'light',
      notifications: {
        email: true,
        sms: true,
        push: true,
        whatsapp: true,
        marketing: true,
        orders: true,
        promotions: true,
        security: true
      },
      privacy: {
        profileVisibility: 'public',
        showOnlineStatus: true,
        allowMessages: true
      }
    },
    socialMedia: {
      facebook: 'https://facebook.com/beautycarecm',
      instagram: 'https://instagram.com/beautycare_cm',
      whatsapp: '+237654456789'
    },
    companyId: '9', // Beauty Care company
    company: undefined,
    totalOrders: 0, // Vendors don't place orders
    totalSpent: 0,
    averageOrderValue: 0,
    loyaltyPoints: 0,
    referralCode: 'BEAUTY2024',
    referredBy: undefined,
    twoFactorEnabled: false,
    emailVerifiedAt: '2024-01-10T15:30:00.000Z',
    phoneVerifiedAt: '2024-01-10T15:35:00.000Z',
    passwordChangedAt: '2024-02-15T11:20:00.000Z',
    metadata: {
      shopName: 'Beauty Care Cameroun',
      vendorRating: 4.8,
      totalSales: 1250000, // 1.25M FCFA in sales
      productsCount: 15
    },
    tags: ['vendor', 'beauty_specialist', 'verified_seller'],
    createdAt: '2024-01-10T15:30:00.000Z',
    updatedAt: '2024-03-15T08:20:00.000Z'
  },
  {
    id: '5',
    password: 'password123',
    email: 'user2@test.com',
    firstName: 'Paul',
    lastName: 'Kamdem',
    displayName: 'Paul K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '+237 682 567 890',
    role: USER_ROLES.CLIENT,
    status: USER_STATUS.PENDING,
    isVerified: false,
    isActive: true,
    lastLogin: '2024-03-13T20:15:00.000Z',
    loginCount: 3,
    dateOfBirth: '1995-12-03',
    gender: 'male',
    addresses: [
      {
        id: 'addr-6',
        street: 'Quartier Melen, Rue 4.321',
        city: 'Yaoundé',
        postalCode: '8020',
        country: 'Cameroun',
        region: 'Centre',
        isDefault: true,
        label: 'Domicile',
        coordinates: {
          latitude: 3.8480,
          longitude: 11.5021
        }
      }
    ],
    preferences: {
      language: 'fr',
      currency: 'XAF',
      theme: 'light',
      notifications: {
        email: true,
        sms: true,
        push: false,
        whatsapp: false,
        marketing: false,
        orders: true,
        promotions: false,
        security: true
      },
      privacy: {
        profileVisibility: 'private',
        showOnlineStatus: false,
        allowMessages: false
      }
    },
    socialMedia: {
      whatsapp: '+237682567890'
    },
    companyId: undefined,
    company: undefined,
    totalOrders: 1,
    totalSpent: 35000,
    averageOrderValue: 35000,
    loyaltyPoints: 100,
    referralCode: 'PAUL2024',
    referredBy: 'MARIE2024',
    twoFactorEnabled: false,
    emailVerifiedAt: undefined, // Not verified yet
    phoneVerifiedAt: undefined,
    passwordChangedAt: undefined,
    metadata: {
      registrationSource: 'mobile_app',
      customerSegment: 'new'
    },
    tags: ['new_customer', 'referred'],
    createdAt: '2024-03-10T16:45:00.000Z',
    updatedAt: '2024-03-13T20:15:00.000Z'
  }
];