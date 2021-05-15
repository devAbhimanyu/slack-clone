import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from 'types';
import { signoutUser } from 'utility';

const initialState: AuthState = {
  userData: null,
  loader: true,
};

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const loggedOutBool = await signoutUser();
      // console.log('logout' + loggedOutBool)
      if (!loggedOutBool) throw 'problem with signout';
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.userData = payload;
      state.loader = false;
    },
    clearUser(state) {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.userData = null;
    });
    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
