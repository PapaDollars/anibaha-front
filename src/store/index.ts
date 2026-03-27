import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/slices-test/authSlice';
import cartReducer from '@/store/slices-test/cartSlice';
import orderReducer from '@/store/slices-test/orderSlice';
import productReducer from '@/store/slices-test/productSlice';
import userReducer from '@/store/slices-test/userSlice';
import settingsReducer from '@/store/slices-test/settingsSlice';
import wishlistReducer from '@/store/slices-test/wishlistSlice';
import brandReducer from '@/store/slices-test/brandSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    product: productReducer,
    users: userReducer,
    settings: settingsReducer,
    wishlist: wishlistReducer,
    brands: brandReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 