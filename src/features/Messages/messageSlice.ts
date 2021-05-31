import { createSlice } from '@reduxjs/toolkit';
import { MessageState } from 'types';

const initialState: MessageState = {
  messages: [],
  filteredMessages: [],
  loaded: false,
  activeUsers: [],
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
      state.filteredMessages = payload;
      state.loaded = true;
    },
    setUsers(state, { payload }) {
      state.activeUsers = payload;
    },
  },
});

export const { setMessages, setUsers } = messageSlice.actions;
export default messageSlice.reducer;
