import reducer, {
  initialState,
  fetchCities,
  fetchCategories,
  selectCities,
  selectCategories,
  selectStaticStatus,
} from './staticDataSlice';
import { RootState } from '@app/store/store';

describe('staticDataSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCities = [
    { id: 1, name: 'Москва' },
    { id: 2, name: 'Санкт-Петербург' },
  ];

  const mockCategories = [
    {
      id: 1,
      title: 'Иностранные языки',
      icon: 'icon1',
      subcategories: [{ id: 11, title: 'React' }],
    },
  ];

  // initial state
  test('возвращает initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  // fetch cities
  test('обрабатывает fetchCities.pending', () => {
    const action = { type: fetchCities.pending.type };
    const state = reducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  test('обрабатывает fetchCities.fulfilled', () => {
    const action = { type: fetchCities.fulfilled.type, payload: mockCities };
    const state = reducer(initialState, action);
    expect(state.cities).toEqual(mockCities);
  });

  test('обрабатывает fetchCities.rejected', () => {
    const action = { type: fetchCities.rejected.type, payload: 'Ошибка' };
    const state = reducer(initialState, action);
    expect(state.error).toBe('Ошибка');
  });

  // fetch categories
  test('обрабатывает fetchCategories.pending', () => {
    const action = { type: fetchCategories.pending.type };
    const state = reducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  test('обрабатывает fetchCategories.fulfilled', () => {
    const action = {
      type: fetchCategories.fulfilled.type,
      payload: mockCategories,
    };
    const state = reducer(initialState, action);
    expect(state.categories).toEqual(mockCategories);
  });

  test('обрабатывает fetchCategories.rejected', () => {
    const action = {
      type: fetchCategories.rejected.type,
      payload: 'Ошибка категорий',
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe('Ошибка категорий');
  });

  // thunks
  test('fetchCities thunk успешно загружает города', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ cities: mockCities }),
      } as Response),
    );

    const dispatch = jest.fn();
    const thunk = fetchCities();

    await thunk(dispatch, () => ({}), undefined);

    const fulfilledAction = dispatch.mock.calls.find(
      (call) => call[0].type === fetchCities.fulfilled.type,
    )[0];

    expect(fulfilledAction.payload).toEqual(mockCities);
  });

  test('fetchCities thunk отклоняется при ошибке', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false } as Response));

    const dispatch = jest.fn();
    const thunk = fetchCities();

    await thunk(dispatch, () => ({}), undefined);

    const rejectedAction = dispatch.mock.calls.find(
      (call) => call[0].type === fetchCities.rejected.type,
    )[0];

    expect(rejectedAction.payload).toBe('Ошибка загрузки городов');
  });

  test('fetchCategories thunk успешно загружает категории', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      } as Response),
    );

    const dispatch = jest.fn();
    const thunk = fetchCategories();

    await thunk(dispatch, () => ({}), undefined);

    const fulfilledAction = dispatch.mock.calls.find(
      (call) => call[0].type === fetchCategories.fulfilled.type,
    )[0];

    expect(fulfilledAction.payload).toEqual(mockCategories);
  });

  test('fetchCategories thunk отклоняется при ошибке', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false } as Response));

    const dispatch = jest.fn();
    const thunk = fetchCategories();

    await thunk(dispatch, () => ({}), undefined);

    const rejectedAction = dispatch.mock.calls.find(
      (call) => call[0].type === fetchCategories.rejected.type,
    )[0];

    expect(rejectedAction.payload).toBe('Ошибка загрузки категорий');
  });

  // selectors
  test('селекторы возвращают корректные данные', () => {
    const mockState: Pick<RootState, 'staticData'> = {
      staticData: {
        cities: mockCities,
        categories: mockCategories,
        status: 'succeeded',
        error: null,
      },
    };

    expect(selectCities(mockState as RootState)).toEqual(mockCities);
    expect(selectCategories(mockState as RootState)).toEqual(mockCategories);
    expect(selectStaticStatus(mockState as RootState)).toBe('succeeded');
  });
});
