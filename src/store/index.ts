import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import wishlistReducer from "./slices/wishlistSlice";
import notificationReducer from "./slices/notificationSlice";
import userReducer from "./slices/userSlice";
import brandReducer from "./slices/brandSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
    notification: notificationReducer,
    users: userReducer,
    brand: brandReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Les dates dans les payloads ne sont pas sérialisables — on les ignore
        ignoredActions: ["order/pass/fulfilled", "user/fetchProfil/fulfilled"],
      },
    }),
});

// Types exportés pour utilisation dans toute l'application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;