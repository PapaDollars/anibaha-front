// ================================================================
// CATEGORY SLICE - Branché sur l'API (remplace import @/data/categories)
// ================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/utils/apiService';
import { API_ROUTES, API_GENERATORS } from '@/utils/url/url_backend';

// Type minimal (adapter à votre type Category existant)
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  featured?: boolean;
  isFeatured?: boolean;
  productCount?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryState {
  categories: Category[];
  featuredCategories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  featuredCategories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

// ── Thunks ────────────────────────────────────────────────────────

// Remplace : import { categories } from '@/data/categories'
export const fetchCategories = createAsyncThunk(
  'category/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Category[]>(API_ROUTES.CATEGORIES.LIST);
      return response.data;
    } catch {
      return rejectWithValue('Erreur chargement catégories');
    }
  }
);

export const fetchFeaturedCategories = createAsyncThunk(
  'category/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Category[]>(API_ROUTES.CATEGORIES.FEATURED);
      return response.data;
    } catch {
      return rejectWithValue('Erreur chargement catégories featured');
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'category/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Category>(API_GENERATORS.category(id));
      return response.data;
    } catch {
      return rejectWithValue('Catégorie introuvable');
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearSelectedCategory: (state) => { state.selectedCategory = null; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchFeaturedCategories.fulfilled, (state, action) => {
        state.featuredCategories = action.payload;
      });

    builder
      .addCase(fetchCategoryById.pending, (state) => { state.loading = true; })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedCategory, clearError } = categorySlice.actions;
export default categorySlice.reducer;