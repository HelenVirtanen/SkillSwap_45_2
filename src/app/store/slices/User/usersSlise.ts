import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getProfilesApi,
  getProfileByIdApi,
  getProfileByIdAuthApi,
  type TProfile,
} from '@api/api';
import type { IUserCardData } from '@widgets/UserCardsGroup/UserCardsGroup';
import type { RootState } from '@app/store/store';

// тип навыков
type SkillVariant =
  | 'business'
  | 'languages'
  | 'home'
  | 'art'
  | 'education'
  | 'health'
  | 'other';

const CATEGORY_TO_VARIANT: Record<string, SkillVariant> = {
  'Бизнес и карьера': 'business',
  'Иностранные языки': 'languages',
  'Дом и уют': 'home',
  'Творчество и искусство': 'art',
  'Образование и развитие': 'education',
  'Здоровье и лайфстайл': 'health',
};

const LEARN_SKILL_TO_VARIANT: Record<string, SkillVariant> = {
  Английский: 'languages',
  Французский: 'languages',
  Испанский: 'languages',
  Немецкий: 'languages',
  Китайский: 'languages',
  Японский: 'languages',
  'Продажи и переговоры': 'business',
  'Маркетинг и реклама': 'business',
  'Тайм-менеджмент': 'business',
  'Приготовление еды': 'home',
  Ремонт: 'home',
  'Домашние растения': 'home',
  'Рисование и иллюстрация': 'art',
  Фотография: 'art',
  Видеомонтаж: 'art',
  'Музыка и звук': 'art',
  Коучинг: 'education',
  'Навыки обучения': 'education',
  'Йога и медитация': 'health',
  'Питание и ЗОЖ': 'health',
  'Физические тренировки': 'health',
};

const getVariantByCategory = (category?: string): SkillVariant =>
  (category && CATEGORY_TO_VARIANT[category]) || 'other';

const getVariantBySkill = (skill?: string): SkillVariant =>
  (skill && LEARN_SKILL_TO_VARIANT[skill]) || 'other';

// Состояние слайса
interface UsersState {
  allUsers: TProfile[]; // сырые данные из API
  mappedUsers: IUserCardData[]; // преобразованные для карточек
  currentProfileUser: TProfile | null; // текущий пользователь для страницы профиля
  profileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  profileError: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Начальное состояние
const initialState: UsersState = {
  allUsers: [],
  mappedUsers: [],
  currentProfileUser: null,
  profileStatus: 'idle',
  profileError: null,
  status: 'idle',
  error: null,
};

// Вспомогательная функция маппинга
const mapProfileToCard = (profile: TProfile): IUserCardData => ({
  id: String(profile.id),
  avatar: profile.avatar || '../src/assets/avatars/default.png',
  name: profile.name,
  birthDate: profile.birthDate ?? '',
  city: profile.city ?? 'Город не указан',
  gender: profile.gender ?? 'any',

  teachingSkill: {
    title:
      profile.teach_skills?.skills ??
      profile.teach_skills?.title ??
      'Навык не указан',
    variant: getVariantByCategory(profile.teach_skills?.title),
  },
  learningSkills:
    profile.learn_skills?.map((skill) => ({
      title: skill,
      variant: getVariantBySkill(skill),
    })) ?? [],
  isFavorite: false,
});

// Thunk для загрузки всех пользователей
export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () =>
  getProfilesApi(),
);

// Параметры для thunk профиля
interface FetchUserProfileParams {
  userId: number;
  isAuthenticated: boolean;
}

// Thunk для загрузки профиля пользователя по ID
export const fetchUserProfileById = createAsyncThunk<
  TProfile,
  FetchUserProfileParams,
  { rejectValue: string }
>(
  'users/fetchProfileById',
  async ({ userId, isAuthenticated }, { rejectWithValue }) => {
    try {
      const userData = isAuthenticated
        ? await getProfileByIdAuthApi(userId)
        : await getProfileByIdApi(userId);

      if (!userData) {
        return rejectWithValue('Данные пользователя не получены');
      }

      return userData;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить данные пользователя');
    }
  },
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
    clearProfileUser(state) {
      state.currentProfileUser = null;
      state.profileStatus = 'idle';
      state.profileError = null;
    },
    toggleFavoriteInProfile(state, action: PayloadAction<string>) {
      if (state.currentProfileUser) {
        state.currentProfileUser.isFavourite =
          !state.currentProfileUser.isFavourite;
      }

      // Также обновляем статус в списке всех пользователей, если есть
      const userInList = state.allUsers.find(
        (u) => u.id.toString() === action.payload,
      );
      if (userInList) {
        userInList.isFavourite = !userInList.isFavourite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработчики для fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<TProfile[]>) => {
          state.status = 'succeeded';
          state.allUsers = action.payload;
          state.mappedUsers = action.payload.map(mapProfileToCard);
        },
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Обработчики для fetchUserProfileById
      .addCase(fetchUserProfileById.pending, (state) => {
        state.profileStatus = 'loading';
        state.profileError = null;
      })
      .addCase(
        fetchUserProfileById.fulfilled,
        (state, action: PayloadAction<TProfile>) => {
          state.profileStatus = 'succeeded';
          state.currentProfileUser = action.payload;
        },
      )
      .addCase(fetchUserProfileById.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.profileError = action.payload || 'Произошла ошибка при загрузке';
      });
  },
});

// Экспорт действий
export const { clearUsers, clearProfileUser, toggleFavoriteInProfile } =
  usersSlice.actions;

// Селекторы — исправленные под твой стор (state.user вместо state.users)
export const selectAllUsers = (state: RootState) => state.users.allUsers;
export const selectMappedUsers = (state: RootState) => state.users.mappedUsers;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectUserById = (state: RootState, id: number) =>
  state.users.allUsers.find((u) => u.id === id) || null;

// Селекторы для профиля
export const selectCurrentProfileUser = (state: RootState) =>
  state.users.currentProfileUser;
export const selectProfileStatus = (state: RootState) =>
  state.users.profileStatus;
export const selectProfileError = (state: RootState) =>
  state.users.profileError;

// Экспорт редьюсера
export default usersSlice.reducer;
