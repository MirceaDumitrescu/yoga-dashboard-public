import { createSlice } from '@reduxjs/toolkit';

export const userSLiceClasses = createSlice({
  name: 'classes',
  initialState: {
    value: { default: false }
  },
  reducers: {
    fetchClassParticipants: (state, action) => {
      state.value = action.payload.sort((a, b) => {
        if (a.id > b.id) {
          return -1;
        }
        if (a.id < b.id) {
          return 1;
        }
        return 0;
      });
    }
  }
});

export default userSLiceClasses.reducer;
export const { fetchClassParticipants } = userSLiceClasses.actions;
