import reducer, {
  initialState,
  openConfirmOfferModal,
  openOfferCreatedModal,
  openOfferSentModal,
  closeModal,
} from './modalsSlice';

describe('modalsSlice', () => {
  const mockModalData = {
    userId: '123',
    skillTitle: 'React',
    context: 'skillPage' as const,
  };

  test('возвращает initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  test('открывает confirmOffer modal', () => {
    const state = reducer(initialState, openConfirmOfferModal(mockModalData));

    expect(state.activeModal).toBe('confirmOffer');
    expect(state.modalData).toEqual(mockModalData);
  });

  test('открывает offerCreated modal', () => {
    const state = reducer(initialState, openOfferCreatedModal(mockModalData));

    expect(state.activeModal).toBe('offerCreated');
    expect(state.modalData).toEqual(mockModalData);
  });

  test('открывает offerSent modal', () => {
    const state = reducer(initialState, openOfferSentModal(mockModalData));

    expect(state.activeModal).toBe('offerSent');
    expect(state.modalData).toEqual(mockModalData);
  });

  test('закрывает модальное окно и очищает данные', () => {
    const openedState = {
      activeModal: 'confirmOffer' as const,
      modalData: mockModalData,
    };

    const state = reducer(openedState, closeModal());

    expect(state.activeModal).toBeNull();
    expect(state.modalData).toBeNull();
  });
});