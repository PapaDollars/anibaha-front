import { BaseEntity } from "@/types/base";
import { User } from "@/types/user";
import { SocialMediaLinks } from "@/types/user";
import { Address } from "@/types/user";

export interface BusinessInfo {
    registrationNumber?: string;
    taxNumber?: string;
    businessType: 'individual' | 'company' | 'partnership' | 'cooperative';
    foundedYear?: number;
    employeeCount?: string;
    annualRevenue?: string;
    industry?: string;
    website?: string;
  }
  
  export interface ContactInfo {
    email: string;
    phone: string;
    whatsapp?: string;
    address: Address;
    workingHours?: {
      [key: string]: {
        open: string;
        close: string;
        isOpen: boolean;
      };
    };
  }
  
  export interface CompanySettings {
    theme: {
      primaryColor: string;
      secondaryColor: string;
      logo?: string;
      banner?: string;
      favicon?: string;
    };
    policies: {
      returnPolicy?: string;
      shippingPolicy?: string;
      privacyPolicy?: string;
      termsOfService?: string;
    };
    integrations: {
      paymentGateways: string[];
      shippingProviders: string[];
      analytics?: string[];
    };
  }
  
  export interface Company extends BaseEntity {
    name: string;
    slug: string;
    description: string;
    logo?: string;
    banner?: string;
    status: 'pending' | 'approved' | 'suspended' | 'rejected';
    isActive: boolean;
    isVerified: boolean;
    
    // Owner information
    ownerId: string;
    owner?: User;
    
    // Business details
    businessInfo: BusinessInfo;
    contactInfo: ContactInfo;
    socialMedia?: SocialMediaLinks;
    
    // Platform settings
    settings: CompanySettings;
    
    // Statistics
    stats?: {
      totalProducts: number;
      totalOrders: number;
      totalRevenue: number;
      averageRating: number;
      totalReviews: number;
      responseTime: number; // in minutes
      responseRate: number; // percentage
    };
    
    // Verification
    verificationDocuments?: string[];
    verifiedAt?: string;
    
    // Subscriptions and features
    subscription?: {
      plan: 'free' | 'basic' | 'premium' | 'enterprise';
      expiresAt?: string;
      features: string[];
    };
    
    // Metadata
    metadata?: Record<string, any>;
    tags?: string[];
  }