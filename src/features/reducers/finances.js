import { createSlice } from '@reduxjs/toolkit';

export const userSLiceFinance = createSlice({
  name: 'finances',
  initialState: {
    value: { January: 0 }
  },
  reducers: {
    fetchFinances: (state, action) => {
      state.value = action.payload;
    }
  }
});

export default userSLiceFinance.reducer;
export const { fetchFinances } = userSLiceFinance.actions;
