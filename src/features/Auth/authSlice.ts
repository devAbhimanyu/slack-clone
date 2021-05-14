import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'types';

const initialState: AuthState = {
  userData: { credential: null, user: null },
  loader: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.userData = payload;
      state.loader = false;
    },
    clearUser(state) {
      state.userData = { credential: null, user: null };
    },
  },
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
