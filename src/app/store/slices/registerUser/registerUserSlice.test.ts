
import reducer, {
  initialState,
  registerUser,
  resetRegistrationState,
} from './registerUserSlice';
import { registerUserApi } from '@api/api';
import type { TRegisterData, TAuthResponse } from '@api/api';

jest.mock('@shared/lib/env', () => ({
  API_KEY: 'test-api-key',
}));

jest.mock('@api/api');

describe('registrationSlice', () => {
  const mockUserData: TAuthResponse = {
    user: {
      id: 1,
      email: 'test@email.com',
      name: 'Иван',
      city: 'Москва'
    },
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockRegisterData: TRegisterData = {
    email: 'test@example.com',
    name: 'John Doe',
    password: 'password123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------
  // INITIAL STATE
  // -----------------------

  test('возвращает initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  // -----------------------
  // REDUCERS
  // -----------------------

  test('resetRegistrationState сбрасывает state', () => {
    const modifiedState = {
      status: 'succeeded' as const,
      error: 'some error',
      userData: mockUserData,
    };

    const state = reducer(modifiedState, resetRegistrationState());

    expect(state).toEqual(initialState);
  });

  // -----------------------
  // EXTRA REDUCERS
  // -----------------------

  test('обрабатывает registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  test('обрабатывает registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUserData };
    const state = reducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.userData).toEqual(mockUserData);
  });

  test('обрабатывает registerUser.rejected', () => {
    const action = { type: registerUser.rejected.type, payload: 'Ошибка при регистрации' };
    const state = reducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Ошибка при регистрации');
  });

  // -----------------------
  // THUNK
  // -----------------------

  test('registerUser thunk успешен', async () => {
    (registerUserApi as jest.Mock).mockResolvedValue(mockUserData);

    const dispatch = jest.fn();
    const thunk = registerUser(mockRegisterData);

    await thunk(dispatch, () => ({}), undefined);

    // Проверяем что dispatch был вызван с pending и fulfilled
    const dispatchedTypes = dispatch.mock.calls.map(call => call[0].type);
    expect(dispatchedTypes).toContain(registerUser.pending.type);
    expect(dispatchedTypes).toContain(registerUser.fulfilled.type);

    const fulfilledAction = dispatch.mock.calls.find(
      call => call[0].type === registerUser.fulfilled.type
    )[0];

    expect(fulfilledAction.payload).toEqual(mockUserData);
  });

  test('registerUser thunk отклоняется при ошибке', async () => {
    (registerUserApi as jest.Mock).mockRejectedValue(new Error('fail'));

    const dispatch = jest.fn();
    const thunk = registerUser(mockRegisterData);

    await thunk(dispatch, () => ({}), undefined);

    const rejectedAction = dispatch.mock.calls.find(
      call => call[0].type === registerUser.rejected.type
    )[0];

    expect(rejectedAction.payload).toBe('Ошибка при регистрации');
  });
});