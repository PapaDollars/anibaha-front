import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Settings } from '@/types/settings';

// Mock settings data
const mockSettings: Settings = {
  id: '1',
  siteName: 'CE Site E-commerce',
  siteDescription: 'Votre boutique en ligne préférée',
  contactEmail: 'contact@example.com',
  phoneNumber: '+33612345678',
  address: '123 Main St, Paris, France',
  socialMedia: {
    facebook: 'https://facebook.com/example',
    twitter: 'https://twitter.com/example',
    instagram: 'https://instagram.com/example',
  },
  currency: 'EUR',
  language: 'fr',
  timezone: 'Europe/Paris',
  email: {
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    fromEmail: '',
    fromName: ''
  },
  payment: {
    stripePublicKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalSecret: ''
  },
  shipping: {
    shippingMethods: [],
    freeShippingThreshold: 0
  },
  updatedAt: new Date().toISOString()
};

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockSettings;
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (settings: Partial<Settings>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ...mockSettings, ...settings };
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    data: null as Settings | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Settings
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch settings';
      })
      // Update Settings
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update settings';
      });
  },
});

export const { clearError } = settingsSlice.actions;
export default settingsSlice.reducer; 