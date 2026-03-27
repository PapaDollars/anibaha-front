const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const CART_KEY = 'cart';
const THEME_KEY = 'theme';

export const storage = {
  // Token
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // User
  getUser: (): any => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  setUser: (user: any): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  // Cart
  getCart: (): any => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : null;
  },
  setCart: (cart: any): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },
  removeCart: (): void => {
    localStorage.removeItem(CART_KEY);
  },

  // Theme
  getTheme: (): string => {
    return localStorage.getItem(THEME_KEY) || 'light';
  },
  setTheme: (theme: string): void => {
    localStorage.setItem(THEME_KEY, theme);
  },

  // Clear all
  clearAll: (): void => {
    localStorage.clear();
  },
}; 