import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';

interface CartState {
  items: CartItem[];
  total: number;
}

// Fonction pour charger le panier depuis le localStorage
const getInitialCart = (): CartState => {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : { items: [], total: 0 };
  } catch {
    return { items: [], total: 0 };
  }
};

const initialState: CartState = getInitialCart();

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0
  );
};

const saveCart = (state: CartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      if (!product || !product.id) return;
      const existingItem = state.items.find(
        (item) => item.product?.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
  id: Math.random().toString(36).substr(2, 9),
  productId: product.id,
  product,
  quantity,
  addedAt: new Date().toISOString()
});
      }
      state.total = calculateTotal(state.items);
      saveCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product?.id !== action.payload
      );
      state.total = calculateTotal(state.items);
      saveCart(state);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product?.id === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
        state.total = calculateTotal(state.items);
      } else if (item && quantity <= 0) {
        state.items = state.items.filter((item) => item.product?.id !== productId);
        state.total = calculateTotal(state.items);
      }
      saveCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCart(state);
    },
    // Load cart from localStorage
    loadCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
      saveCart(state);
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateCartItemQuantity, 
  clearCart,
  loadCart 
} = cartSlice.actions;

export default cartSlice.reducer;