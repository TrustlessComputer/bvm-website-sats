import { darkTheme, lightTheme } from '@/theme/colors';
import { css } from 'styled-components';

export const BREAKPOINTS = {
  xs: '396px',
  sm: '640px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
  xxxl: '1920px',
};

export const convertBreakpointsToNumber = (breakpoints: string) => {
  return Number(breakpoints.replace('px', ''));
};

export type MediaWidthsType = typeof BREAKPOINTS;
export type MediaWidthsKeysType = keyof MediaWidthsType;

export const MediaQueryBuilder = (key: MediaWidthsKeysType, innerCSS?: any) =>
  css`
    @media (max-width: ${BREAKPOINTS[key]}) {
      ${innerCSS};
    }
  `;

export const MediaQueryBuilderMin = (key: MediaWidthsKeysType, innerCSS?: any) =>
  css`
    @media (min-width: ${BREAKPOINTS[key]}) {
      ${innerCSS};
    }
  `;

export function getTheme(darkMode: boolean) {
  return {
    darkMode,
    ...(darkMode ? darkTheme : lightTheme),
  };
}
