import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import filtersReducer from '../features/filters/filtersSlice';
import themeReducer, { detectInitialTheme } from '../features/theme/themeSlice';

const STORAGE_KEY = 'kiln-store-v1';

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { theme: { mode: detectInitialTheme() } };
    const saved = JSON.parse(raw);
    return {
      cart: { items: saved.cartItems ?? [], isOpen: false },
      favorites: { ids: saved.favoriteIds ?? [] },
      theme: { mode: saved.themeMode ?? detectInitialTheme() },
    };
  } catch {
    return { theme: { mode: detectInitialTheme() } };
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
    theme: themeReducer,
  },
  preloadedState: loadPersisted(),
});

let last;
store.subscribe(() => {
  const { cart, favorites, theme } = store.getState();
  const snapshot = [cart.items, favorites.ids, theme.mode];
  if (last && snapshot.every((v, i) => v === last[i])) return; 
  last = snapshot;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cartItems: cart.items, favoriteIds: favorites.ids, themeMode: theme.mode })
    );
  } catch {
  }
});
