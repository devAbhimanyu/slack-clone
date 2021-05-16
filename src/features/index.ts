import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import channelReducer from './Channels/channelSlice';
import messageReduder from './Messages/messageSlice';
import { RootReducer } from 'types/store/root';

const reducer = combineReducers<RootReducer>({
  auth: authReducer,
  channel: channelReducer,
  messages: messageReduder,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
