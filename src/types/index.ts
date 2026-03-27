export * from '@/types/utility';
export * from '@/types/base';
export * from '@/types/user';
export * from '@/types/company';
export * from '@/types/product';
export * from '@/types/order';
export * from '@/types/notification';
export * from '@/types/cart';
export * from '@/types/category';
export * from '@/types/settings';
export * from '@/types/error';
export * from '@/types/form';
export * from '@/types/payment';
export * from '@/types/search';
export * from '@/types/api';

import { User, UserRegistration } from '@/types/user';
import { Order, OrderItem, OrderStatus, PaymentMethod, PaymentStatus } from '@/types/order';
import { Product } from '@/types/product';
import { Settings } from '@/types/settings';
import { CartItem } from '@/types/cart';
import { WishlistItem } from '@/types/wishlist';
import { PaymentData } from '@/types/payment';
import { Notification } from '@/types/notification';
export type {
  User,
  UserRegistration,
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Product,
  Settings,
  CartItem,
  WishlistItem,
  PaymentData,
  Notification
};
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
export interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}
export interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}
export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}
export interface SettingsState {
  data: Settings | null;
  loading: boolean;
  error: string | null;
}
export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}
export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}
export interface RootState {
  auth: AuthState;
  cart: CartState;
  order: OrderState;
  product: ProductState;
  settings: SettingsState;
  wishlist: WishlistState;
  users: UserState;
} 