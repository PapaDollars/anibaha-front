import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User, UserRole, UserStatus } from '@/types/user';
import { USER_ROLES, USER_STATUS } from '@/utils/constants';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: USER_ROLES.CLIENT,
    status: USER_STATUS.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isVerified: true,
    isActive: true,
    loginCount: 5,
    addresses: [{
      id: 'addr-1',
      street: '123 Main St',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      isDefault: true
    }],
    preferences: {
      language: 'fr',
      currency: 'XAF',
      theme: 'light',
      notifications: {
        email: true,
        sms: false,
        push: true,
        whatsapp: false,
        marketing: false,
        orders: true,
        promotions: false,
        security: true
      },
      privacy: {
        profileVisibility: 'public',
        showOnlineStatus: true,
        allowMessages: true
      }
    },
    twoFactorEnabled: false
  },
  {
    id: '2',
    password: 'password456',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    role: USER_ROLES.COMPANY,
    status: USER_STATUS.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isVerified: false,
    isActive: true,
    loginCount: 2,
    addresses: [{
      id: 'addr-2',
      street: '456 Side St',
      city: 'Lyon',
      postalCode: '69000',
      country: 'France',
      isDefault: true
    }],
    preferences: {
      language: 'en',
      currency: 'EUR',
      theme: 'dark',
      notifications: {
        email: true,
        sms: true,
        push: false,
        whatsapp: true,
        marketing: true,
        orders: true,
        promotions: true,
        security: false
      },
      privacy: {
        profileVisibility: 'private',
        showOnlineStatus: false,
        allowMessages: false
      }
    },
    twoFactorEnabled: true
  }
];

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [
    {
      id: '1',
      password: 'azerty123',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
            role: USER_ROLES.COMPANY,
      status: USER_STATUS.ACTIVE,
      phone: '+33612345678',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '123 Rue de Paris',
        city: 'Paris',
        postalCode: '75001',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      password: 'azerty456',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.ACTIVE,
      phone: '+33623456789',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '456 Avenue des Champs-Élysées',
        city: 'Paris',
        postalCode: '75008',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z'
    },
    {
      id: '3',
      password: 'azerty789',
      firstName: 'Pierre',
      lastName: 'Bernard',
      email: 'pierre.bernard@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.INACTIVE,
      phone: '+33634567890',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '789 Boulevard Saint-Michel',
        city: 'Paris',
        postalCode: '75005',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-03T00:00:00Z'
    },
    {
      id: '4',
      password: 'azerty321',
      firstName: 'Sophie',
      lastName: 'Petit',
      email: 'sophie.petit@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.ACTIVE,
      phone: '+33645678901',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '101 Rue de la Paix',
        city: 'Lyon',
        postalCode: '69001',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-04T00:00:00Z',
      updatedAt: '2024-01-04T00:00:00Z'
    },
    {
      id: '5',
      password: 'lucasPwd',
      firstName: 'Lucas',
      lastName: 'Robert',
      email: 'lucas.robert@example.com',
            role: USER_ROLES.COMPANY,
      status: USER_STATUS.ACTIVE,
      phone: '+33656789012',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '102 Avenue Jean Jaurès',
        city: 'Marseille',
        postalCode: '13001',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-05T00:00:00Z'
    },
    {
      id: '6',
      password: 'emmaPwd',
      firstName: 'Emma',
      lastName: 'Richard',
      email: 'emma.richard@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.INACTIVE,
      phone: '+33667890123',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '103 Rue de la République',
        city: 'Lille',
        postalCode: '59000',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-06T00:00:00Z',
      updatedAt: '2024-01-06T00:00:00Z'
    },
    {
      id: '7',
      password: 'thomasPwd',
      firstName: 'Thomas',
      lastName: 'Dubois',
      email: 'thomas.dubois@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.ACTIVE,
      phone: '+33678901234',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '104 Boulevard Gambetta',
        city: 'Bordeaux',
        postalCode: '33000',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-07T00:00:00Z',
      updatedAt: '2024-01-07T00:00:00Z'
    },
    {
      id: '8',
      password: 'juliePwd',
      firstName: 'Julie',
      lastName: 'Moreau',
      email: 'julie.moreau@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.ACTIVE,
      phone: '+33689012345',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '105 Rue Victor Hugo',
        city: 'Toulouse',
        postalCode: '31000',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-08T00:00:00Z',
      updatedAt: '2024-01-08T00:00:00Z'
    },
    {
      id: '9',
      password: 'nicolasPwd',
      firstName: 'Nicolas',
      lastName: 'Laurent',
      email: 'nicolas.laurent@example.com',
            role: USER_ROLES.COMPANY,
      status: USER_STATUS.INACTIVE,
      phone: '+33690123456',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '106 Avenue des Ternes',
        city: 'Nice',
        postalCode: '06000',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-09T00:00:00Z',
      updatedAt: '2024-01-09T00:00:00Z'
    },
    {
      id: '10',
      password: 'camillePwd',
      firstName: 'Camille',
      lastName: 'Simon',
      email: 'camille.simon@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.ACTIVE,
      phone: '+33601234567',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '107 Rue de Rivoli',
        city: 'Strasbourg',
        postalCode: '67000',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-10T00:00:00Z'
    },
    {
      id: '11',
      password: 'antoinePwd',
      firstName: 'Antoine',
      lastName: 'Michel',
      email: 'antoine.michel@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.ACTIVE,
      phone: '+33612345678',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '108 Boulevard Haussmann',
        city: 'Nantes',
        postalCode: '44000',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-11T00:00:00Z',
      updatedAt: '2024-01-11T00:00:00Z'
    },
    {
      id: '12',
      password: 'leaPwd',
      firstName: 'Léa',
      lastName: 'Lefebvre',
      email: 'lea.lefebvre@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.INACTIVE,
      phone: '+33623456789',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '109 Rue du Commerce',
        city: 'Montpellier',
        postalCode: '34000',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-12T00:00:00Z',
      updatedAt: '2024-01-12T00:00:00Z'
    },
    {
      id: '13',
      password: 'maximePwd',
      firstName: 'Maxime',
      lastName: 'Garcia',
      email: 'maxime.garcia@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.ACTIVE,
      phone: '+33634567890',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '110 Avenue de la République',
        city: 'Rennes',
        postalCode: '35000',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-13T00:00:00Z',
      updatedAt: '2024-01-13T00:00:00Z'
    },
    {
      id: '14',
      password: 'chloePwd',
      firstName: 'Chloé',
      lastName: 'David',
      email: 'chloe.david@example.com',
            role: USER_ROLES.COMPANY,
      status: USER_STATUS.ACTIVE,
      phone: '+33645678901',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '111 Boulevard de la Madeleine',
        city: 'Lyon',
        postalCode: '69002',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-14T00:00:00Z',
      updatedAt: '2024-01-14T00:00:00Z'
    },
    {
      id: '15',
      password: 'hugoPwd',
      firstName: 'Hugo',
      lastName: 'Bertrand',
      email: 'hugo.bertrand@example.com',
            role: USER_ROLES.CLIENT,
      status: USER_STATUS.ACTIVE,
      phone: '+33656789012',
      addresses: [{
          id: 'addr-1',
          isDefault: true,

        street: '112 Rue de la Pompe',
        city: 'Paris',
        postalCode: '75016',
        country: 'France'
      }],
      preferences: {
        language: 'en',
        currency: 'USD',
        theme: 'light',
        notifications: {
          email: true,
          sms: false,
          push: false,
          whatsapp: false,
          marketing: false,
          orders: true,
          promotions: false,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showOnlineStatus: true,
          allowMessages: true
        }
      },
      isVerified: true,
      isActive: true,
      loginCount: 1,
      twoFactorEnabled: false,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    }
  ],
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return userId;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, userData }: { userId: string; userData: Partial<User> }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: userId, ...userData };
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload };
        }
      });
  }
});

export default userSlice.reducer; 