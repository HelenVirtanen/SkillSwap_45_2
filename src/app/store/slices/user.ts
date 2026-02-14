import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '@api/users';
import { RootState } from '../store';

export type TUser = {
  id: number;
  name: string;
  email: string;
  city?: string;
};

interface UsersState {
  users: TUser[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await getUsers();
  return res;
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers(state) {
      state.users = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<TUser[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка при загрузке пользователей';
      });
  },
});

export const selectUsers = (state: RootState ) => state.user.users;
export const selectUsersStatus = (state: RootState ) => state.user.status;
export const selectUsersError = (state: RootState ) => state.user.error;

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;


