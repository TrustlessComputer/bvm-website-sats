import { DefaultTheme } from 'styled-components';

export const colors = {
  white: '#FFFFFF',
  black: '#000000',

  dark: {
    '100': '#1C1C1C',
    '80': '#2E2E2E',
    '60': '#5B5B5B',
    '40': '#898989',
    '20': '#B6B6B6',
    '10': '#CECECE',
    '5': '#ECECED',
    primary: '#17066C',
    secondary: '#F7F9FB',
    tertiary: '#2507b9',
    quaternary: '#CD4837',
  },

  light: {
    '100': '#FFFFFF',
    '80': '#FAFAFA',
    '60': '#F4F4F4',
    '40': '#EFEFEF',
    '20': '#E9E9E9',
    '10': '#E7E7E7',
    '5': '#E5E5E5',
    primary: '#17066C',
    secondary: '#F7F9FB',
    tertiary: '#2507b9',
    quaternary: '#CD4837',
  },

  blue: {
    A: '#A8C5DA',
    B: '#B1E3FF',
    C: '#4166f5',
  },

  green: {
    A: '#0ec00e',
    B: '#BAEDBD',
  },

  yellow: {
    A: '#FFA500',
    B: '#F9D03F',
    C: '#FFAA59',
  },

  red: {
    A: '#FF4747',
    B: '#FF8B8B',
    C: '#FF6666',
  },
};

export type ColorsTheme = DefaultTheme;

const commonTheme = {
  ...colors,
  white: colors.white,
  black: colors.black,
};

export const darkTheme = {
  ...commonTheme,

  // colors for text
  text_primary: colors.light['100'],
  text_secondary: colors.light['60'],
  text_tertiary: colors.light['80'],
  text_quaternary: colors.light['20'],
  text_reverse: colors.dark['100'],
  text_reverse_secondary: colors.dark['80'],

  // colors for buttons
  button_primary: colors.light['primary'],
  button_secondary: colors.light['quaternary'],

  background: colors.dark['100'],
  background_secondary: colors.dark['secondary'],
  background_tertiary: colors.dark['40'],
  background_quaternary: colors.dark['tertiary'],

  negative: colors.red['A'],
  positive: colors.green['A'],
  warning: colors.yellow['A'],

  blueberry: colors.blue['C'],
};

export const lightTheme = {
  ...commonTheme,

  // colors for text
  text_primary: colors.dark['100'],
  text_secondary: colors.dark['60'],
  text_tertiary: colors.dark['40'],
  text_quaternary: colors.dark['20'],
  text_reverse: colors.light['100'],
  text_reverse_secondary: colors.light['60'],

  // colors for buttons
  button_primary: colors.dark['primary'],
  button_secondary: colors.dark['quaternary'],

  // background
  background: colors.light['100'],
  background_secondary: colors.light['secondary'],
  background_tertiary: colors.light['40'],
  background_quaternary: colors.dark['tertiary'],

  negative: colors.red['A'],
  positive: colors.green['A'],
  warning: colors.yellow['A'],
  blueberry: colors.blue['C'],
};
