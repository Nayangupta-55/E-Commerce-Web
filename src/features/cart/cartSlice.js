import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, name, price, emoji } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) existing.qty += 1;
      else state.items.push({ id, name, price, emoji, qty: 1 });
    },
    incrementQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },
    decrementQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.qty > 1) item.qty -= 1;
      else state.items = state.items.filter((i) => i.id !== action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

export const { addToCart, incrementQty, decrementQty, removeFromCart, clearCart, toggleCart, closeCart } =
  cartSlice.actions;

export const selectCartItems = (s) => s.cart.items;
export const selectCartOpen = (s) => s.cart.isOpen;
export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((n, i) => n + i.qty, 0)
);
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0)
);

export default cartSlice.reducer;
