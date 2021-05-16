import { createSlice } from '@reduxjs/toolkit';
import { MessageState } from 'types';

const initialState: MessageState = {
  messages: [],
  loaded: false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
      state.loaded = true;
    },
  },
});
export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;
