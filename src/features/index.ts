import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { RootReducer } from 'types/store/root';
import authReducer from './Auth/authSlice';

const reducer = combineReducers<RootReducer>({
  auth: authReducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
