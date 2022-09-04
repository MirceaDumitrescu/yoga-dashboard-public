import { createSlice } from '@reduxjs/toolkit';

export const userSLiceLogin = createSlice({
  name: 'login',
  initialState: {
    value: false,
    email: ''
  },
  reducers: {
    fetchLoginStatus: (state, action) => {
      state.value = action.payload;
    },
    fetchEmail: (state, action) => {
      state.email = action.payload;
    }
  }
});

export default userSLiceLogin.reducer;
export const { fetchLoginStatus, fetchEmail } = userSLiceLogin.actions;
