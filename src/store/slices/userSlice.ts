import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Adresse {
  id: string;
  label: string;
  rue: string;
  ville: string;
  quartier?: string;
  telephone?: string;
  estPrincipale: boolean;
}

export interface UserState {
  profil: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    points: number;
    role: string;
    adresses: Adresse[];
    createdAt: string;
  } | null;
  chargement: boolean;
  chargementMdp: boolean;
  chargementAdresse: boolean;
  erreur: string | null;
  messageSucces: string | null;
}

const etatInitial: UserState = {
  profil: null,
  chargement: false,
  chargementMdp: false,
  chargementAdresse: false,
  erreur: null,
  messageSucces: null,
};

// ─── Thunks — utilisateur connecté ───────────────────────────────────────────

export const fetchProfil = createAsyncThunk(
  "user/fetchProfil",
  async (_, { rejectWithValue }) => {
    try { const r = await axios.get("/api/users/me"); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur chargement profil"); }
  }
);

export const mettreAJourProfil = createAsyncThunk(
  "user/updateProfil",
  async (donnees: { name?: string; phone?: string; avatar?: string }, { rejectWithValue }) => {
    try { const r = await axios.patch("/api/users/me", donnees); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur mise à jour"); }
  }
);

// changePassword — utilisé dans Company/Settings/index.tsx et Client/Profile/index.tsx
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (
    donnees: { ancienMotDePasse: string; nouveauMotDePasse: string; confirmationMotDePasse: string },
    { rejectWithValue }
  ) => {
    try {
      if (donnees.nouveauMotDePasse !== donnees.confirmationMotDePasse)
        return rejectWithValue("Les mots de passe ne correspondent pas");
      if (donnees.nouveauMotDePasse.length < 8)
        return rejectWithValue("Minimum 8 caractères");
      const r = await axios.patch("/api/users/me/password", {
        currentPassword: donnees.ancienMotDePasse,
        newPassword: donnees.nouveauMotDePasse,
      });
      return r.data;
    } catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur changement mot de passe"); }
  }
);

export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (adresse: Omit<Adresse, "id">, { rejectWithValue }) => {
    try { const r = await axios.post("/api/users/me/addresses", adresse); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur ajout adresse"); }
  }
);

export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ id, donnees }: { id: string; donnees: Partial<Adresse> }, { rejectWithValue }) => {
    try { const r = await axios.patch(`/api/users/me/addresses/${id}`, donnees); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur mise à jour adresse"); }
  }
);

export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async (id: string, { rejectWithValue }) => {
    try { await axios.delete(`/api/users/me/addresses/${id}`); return id; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur suppression adresse"); }
  }
);

// ─── Thunks — SuperAdmin (gestion de tous les utilisateurs) ──────────────────

// fetchUsers — utilisé dans SuperAdmin/Users/index.tsx et Company/Sidebar/index.tsx
export const fetchUsers = createAsyncThunk(
  "user/fetchAll",
  async (params: { page?: number; search?: string; role?: string } = {}, { rejectWithValue }) => {
    try {
      const { page = 1, search = "", role } = params;
      const query = new URLSearchParams({ page: String(page), ...(search && { search }), ...(role && { role }) });
      const r = await axios.get(`/api/users?${query}`);
      return r.data;
    } catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur chargement utilisateurs"); }
  }
);

