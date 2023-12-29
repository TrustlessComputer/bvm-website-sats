import { RootState } from '@/state';
import { createSelector } from '@reduxjs/toolkit';
import { ApplicationState } from './types';
import { getTheme } from '@/theme';

export const getApplicationSelector = (state: RootState): ApplicationState => state.application;

export const isDarkSelector = createSelector(getApplicationSelector, application => application.isDark);
export const themeSelector = createSelector(isDarkSelector, isDarkMode => getTheme(isDarkMode));

export const routePathSelectedSelector = createSelector(
  getApplicationSelector,
  application => application.routePathSelected,
);
