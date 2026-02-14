import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from '../store/slices/user';

export const rootReducer = combineReducers({
  user: userSlice.reducer
});