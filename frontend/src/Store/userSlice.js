import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,    // user email
  userId: null,  // user's unique id in the database
  token: null,   // jwt token
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      localStorage.removeItem('authState');
    },
  },
});

export const { setUser, setUserId, setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;