// createUser — utilisé dans SuperAdmin/Users/index.tsx
export const createUser = createAsyncThunk(
  "user/create",
  async (
    donnees: { email: string; password: string; firstName?: string; lastName?: string; name?: string; role?: string; phone?: string },
    { rejectWithValue }
  ) => {
    try { const r = await axios.post("/api/users", donnees); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur création utilisateur"); }
  }
);

// updateUser — utilisé dans SuperAdmin/Users/index.tsx — signature: { id, data }
export const updateUser = createAsyncThunk(
  "user/update",
  async (
    { id, data }: { id: string; data: { email?: string; firstName?: string; lastName?: string; role?: string; password?: string } },
    { rejectWithValue }
  ) => {
    try { const r = await axios.patch(`/api/users/${id}`, data); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur mise à jour utilisateur"); }
  }
);

// deleteUser — utilisé dans SuperAdmin/Users/index.tsx et Company/Sidebar/index.tsx
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id: string, { rejectWithValue }) => {
    try { await axios.delete(`/api/users/${id}`); return id; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur suppression"); }
  }
);

export const updateUserRole = createAsyncThunk(
  "user/updateRole",
  async ({ id, role }: { id: string; role: string }, { rejectWithValue }) => {
    try { const r = await axios.patch(`/api/users/${id}/role`, { role }); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur changement rôle"); }
  }
);

export const toggleUserStatus = createAsyncThunk(
  "user/toggleStatus",
  async (id: string, { rejectWithValue }) => {
    try { const r = await axios.patch(`/api/users/${id}/status`); return r.data; }
    catch (e: any) { return rejectWithValue(e.response?.data?.message || "Erreur changement statut"); }
  }
);

// ─── Selectors ────────────────────────────────────────────────────────────────

import type { RootState } from "../index";

export const selectProfil          = (state: RootState) => state.users.profil;
export const selectCurrentUser     = selectProfil;
export const selectUserLoading     = (state: RootState) => state.users.chargement;
export const selectUserError       = (state: RootState) => state.users.erreur;
export const selectUserSuccess     = (state: RootState) => state.users.messageSucces;
export const selectUserPoints      = (state: RootState) => state.users.profil?.points ?? 0;
export const selectUserAddresses   = (state: RootState) => state.users.profil?.adresses ?? [];
export const selectPasswordLoading = (state: RootState) => state.users.chargementMdp;
export const selectAddressLoading  = (state: RootState) => state.users.chargementAdresse;

// ─── Slice ────────────────────────────────────────────────────────────────────

const userSlice = createSlice({
  name: "user",
  initialState: etatInitial,
  reducers: {
    effacerErreur(state)       { state.erreur = null; },
    effacerMessageSucces(state){ state.messageSucces = null; },
    reinitialiserUser(state)   { state.profil = null; state.erreur = null; state.messageSucces = null; },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchProfil.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(fetchProfil.fulfilled, (state, action) => { state.chargement = false; state.profil = action.payload.user; })
      .addCase(fetchProfil.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(mettreAJourProfil.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(mettreAJourProfil.fulfilled, (state, action) => { state.chargement = false; state.profil = action.payload.user; state.messageSucces = "Profil mis à jour"; })
      .addCase(mettreAJourProfil.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(changePassword.pending,   (state) => { state.chargementMdp = true; state.erreur = null; state.messageSucces = null; })
      .addCase(changePassword.fulfilled, (state) => { state.chargementMdp = false; state.messageSucces = "Mot de passe modifié avec succès"; })
      .addCase(changePassword.rejected,  (state, action) => { state.chargementMdp = false; state.erreur = action.payload as string; });

    builder
      .addCase(addAddress.pending,   (state) => { state.chargementAdresse = true; state.erreur = null; })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.chargementAdresse = false;
        if (state.profil) state.profil.adresses.push(action.payload.address);
        state.messageSucces = "Adresse ajoutée";
      })
      .addCase(addAddress.rejected,  (state, action) => { state.chargementAdresse = false; state.erreur = action.payload as string; });

    builder
      .addCase(updateAddress.pending,   (state) => { state.chargementAdresse = true; state.erreur = null; })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.chargementAdresse = false;
        if (state.profil) {
          const i = state.profil.adresses.findIndex((a) => a.id === action.payload.address.id);
          if (i !== -1) state.profil.adresses[i] = action.payload.address;
        }
        state.messageSucces = "Adresse mise à jour";
      })
      .addCase(updateAddress.rejected, (state, action) => { state.chargementAdresse = false; state.erreur = action.payload as string; });

    builder
      .addCase(deleteAddress.pending,   (state) => { state.chargementAdresse = true; state.erreur = null; })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.chargementAdresse = false;
        if (state.profil) state.profil.adresses = state.profil.adresses.filter((a) => a.id !== action.payload);
        state.messageSucces = "Adresse supprimée";
      })
      .addCase(deleteAddress.rejected, (state, action) => { state.chargementAdresse = false; state.erreur = action.payload as string; });

    builder
      .addCase(fetchUsers.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(fetchUsers.fulfilled, (state) => { state.chargement = false; })
      .addCase(fetchUsers.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(createUser.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(createUser.fulfilled, (state) => { state.chargement = false; state.messageSucces = "Utilisateur créé"; })
      .addCase(createUser.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(updateUser.pending,   (state) => { state.chargement = true; state.erreur = null; })
      .addCase(updateUser.fulfilled, (state) => { state.chargement = false; state.messageSucces = "Utilisateur mis à jour"; })
      .addCase(updateUser.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(deleteUser.pending,   (state) => { state.chargement = true; })
      .addCase(deleteUser.fulfilled, (state) => { state.chargement = false; state.messageSucces = "Utilisateur supprimé"; })
      .addCase(deleteUser.rejected,  (state, action) => { state.chargement = false; state.erreur = action.payload as string; });

    builder
      .addCase(updateUserRole.fulfilled, (state) => { state.messageSucces = "Rôle mis à jour"; })
      .addCase(updateUserRole.rejected,  (state, action) => { state.erreur = action.payload as string; });

    builder
      .addCase(toggleUserStatus.rejected, (state, action) => { state.erreur = action.payload as string; });
  },
});

export const { effacerErreur, effacerMessageSucces, reinitialiserUser } = userSlice.actions;
export default userSlice.reducer;