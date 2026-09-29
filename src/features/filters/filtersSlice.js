import { createSlice } from '@reduxjs/toolkit';
import { MIN_PRICE, MAX_PRICE } from '../../data/products';

export const PRICE_STEP = 100;

export const initialFilters = {
  search: '',
  categories: [],          
  priceMin: MIN_PRICE,
  priceMax: MAX_PRICE,
  minRating: 0,
  inStockOnly: false,
  sortBy: 'featured',   
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFilters,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    toggleCategory(state, action) {
      const i = state.categories.indexOf(action.payload);
      if (i === -1) state.categories.push(action.payload);
      else state.categories.splice(i, 1);
    },
    setPriceMin(state, action) {
      state.priceMin = Math.min(action.payload, state.priceMax - PRICE_STEP);
    },
    setPriceMax(state, action) {
      state.priceMax = Math.max(action.payload, state.priceMin + PRICE_STEP);
    },
    setMinRating(state, action) {
      state.minRating = action.payload;
    },
    toggleInStock(state) {
      state.inStockOnly = !state.inStockOnly;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    resetFilters: () => initialFilters,
  },
});

export const {
  setSearch, toggleCategory, setPriceMin, setPriceMax,
  setMinRating, toggleInStock, setSortBy, resetFilters,
} = filtersSlice.actions;

export const selectFilters = (s) => s.filters;

export default filtersSlice.reducer;
