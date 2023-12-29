import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-top: ${px2rem(6)};
  padding-bottom: ${px2rem(24)};
  gap: ${px2rem(42)};

  ${MediaQueryBuilder(
    'xl',
    css`
      padding: ${px2rem(24)};
    `,
  )}
`;

export { Container };
