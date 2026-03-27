import { Category } from "@/types/category";

export const categories: Category[] = [
  {
    id: "1",
    name: "Électronique",
    slug: "electronics",
    description: "Tous nos produits électroniques et gadgets",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop",
    icon: "📱",
    parentId: undefined,
    parent: undefined,
    children: [],
    level: 0,
    featured: true,
    active: true,
    productsCount: 6,
    seoData: {
      title: "Électronique - Smartphones, Ordinateurs et Gadgets",
      description: "Découvrez notre large gamme de produits électroniques : smartphones, tablettes, ordinateurs, accessoires high-tech et gadgets innovants.",
      keywords: ["électronique", "smartphone", "tablette", "ordinateur", "gadget", "high-tech", "accessoires"]
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z'
  },
  {
    id: "2",
    name: "Mode",
    slug: "fashion",
    description: "Vêtements et accessoires tendance",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
    icon: "👗",
    parentId: undefined,
    parent: undefined,
    children: [],
    level: 0,
    featured: true,
    active: true,
    productsCount: 5,
    seoData: {
      title: "Mode - Vêtements et Accessoires Tendance",
      description: "Explorez notre collection mode : vêtements femme, homme, accessoires de mode et les dernières tendances vestimentaires.",
      keywords: ["mode", "vêtements", "accessoires", "tendance", "fashion", "style", "garde-robe"]
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z'
  },
  {
    id: "3",
    name: "Maison",
    slug: "home",
    description: "Décoration et ameublement",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
    icon: "🏠",
    parentId: undefined,
    parent: undefined,
    children: [],
    level: 0,
    featured: true,
    active: true,
    productsCount: 5,
    seoData: {
      title: "Maison & Décoration - Mobilier et Objets Déco",
      description: "Aménagez votre intérieur avec notre sélection de meubles, objets de décoration et accessoires pour la maison.",
      keywords: ["maison", "décoration", "mobilier", "ameublement", "intérieur", "déco", "design"]
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z'
  },
  {
    id: "4",
    name: "Sport",
    slug: "sports",
    description: "Équipement sportif et accessoires",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    icon: "⚽",
    parentId: undefined,
    parent: undefined,
    children: [],
    level: 0,
    featured: true,
    active: true,
    productsCount: 6,
    seoData: {
      title: "Sport & Fitness - Équipements et Accessoires Sportifs",
      description: "Équipez-vous pour le sport avec notre gamme d'articles de fitness, vêtements de sport et accessoires d'entraînement.",
      keywords: ["sport", "fitness", "équipement", "musculation", "running", "yoga", "entraînement"]
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z'
  },
  {
    id: "5",
    name: "Beauté",
    slug: "beauty",
    description: "Produits de beauté et cosmétiques",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=300&fit=crop",
    icon: "💄",
    parentId: undefined,
    parent: undefined,
    children: [],
    level: 0,
    featured: false,
    active: true,
    productsCount: 4,
    seoData: {
      title: "Beauté & Cosmétiques - Soins et Maquillage",
      description: "Prenez soin de vous avec notre sélection de produits de beauté, cosmétiques, soins du visage et parfums.",
      keywords: ["beauté", "cosmétiques", "maquillage", "soins", "parfum", "skincare", "bien-être"]
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z'
  },
  {
    id: "6",
    name: "Jouets",
    slug: "toys",
    description: "Jouets et jeux pour tous les âges",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&h=300&fit=crop",
    icon: "🧸",
    parentId: undefined,
    parent: undefined,
    children: [],
    level: 0,
    featured: true,
    active: true,
    productsCount: 2,
    seoData: {
      title: "Jouets & Jeux - Divertissement pour Enfants",
      description: "Découvrez notre collection de jouets éducatifs, jeux de société et divertissements pour enfants de tous âges.",
      keywords: ["jouets", "jeux", "enfants", "éducatif", "divertissement", "loisirs", "cadeau"]
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z'
  },
  {
    id: "7",
    name: "Livres",
    slug: "books",
    description: "Livres, e-books et magazines",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop",
    icon: "📚",
    parentId: undefined,
    parent: undefined,
    children: [],
    level: 0,
    featured: true,
    active: true,
    productsCount: 2,
    seoData: {
      title: "Livres & Littérature - Romans, Guides et Magazines",
      description: "Plongez dans notre univers littéraire : romans, guides pratiques, livres de cuisine et magazines spécialisés.",
      keywords: ["livres", "littérature", "romans", "lecture", "e-books", "magazines", "culture"]
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z'
  },
  {
    id: "8",
    name: "Jardin",
    slug: "garden",
    description: "Équipement et accessoires de jardinage",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
    icon: "🌱",
    parentId: undefined,
    parent: undefined,
    children: [],
    level: 0,
    featured: false,
    active: true,
    productsCount: 2,
    seoData: {
      title: "Jardin & Extérieur - Outils et Accessoires de Jardinage",
      description: "Cultivez votre passion du jardinage avec nos outils, plantes, graines et accessoires d'extérieur.",
      keywords: ["jardin", "jardinage", "plantes", "outils", "extérieur", "horticulture", "potager"]
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z'
  },
  {
    id: "9",
    name: "Automobile",
    slug: "auto",
    description: "Pièces et accessoires automobiles",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop",
    icon: "🚗",
    parentId: undefined,
    parent: undefined,
    children: [],
    level: 0,
    featured: false,
    active: true,
    productsCount: 2,
    seoData: {
      title: "Automobile - Pièces Détachées et Accessoires Auto",
      description: "Entretenez et personnalisez votre véhicule avec notre gamme de pièces détachées et accessoires automobiles.",
      keywords: ["automobile", "auto", "pièces détachées", "accessoires", "entretien", "voiture", "mécanique"]
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z'
  },
  {
    id: "10",
    name: "Alimentation",
    slug: "food",
    description: "Produits alimentaires et boissons",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    icon: "🍽️",
    parentId: undefined,
    parent: undefined,
    children: [],
    level: 0,
    featured: false,
    active: true,
    productsCount: 2,
    seoData: {
      title: "Alimentation & Gastronomie - Produits Gourmets et Boissons",
      description: "Savourez notre sélection de produits gastronomiques, spécialités culinaires et boissons d'exception.",
      keywords: ["alimentation", "gastronomie", "produits gourmets", "boissons", "cuisine", "terroir", "spécialités"]
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-03-15T00:00:00.000Z'
  }
];