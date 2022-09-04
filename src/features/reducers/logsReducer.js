import { createSlice } from '@reduxjs/toolkit';

export const userSliceLogs = createSlice({
  name: 'logs',
  initialState: {
    value: null
  },
  reducers: {
    fetchLogs: (state, action) => {
      state.value = action.payload.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }
  }
});

export default userSliceLogs.reducer;
export const { fetchLogs } = userSliceLogs.actions;
