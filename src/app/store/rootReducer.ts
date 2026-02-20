import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/authUser/auth';
import  usersReducer  from '../store/slices/User/usersSlise';
import staticDataReducer from '../store/slices/staticData/staticDataSlice';
import favoritesReducer from './slices/favorites/favoritesSlice';
import likesReducer from './slices/likes/likesSlice';
import registrationReducer from './slices/registration/registrationSlice';
import modalsReducer from './slices/modals/modalsSlice';
import exchangeReducer from './slices/exchange/exchangeSlice';

export const rootReducer = combineReducers({
  users: usersReducer,
  staticData: staticDataReducer,
  likes: likesReducer,
  favorites: favoritesReducer,
  auth: authSlice.reducer,
  registration: registrationReducer,
  modals: modalsReducer,
  exchange: exchangeReducer,
});
