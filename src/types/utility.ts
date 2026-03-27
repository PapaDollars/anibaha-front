import { UserRole, UserStatus, OrderStatus, PaymentMethod, PaymentStatus, ShippingMethod, ProductCategory, ProductStatus, NotificationType, SupportedLanguage, SupportedCurrency } from "@/utils/constants";

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };
  
  export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  
  export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
  
  // Export all types
  export type {
    UserRole,
    UserStatus,
    OrderStatus,
    PaymentMethod,
    PaymentStatus,
    ShippingMethod,
    ProductCategory,
    ProductStatus,
    NotificationType,
    SupportedLanguage,
    SupportedCurrency
  };