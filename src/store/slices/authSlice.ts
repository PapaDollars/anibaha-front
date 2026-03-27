// ================================================================
// AUTH SLICE - Branché sur le backend Anibaha (Next.js + Prisma)
// ================================================================
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/utils/apiService';
import { API_ROUTES } from '@/utils/url/url_backend';

// ── Types ────────────────────────────────────────────────────────

// ✅ AuthUser aligné sur le type User du frontend
// pour éviter les erreurs TypeScript dans Navbar, Layout, etc.
export interface AuthUser {
  id:               string;
  email:            string;
  firstName:        string;
  lastName:         string;
  displayName?:     string;
  avatar?:          string;
  phone?:           string;
  role:             'client' | 'company_admin' | 'super_admin';
  status:           string;
  isVerified:       boolean;
  isActive:         boolean;        // ✅ ajouté
  loginCount:       number;         // ✅ ajouté
  loyaltyPoints:    number;
  companyId?:       string;
  createdAt:        string;
  updatedAt:        string;         // ✅ ajouté
  // Champs optionnels (pas toujours retournés par l'API)
  password?:        string;
  addresses?:       unknown[];
  preferences?:     unknown;
  twoFactorEnabled?: boolean;
  notifications?:   unknown[];
  totalOrders?:     number;
  totalSpent?:      number;
  referralCode?:    string;
  dateOfBirth?:     string;
  gender?:          string;
  lastLogin?:       string;
}

interface AuthState {
  user:            AuthUser | null;
  accessToken:     string | null;
  refreshToken:    string | null;
  isAuthenticated: boolean;
  loading:         boolean;
  error:           string | null;
}

// ── Helpers localStorage ─────────────────────────────────────────

const saveToStorage = (accessToken: string, refreshToken: string, user: AuthUser) => {
  localStorage.setItem('accessToken',  accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user',         JSON.stringify(user));
};

const clearStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

const loadFromStorage = (): Partial<AuthState> => {
  try {
    const user         = localStorage.getItem('user');
    const accessToken  = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (user && accessToken) {
      return {
        user:            JSON.parse(user),
        accessToken,
        refreshToken,
        isAuthenticated: true,
      };
    }
  } catch { /* ignore */ }
  return {};
};

// ── État initial ─────────────────────────────────────────────────

const initialState: AuthState = {
  user:            null,
  accessToken:     null,
  refreshToken:    null,
  isAuthenticated: false,
  loading:         false,
  error:           null,
  ...loadFromStorage(),
};

// ── Thunks ───────────────────────────────────────────────────────

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<{
        user:         AuthUser;
        accessToken:  string;
        refreshToken: string;
      }>(API_ROUTES.AUTH.LOGIN, credentials);
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } } };
      return rejectWithValue(
        error.response?.data?.error?.message || 'Email ou mot de passe incorrect'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    data: {
      firstName:        string;
      lastName:         string;
      email:            string;
      password:         string;
      confirmPassword?: string;
      phone?:           string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<{
        user:         AuthUser;
        accessToken:  string;
        refreshToken: string;
      }>(API_ROUTES.AUTH.REGISTER, {
        ...data,
        confirmPassword: data.confirmPassword || data.password,
      });
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } } };
      return rejectWithValue(
        error.response?.data?.error?.message || "Erreur lors de l'inscription"
      );
    }
  }
);

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<AuthUser>(API_ROUTES.AUTH.ME);
      return response.data;
    } catch {
      return rejectWithValue('Session expirée');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  clearStorage();
});

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.post(API_ROUTES.AUTH.FORGOT_PASSWORD, { email });
      return response.message;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } } };
      return rejectWithValue(
        error.response?.data?.error?.message || 'Erreur envoi email'
      );
    }
  }
);

// ── Slice ────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    updateProfile: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    restoreSession: (state) => {
      const stored = loadFromStorage();
      if (stored.user && stored.accessToken) {
        state.user            = stored.user;
        state.accessToken     = stored.accessToken;
        state.refreshToken    = stored.refreshToken || null;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading         = false;
        state.user            = action.payload.user;
        state.accessToken     = action.payload.accessToken;
        state.refreshToken    = action.payload.refreshToken;
        state.isAuthenticated = true;
        saveToStorage(action.payload.accessToken, action.payload.refreshToken, action.payload.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload as string;
      });

    builder
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading         = false;
        state.user            = action.payload.user;
        state.accessToken     = action.payload.accessToken;
        state.refreshToken    = action.payload.refreshToken;
        state.isAuthenticated = true;
        saveToStorage(action.payload.accessToken, action.payload.refreshToken, action.payload.user);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload as string;
      });

    builder
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null; state.accessToken = null;
        state.refreshToken = null; state.isAuthenticated = false;
        clearStorage();
      });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null; state.accessToken = null;
      state.refreshToken = null; state.isAuthenticated = false;
      state.error = null;
    });

    builder
      .addCase(forgotPassword.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(forgotPassword.fulfilled, (state) => { state.loading = false; })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string;
      });
  },
});

export const { clearError, updateProfile, restoreSession } = authSlice.actions;
export default authSlice.reducer;