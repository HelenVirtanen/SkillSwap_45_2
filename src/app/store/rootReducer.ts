import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/authUser/auth';
import  usersReducer  from '../store/slices/User/usersSlise';
import staticDataReducer from '../store/slices/staticData/staticDataSlice'
import likesReducer from './slices/likes/likesSlice';
import { filtersSlice } from '../store/slices/filters';

export const rootReducer = combineReducers({
  user: usersReducer,
  staticData: staticDataReducer,
  likes: likesReducer,
  auth: authSlice.reducer,
  filters: filtersSlice.reducer
});