import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { Company } from '@/types/company';
import { companies } from '@/data/brands';

export interface CompanyState {
  companies: Company[];
  selectedCompany: Company | null;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  companies: [],
  selectedCompany: null,
  loading: false,
  error: null
};

// Thunks
export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async () => {
    // Simuler un appel API
    return new Promise<Company[]>((resolve) => {
      setTimeout(() => {
        resolve(companies);
      }, 100);
    });
  }
);

export const fetchBrandById = createAsyncThunk(
  'brands/fetchBrandById',
  async (id: string) => {
    // Simuler un appel API
    return new Promise<Company>((resolve, reject) => {
      setTimeout(() => {
        const company = companies.find(c => c.id === id);
        if (company) {
          resolve(company);
        } else {
          reject(new Error('Entreprise non trouvée'));
        }
      }, 500);
    });
  }
);

export const updateBrand = createAsyncThunk(
  'brands/updateBrand',
  async (company: Company) => {
    // Simuler un appel API
    return new Promise<Company>((resolve) => {
      setTimeout(() => {
        resolve(company);
      }, 500);
    });
  }
);

export const toggleBrandStatus = createAsyncThunk(
  'brands/toggleBrandStatus',
  async ({ id, status }: { id: string; status: 'pending' | 'approved' | 'suspended' | 'rejected' }) => {
    // Simuler un appel API
    return new Promise<Company>((resolve, reject) => {
      setTimeout(() => {
        const company = companies.find(c => c.id === id);
        if (company) {
          const updatedCompany = { ...company, status };
          resolve(updatedCompany);
        } else {
          reject(new Error('Entreprise non trouvée'));
        }
      }, 500);
    });
  }
);

export const createCompany = createAsyncThunk(
  'companies/createCompany',
  async (companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Simuler un appel API
    return new Promise<Company>((resolve) => {
      setTimeout(() => {
        const newCompany: Company = {
          ...companyData,
          id: String(Date.now()),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        resolve(newCompany);
      }, 500);
    });
  }
);

export const deleteBrand = createAsyncThunk(
  'brands/deleteBrand',
  async (id: string) => {
    // Simuler un appel API
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const company = companies.find(c => c.id === id);
        if (company) {
          resolve(id);
        } else {
          reject(new Error('Entreprise non trouvée'));
        }
      }, 500);
    });
  }
);

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Companies
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement des entreprises';
      })
      // Fetch Company By Id
      .addCase(fetchBrandById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCompany = action.payload;
      })
      .addCase(fetchBrandById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du chargement de l\'entreprise';
      })
      // Update Company
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.map((company: Company) => 
          company.id === action.payload.id ? action.payload : company
        );
        if (state.selectedCompany?.id === action.payload.id) {
          state.selectedCompany = action.payload;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors de la mise à jour de l\'entreprise';
      })
      // Toggle Company Status
      .addCase(toggleBrandStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBrandStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.map((company: Company) => 
          company.id === action.payload.id ? action.payload : company
        );
        if (state.selectedCompany?.id === action.payload.id) {
          state.selectedCompany = action.payload;
        }
      })
      .addCase(toggleBrandStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors du changement de statut de l\'entreprise';
      })
      // Create Company
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors de la création de l\'entreprise';
      })
      // Delete Company
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter((company: Company) => company.id !== action.payload);
        if (state.selectedCompany?.id === action.payload) {
          state.selectedCompany = null;
        }
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erreur lors de la suppression de l\'entreprise';
      });
  }
});

export const { clearError, setSelectedCompany } = companySlice.actions;

// Selectors
export const selectCompaniesState = (state: RootState) => state.brands;

export const selectCompanies = createSelector(
  selectCompaniesState,
  (companyState) => companyState.companies
);

export const selectCompanyLoading = createSelector(
  selectCompaniesState,
  (companyState) => companyState.loading
);

export const selectCompanyError = createSelector(
  selectCompaniesState,
  (companyState) => companyState.error
);

export const selectSelectedCompany = createSelector(
  selectCompaniesState,
  (companyState) => companyState.selectedCompany
);

export default companySlice.reducer; 