import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { user, isAuthenticated, token } = action.payload;
      state.user = { ...state.user, ...user };
      if (isAuthenticated !== undefined) {
        state.isAuthenticated = isAuthenticated;
      }
      if (token !== undefined) {
        state.token = token;
      }
    },
    updateProfileImage: (state, action) => {
      const { profile } = action.payload
      state.user.profile = profile
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setUser, clearUser, updateProfileImage } = authSlice.actions;
export default authSlice.reducer;
