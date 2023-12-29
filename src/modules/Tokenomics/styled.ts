import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  padding-top: ${px2rem(60)};
  ${MediaQueryBuilder(
    'xl',
    css`
      padding-top: ${px2rem(42)};
    `,
  )}

  ${MediaQueryBuilder(
    'md',
    css`
      padding-top: ${px2rem(32)};
    `,
  )}
`;

const HeaderBox = styled.div`
  padding: ${px2rem(80)} ${px2rem(120)};
  background-color: ${({ theme }) => theme.background_secondary};
  border-radius: ${px2rem(20)};
  display: flex;
  flex-direction: row;
  gap: ${px2rem(120)};
  ${MediaQueryBuilder(
    'lg',
    css`
      padding: ${px2rem(42)};
      flex-direction: column;
    `,
  )}
  ${MediaQueryBuilder(
    'md',
    css`
      padding: ${px2rem(32)};
    `,
  )}
`;

const HeaderContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(12)};
  flex: 3;
`;

const HeaderImageBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridBox = styled.div`
  margin-top: ${px2rem(72)};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${px2rem(42)};
  margin-left: auto;
  margin-right: auto;
  ${MediaQueryBuilder(
    'xl',
    css`
      grid-template-columns: repeat(2, 1fr);
    `,
  )}
  ${MediaQueryBuilder(
    'md',
    css`
      grid-template-columns: repeat(1, 1fr);
      gap: ${px2rem(32)};
    `,
  )}
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(16)};
  padding: ${px2rem(32)};
  background-color: ${({ theme }) => theme.background_secondary};
  border-radius: ${px2rem(20)};
`;

export { Container, HeaderBox, HeaderContentBox, HeaderImageBox, GridBox, ItemBox };
