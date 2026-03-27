import { Product } from "@/types/product";
import { ProductVariant } from "@/types/product";
import { SupportedCurrency } from "@/utils/constants";

export interface CartItem {
  id: string;
  productId: string;
  product?: Product;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
  addedAt: string;
  
  // Calculated fields
  unitPrice?: number;
  totalPrice?: number;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string; // For guest users
  items: CartItem[];
  
  // Totals
  subtotal: number;
  tax: number;
  taxRate: number;
  shipping: number;
  discount: number;
  discountCode?: string;
  total: number;
  currency: SupportedCurrency;
  
  // Metadata
  updatedAt: string;
  expiresAt?: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  addedAt: string;
  notes?: string;
}