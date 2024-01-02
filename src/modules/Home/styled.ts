import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${px2rem(32)};
  // padding: ${px2rem(42)};
  gap: ${px2rem(42)};
  /* background-color: #f3f1e8; */
  padding-bottom: ${px2rem(32)};
`;

export { Container };
