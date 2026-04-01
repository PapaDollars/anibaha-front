import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

// ─── Helpers localStorage pour invités ───────────────────────────────────────

const GUEST_KEY = "guest_wishlist";

const loadGuestWishlist = (): ProduitWishlist[] => {
  try { return JSON.parse(localStorage.getItem(GUEST_KEY) || "[]"); } catch { return []; }
};
const saveGuestWishlist = (items: ProduitWishlist[]) => {
  localStorage.setItem(GUEST_KEY, JSON.stringify(items));
};
const isAuthenticated = () => !!localStorage.getItem("accessToken");

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProduitWishlist {
  id: string;
  productId: string;
  ajouteLe: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    isActive: boolean;
    images: { url: string; alt?: string }[];
    company: { name: string; slug: string };
  };
}

export interface WishlistState {
  items: ProduitWishlist[];
  chargement: boolean;
  erreur: string | null;
}

const etatInitial: WishlistState = {
  items: [],
  chargement: false,
  erreur: null,
};

// ─── Thunks ───────────────────────────────────────────────────────────────────

// fetchWishlist — utilisé dans Client/Wishlist/index.tsx
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    if (!isAuthenticated()) {
      return { items: loadGuestWishlist() };
    }
    try { const r = await axios.get("/api/wishlist"); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur chargement wishlist"); }
  }
);

// ajouterWishlist — utilisé dans Client/Brands, Products, ProductDetail
export const ajouterWishlist = createAsyncThunk(
  "wishlist/add",
  async (productId: string, { rejectWithValue }) => {
    if (!isAuthenticated()) {
      const items = loadGuestWishlist();
      const already = items.some(i => i.productId === productId);
      if (already) return { item: null, guest: true };
      const newItem: ProduitWishlist = {
        id: `guest-${productId}`,
        productId,
        ajouteLe: new Date().toISOString(),
        product: { id: productId, name: "", slug: "", price: 0, stock: 0, isActive: true, images: [], company: { name: "", slug: "" } },
      };
      items.push(newItem);
      saveGuestWishlist(items);
      return { item: newItem, guest: true };
    }
    try { const r = await axios.post("/api/wishlist", { productId }); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur ajout wishlist"); }
  }
);

// retirerWishlist — utilisé dans Client/Brands, Products, ProductDetail, Wishlist
export const retirerWishlist = createAsyncThunk(
  "wishlist/remove",
  async (productId: string, { rejectWithValue }) => {
    if (!isAuthenticated()) {
      const items = loadGuestWishlist().filter(i => i.productId !== productId);
      saveGuestWishlist(items);
      return productId;
    }
    try { await axios.delete(`/api/wishlist/${productId}`); return productId; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur retrait wishlist"); }
  }
);

// clearWishlist — utilisé dans Client/Wishlist/index.tsx
export const clearWishlist = createAsyncThunk(
  "wishlist/clear",
  async (_, { rejectWithValue }) => {
    if (!isAuthenticated()) {
      saveGuestWishlist([]);
      return true;
    }
    try { await axios.delete("/api/wishlist"); return true; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur vidage wishlist"); }
  }
);

// ─── Selectors ────────────────────────────────────────────────────────────────

import type { RootState } from "../index";

export const selectWishlistItems   = (state: RootState) => state.wishlist.items;
export const selectWishlistLoading = (state: RootState) => state.wishlist.chargement;
export const selectWishlistError   = (state: RootState) => state.wishlist.erreur;
export const selectWishlistCount   = (state: RootState) => state.wishlist.items.length;
export const selectIsInWishlist    = (productId: string) => (state: RootState) =>
  state.wishlist.items.some((item) => item.productId === productId);

// ─── Slice ────────────────────────────────────────────────────────────────────

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: etatInitial,
  reducers: {
    effacerErreurWishlist(state) { state.erreur = null; },
    viderWishlistLocalement(state) { state.items = []; },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchWishlist.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.chargement = false;
        const d = action.payload.data ?? action.payload;
        state.items = d.items ?? d ?? [];
      })
      .addCase(fetchWishlist.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(ajouterWishlist.pending,   (state) => { state.chargement = true; })
      .addCase(ajouterWishlist.fulfilled, (state, action) => { state.chargement = false; if (action.payload.item) state.items.push(action.payload.item); })
      .addCase(ajouterWishlist.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(retirerWishlist.pending,   (state) => { state.chargement = true; })
      .addCase(retirerWishlist.fulfilled, (state, action) => {
        state.chargement = false;
        state.items = state.items.filter((item) => item.productId !== action.payload);
      })
      .addCase(retirerWishlist.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(clearWishlist.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(clearWishlist.fulfilled, (state) => { state.chargement = false; state.items = []; })
      .addCase(clearWishlist.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });
  },
});

export const { effacerErreurWishlist, viderWishlistLocalement } = wishlistSlice.actions;
export default wishlistSlice.reducer;