
import { ProductStatus, ProductCategory } from "@/utils/constants";
import { BaseEntity } from "@/types/base";
import { User } from "@/types/user";
import { Company } from "@/types/company";
import { SupportedCurrency } from "@/utils/constants";

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price: number;
  stock: number;
  sku?: string;
  images?: ProductImage[];
  attributes?: Record<string, string>;
}

export interface ProductSpecification {
  name: string;
  value: string;
  category?: string;
}

export interface ProductDimensions {
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  unit: 'cm' | 'inch' | 'kg' | 'lb';
}

export interface Product extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku?: string;
  
  // Pricing
  price: number;
  comparePrice?: number; // Original price for discounts
  costPrice?: number; // Internal cost
  currency: SupportedCurrency;
  
  // Images and media
  images: ProductImage[];
  videos?: string[];
  
  // Organization
  category: ProductCategory;
  subcategory?: string;
  tags: string[];
  brand?: string;
  
  // Company relation
  companyId: string;
  company?: Company;
  
  // Inventory
  stock: number;
  minStock?: number; // Alert threshold
  maxStock?: number;
  trackQuantity: boolean;
  allowBackorder: boolean;
  
  // Physical properties
  dimensions?: ProductDimensions;
  
  // Variants and options
  hasVariants: boolean;
  variants?: ProductVariant[];
  options?: {
    name: string;
    values: string[];
  }[];
  
  // Specifications
  specifications?: ProductSpecification[];
  
  // Status and visibility
  status: ProductStatus;
  isActive: boolean;
  isFeatured: boolean;
  isDigital: boolean;
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  
  // Reviews and ratings
  rating: number;
  reviewCount: number;
  totalRatings: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  
  // Shipping
  shippingInfo?: {
    weight?: number;
    dimensions?: ProductDimensions;
    shippingClass?: string;
    freeShipping: boolean;
  };
  
  // Analytics
  views: number;
  wishlistCount: number;
  cartAddCount: number;
  purchaseCount: number;
  
  // Metadata
  metadata?: Record<string, any>;
}

export interface ProductReview extends BaseEntity {
  productId: string;
  product?: Product;
  userId: string;
  user?: User;
  orderId?: string;
  
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
  
  isVerified: boolean; // Verified purchase
  isRecommended?: boolean;
  
  // Helpfulness
  helpfulCount: number;
  notHelpfulCount: number;
  
  // Responses
  companyResponse?: {
    message: string;
    respondedAt: string;
    respondedBy: string;
  };
  
  status: 'pending' | 'approved' | 'rejected';
}