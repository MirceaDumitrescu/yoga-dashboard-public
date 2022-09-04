import { createSlice } from '@reduxjs/toolkit';

export const userSLiceExpenses = createSlice({
  name: 'expenses',
  initialState: {
    value: { January: 0 }
  },
  reducers: {
    fetchExpenses: (state, action) => {
      state.value = action.payload;
    }
  }
});

export default userSLiceExpenses.reducer;
export const { fetchExpenses } = userSLiceExpenses.actions;
