import { createSlice } from '@reduxjs/toolkit';

export const userSLice = createSlice({
  name: 'users',
  initialState: {
    value: null
  },
  reducers: {
    fetchUsers: (state, action) => {
      state.value = action.payload;
    }
  }
});

export default userSLice.reducer;
export const { fetchUsers } = userSLice.actions;
