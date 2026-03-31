// ================================================================
// CART SLICE - Panier géré localement + persisté dans localStorage
// Le panier est calculé côté frontend, envoyé à l'API lors du checkout
// ================================================================
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';

interface CartState {
  items:      CartItem[];
  chargement: boolean;
  error:      string | null;
}

// ── Helpers ──────────────────────────────────────────────────────

const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
};

const saveCart = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const calcTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, i) => sum + (i.unitPrice ?? 0) * i.quantity, 0);
  const taxRate  = 19.25;
  const tax      = subtotal * (taxRate / 100);
  const shipping = subtotal >= 50000 ? 0 : 2500;
  return { subtotal, tax, taxRate, shipping, total: subtotal + tax + shipping };
};

// ── État initial ─────────────────────────────────────────────────

const initialState: CartState = {
  items:      loadCart(),
  chargement: false,
  error:      null,
};

// ── Slice ─────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // Ajouter au panier
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number; variantId?: string }>) => {
      const { product, quantity = 1, variantId } = action.payload;

      const existing = state.items.find(
        i => i.productId === product.id && i.variantId === variantId
      );

      if (existing) {
        existing.quantity  += quantity;
        existing.totalPrice = existing.unitPrice! * existing.quantity;
      } else {
        state.items.push({
          id:         `cart-${product.id}-${Date.now()}`,
          productId:  product.id,
          product,
          variantId,
          quantity,
          addedAt:    new Date().toISOString(),
          unitPrice:  product.price,
          totalPrice: product.price * quantity,
        });
      }
      saveCart(state.items);
    },

    // Modifier la quantité
    updateQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.itemId);
      if (item) {
        item.quantity   = Math.max(1, action.payload.quantity);
        item.totalPrice = item.unitPrice! * item.quantity;
        saveCart(state.items);
      }
    },

    // Retirer un article
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveCart(state.items);
    },

    // Vider le panier
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },

    clearError: (state) => { state.error = null; },

    // Alias français
    retirerDuPanier: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.productId !== action.payload);
      saveCart(state.items);
    },
    modifierQuantite: (state, action: PayloadAction<{ productId: string; quantite: number }>) => {
      const item = state.items.find(i => i.productId === action.payload.productId);
      if (item) {
        item.quantity   = Math.max(1, action.payload.quantite);
        item.totalPrice = (item.unitPrice ?? 0) * item.quantity;
        saveCart(state.items);
      }
    },
    viderPanier: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
  },
});

// ── Sélecteurs calculés ──────────────────────────────────────────

export const selectCartTotals = (items: CartItem[]) => calcTotals(items);
export const selectCartCount  = (items: CartItem[]) => items.reduce((n, i) => n + i.quantity, 0);

export const { addToCart, updateQuantity, removeFromCart, clearCart, clearError, retirerDuPanier, modifierQuantite, viderPanier } = cartSlice.actions;
export default cartSlice.reducer;
