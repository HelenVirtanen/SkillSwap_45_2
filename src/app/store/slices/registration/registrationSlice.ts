import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@app/store/store";

// Типы данных для каждого шага
export interface Step1Data {
  email: string;
  password: string;
}

export interface Step2Data {
  firstName?: string;
  birthDate?: string;
  gender?: string;
  city?: string;
  categorySkill?: string[];
  subcategorySkill?: string[];
}

export interface Step3Data {
  title: string;
  category: string;
  subcategory: string;
  description: string;
  image?: File;
}

// Состояние всего процесса регистрации
export interface RegistrationState {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  currentStep: number;
}

const initialState: RegistrationState = {
  step1: { email: '', password: '' },
  step2: {
    firstName: '',
    birthDate: '',
    gender: '',
    city: '',
    categorySkill: [],
    subcategorySkill: [],
  },
  step3: {
    title: '',
    category: '',
    subcategory: '',
    description: '',
  },
  currentStep: 1,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    //сохранение данных шага 1
    setStep1Data : (state, action: { payload: Step1Data}) => {
      state.step1 = action.payload;
    },
    //сохранение данных шага 2
    setStep2Data: (state, action: { payload: Step2Data }) => {
      state.step2 = action.payload;
    },
    //сохранение данных шага 3
    setStep3Data: (state, action: { payload: Step3Data }) => {
      state.step3 = action.payload;
    },
    // тут устанавливается текущий шаг
    setCurrentStep: (state, action: { payload: number }) => {
      state.currentStep = action.payload;
    },
     // очищаем все данные после успешной регистрации
     clearRegistration: () => initialState,
  }
});

// Экшены
export const {
  setStep1Data,
  setStep2Data,
  setStep3Data,
  setCurrentStep,
  clearRegistration,
} = registrationSlice.actions;

// Редьюсер
export default registrationSlice.reducer;

// Селекторы 
export const selectRegistrationStep1 = (state: RootState) => state.registration?.step1;
export const selectRegistrationStep2 = (state: RootState) => state.registration?.step2;
export const selectRegistrationStep3 = (state: RootState) => state.registration?.step3;
export const selectCurrentStep = (state: RootState) => state.registration?.currentStep;