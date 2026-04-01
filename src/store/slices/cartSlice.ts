// ================================================================
// CART SLICE
// - Invité    : panier stocké en localStorage
// - Connecté  : panier synchronisé avec l'API (/api/cart)
// - Connexion : fusion localStorage → API via POST /api/cart/sync
// ================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';

// ── Types ─────────────────────────────────────────────────────────

interface CartState {
  items:      CartItem[];
  chargement: boolean;
  error:      string | null;
}

// ── Helpers localStorage ──────────────────────────────────────────

const isAuth = () => !!localStorage.getItem('accessToken');

const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
};

const saveCart = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

// ── Calculs (exportés pour Cart/Checkout) ─────────────────────────

const calcTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, i) => sum + (i.unitPrice ?? 0) * i.quantity, 0);
  const taxRate  = 19.25;
  const tax      = subtotal * (taxRate / 100);
  const shipping = subtotal >= 50000 ? 0 : 2500;
  return { subtotal, tax, taxRate, shipping, total: subtotal + tax + shipping };
};

export const selectCartTotals = (items: CartItem[]) => calcTotals(items);
export const selectCartCount  = (items: CartItem[]) => items.reduce((n, i) => n + i.quantity, 0);

// ── Normalisation réponse API ─────────────────────────────────────

const extractItems = (payload: any): CartItem[] =>
  payload?.data?.items ?? payload?.items ?? [];

// ── État initial ──────────────────────────────────────────────────

const initialState: CartState = {
  items:      loadCart(),
  chargement: false,
  error:      null,
};

// ── Thunks ────────────────────────────────────────────────────────

// Récupère le panier (API si connecté, localStorage sinon)
export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async (_, { rejectWithValue }) => {
    if (!isAuth()) return { items: loadCart() };
    try {
      const r = await axios.get('/api/cart');
      return r.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Erreur chargement panier');
    }
  }
);

// Fusion localStorage → DB à la connexion/inscription/restauration session
export const syncCart = createAsyncThunk(
  'cart/sync',
  async (_, { rejectWithValue }) => {
    const localItems = loadCart();
    try {
      if (localItems.length > 0) {
        const r = await axios.post('/api/cart/sync', {
          items: localItems.map(i => ({
            productId: i.productId,
            quantity:  i.quantity,
            variantId: i.variantId,
          })),
        });
        localStorage.removeItem('cart');
        return r.data;
      } else {
        const r = await axios.get('/api/cart');
        return r.data;
      }
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Erreur synchronisation panier');
    }
  }
);

// Ajouter un article
export const addToCart = createAsyncThunk(
  'cart/add',
  async (
    { product, quantity = 1, variantId }: { product: Product; quantity?: number; variantId?: string },
    { rejectWithValue }
  ) => {
    if (!isAuth()) {
      const items = loadCart();
      const existing = items.find(i => i.productId === product.id && i.variantId === variantId);
      if (existing) {
        existing.quantity  += quantity;
        existing.totalPrice = existing.unitPrice! * existing.quantity;
      } else {
        items.push({
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
      saveCart(items);
      return { items };
    }
    try {
      const r = await axios.post('/api/cart/items', { productId: product.id, quantity, variantId });
      return r.data;
    } catch (e: any) {
      if (e.response?.status === 409)
        return rejectWithValue('Stock insuffisant pour cette quantité');
      return rejectWithValue(e.response?.data?.message || 'Erreur ajout panier');
    }
  }
);

// Modifier la quantité d'un article
export const updateQuantity = createAsyncThunk(
  'cart/update',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    if (!isAuth()) {
      const items = loadCart();
      const item = items.find(i => i.productId === productId);
      if (item) {
        item.quantity   = Math.max(1, quantity);
        item.totalPrice = (item.unitPrice ?? 0) * item.quantity;
        saveCart(items);
      }
      return { items };
    }
    try {
      const r = await axios.patch(`/api/cart/items/${productId}`, { quantity });
      return r.data;
    } catch (e: any) {
      if (e.response?.status === 409) return rejectWithValue('Stock insuffisant');
      return rejectWithValue(e.response?.data?.message || 'Erreur mise à jour panier');
    }
  }
);

// Supprimer un article
export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (productId: string, { rejectWithValue }) => {
    if (!isAuth()) {
      const items = loadCart().filter(i => i.productId !== productId);
      saveCart(items);
      return { items };
    }
    try {
      const r = await axios.delete(`/api/cart/items/${productId}`);
      return r.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Erreur suppression');
    }
  }
);

// Vider le panier
export const clearCart = createAsyncThunk(
  'cart/clear',
  async (_, { rejectWithValue }) => {
    if (!isAuth()) {
      localStorage.removeItem('cart');
      return { items: [] };
    }
    try {
      const r = await axios.delete('/api/cart');
      return r.data ?? { items: [] };
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Erreur vidage panier');
    }
  }
);

// ── Aliases (compatibilité Cart/index.tsx et Checkout/index.tsx) ──

export const retirerDuPanier = removeFromCart;
export const viderPanier     = clearCart;
export const modifierQuantite = (p: { productId: string; quantite: number }) =>
  updateQuantity({ productId: p.productId, quantity: p.quantite });

// ── Slice ─────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    const pending   = (state: CartState) => { state.chargement = true; state.error = null; };
    const fulfilled = (state: CartState, action: { payload: any }) => {
      state.chargement = false;
      state.items = extractItems(action.payload);
    };
    const rejected  = (state: CartState, action: { payload: any }) => {
      state.chargement = false;
      state.error = action.payload as string;
    };

    [fetchCart, syncCart, addToCart, updateQuantity, removeFromCart, clearCart].forEach(thunk => {
      builder
        .addCase(thunk.pending,   pending)
        .addCase(thunk.fulfilled, fulfilled)
        .addCase(thunk.rejected,  rejected);
    });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
