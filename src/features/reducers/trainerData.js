import { createSlice } from '@reduxjs/toolkit';

export const userSliceTrainerData = createSlice({
  name: 'trainerData',
  initialState: {
    value: false
  },
  reducers: {
    fetchTrainerData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export default userSliceTrainerData.reducer;
export const { fetchTrainerData } = userSliceTrainerData.actions;
