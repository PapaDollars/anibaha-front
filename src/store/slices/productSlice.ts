// ================================================================
// PRODUCT SLICE - Branché sur l'API (remplace import @/data/products)
// ================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, Pagination } from '@/utils/apiService';
import { API_ROUTES, API_GENERATORS } from '@/utils/url/url_backend';
import type { Product } from '@/types/product';

export type { Product };

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  featuredProducts: [],
  loading: false,
  error: null,
  pagination: null,
};

// ── Thunks ────────────────────────────────────────────────────────

// Remplace : import { products } from '@/data/products'
export const fetchProducts = createAsyncThunk(
  'product/fetchAll',
  async (params: {
    page?: number; limit?: number; category?: string;
    search?: string; minPrice?: number; maxPrice?: number;
    featured?: boolean; sortBy?: string; sortOrder?: 'asc' | 'desc';
  } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get<Product[]>(
        API_ROUTES.PRODUCTS.LIST,
        params as Record<string, unknown>
      );
      return response; // contient { data, pagination }
    } catch {
      return rejectWithValue('Erreur chargement produits');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'product/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Product>(API_GENERATORS.product(id));
      return response.data;
    } catch {
      return rejectWithValue('Produit introuvable');
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'product/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Product[]>(API_ROUTES.PRODUCTS.FEATURED);
      return response.data;
    } catch {
      return rejectWithValue('Erreur');
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/create',
  async (data: Partial<Product>, { rejectWithValue }) => {
    try {
      const response = await api.post<Product>(API_ROUTES.PRODUCTS.CREATE, data);
      return response.data;
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: { message?: string } } } };
      return rejectWithValue(e.response?.data?.error?.message || 'Erreur création');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ id, data }: { id: string; data: Partial<Product> }, { rejectWithValue }) => {
    try {
      const response = await api.put<Product>(API_GENERATORS.productUpdate(id), data);
      return response.data;
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: { message?: string } } } };
      return rejectWithValue(e.response?.data?.error?.message || 'Erreur mise à jour');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(API_GENERATORS.productDelete(id));
      return id;
    } catch {
      return rejectWithValue('Erreur suppression');
    }
  }
);

// Upload images vers Firebase Storage puis attache les URLs au produit
export const uploadProductImages = createAsyncThunk(
  'product/uploadImages',
  async (files: FileList, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Array.from(files).forEach(f => formData.append('images', f));
      const response = await api.upload<{ url: string; path: string }[]>(
        API_ROUTES.UPLOAD.PRODUCT_IMAGES, formData
      );
      return response.data;
    } catch {
      return rejectWithValue('Erreur upload');
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => { state.selectedProduct = null; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data ?? [];
        state.pagination = action.payload.pagination as Pagination ?? null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string;
      });

    builder
      .addCase(fetchProductById.pending, (state) => { state.loading = true; })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false; state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string;
      });

    builder.addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
      state.featuredProducts = action.payload;
    });

    builder
      .addCase(createProduct.pending, (state) => { state.loading = true; })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string;
      });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const idx = state.products.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state.products[idx] = action.payload;
      if (state.selectedProduct?.id === action.payload.id) state.selectedProduct = action.payload;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    });
  },
});

export const { clearSelectedProduct, clearError } = productSlice.actions;
export default productSlice.reducer;