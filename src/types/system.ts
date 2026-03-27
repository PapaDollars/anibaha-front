export interface SystemSettings {
    maintenance: {
      enabled: boolean;
      message: string;
      allowedIPs: string[];
    };
    features: {
      registration: boolean;
      guestCheckout: boolean;
      reviews: boolean;
      wishlist: boolean;
      chat: boolean;
      multiLanguage: boolean;
    };
    security: {
      maxLoginAttempts: number;
      lockoutDuration: number;
      sessionTimeout: number;
      requireEmailVerification: boolean;
      requirePhoneVerification: boolean;
    };
    notifications: {
      enableEmail: boolean;
      enableSMS: boolean;
      enablePush: boolean;
      enableWhatsApp: boolean;
    };
  }