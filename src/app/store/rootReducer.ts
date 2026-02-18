import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/authUser/auth';
import  usersReducer  from '../store/slices/User/usersSlise';
import staticDataReducer from '../store/slices/staticData/staticDataSlice'
import likesReducer from './slices/likes/likesSlice';
import registrationReducer from './slices/registration/registrationSlice';

export const rootReducer = combineReducers({
  users: usersReducer,
  staticData: staticDataReducer,
  likes: likesReducer,
  auth: authSlice.reducer,
  registration: registrationReducer,
});