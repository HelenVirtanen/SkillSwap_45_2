import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from '../store/slices/user';
import { filtersSlice } from '../store/slices/filters';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  filters: filtersSlice.reducer
});