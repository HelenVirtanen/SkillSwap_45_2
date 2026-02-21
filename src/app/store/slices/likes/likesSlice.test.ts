import reducer, {
  fetchLikes,
  selectLikedUserIds,
  selectFavouritesCountMap,
  selectLikesStatus,
  initialState
} from './likesSlice';

describe('likesSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // reducer

  test('возвращает initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  test('обрабатывает fetchLikes.pending', () => {
    const action = { type: fetchLikes.pending.type };
    const state = reducer(initialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  test('обрабатывает fetchLikes.fulfilled', () => {
    const payload = {
      likedUserIds: [2, 3],
      favouritesCountMap: { 2: 1, 3: 2 },
    };

    const action = {
      type: fetchLikes.fulfilled.type,
      payload,
    };

    const state = reducer(initialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.likedUserIds).toEqual([2, 3]);
    expect(state.favouritesCountMap).toEqual({ 2: 1, 3: 2 });
  });

  test('обрабатывает fetchLikes.rejected', () => {
    const action = {
      type: fetchLikes.rejected.type,
      payload: 'Ошибка загрузки',
    };

    const state = reducer(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Ошибка загрузки');
  });

  // async thunk 

  test('fetchLikes успешно загружает и трансформирует данные', async () => {
    const mockLikes = [
      { id: 1, fromUserId: 1, toUserId: 2 },
      { id: 2, fromUserId: 1, toUserId: 3 },
      { id: 3, fromUserId: 4, toUserId: 3 },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockLikes }),
      } as Response)
    );

    const dispatch = jest.fn();
    const thunk = fetchLikes();

    await thunk(dispatch, () => ({}), undefined);

    const fulfilledAction = dispatch.mock.calls.find(
      call => call[0].type === fetchLikes.fulfilled.type
    )[0];

    expect(fulfilledAction.payload.likedUserIds).toEqual([2, 3]);
    expect(fulfilledAction.payload.favouritesCountMap).toEqual({
      2: 1,
      3: 2,
    });
  });

  test('fetchLikes возвращает rejected при ошибке', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    const dispatch = jest.fn();
    const thunk = fetchLikes();

    await thunk(dispatch, () => ({}), undefined);

    const rejectedAction = dispatch.mock.calls.find(
      call => call[0].type === fetchLikes.rejected.type
    )[0];

    expect(rejectedAction.payload).toBe('Не удалось загрузить лайки');
  });

  // selectors

  test('селекторы возвращают корректные данные', () => {
    const mockState = {
      likes: {
        likedUserIds: [5],
        favouritesCountMap: { 5: 3 },
        status: 'succeeded',
        error: null,
      },
    } as any;

    expect(selectLikedUserIds(mockState)).toEqual([5]);
    expect(selectFavouritesCountMap(mockState)).toEqual({ 5: 3 });
    expect(selectLikesStatus(mockState)).toBe('succeeded');
  });
});