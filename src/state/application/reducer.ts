import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationState } from './types';

export const initialState: ApplicationState = {
  isDark: false,
  routePathSelected: '/',
};

const appSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setIsDarkMode(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
    },
    setRoutePathSelected(state, action: PayloadAction<string>) {
      state.routePathSelected = action.payload;
    },
  },
});

export const { setIsDarkMode, setRoutePathSelected } = appSlice.actions;
export default appSlice.reducer;
