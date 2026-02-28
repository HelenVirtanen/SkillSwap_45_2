import reducer, {
  toggleFavorite,
  loadFavorites,
} from './favoritesSlice';

describe('favoritesSlice reducer', () => {
  const initialState = { ids: [] };

  test('возвращает начальное состояние', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state.ids).toEqual([]);
  });

  test('добавляет id в избранное', () => {
    const state = reducer(initialState, toggleFavorite(1));
    expect(state.ids).toEqual([1]);
  });

  test('удаляет id из избранного', () => {
    const stateWithItem = { ids: [1] };
    const state = reducer(stateWithItem, toggleFavorite(1));
    expect(state.ids).toEqual([]);
  });
});

describe('loadFavorites', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
      },
      writable: true,
    });
  });

  test('возвращает [] если ничего нет в localStorage', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    expect(loadFavorites()).toEqual([]);
  });

  test('возвращает данные из localStorage', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('[1,2,3]');

    expect(loadFavorites()).toEqual([1, 2, 3]);
  });

  test('возвращает [] если JSON повреждён', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('invalid');

    expect(loadFavorites()).toEqual([]);
  });
});