import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer'; // твой объединённый редьюсер

const store = configureStore({
  reducer: rootReducer,
  // middleware уже включает thunk по умолчанию в RTK
  devTools: process.env.NODE_ENV !== 'production', // удобно для dev
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Кастомные хуки (твои — они правильные)
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;