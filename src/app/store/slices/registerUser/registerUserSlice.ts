import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUserApi } from '@api/api';
import { TRegisterData, TAuthResponse } from '@api/api';

// Статус состояния
interface RegistrationState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  userData: TAuthResponse | null;
}

// Начальное состояние
const initialState: RegistrationState = {
  status: 'idle',
  error: null,
  userData: null,
};

// Thunk для регистрации
export const registerUser = createAsyncThunk<
  TAuthResponse, // Возвращаемое значение
  TRegisterData, // Аргумент функции
  { rejectValue: string }
>('auth/registerUser', async (data, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(data);
    return response;
  } catch (error) {
    return rejectWithValue('Ошибка при регистрации');
  }
});

const registrationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRegistrationState(state) {
      state.status = 'idle';
      state.error = null;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.status = 'succeeded';
          state.userData = action.payload;
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка регистрации';
      });
  },
});

export const { resetRegistrationState } = registrationSlice.actions;

export default registrationSlice.reducer;
