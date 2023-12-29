import styled from 'styled-components';
import { HorizontalPadding, HorizontalPaddingVer2 } from '@/pages/layout/styled';
import { MAX_SCREEN_WIDTH } from '@/pages/layout/constants';

const Container = styled.div<{ isDark: boolean; isPadding: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 1;
  /* background: ${({ theme, isDark }) => (isDark ? theme.black : theme.background)}; */
  background-color: #f3f1e8;
  ${({ isPadding }) => (isPadding ? HorizontalPaddingVer2 : '')}
`;

const Body = styled.div`
  max-width: ${MAX_SCREEN_WIDTH}px;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  ${HorizontalPadding}
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HeaderWrapper = styled.div`
  ${HorizontalPadding}
`;

const SubHeaderWrapper = styled.div`
  // background: ${({ theme }) => theme.background_secondary};
`;

export { Container, Body, PageWrapper, HeaderWrapper, SubHeaderWrapper };
