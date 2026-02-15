import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchUsers } from './actions';

export type TUser = {
  id: number;
  name: string;
  email: string;
  city?: string;
};

interface IUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
}

const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
  error: null,
  status: 'idle'
};

export const userSlice = createSlice({
  name: 'users',
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
    }
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
        state.error = action.error.message || 'Ошибка при загрузке пользователей';
        state.isAuthChecked = false;
      });
  },
});

export const selectUser = (state: RootState ) => state.user;
export const selectUserStatus = (state: RootState ) => state.user.status;
export const selectUserError = (state: RootState ) => state.user.error;
export const selectUserAuth = (state: RootState) => state.user.isAuthChecked;

export const { clearUser, setUser, setIsAuthChecked } = userSlice.actions;
export default userSlice.reducer;


