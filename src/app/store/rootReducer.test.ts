import { rootReducer } from './rootReducer';

jest.mock('@shared/lib/env', () => ({
  API_KEY: 'test-api-key',
}));

describe('rootReducer', () => {
  test('Правильная инициализация со всеми редьюсерами', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toHaveProperty('users');
    expect(state).toHaveProperty('staticData');
    expect(state).toHaveProperty('likes');
    expect(state).toHaveProperty('favorites');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('registration');
    expect(state).toHaveProperty('modals');
    expect(state).toHaveProperty('exchange');
  });

  test('Возвращает начальное состояние при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const stateAfterUnknownAction = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(stateAfterUnknownAction).toEqual(initialState);
  });
});