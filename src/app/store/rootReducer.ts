import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/authUser/auth';

export const rootReducer = combineReducers({
  auth: authSlice.reducer
});