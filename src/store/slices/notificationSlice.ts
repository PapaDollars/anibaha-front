// ================================================================
// NOTIFICATION SLICE - Notifications branchées sur l'API Anibaha
// ================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/utils/apiService';
import { API_ROUTES, API_GENERATORS } from '@/utils/url/url_backend';
import { Notification } from '@/types/notification';

interface NotificationState {
  notifications: Notification[];
  unreadCount:   number;
  loading:       boolean;
  error:         string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount:   0,
  loading:       false,
  error:         null,
};

// ── Thunks ───────────────────────────────────────────────────────

export const fetchNotifications = createAsyncThunk(
  'notification/fetchAll',
  async (unreadOnly: boolean = false, { rejectWithValue }) => {
    try {
      const response = await api.get<{ notifications: Notification[]; unreadCount: number }>(
        API_ROUTES.NOTIFICATIONS.LIST,
        unreadOnly ? { unread: true } : undefined
      );
      return response.data;
    } catch {
      return rejectWithValue('Erreur chargement notifications');
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.patch(API_GENERATORS.notificationRead(id));
      return id;
    } catch {
      return rejectWithValue('Erreur');
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      await api.patch(API_ROUTES.NOTIFICATIONS.MARK_ALL_READ);
      return true;
    } catch {
      return rejectWithValue('Erreur');
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchNotifications.pending,   (state) => { state.loading = true; })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading       = false;
        state.notifications = action.payload.notifications;
        state.unreadCount   = action.payload.unreadCount;
      })
      .addCase(fetchNotifications.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload as string;
      });

    builder.addCase(markAsRead.fulfilled, (state, action) => {
      const notif = state.notifications.find(n => n.id === action.payload);
      if (notif && !notif.isRead) {
        notif.isRead     = true;
        notif.readAt     = new Date().toISOString();
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    });

    builder.addCase(markAllAsRead.fulfilled, (state) => {
      state.notifications.forEach(n => {
        n.isRead  = true;
        n.readAt  = n.readAt ?? new Date().toISOString();
      });
      state.unreadCount = 0;
    });
  },
});

export const { clearError } = notificationSlice.actions;
export default notificationSlice.reducer;
