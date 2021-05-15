import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { RootReducer } from 'types/store/root';
import authReducer from './Auth/authSlice';
import channelReducer from './Channels/channelSlice';

const reducer = combineReducers<RootReducer>({
  auth: authReducer,
  channel: channelReducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
