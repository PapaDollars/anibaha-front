// ================================================================
// STORE REDUX - Anibaha Frontend
// ================================================================
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import productReducer from '@/store/slices/productSlice';
import categoryReducer from '@/store/slices/categorySlice';
// Décommenter au fur et à mesure
// import cartReducer     from '@/store/slices/cartSlice';
// import orderReducer    from '@/store/slices/orderSlice';
// import wishlistReducer from '@/store/slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    auth:     authReducer,
    product:  productReducer,
    category: categoryReducer,
    // cart:     cartReducer,
    // order:    orderReducer,
    // wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;