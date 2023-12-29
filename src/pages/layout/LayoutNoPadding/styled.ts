import styled from 'styled-components';
import { HorizontalPadding, HorizontalPaddingVer2 } from '@/pages/layout/styled';

const Container = styled.div<{ isPadding: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  min-height: 100vh;
  width: 100%;
  flex: 1;
  margin-left: auto;
  margin-right: auto;
`;

const PaddingWrapper = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  ${HorizontalPadding}
`;

const Body = styled.div`
  flex: 1;
  width: 100%;
`;

const SubHeaderPaddingWrapper = styled.div`
  width: 100%;
`;

export { Container, PaddingWrapper, Body, SubHeaderPaddingWrapper };
