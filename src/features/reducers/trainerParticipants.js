import { createSlice } from '@reduxjs/toolkit';

export const userSLiceTrainerParticipants = createSlice({
  name: 'trainerParticipants',
  initialState: {
    value: false
  },
  reducers: {
    fetchTrainerParticipantsData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export default userSLiceTrainerParticipants.reducer;
export const { fetchTrainerParticipantsData } = userSLiceTrainerParticipants.actions;
