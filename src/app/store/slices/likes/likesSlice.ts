import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store/store';

interface LikesState {
  likedUserIds: number[];                    // кого лайкнул текущий пользователь
  favouritesCountMap: Record<number, number>; // { userId: сколько лайков получил }
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const initialState: LikesState = {
  likedUserIds: [],
  favouritesCountMap: {},
  status: 'idle',
  error: null,
};

// Загрузка лайков из JSON-файла
export const fetchLikes = createAsyncThunk(
  'likes/fetchLikes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/db/likes.json');
      if (!response.ok) throw new Error('Не удалось загрузить лайки');

      const data = await response.json();

      // Предполагаем структуру { success: true, data: [{id, fromUserId, toUserId}, ...] }
      const likes = data.data || data || [];

      // Для текущего пользователя (допустим, id текущего = 1 — потом замени на реальный)
      const currentUserId = 1; // ← ПОМЕНЯЙ НА РЕАЛЬНЫЙ ID ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ (из auth-стора)

      // Кого лайкнул текущий пользователь
      const likedByMe = likes
        .filter((like: any) => like.fromUserId === currentUserId)
        .map((like: any) => like.toUserId);

      // Сколько лайков у каждого пользователя
      const countMap: Record<number, number> = {};
      likes.forEach((like: any) => {
        countMap[like.toUserId] = (countMap[like.toUserId] || 0) + 1;
      });

      return { likedUserIds: likedByMe, favouritesCountMap: countMap };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка загрузки лайков');
    }
  }
);

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLikes.fulfilled, (state, action: PayloadAction<{ likedUserIds: number[]; favouritesCountMap: Record<number, number> }>) => {
        state.status = 'succeeded';
        state.likedUserIds = action.payload.likedUserIds;
        state.favouritesCountMap = action.payload.favouritesCountMap;
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default likesSlice.reducer;

// Селекторы
export const selectLikedUserIds = (state: RootState) => state.likes.likedUserIds;
export const selectFavouritesCountMap = (state: RootState) => state.likes.favouritesCountMap;
export const selectLikesStatus = (state: RootState) => state.likes.status;