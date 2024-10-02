import { createSlice } from '@reduxjs/toolkit';

const setupCheckerSlice = createSlice({
  name: 'setupChecker',
  initialState: {
    setupComplete: true,
  },
  reducers: {
    markSetupComplete: (state) => {
      state.setupComplete = true;
    },
  },
});

export const { markSetupComplete } = setupCheckerSlice.actions;
export default setupCheckerSlice.reducer;
