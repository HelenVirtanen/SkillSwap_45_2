import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store/store';

interface FavoritesState {
  ids: string[];
}

const initialState: FavoritesState = {
  ids: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(i => i !== id);
      } else {
        state.ids.push(id);
      }

      localStorage.setItem('favorites', JSON.stringify(state.ids));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state: RootState) => state.favorites.ids;
export default favoritesSlice.reducer;
