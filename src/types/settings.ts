export interface Settings {
  id: string;
  siteName: string;
  siteDescription: string;
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  currency: string;
  currencySymbol?: string;
  taxRate?: number;
  shippingCost?: number;
  freeShippingThreshold?: number;
  contactEmail: string;
  contactPhone?: string;
  phoneNumber?: string;
  address?: string;
  language?: string;
  timezone?: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  payment: {
    stripePublicKey?: string;
    stripeSecretKey?: string;
    paypalClientId?: string;
    paypalSecret?: string;
  };
  shipping: {
    shippingMethods: Array<{
      name: string;
      price: number;
      description: string;
    }>;
    freeShippingThreshold?: number;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  maintenance?: boolean;
  updatedAt: string;
} 