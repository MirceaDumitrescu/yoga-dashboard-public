import { createSlice } from '@reduxjs/toolkit';

export const renewalsSlice = createSlice({
  name: 'renewals',
  initialState: {
    value: { default: 0 }
  },
  reducers: {
    fetchRenewals: (state, action) => {
      state.value = action.payload;
    }
  }
});

export default renewalsSlice.reducer;
export const { fetchRenewals } = renewalsSlice.actions;
