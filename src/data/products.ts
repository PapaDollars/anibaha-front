import { Product } from '@/types/product';
import { PRODUCT_CATEGORIES, PRODUCT_STATUS } from '@/utils/constants';

export const products: Product[] = [
  // Nike - Produits sportifs
  {
    id: '1',
    name: 'Air Max 270',
    slug: 'air-max-270',
    description: 'Chaussure de running avec amorti Air Max',
    price: 150,
    currency: 'XAF',
    images: [
      {
        id: 'img-1-1',
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-1-2',
        url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-1-3',
        url: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.SPORTS,
    brand: 'Nike',
    tags: ['baskets', 'running'],
    companyId: '1',
    stock: 100,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.5,
    reviewCount: 120,
    totalRatings: { 1: 2, 2: 3, 3: 5, 4: 30, 5: 80 },
    views: 500,
    wishlistCount: 50,
    cartAddCount: 40,
    purchaseCount: 25,
    isActive: true,
    isFeatured: true,
    isDigital: false,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  {
    id: '2',
    name: 'Dri-FIT T-Shirt',
    slug: 'dri-fit-t-shirt',
    description: 'T-shirt de sport avec technologie Dri-FIT',
    price: 35,
    currency: 'XAF',
    images: [
      {
        id: 'img-2-1',
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-2-2',
        url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-2-3',
        url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.SPORTS,
    brand: 'Nike',
    tags: ['t-shirt', 'sport'],
    companyId: '1',
    stock: 200,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.2,
    reviewCount: 85,
    totalRatings: { 1: 1, 2: 2, 3: 7, 4: 25, 5: 50 },
    views: 300,
    wishlistCount: 30,
    cartAddCount: 20,
    purchaseCount: 15,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },

  // Adidas - Produits de mode
  {
    id: '3',
    name: 'Ultraboost 22',
    slug: 'ultraboost-22',
    description: 'Chaussure de running avec technologie Boost',
    price: 180,
    currency: 'XAF',
    images: [
      {
        id: 'img-3-1',
        url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop',
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-3-2',
        url: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-3-3',
        url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.FASHION,
    brand: 'Adidas',
    tags: ['baskets', 'boost', 'running'],
    companyId: '2',
    stock: 80,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.7,
    reviewCount: 150,
    totalRatings: { 1: 1, 2: 2, 3: 4, 4: 23, 5: 120 },
    views: 650,
    wishlistCount: 75,
    cartAddCount: 60,
    purchaseCount: 45,
    isActive: true,
    isFeatured: true,
    isDigital: false,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-03-14T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  {
    id: '4',
    name: 'Tiro Track Jacket',
    slug: 'tiro-track-jacket',
    description: 'Veste de sport classique',
    price: 85,
    currency: 'XAF',
    images: [
      {
        id: 'img-4-1',
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop',
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-4-2',
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-4-3',
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.FASHION,
    brand: 'Adidas',
    tags: ['veste', 'sport', 'classique'],
    companyId: '2',
    stock: 150,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.3,
    reviewCount: 95,
    totalRatings: { 1: 1, 2: 3, 3: 8, 4: 33, 5: 50 },
    views: 420,
    wishlistCount: 35,
    cartAddCount: 28,
    purchaseCount: 20,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-03-14T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },

  // Puma - Produits électroniques
  {
    id: '5',
    name: 'Smartwatch RS-X',
    slug: 'smartwatch-rs-x',
    description: 'Montre connectée avec style unique',
    price: 299,
    currency: 'XAF',
    images: [
      {
        id: 'img-5-1',
        url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop',
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-5-2',
        url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-5-3',
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.ELECTRONICS,
    brand: 'Puma',
    tags: ['smartwatch', 'connectée', 'sport'],
    companyId: '3',
    stock: 120,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.4,
    reviewCount: 110,
    totalRatings: { 1: 2, 2: 3, 3: 8, 4: 37, 5: 60 },
    views: 580,
    wishlistCount: 65,
    cartAddCount: 45,
    purchaseCount: 35,
    isActive: true,
    isFeatured: true,
    isDigital: false,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-03-13T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  {
    id: '6',
    name: 'Casque Bluetooth Essentials',
    slug: 'casque-bluetooth-essentials',
    description: 'Casque sans fil avec réduction de bruit',
    price: 149,
    currency: 'XAF',
    images: [
      {
        id: 'img-6-1',
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-6-2',
        url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-6-3',
        url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.ELECTRONICS,
    brand: 'Puma',
    tags: ['casque', 'bluetooth', 'sans-fil'],
    companyId: '3',
    stock: 180,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.1,
    reviewCount: 75,
    totalRatings: { 1: 1, 2: 4, 3: 10, 4: 25, 5: 35 },
    views: 350,
    wishlistCount: 40,
    cartAddCount: 30,
    purchaseCount: 22,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-03-13T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },

  // Under Armour - Produits pour la maison
  {
    id: '7',
    name: 'Matelas de Yoga HOVR',
    slug: 'matelas-yoga-hovr',
    description: 'Matelas de yoga avec technologie HOVR',
    price: 89,
    currency: 'XAF',
    images: [
      {
        id: 'img-7-1',
        url: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&h=500&fit=crop',
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-7-2',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-7-3',
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.HOME,
    brand: 'Under Armour',
    tags: ['yoga', 'matelas', 'fitness'],
    companyId: '4',
    stock: 90,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.6,
    reviewCount: 45,
    totalRatings: { 1: 0, 2: 1, 3: 2, 4: 15, 5: 27 },
    views: 280,
    wishlistCount: 25,
    cartAddCount: 18,
    purchaseCount: 12,
    isActive: true,
    isFeatured: true,
    isDigital: false,
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-03-12T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  {
    id: '8',
    name: 'Tapis de Fitness Tech 2.0',
    slug: 'tapis-fitness-tech-2-0',
    description: 'Tapis de fitness avec technologie anti-dérapante',
    price: 69,
    currency: 'XAF',
    images: [
      {
        id: 'img-8-1',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-8-2',
        url: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-8-3',
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.HOME,
    brand: 'Under Armour',
    tags: ['tapis', 'fitness', 'antidérapant'],
    companyId: '4',
    stock: 160,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.2,
    reviewCount: 38,
    totalRatings: { 1: 1, 2: 1, 3: 4, 4: 12, 5: 20 },
    views: 220,
    wishlistCount: 20,
    cartAddCount: 15,
    purchaseCount: 10,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-03-12T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },

  // New Balance - Produits de beauté
  {
    id: '9',
    name: 'Kit de Soin Performance',
    slug: 'kit-soin-performance',
    description: 'Kit complet de soin pour sportifs',
    price: 79,
    currency: 'XAF',
    images: [
      {
        id: 'img-9-1',
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop',
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-9-2',
        url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-9-3',
        url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.BEAUTY,
    brand: 'New Balance',
    tags: ['soin', 'kit', 'performance'],
    companyId: '5',
    stock: 110,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.8,
    reviewCount: 92,
    totalRatings: { 1: 0, 2: 1, 3: 3, 4: 18, 5: 70 },
    views: 380,
    wishlistCount: 45,
    cartAddCount: 35,
    purchaseCount: 28,
    isActive: true,
    isFeatured: true,
    isDigital: false,
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-03-11T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  {
    id: '10',
    name: 'Crème Hydratante Sport',
    slug: 'creme-hydratante-sport',
    description: 'Crème hydratante spéciale sportifs',
    price: 45,
    currency: 'XAF',
    images: [
      {
        id: 'img-10-1',
        url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop',
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-10-2',
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-10-3',
        url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop',
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.BEAUTY,
    brand: 'New Balance',
    tags: ['crème', 'hydratante', 'sport'],
    companyId: '5',
    stock: 140,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.5,
    reviewCount: 67,
    totalRatings: { 1: 1, 2: 2, 3: 5, 4: 20, 5: 39 },
    views: 290,
    wishlistCount: 30,
    cartAddCount: 22,
    purchaseCount: 18,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-03-11T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },

  // Mode
  {
    id: "11",
    name: "Veste en Cuir Premium",
    slug: "veste-cuir-premium",
    description: "Veste en cuir véritable de haute qualité",
    price: 299.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-11-1',
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-11-2',
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-11-3',
        url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.FASHION,
    brand: "Premium Fashion",
    tags: ['veste', 'cuir', 'premium'],
    companyId: "1",
    stock: 25,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.6,
    reviewCount: 45,
    totalRatings: { 1: 0, 2: 1, 3: 3, 4: 15, 5: 26 },
    views: 450,
    wishlistCount: 55,
    cartAddCount: 25,
    purchaseCount: 18,
    isActive: true,
    isFeatured: true,
    isDigital: false,
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-03-12T10:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Maison
  {
    id: "12",
    name: "Canapé Moderne",
    slug: "canape-moderne",
    description: "Canapé design et confortable pour votre salon",
    price: 799.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-12-1',
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-12-2',
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-12-3',
        url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.HOME,
    brand: "Modern Home",
    tags: ['canapé', 'moderne', 'salon'],
    companyId: "1",
    stock: 15,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.5,
    reviewCount: 67,
    totalRatings: { 1: 1, 2: 2, 3: 6, 4: 23, 5: 35 },
    views: 520,
    wishlistCount: 40,
    cartAddCount: 20,
    purchaseCount: 12,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-03-11T11:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Sport
  {
    id: "13",
    name: "Vélo de Course",
    slug: "velo-course",
    description: "Vélo de course professionnel",
    price: 1499.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-13-1',
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-13-2',
        url: "https://images.unsplash.com/photo-1544191696-15693072fc14?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-13-3',
        url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.SPORTS,
    brand: "Pro Cycling",
    tags: ['vélo', 'course', 'professionnel'],
    companyId: "1",
    stock: 10,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.9,
    reviewCount: 34,
    totalRatings: { 1: 0, 2: 0, 3: 1, 4: 2, 5: 31 },
    views: 680,
    wishlistCount: 85,
    cartAddCount: 15,
    purchaseCount: 8,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-06T00:00:00.000Z',
    updatedAt: '2024-03-10T12:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Beauté
  {
    id: "14",
    name: "Kit de Soin Visage",
    slug: "kit-soin-visage",
    description: "Kit complet de soin pour le visage",
    price: 89.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-14-1',
        url: "https://luvtoi.ca/cdn/shop/files/KitMaison-SoinVisageBIOEFFECTLUVTOI.png?v=1739716331",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-14-2',
        url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-14-3',
        url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.BEAUTY,
    brand: "Beauty Care",
    tags: ['soin', 'visage', 'kit'],
    companyId: "1",
    stock: 40,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.7,
    reviewCount: 156,
    totalRatings: { 1: 1, 2: 3, 3: 8, 4: 44, 5: 100 },
    views: 720,
    wishlistCount: 95,
    cartAddCount: 75,
    purchaseCount: 45,
    isActive: true,
    isFeatured: true,
    isDigital: false,
    createdAt: '2024-01-07T00:00:00.000Z',
    updatedAt: '2024-03-09T13:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Jouets
  {
    id: "15",
    name: "Robot Éducatif",
    slug: "robot-educatif",
    description: "Robot programmable pour apprendre le codage",
    price: 149.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-15-1',
        url: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-15-2',
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-15-3',
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.TOYS,
    brand: "EduTech",
    tags: ['robot', 'éducatif', 'programmable'],
    companyId: "1",
    stock: 0,
    trackQuantity: true,
    allowBackorder: true,
    hasVariants: false,
    rating: 4.8,
    reviewCount: 78,
    totalRatings: { 1: 0, 2: 1, 3: 2, 4: 15, 5: 60 },
    views: 450,
    wishlistCount: 120,
    cartAddCount: 35,
    purchaseCount: 25,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-08T00:00:00.000Z',
    updatedAt: '2024-03-08T14:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Livres
  {
    id: "16",
    name: "Collection Romans",
    slug: "collection-romans",
    description: "Collection de 5 romans best-sellers",
    price: 49.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-16-1',
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-16-2',
        url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-16-3',
        url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.BOOKS,
    brand: "Literary Collection",
    tags: ['romans', 'collection', 'bestsellers'],
    companyId: "1",
    stock: 60,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.6,
    reviewCount: 92,
    totalRatings: { 1: 1, 2: 2, 3: 5, 4: 24, 5: 60 },
    views: 320,
    wishlistCount: 50,
    cartAddCount: 40,
    purchaseCount: 30,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-09T00:00:00.000Z',
    updatedAt: '2024-03-07T15:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Jardin
  {
    id: "17",
    name: "Kit Jardinage",
    slug: "kit-jardinage",
    description: "Kit complet pour débuter le jardinage",
    price: 79.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-17-1',
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-17-2',
        url: "https://images.unsplash.com/photo-1574882249607-d77c8f7b9764?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-17-3',
        url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.ELECTRONICS,
    brand: "Garden Pro",
    tags: ['jardinage', 'kit', 'débutant'],
    companyId: "1",
    stock: 45,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.5,
    reviewCount: 63,
    totalRatings: { 1: 1, 2: 2, 3: 4, 4: 20, 5: 36 },
    views: 280,
    wishlistCount: 35,
    cartAddCount: 25,
    purchaseCount: 18,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-03-06T16:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Automobile
  {
    id: "18",
    name: "Kit Entretien Voiture",
    slug: "kit-entretien-voiture",
    description: "Kit complet d'entretien automobile",
    price: 129.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-18-1',
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-18-2',
        url: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-18-3',
        url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.FOOD,
    brand: "Auto Care",
    tags: ['entretien', 'voiture', 'automobile'],
    companyId: "1",
    stock: 30,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.7,
    reviewCount: 47,
    totalRatings: { 1: 0, 2: 1, 3: 2, 4: 11, 5: 33 },
    views: 380,
    wishlistCount: 40,
    cartAddCount: 20,
    purchaseCount: 15,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-11T00:00:00.000Z',
    updatedAt: '2024-03-05T17:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Alimentation
  {
    id: "19",
    name: "Coffret Gourmet",
    slug: "coffret-gourmet",
    description: "Sélection de produits gastronomiques",
    price: 159.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-19-1',
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-19-2',
        url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-19-3',
        url: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.FOOD,
    brand: "Gourmet Selection",
    tags: ['gourmet', 'gastronomie', 'coffret'],
    companyId: "1",
    stock: 2,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.9,
    reviewCount: 38,
    totalRatings: { 1: 0, 2: 0, 3: 1, 4: 2, 5: 35 },
    views: 420,
    wishlistCount: 60,
    cartAddCount: 25,
    purchaseCount: 20,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-12T00:00:00.000Z',
    updatedAt: '2024-03-04T18:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de produits électroniques
  {
    id: "20",
    name: "Tablette Pro",
    slug: "tablette-pro",
    description: "Tablette professionnelle pour créatifs",
    price: 699.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-20-1',
        url: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-20-2',
        url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-20-3',
        url: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.ELECTRONICS,
    brand: "Tech Pro",
    tags: ['tablette', 'professionnel', 'créatif'],
    companyId: "1",
    stock: 40,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.8,
    reviewCount: 112,
    totalRatings: { 1: 1, 2: 2, 3: 5, 4: 24, 5: 80 },
    views: 850,
    wishlistCount: 120,
    cartAddCount: 65,
    purchaseCount: 35,
    isActive: true,
    isFeatured: true,
    isDigital: false,
    createdAt: '2024-01-13T00:00:00.000Z',
    updatedAt: '2024-03-03T19:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de mode
  {
    id: "21",
    name: "Sac à Main Designer",
    slug: "sac-main-designer",
    description: "Sac à main élégant et spacieux",
    price: 399.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-21-1',
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-21-2',
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-21-3',
        url: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.FASHION,
    brand: "Designer Bags",
    tags: ['sac', 'designer', 'élégant'],
    companyId: "1",
    stock: 9,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.7,
    reviewCount: 89,
    totalRatings: { 1: 1, 2: 2, 3: 4, 4: 22, 5: 60 },
    views: 620,
    wishlistCount: 85,
    cartAddCount: 35,
    purchaseCount: 25,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-14T00:00:00.000Z',
    updatedAt: '2024-03-02T20:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de maison
  {
    id: "22",
    name: "Lampe Design",
    slug: "lampe-design",
    description: "Lampe moderne pour votre intérieur",
    price: 149.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-22-1',
        url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-22-2',
        url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-22-3',
        url: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.HOME,
    brand: "Modern Design",
    tags: ['lampe', 'design', 'moderne'],
    companyId: "1",
    stock: 35,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.6,
    reviewCount: 67,
    totalRatings: { 1: 1, 2: 1, 3: 4, 4: 20, 5: 41 },
    views: 320,
    wishlistCount: 45,
    cartAddCount: 30,
    purchaseCount: 22,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-03-01T21:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de sport
  {
    id: "23",
    name: "Tapis de Yoga Premium",
    slug: "tapis-yoga-premium",
    description: "Tapis de yoga écologique et antidérapant",
    price: 79.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-23-1',
        url: "https://media.s-bol.com/qmNyYLnXX0or/XDDZq2k/550x433.jpg",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-23-2',
        url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-23-3',
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.SPORTS,
    brand: "Yoga Premium",
    tags: ['yoga', 'tapis', 'écologique'],
    companyId: "1",
    stock: 50,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.8,
    reviewCount: 134,
    totalRatings: { 1: 1, 2: 2, 3: 6, 4: 25, 5: 100 },
    views: 480,
    wishlistCount: 70,
    cartAddCount: 55,
    purchaseCount: 40,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-16T00:00:00.000Z',
    updatedAt: '2024-02-28T22:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de beauté
  {
    id: "24",
    name: "Parfum Signature",
    slug: "parfum-signature",
    description: "Parfum exclusif pour femme",
    price: 129.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-24-1',
        url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-24-2',
        url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-24-3',
        url: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.BEAUTY,
    brand: "Signature Fragrances",
    tags: ['parfum', 'signature', 'femme'],
    companyId: "1",
    stock: 30,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.9,
    reviewCount: 156,
    totalRatings: { 1: 0, 2: 1, 3: 4, 4: 21, 5: 130 },
    views: 680,
    wishlistCount: 110,
    cartAddCount: 65,
    purchaseCount: 45,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-17T00:00:00.000Z',
    updatedAt: '2024-02-27T23:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de jouets
  {
    id: "25",
    name: "Jeu de Construction",
    slug: "jeu-construction",
    description: "Jeu de construction éducatif",
    price: 59.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-25-1',
        url: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-25-2',
        url: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-25-3',
        url: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.TOYS,
    brand: "Construction Toys",
    tags: ['construction', 'éducatif', 'jeu'],
    companyId: "1",
    stock: 5,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.7,
    reviewCount: 89,
    totalRatings: { 1: 1, 2: 2, 3: 5, 4: 21, 5: 60 },
    views: 380,
    wishlistCount: 65,
    cartAddCount: 30,
    purchaseCount: 22,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-18T00:00:00.000Z',
    updatedAt: '2024-02-26T00:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de livres
  {
    id: "26",
    name: "Cuisine du Monde",
    slug: "cuisine-du-monde",
    description: "Livre de recettes internationales",
    price: 39.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-26-1',
        url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-26-2',
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-26-3',
        url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.BOOKS,
    brand: "Culinary Books",
    tags: ['cuisine', 'recettes', 'international'],
    companyId: "1",
    stock: 40,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.8,
    reviewCount: 112,
    totalRatings: { 1: 1, 2: 1, 3: 5, 4: 25, 5: 80 },
    views: 320,
    wishlistCount: 55,
    cartAddCount: 40,
    purchaseCount: 30,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-19T00:00:00.000Z',
    updatedAt: '2024-02-25T01:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de jardin
  {
    id: "27",
    name: "Serre de Jardin",
    slug: "serre-jardin",
    description: "Serre de jardin professionnelle",
    price: 299.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-27-1',
        url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-27-2',
        url: "https://images.unsplash.com/photo-1574882249607-d77c8f7b9764?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-27-3',
        url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.BOOKS,
    brand: "Pro Garden",
    tags: ['serre', 'jardin', 'professionnel'],
    companyId: "1",
    stock: 0,
    trackQuantity: true,
    allowBackorder: true,
    hasVariants: false,
    rating: 4.6,
    reviewCount: 45,
    totalRatings: { 1: 0, 2: 1, 3: 3, 4: 15, 5: 26 },
    views: 420,
    wishlistCount: 80,
    cartAddCount: 25,
    purchaseCount: 15,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-20T00:00:00.000Z',
    updatedAt: '2024-02-24T02:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus d'automobile
  {
    id: "28",
    name: "GPS Voiture",
    slug: "gps-voiture",
    description: "GPS professionnel pour voiture",
    price: 199.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-28-1',
        url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-28-2',
        url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-28-3',
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.FOOD,
    brand: "Auto Navigation",
    tags: ['gps', 'voiture', 'navigation'],
    companyId: "1",
    stock: 25,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.7,
    reviewCount: 78,
    totalRatings: { 1: 1, 2: 1, 3: 4, 4: 20, 5: 52 },
    views: 450,
    wishlistCount: 60,
    cartAddCount: 30,
    purchaseCount: 20,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-21T00:00:00.000Z',
    updatedAt: '2024-02-23T03:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus d'alimentation
  {
    id: "29",
    name: "Thé Premium",
    slug: "the-premium",
    description: "Collection de thés rares",
    price: 69.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-29-1',
        url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-29-2',
        url: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-29-3',
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.FOOD,
    brand: "Premium Tea",
    tags: ['thé', 'premium', 'collection'],
    companyId: "1",
    stock: 35,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.9,
    reviewCount: 92,
    totalRatings: { 1: 0, 2: 0, 3: 2, 4: 8, 5: 82 },
    views: 380,
    wishlistCount: 70,
    cartAddCount: 45,
    purchaseCount: 35,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-22T00:00:00.000Z',
    updatedAt: '2024-02-22T04:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de produits électroniques
  {
    id: "30",
    name: "Enceinte Bluetooth",
    slug: "enceinte-bluetooth",
    description: "Enceinte portable haute qualité",
    price: 129.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-30-1',
        url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-30-2',
        url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-30-3',
        url: "https://images.unsplash.com/photo-1563030103-88fde0c23425?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.ELECTRONICS,
    brand: "Audio Pro",
    tags: ['enceinte', 'bluetooth', 'portable'],
    companyId: "1",
    stock: 40,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.8,
    reviewCount: 156,
    totalRatings: { 1: 1, 2: 2, 3: 6, 4: 27, 5: 120 },
    views: 520,
    wishlistCount: 85,
    cartAddCount: 60,
    purchaseCount: 40,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-23T00:00:00.000Z',
    updatedAt: '2024-02-21T05:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de mode
  {
    id: "31",
    name: "Montre Connectée",
    slug: "montre-connectee",
    description: "Montre connectée avec suivi d'activité",
    price: 249.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-31-1',
        url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-31-2',
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-31-3',
        url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.FASHION,
    brand: "Smart Fashion",
    tags: ['montre', 'connectée', 'activité'],
    companyId: "1",
    stock: 30,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.7,
    reviewCount: 134,
    totalRatings: { 1: 1, 2: 3, 3: 8, 4: 32, 5: 90 },
    views: 680,
    wishlistCount: 95,
    cartAddCount: 55,
    purchaseCount: 35,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-24T00:00:00.000Z',
    updatedAt: '2024-02-20T06:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  },
  // Plus de maison
  {
    id: "32",
    name: "Cuisine Modulaire",
    slug: "cuisine-modulaire",
    description: "Kit de cuisine modulaire",
    price: 899.99,
    currency: 'XAF',
    images: [
      {
        id: 'img-32-1',
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
        isPrimary: true,
        order: 1
      },
      {
        id: 'img-32-2',
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 2
      },
      {
        id: 'img-32-3',
        url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop",
        isPrimary: false,
        order: 3
      }
    ],
    category: PRODUCT_CATEGORIES.HOME,
    brand: "Modular Kitchen",
    tags: ['cuisine', 'modulaire', 'kit'],
    companyId: "1",
    stock: 10,
    trackQuantity: true,
    allowBackorder: false,
    hasVariants: false,
    rating: 4.9,
    reviewCount: 45,
    totalRatings: { 1: 0, 2: 0, 3: 1, 4: 4, 5: 40 },
    views: 750,
    wishlistCount: 120,
    cartAddCount: 35,
    purchaseCount: 8,
    isActive: true,
    isFeatured: false,
    isDigital: false,
    createdAt: '2024-01-25T00:00:00.000Z',
    updatedAt: '2024-02-19T07:00:00.000Z',
    status: PRODUCT_STATUS.ACTIVE,
    variants: [],
    specifications: [],
    dimensions: { unit: 'cm' }
  }
];