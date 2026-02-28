import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store/store';

interface FavoritesState {
  ids: number[];
}

export const loadFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem('favorites');
    if (!stored) return [];
    return JSON.parse(stored) as number[];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  ids: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
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
