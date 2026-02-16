import { combineReducers } from '@reduxjs/toolkit';
import  usersReducer  from '../store/slices/User/usersSlise';
import staticDataReduser from '../store/slices/staticData/staticDataSlice'
import likesReducer from './slices/likes/likesSlice';

export const rootReducer = combineReducers({
  user: usersReducer,
  staticData: staticDataReduser,
  likes: likesReducer,
});