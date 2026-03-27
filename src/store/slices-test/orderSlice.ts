import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Order } from '@/types/order';
import { ORDER_STATUS, PAYMENT_METHODS, PAYMENT_STATUS } from "@/utils/constants";
import type { PaymentMethod } from "@/utils/constants";
import type { RootState } from '@/store';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

// Fonction pour charger les commandes depuis le localStorage
const getInitialOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: OrderState = {
  orders: getInitialOrders(),
  currentOrder: null,
  loading: false,
  error: null,
};

// Fonction pour sauvegarder les commandes dans le localStorage
const saveOrders = (orders: Order[]) => {
  try {
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch {}
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const stored = localStorage.getItem('orders');
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      // Si parsing échoue, on vide le localStorage corrompu
      localStorage.removeItem('orders');
      return [];
    }
  } catch {
    return [];
  }
});

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const currentUser = state.auth.user;
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }
    try {
      const stored = localStorage.getItem('orders');
      if (!stored) return [];
      let allOrders: Order[] = [];
      try {
        allOrders = JSON.parse(stored);
      } catch {
        localStorage.removeItem('orders');
        return [];
      }
      const userOrders = allOrders.filter(order => order.user && order.user?.id === currentUser.id);
      return userOrders;
    } catch {
      return [];
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const currentUser = state.auth.user;
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }
    try {
      const stored = localStorage.getItem('orders');
      if (!stored) throw new Error('Commande non trouvée');
      let allOrders: Order[] = [];
      try {
        allOrders = JSON.parse(stored);
      } catch {
        localStorage.removeItem('orders');
        throw new Error('Commande non trouvée');
      }
      const order = allOrders.find(o => o.id === id);
      if (!order) {
        throw new Error('Commande non trouvée');
      }
      if (order.user?.id !== currentUser.id) {
        throw new Error('Accès non autorisé à cette commande');
      }
      return order;
    } catch (e: any) {
      throw new Error(e.message || 'Commande non trouvée');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: {
    items: Order['items'];
    shippingAddress: Order['shippingAddress'];
    billingAddress?: Order['billingAddress'];
    companyId: string;
    paymentMethod: string;
    totals: Order['totals'];
  }, { getState }) => {
    const state = getState() as RootState;
    const currentUser = state.auth.user;
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      user: currentUser,
      userId: currentUser.id,
      companyId: orderData.companyId,
      billingAddress: orderData.billingAddress || orderData.shippingAddress,
      payment: {
        method: orderData.paymentMethod as PaymentMethod,
        status: 'pending',
        amount: orderData.totals?.total ?? 0,
        currency: orderData.totals?.currency ?? 'XOF',
      },
      status: ORDER_STATUS.DELIVERED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      orderNumber: Math.floor(Math.random() * 10000).toString(),
      totals: orderData.totals ?? {
        subtotal: 0,
        tax: 0,
        taxRate: 0,
        shipping: 0,
        discount: 0,
        total: 0,
        currency: 'XOF',
      },
      shipping: {
        method: 'standard',
        cost: 0,
        address: orderData.shippingAddress,
      },
      statusHistory: [{
        status: ORDER_STATUS.DELIVERED,
        timestamp: new Date().toISOString(),
      }],
      canReview: false,
    };
    try {
      const stored = localStorage.getItem('orders');
      let allOrders: Order[] = [];
      if (stored) {
        try {
          allOrders = JSON.parse(stored);
        } catch {
          localStorage.removeItem('orders');
          allOrders = [];
        }
      }
      allOrders.unshift(newOrder);
      localStorage.setItem('orders', JSON.stringify(allOrders));
      return newOrder;
    } catch {
      throw new Error('Erreur technique lors de la création de la commande');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }: { orderId: string; status: typeof ORDER_STATUS[keyof typeof ORDER_STATUS] }, { getState }) => {
    const state = getState() as RootState;
    const currentUser = state.auth.user;
    
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }

    const order = getInitialOrders().find(o => o.id === orderId);
    if (!order) {
      throw new Error('Commande non trouvée');
    }

    // Vérifier que la commande appartient à l'utilisateur connecté
    if (order.user?.id !== currentUser.id) {
      throw new Error('Accès non autorisé à cette commande');
    }

    return { ...order, status, updatedAt: new Date().toISOString() };
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
      saveOrders(state.orders);
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.loading = false;
      state.error = null;
      saveOrders(state.orders);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      saveOrders(state.orders);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        saveOrders(state.orders);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Une erreur est survenue';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        saveOrders(state.orders);
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Une erreur est survenue';
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Une erreur est survenue';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
        saveOrders(state.orders);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
        saveOrders(state.orders);
      });
  },
});

export const { setOrders, addOrder, setLoading, setError, setCurrentOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer; 