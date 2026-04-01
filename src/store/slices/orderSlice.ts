// ================================================================
// ORDER SLICE - Commandes branchées sur l'API Anibaha
// ================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, Pagination } from '@/utils/apiService';
import { API_ROUTES, API_GENERATORS } from '@/utils/url/url_backend';
import { Order } from '@/types/order';

interface OrderState {
  orders:        Order[];
  selectedOrder: Order | null;
  chargement:    boolean;
  error:         string | null;
  pagination:    Pagination | null;
}

const initialState: OrderState = {
  orders:        [],
  selectedOrder: null,
  chargement:    false,
  error:         null,
  pagination:    null,
};

// ── Thunks ───────────────────────────────────────────────────────

export const fetchOrders = createAsyncThunk(
  'order/fetchAll',
  async (params: { page?: number; limit?: number; status?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get<Order[]>(API_ROUTES.ORDERS.LIST, params as Record<string, unknown>);
      return response;
    } catch {
      return rejectWithValue('Erreur chargement commandes');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'order/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Order>(API_GENERATORS.order(id));
      return response.data;
    } catch {
      return rejectWithValue('Commande introuvable');
    }
  }
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (data: {
    items:           { productId: string; variantId?: string; quantity: number }[];
    billingAddress:  Record<string, unknown>;
    shippingAddress: Record<string, unknown>;
    paymentMethod:   string;
    shippingMethod:  string;
    notes?:          string;
  }, { rejectWithValue }) => {
    try {
      const response = await api.post<Order>(API_ROUTES.ORDERS.CREATE, data);
      return response.data;
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: { message?: string } } } };
      return rejectWithValue(e.response?.data?.error?.message || 'Erreur création commande');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'order/updateStatus',
  async ({ id, status, note, trackingNumber }: {
    id:             string;
    status:         string;
    note?:          string;
    trackingNumber?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await api.patch<Order>(
        API_GENERATORS.orderStatus(id),
        { status, note, trackingNumber }
      );
      return response.data;
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: { message?: string } } } };
      return rejectWithValue(e.response?.data?.error?.message || 'Erreur mise à jour statut');
    }
  }
);

export const passerCommande = createAsyncThunk(
  'order/pass',
  async (data: {
    items: { productId: string; quantity: number }[];
    adresseLivraison: Record<string, unknown>;
    modePaiement: string;
    guestInfo?: { firstName: string; lastName: string; email: string; phone: string };
  }, { rejectWithValue }) => {
    try {
      const response = await api.post<Order>(API_ROUTES.ORDERS.CREATE, {
        items: data.items,
        shippingAddress: data.adresseLivraison,
        billingAddress: data.adresseLivraison,
        paymentMethod: data.modePaiement,
        shippingMethod: 'standard',
        ...(data.guestInfo && { guestInfo: data.guestInfo }),
      });
      return response.data;
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: { message?: string } } } };
      return rejectWithValue(e.response?.data?.error?.message || 'Erreur création commande');
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => { state.selectedOrder = null; },
    clearError:         (state) => { state.error = null; },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchOrders.pending,   (state) => { state.chargement = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.chargement    = false;
        state.orders     = action.payload.data ?? [];
        state.pagination = action.payload.pagination as Pagination ?? null;
      })
      .addCase(fetchOrders.rejected,  (state, action) => {
        state.chargement = false;
        state.error   = action.payload as string;
      });

    builder
      .addCase(fetchOrderById.pending,   (state) => { state.chargement = true; })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.chargement       = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected,  (state, action) => {
        state.chargement = false;
        state.error   = action.payload as string;
      });

    builder
      .addCase(createOrder.pending,   (state) => { state.chargement = true; state.error = null; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.chargement = false;
        state.orders.unshift(action.payload);
        state.selectedOrder = action.payload;
      })
      .addCase(createOrder.rejected,  (state, action) => {
        state.chargement = false;
        state.error   = action.payload as string;
      });

    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      const idx = state.orders.findIndex(o => o.id === action.payload.id);
      if (idx !== -1) state.orders[idx] = action.payload;
      if (state.selectedOrder?.id === action.payload.id) {
        state.selectedOrder = action.payload;
      }
    });

    builder
      .addCase(passerCommande.pending,   (state) => { state.chargement = true; state.error = null; })
      .addCase(passerCommande.fulfilled, (state, action) => {
        state.chargement = false;
        state.orders.unshift(action.payload);
        state.selectedOrder = action.payload;
      })
      .addCase(passerCommande.rejected,  (state, action) => {
        state.chargement = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;
