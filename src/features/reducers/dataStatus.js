import { createSlice } from '@reduxjs/toolkit';

export const userSLiceDbStatus = createSlice({
  name: 'dbStatus',
  initialState: {
    value: false
  },
  reducers: {
    fetchDbStatus: (state, action) => {
      state.value = action.payload;
    }
  }
});

export default userSLiceDbStatus.reducer;
export const { fetchDbStatus } = userSLiceDbStatus.actions;
