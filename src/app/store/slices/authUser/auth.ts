import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@app/store/store';
import { fetchUsers } from './actions';
import { loginUserApi } from '@api/api';
import { setCookie } from '@features/auth/cookie';

export type TUser = {
  id: number;
  name: string;
  email: string;
  city?: string;
};

interface AuthState {
  user: TUser| null;
  isAuthChecked: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
}

const initialState: AuthState = {
  user: null,
  isAuthChecked: false,
  error: null,
  status: 'idle',
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      console.log('API response:', res);
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);

      return res.user;
    } catch (err: any) {
      return rejectWithValue(err?.message);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.isAuthChecked = false;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message || 'Ошибка при загрузке пользователя';
        state.isAuthChecked = false;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;

export const { clearUser, setUser, setIsAuthChecked } = authSlice.actions;
export default authSlice.reducer;
