import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { ids: [] },
  reducers: {
    toggleFavorite(state, action) {
      const i = state.ids.indexOf(action.payload);
      if (i === -1) state.ids.push(action.payload);
      else state.ids.splice(i, 1);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavoriteIds = (s) => s.favorites.ids;
export default favoritesSlice.reducer;
