import { createSlice } from '@reduxjs/toolkit';

export const userSLiceTrainerCollection = createSlice({
  name: 'trainerCollections',
  initialState: {
    value: false
  },
  reducers: {
    fetchTrainerCollectionData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export default userSLiceTrainerCollection.reducer;
export const { fetchTrainerCollectionData } = userSLiceTrainerCollection.actions;
