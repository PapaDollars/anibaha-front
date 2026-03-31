import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  image?: string;
  role: "client" | "company_admin" | "super_admin";
  companyId?: string;
  isActive?: boolean;
  status?: "active" | "suspended";
  points?: number;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const etatInitial: AuthState = {
  user:         null,
  accessToken:  localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  loading:      false,
  error:        null,
};

// ─── Thunks ───────────────────────────────────────────────────────────────────

// login
export const login = createAsyncThunk(
  "auth/login",
  async (donnees: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const r = await axios.post("/api/auth/login", donnees);
      return r.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Email ou mot de passe incorrect");
    }
  }
);

// register
export const register = createAsyncThunk(
  "auth/register",
  async (
    donnees: { name?: string; firstName?: string; lastName?: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const r = await axios.post("/api/auth/register", donnees);
      return r.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Erreur lors de l'inscription");
    }
  }
);

// fetchMe — utilisé dans App.tsx pour restaurer la session au démarrage
export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const r = await axios.get("/api/auth/me");
      return r.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Session invalide");
    }
  }
);

// deconnexion
export const deconnexion = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/auth/logout").catch(() => {});
    } catch {
      // On se déconnecte localement même si l'API échoue
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  }
);

// refreshToken
export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("refreshToken");
      if (!token) return rejectWithValue("Pas de refresh token");
      const r = await axios.post("/api/auth/refresh", { refreshToken: token });
      return r.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Session expirée");
    }
  }
);

// forgotPassword
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const r = await axios.post("/api/auth/forgot-password", { email });
      return r.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Erreur");
    }
  }
);

// resetPassword
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (donnees: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const r = await axios.post("/api/auth/reset-password", donnees);
      return r.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Erreur");
    }
  }
);

// ─── Selectors ────────────────────────────────────────────────────────────────

import type { RootState } from "../index";

export const selectUser         = (state: RootState) => state.auth.user;
export const selectIsAuth       = (state: RootState) => !!state.auth.user;
export const selectAuthLoading  = (state: RootState) => state.auth.loading;
export const selectAuthError    = (state: RootState) => state.auth.error;
export const selectAccessToken  = (state: RootState) => state.auth.accessToken;
export const selectUserRole     = (state: RootState) => state.auth.user?.role ?? null;
export const selectIsSuperAdmin = (state: RootState) => state.auth.user?.role === "super_admin";
export const selectIsCompanyAdmin = (state: RootState) => state.auth.user?.role === "company_admin";
export const selectIsClient     = (state: RootState) => state.auth.user?.role === "client";

// ─── Helper interne — persiste les tokens ─────────────────────────────────────

function persisterTokens(state: AuthState, payload: any) {
  if (payload.accessToken) {
    state.accessToken = payload.accessToken;
    localStorage.setItem("accessToken", payload.accessToken);
  }
  if (payload.refreshToken) {
    state.refreshToken = payload.refreshToken;
    localStorage.setItem("refreshToken", payload.refreshToken);
  }
  if (payload.user) {
    state.user = payload.user;
    localStorage.setItem("user", JSON.stringify(payload.user));
  }
}

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState: etatInitial,
  reducers: {
    // Réinitialiser manuellement (déconnexion locale)
    reinitialiserAuth(state) {
      state.user         = null;
      state.accessToken  = null;
      state.refreshToken = null;
      state.error        = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
    effacerErreurAuth(state) {
      state.error = null;
    },
    // Mettre à jour l'utilisateur localement (ex. après mise à jour profil)
    mettreAJourUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {

    // ── login ──────────────────────────────────────────────────
    builder
      .addCase(login.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        persisterTokens(state, action.payload);
      })
      .addCase(login.rejected,  (state, action) => { state.loading = false; state.error = action.payload as string; });

    // ── register ───────────────────────────────────────────────
    builder
      .addCase(register.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        persisterTokens(state, action.payload);
      })
      .addCase(register.rejected,  (state, action) => { state.loading = false; state.error = action.payload as string; });

    // ── fetchMe — restauration session ────────────────────────
    builder
      .addCase(fetchMe.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        // L'API retourne { user: {...} } ou directement l'user
        state.user = action.payload.user ?? action.payload;
      })
      .addCase(fetchMe.rejected,  (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      });

    // ── deconnexion ────────────────────────────────────────────
    builder
      .addCase(deconnexion.fulfilled, (state) => {
        state.user         = null;
        state.accessToken  = null;
        state.refreshToken = null;
        state.error        = null;
      });

    // ── refreshToken ───────────────────────────────────────────
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
          localStorage.setItem("accessToken", action.payload.accessToken);
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("accessToken");
      });

    // ── forgotPassword / resetPassword ─────────────────────────
    builder
      .addCase(forgotPassword.pending,  (state) => { state.loading = true; state.error = null; })
      .addCase(forgotPassword.fulfilled,(state) => { state.loading = false; })
      .addCase(forgotPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

    builder
      .addCase(resetPassword.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(resetPassword.fulfilled, (state) => { state.loading = false; })
      .addCase(resetPassword.rejected,  (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { reinitialiserAuth, effacerErreurAuth, mettreAJourUser } = authSlice.actions;
export default authSlice.reducer;