import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';
import { WishlistItem } from '@/types/wishlist';

interface WishlistState {
  items: WishlistItem[];
}

// Charger les favoris depuis le localStorage
const loadWishlistFromStorage = (): WishlistItem[] => {
  try {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des favoris:', error);
    return [];
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<{ product: Product; userId: string }>) => {
      const { product, userId } = action.payload;
      
      // Vérification de sécurité pour s'assurer que product et userId existent
      if (!product?.id || !userId) {
        console.error('Product or userId is undefined');
        return;
      }

      const existingItem = state.items.find(item => 
        item?.product?.id === product.id && item?.userId === userId
      );

      if (!existingItem) {
        const newItem: WishlistItem = {
          id: `${product.id}-${userId}`,
          userId,
          productId: product.id,
          product,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        state.items.push(newItem);
        // Sauvegarder dans le localStorage
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Sauvegarder dans le localStorage
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      // Supprimer du localStorage
      localStorage.removeItem('wishlist');
    },
    loadWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
      // Sauvegarder dans le localStorage
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    }
  },
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist,
  loadWishlist 
} = wishlistSlice.actions;

export default wishlistSlice.reducer; 