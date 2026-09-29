import { createSlice } from '@reduxjs/toolkit';

export function detectInitialTheme() {
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: detectInitialTheme() },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    setTheme(state, action) {
      state.mode = action.payload === 'dark' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const selectThemeMode = (s) => s.theme.mode;
export default themeSlice.reducer;
