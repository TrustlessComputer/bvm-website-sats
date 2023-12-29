import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(32)};
  background-color: ${({ theme }) => theme.background_secondary};
  border-radius: ${px2rem(32)};
  padding: ${px2rem(22)};
  justify-content: center;
  height: 100%;
  min-height: 80vh;
  margin-top: 32px;

  ${MediaQueryBuilder(
    'md',
    css`
      margin-top: ${px2rem(20)};
      padding: ${px2rem(0)};
      background-color: transparent;
    `,
  )}
`;

export { Container };
