import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/slices-test/authSlice';
import cartReducer from '@/store/slices-test/cartSlice';
import orderReducer from '@/store/slices-test/orderSlice';
import productReducer from '@/store/slices-test/productSlice';
import userReducer from '@/store/slices-test/userSlice';
import settingsReducer from '@/store/slices-test/settingsSlice';
import wishlistReducer from '@/store/slices-test/wishlistSlice';
import companyReducer from '@/store/slices-test/brandSlice';
import { CompanyState } from '@/store/slices-test/brandSlice';
import { UserState, AuthState, CartState, OrderState, ProductState, SettingsState, WishlistState } from '@/types';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    product: productReducer,
    users: userReducer,
    settings: settingsReducer,
    wishlist: wishlistReducer,
    companies: companyReducer
  },
});

export type RootState = {
  auth: AuthState;
  cart: CartState;
  orders: OrderState;
  product: ProductState;
  users: UserState;
  settings: SettingsState;
  wishlist: WishlistState;
  companies: CompanyState;
};

export type AppDispatch = typeof store.dispatch; 