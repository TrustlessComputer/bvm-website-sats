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
  background-color: #f3f1e8;

  ${MediaQueryBuilder(
    'md',
    css`
      padding: ${px2rem(0)};
      padding-top: ${px2rem(32)};
      padding-bottom: ${px2rem(24)};
      background-color: #f3f1e8;
    `,
  )}
`;

export { Container };
