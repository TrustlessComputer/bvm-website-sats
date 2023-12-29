import React, { useMemo } from 'react';
import { createGlobalStyle, ThemeProvider as StyledComponentsThemeProvider, css } from 'styled-components';
import { getTheme, MediaQueryBuilder } from '@/theme/index';
import { ScreenMarginTop } from '@/theme/css/margin.top';
import { ScreenMarginBottom } from '@/theme/css/margin.bottom';
import { ScreenMarginLeft } from '@/theme/css/margin.left';
import { ScreenMarginRight } from '@/theme/css/margin.right';
import { useAppSelector } from '@/state/hooks';
import { isDarkSelector } from '@/state/application/selector';
import px2rem from '@/utils/px2rem';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useAppSelector(isDarkSelector);
  const themeObject = useMemo(() => getTheme(darkMode), [darkMode]);
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}

export const ThemedGlobalStyle = createGlobalStyle`

  html {
    background: #ffffff;
    display: initial;
    overflow: scroll; /* Show scrollbars */
    margin: 0;
    padding: 0;
  
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    ${MediaQueryBuilder(
      'md',
      css`
        font-size: 14px;
      `,
    )};

    a {
      color: inherit;
      text-decoration: none;

      &:hover{
        color: inherit;
        text-decoration: underline;
      }
    }

    ${ScreenMarginTop}
    ${ScreenMarginBottom}
    ${ScreenMarginLeft}
    ${ScreenMarginRight}
  }

  summary::-webkit-details-marker {
    display:none;
  }
  
  &.ant-drawer-content-wrapper {
    box-shadow: none;
  }
  
  &.ant-select-selector {
    min-height: ${px2rem(45)};
  }
`;
