import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProfilesApi, type TProfile } from '@api/api';
import type { IUserCardData } from '@widgets/UserCardsGroup/UserCardsGroup';
import type { RootState } from '@app/store/store'; // ← импорт RootState

// Состояние слайса
interface UsersState {
  allUsers: TProfile[]; // сырые данные из API
  mappedUsers: IUserCardData[]; // преобразованные для карточек
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Начальное состояние
const initialState: UsersState = {
  allUsers: [],
  mappedUsers: [],
  status: 'idle',
  error: null,
};

// Вспомогательная функция маппинга
const mapProfileToCard = (profile: TProfile): IUserCardData => ({
  id: String(profile.id),
  avatar: profile.avatar ?? '/avatars/default.png',
  name: profile.name,
  birthDate: profile.birthDate ?? 'Не указано',
  city: profile.city ?? 'Город не указан',
  gender: profile.gender ?? 'any',

  teachingSkill: {
    title:
      profile.teach_skills?.skills ??
      profile.teach_skills?.title ??
      'Навык не указан',
    variant: 'education',
  },

  learningSkills:
    profile.learn_skills?.map((skill) => ({
      title: skill,
      variant: 'education',
    })) ?? [],

  isFavorite: false,
});

// Thunk для загрузки всех пользователей
export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () =>
  getProfilesApi(),
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers(state) {
      state.allUsers = [];
      state.mappedUsers = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<TProfile[]>) => {
          state.status = 'succeeded';
          state.allUsers = action.payload;
          state.mappedUsers = action.payload.map(mapProfileToCard);
        },
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Экспорт действий
export const { clearUsers } = usersSlice.actions;

// Селекторы — исправленные под твой стор (state.user вместо state.users)
export const selectAllUsers = (state: RootState) => state.users.allUsers;
export const selectMappedUsers = (state: RootState) => state.users.mappedUsers;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;

// Экспорт редьюсера
export default usersSlice.reducer;
