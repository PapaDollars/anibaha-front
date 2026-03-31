// ================================================================
// SETTINGS SLICE - Paramètres de la boutique branchés sur l'API
// ================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/utils/apiService';
import { API_ROUTES } from '@/utils/url/url_backend';
import { Settings } from '@/types/settings';

interface SettingsState {
  data:    Settings | null;
  loading: boolean;
  error:   string | null;
}

const initialState: SettingsState = {
  data:    null,
  loading: false,
  error:   null,
};

// ── Thunks ───────────────────────────────────────────────────────

export const fetchSettings = createAsyncThunk(
  'settings/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Settings>(API_ROUTES.SETTINGS.ADMIN);
      return response.data;
    } catch {
      return rejectWithValue('Erreur chargement paramètres');
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/update',
  async (data: Partial<Settings>, { rejectWithValue }) => {
    try {
      const response = await api.put<Settings>(API_ROUTES.SETTINGS.UPDATE, data);
      return response.data;
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: { message?: string } } } };
      return rejectWithValue(e.response?.data?.error?.message || 'Erreur mise à jour paramètres');
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchSettings.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data    = action.payload;
      })
      .addCase(fetchSettings.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload as string;
      });

    builder
      .addCase(updateSettings.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data    = action.payload;
      })
      .addCase(updateSettings.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload as string;
      });
  },
});

export const { clearError } = settingsSlice.actions;
export default settingsSlice.reducer;
