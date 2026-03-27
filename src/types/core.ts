export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface PaginationParams {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    pagination?: PaginationParams;
  }
  
  export interface ContactInfo {
    whatsapp?: string;
    phone?: string;
    email: string;
    website?: string;
  }
  
  export interface SocialMedia {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    tiktok?: string;
    youtube?: string;
  }
  
  export interface Address {
    id: string;
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  }