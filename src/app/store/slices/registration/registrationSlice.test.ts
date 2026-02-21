import reducer, {
  initialState,
  setStep1Data,
  setStep2Data,
  setStep3Data,
  setCurrentStep,
  clearRegistration,
  selectRegistrationStep1,
  selectRegistrationStep2,
  selectRegistrationStep3,
  selectCurrentStep,
} from './registrationSlice';
import type { RootState } from '@app/store/store';

describe('registrationSlice', () => {

  test('возвращает initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  test('сохраняет данные шага 1', () => {
    const payload = { email: 'test@example.com', password: '123456' };
    const state = reducer(initialState, setStep1Data(payload));

    expect(state.step1).toEqual(payload);
  });

  test('сохраняет данные шага 2', () => {
    const payload = {
      firstName: 'Иван',
      birthDate: '1990-01-01',
      gender: 'Мужской',
      city: 'Москва',
      categorySkill: ['Иностранные языки'],
      subcategorySkill: ['React'],
    };

    const state = reducer(initialState, setStep2Data(payload));
    expect(state.step2).toEqual(payload);
  });

  test('сохраняет данные шага 3', () => {
    const payload = {
      title: 'React Developer',
      category: 'Иностранные языки',
      subcategory: 'React',
      description: 'I build awesome apps',
      image: undefined,
    };

    const state = reducer(initialState, setStep3Data(payload));
    expect(state.step3).toEqual(payload);
  });

  test('устанавливает текущий шаг', () => {
    const state = reducer(initialState, setCurrentStep(2));
    expect(state.currentStep).toBe(2);
  });

  test('очищает все данные регистрации', () => {
    const modifiedState = {
      ...initialState,
      step1: { email: 'a', password: 'b' },
      step2: { firstName: 'John', birthDate: '', gender: '', city: '', categorySkill: [], subcategorySkill: [] },
      step3: { title: 'X', category: 'Y', subcategory: 'Z', description: 'D' },
      currentStep: 3,
    };

    const state = reducer(modifiedState, clearRegistration());
    expect(state).toEqual(initialState);
  });

  test('селекторы возвращают корректные данные', () => {
    const mockState: Pick<RootState, 'registration'> = {
      registration: {
        step1: { email: 'e', password: 'p' },
        step2: { firstName: 'J', birthDate: '', gender: '', city: '', categorySkill: [], subcategorySkill: [] },
        step3: { title: 'T', category: 'C', subcategory: 'S', description: 'D' },
        currentStep: 2,
      },
    };

    expect(selectRegistrationStep1(mockState as RootState)).toEqual({ email: 'e', password: 'p' });
    expect(selectRegistrationStep2(mockState as RootState)).toEqual({ firstName: 'J', birthDate: '', gender: '', city: '', categorySkill: [], subcategorySkill: [] });
    expect(selectRegistrationStep3(mockState as RootState)).toEqual({ title: 'T', category: 'C', subcategory: 'S', description: 'D' });
    expect(selectCurrentStep(mockState as RootState)).toBe(2);
  });
});