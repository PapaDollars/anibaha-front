
import { BaseEntity } from "@/types/base";
import { SupportedCurrency, SupportedLanguage } from "@/types/utility";
import { Company } from "@/types/company";
import { UserRole, UserStatus } from "@/utils/constants";

export type { UserRole, UserStatus } from "@/utils/constants";

export interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  region?: string;
  isDefault: boolean;
  label?: string; // 'Home', 'Work', etc.
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface UserPreferences {
  language: SupportedLanguage;
  currency: SupportedCurrency;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    whatsapp: boolean;
    marketing: boolean;
    orders: boolean;
    promotions: boolean;
    security: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'contacts';
    showOnlineStatus: boolean;
    allowMessages: boolean;
  };
}

export interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  whatsapp?: string;
}

export interface User extends BaseEntity {
  notifications?: import('./notification').Notification[];
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: string;
  loginCount: number;
  
  // Profile information
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  addresses: Address[];
  preferences: UserPreferences;
  socialMedia?: SocialMediaLinks;
  
  // Company relation (for admin users)
  companyId?: string;
  company?: Company;
  
  // Analytics
  totalOrders?: number;
  totalSpent?: number;
  averageOrderValue?: number;
  loyaltyPoints?: number;
  referralCode?: string;
  referredBy?: string;
  
  // Security
  twoFactorEnabled: boolean;
  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;
  passwordChangedAt?: string;
  
  // Metadata
  metadata?: Record<string, any>;
  tags?: string[];
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  agreeToTerms: boolean;
  subscribeNewsletter?: boolean;
  referralCode?: string;
}

export interface UserLogin {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserProfile extends Omit<User, 'password'> {}