import { createSlice } from '@reduxjs/toolkit';
import { ChannelState } from 'types';

const initialState: ChannelState = {
  activeChannel: null,
  loader: true,
  firstLoad: false,
  channels: [],
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
      state.loader = false;
    },
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload;
      state.firstLoad = true;
    },
  },
});
export const { setChannels, setActiveChannel } = channelSlice.actions;
export default channelSlice.reducer;
