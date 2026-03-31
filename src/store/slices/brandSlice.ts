import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  banner?: string;
  website?: string;
  isActive: boolean;
  ownerId?: string;
  adminId?: string;
  createdAt: string;
  updatedAt: string;
  stats?: { totalProducts: number; totalOrders: number };
  _count?: { products: number; orders: number };
}

export interface BrandState {
  brands: Brand[];
  brandActuel: Brand | null;
  chargement: boolean;
  erreur: string | null;
  pagination: { page: number; total: number; totalPages: number; parPage: number };
}

const etatInitial: BrandState = {
  brands: [],
  brandActuel: null,
  chargement: false,
  erreur: null,
  pagination: { page: 1, total: 0, totalPages: 0, parPage: 10 },
};

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchBrands = createAsyncThunk(
  "brand/fetchAll",
  async (params: { page?: number; search?: string; actif?: boolean } = {}, { rejectWithValue }) => {
    try {
      const { page = 1, search = "", actif } = params;
      const query = new URLSearchParams({ page: String(page), ...(search && { search }), ...(actif !== undefined && { actif: String(actif) }) });
      const r = await axios.get(`/api/companies?${query}`);
      return r.data;
    } catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur chargement"); }
  }
);

export const fetchBrandParSlug = createAsyncThunk(
  "brand/fetchBySlug",
  async (slug: string, { rejectWithValue }) => {
    try { const r = await axios.get(`/api/companies/${slug}`); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Marque introuvable"); }
  }
);

export const creerBrand = createAsyncThunk(
  "brand/creer",
  async (donnees: { name: string; description?: string; logo?: string; banner?: string; website?: string; adminEmail?: string }, { rejectWithValue }) => {
    try { const r = await axios.post("/api/companies", donnees); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur création"); }
  }
);

// createCompany = alias de creerBrand (utilisé dans Company/Brands/index.tsx)
export const createCompany = creerBrand;

export const modifierBrand = createAsyncThunk(
  "brand/modifier",
  async ({ id, donnees }: { id: string; donnees: Partial<Brand> }, { rejectWithValue }) => {
    try { const r = await axios.patch(`/api/companies/${id}`, donnees); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur modification"); }
  }
);

// updateBrand = utilisé dans Company/Brands/index.tsx — passe l'objet entier avec id
export const updateBrand = createAsyncThunk(
  "brand/update",
  async (donnees: Partial<Brand> & { id: string }, { rejectWithValue }) => {
    try {
      const { id, ...reste } = donnees;
      const r = await axios.patch(`/api/companies/${id}`, reste);
      return r.data;
    } catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur modification"); }
  }
);

export const toggleStatutBrand = createAsyncThunk(
  "brand/toggleStatut",
  async (id: string, { rejectWithValue }) => {
    try { const r = await axios.patch(`/api/companies/${id}/status`); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur statut"); }
  }
);

// toggleBrandStatus = alias de toggleStatutBrand (Company/Brands/index.tsx)
export const toggleBrandStatus = toggleStatutBrand;

export const supprimerBrand = createAsyncThunk(
  "brand/supprimer",
  async (id: string, { rejectWithValue }) => {
    try { await axios.delete(`/api/companies/${id}`); return id; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur suppression"); }
  }
);

// deleteBrand = alias de supprimerBrand (Company/Brands/index.tsx)
export const deleteBrand = supprimerBrand;

// ─── Selectors ────────────────────────────────────────────────────────────────

import type { RootState } from "../index";

// selectCompanies / selectCompanyLoading / selectCompanyError
// utilisés dans Company/Brands/index.tsx
export const selectCompanies      = (state: RootState) => state.brand.brands;
export const selectCompanyLoading = (state: RootState) => state.brand.chargement;
export const selectCompanyError   = (state: RootState) => state.brand.erreur;

// Autres selectors utiles
export const selectBrands          = selectCompanies;
export const selectBrandActuel     = (state: RootState) => state.brand.brandActuel;
export const selectCurrentCompany  = selectBrandActuel;
export const selectBrandPagination = (state: RootState) => state.brand.pagination;
export const selectTotalBrands     = (state: RootState) => state.brand.pagination.total;
export const selectBrandById       = (id: string) => (state: RootState) =>
  state.brand.brands.find((b) => b.id === id) ?? null;
export const selectBrandBySlug     = (slug: string) => (state: RootState) =>
  state.brand.brands.find((b) => b.slug === slug) ?? null;

// ─── Slice ────────────────────────────────────────────────────────────────────

const brandSlice = createSlice({
  name: "brand",
  initialState: etatInitial,
  reducers: {
    reinitialiserBrandActuel(state) { state.brandActuel = null; },
    effacerErreur(state) { state.erreur = null; },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchBrands.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.chargement = false;
        state.brands = action.payload.brands ?? action.payload.companies ?? [];
        if (action.payload.pagination) state.pagination = action.payload.pagination;
      })
      .addCase(fetchBrands.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(fetchBrandParSlug.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(fetchBrandParSlug.fulfilled, (state, action) => {
        state.chargement = false;
        state.brandActuel = action.payload.company ?? action.payload.brand ?? null;
      })
      .addCase(fetchBrandParSlug.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(creerBrand.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(creerBrand.fulfilled, (state, action) => {
        state.chargement = false;
        const n = action.payload.brand ?? action.payload.company;
        if (n) { state.brands.unshift(n); state.pagination.total += 1; }
      })
      .addCase(creerBrand.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(modifierBrand.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(modifierBrand.fulfilled, (state, action) => {
        state.chargement = false;
        const m = action.payload.brand ?? action.payload.company;
        if (m) {
          const i = state.brands.findIndex((b) => b.id === m.id);
          if (i !== -1) state.brands[i] = m;
          if (state.brandActuel?.id === m.id) state.brandActuel = m;
        }
      })
      .addCase(modifierBrand.rejected, (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(updateBrand.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.chargement = false;
        const m = action.payload.brand ?? action.payload.company;
        if (m) { const i = state.brands.findIndex((b) => b.id === m.id); if (i !== -1) state.brands[i] = m; }
      })
      .addCase(updateBrand.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(toggleStatutBrand.fulfilled, (state, action) => {
        const m = action.payload.brand ?? action.payload.company;
        if (m) { const i = state.brands.findIndex((b) => b.id === m.id); if (i !== -1) state.brands[i].isActive = m.isActive; }
      })
      .addCase(toggleStatutBrand.rejected, (state, action) => { state.erreur = action.payload as string; });

    builder
      .addCase(supprimerBrand.pending,   (state) => { state.chargement = true; })
      .addCase(supprimerBrand.fulfilled, (state, action) => {
        state.chargement = false;
        state.brands = state.brands.filter((b) => b.id !== action.payload);
        state.pagination.total = Math.max(0, state.pagination.total - 1);
      })
      .addCase(supprimerBrand.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });
  },
});

export const { reinitialiserBrandActuel, effacerErreur } = brandSlice.actions;
export default brandSlice.reducer;