import { Product } from "@/types/product";
import { ProductVariant } from "@/types/product";
import { BaseEntity } from "@/types/base";
import { User } from "@/types/user";
import { Company } from "@/types/company";
import { ORDER_STATUS, PAYMENT_METHODS, PAYMENT_STATUS } from "@/utils/constants";
import type { OrderStatus, PaymentMethod, PaymentStatus } from "@/utils/constants";

export type { OrderStatus, PaymentMethod, PaymentStatus } from "@/utils/constants";

import { SupportedCurrency } from "@/utils/constants";
import { ShippingMethod } from "@/utils/constants";

export interface OrderItem {
  id: string;
  productId: string;
  product?: Product;
  variantId?: string;
  variant?: ProductVariant;
  
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  
  // Snapshot of product info at time of order
  productSnapshot: {
    name: string;
    image: string;
    sku?: string;
  };
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  region?: string;
  phone?: string;
  email?: string;
}

export interface OrderShipping {
  method: ShippingMethod;
  cost: number;
  estimatedDays?: number;
  trackingNumber?: string;
  carrier?: string;
  trackingUrl?: string;
  
  address: OrderAddress;
  
  // Shipping events
  events?: {
    status: string;
    description: string;
    location?: string;
    timestamp: string;
  }[];
}

export interface OrderPayment {
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: SupportedCurrency;
  
  // Transaction details
  transactionId?: string;
  gatewayTransactionId?: string;
  gateway?: string;
  
  // Manual payment details (for direct contact)
  manualPaymentInfo?: {
    instructions: string;
    bankDetails?: {
      bankName: string;
      accountNumber: string;
      accountName: string;
      routingNumber?: string;
    };
    mobileMoneyDetails?: {
      provider: string;
      number: string;
      name: string;
    };
  };
  
  // Payment events
  events?: {
    status: PaymentStatus;
    amount?: number;
    description?: string;
    timestamp: string;
  }[];
}

export interface OrderTotals {
  subtotal: number;
  tax: number;
  taxRate: number;
  shipping: number;
  discount: number;
  discountCode?: string;
  total: number;
  currency: SupportedCurrency;
}

export interface Order extends BaseEntity {
  orderNumber: string;
  
  // Customer information
  userId: string;
  user?: User;
  guestEmail?: string; // For guest orders
  
  // Company information
  companyId: string;
  company?: Company;
  
  // Order items
  items: OrderItem[];
  
  // Status
  status: OrderStatus;
  
  // Addresses
  billingAddress: OrderAddress;
  shippingAddress: OrderAddress;
  
  // Payment and shipping
  payment: OrderPayment;
  shipping: OrderShipping;
  
  // Totals
  totals: OrderTotals;
  
  // Communication
  notes?: string;
  customerNotes?: string;
  adminNotes?: string;
  
  // Timeline
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
    updatedBy?: string;
  }[];
  
  // Cancellation/Return
  cancellationReason?: string;
  cancelledAt?: string;
  refundAmount?: number;
  refundedAt?: string;
  
  // Reviews
  canReview: boolean;
  reviewedAt?: string;
  
  // Metadata
  metadata?: Record<string, any>;
}