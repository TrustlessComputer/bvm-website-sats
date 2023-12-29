import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { opacify } from '@/utils';
import { MediaQueryBuilder } from '@/theme';
import { HorizontalPadding } from '@/pages/layout/styled';
import { MAX_SCREEN_WIDTH } from '@/pages/layout/constants';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.background_secondary};
  padding-top: ${px2rem(100)};
  padding-bottom: ${px2rem(100)};
  ${HorizontalPadding}
`;

const Content = styled.div`
  max-width: ${px2rem(1600)};
  margin: 0 auto;
`;

const Grid = styled.div`
  margin-top: ${px2rem(48)};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${px2rem(40)};
  ${MediaQueryBuilder(
    'lg',
    css`
      grid-template-columns: repeat(2, 1fr);
    `,
  )}
  ${MediaQueryBuilder(
    'md',
    css`
      grid-template-columns: repeat(1, 1fr);
    `,
  )}
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2rem(16)};
  padding: ${px2rem(24)} ${px2rem(16)};
  background-color: ${({ theme }) => theme.background};
  border-radius: ${px2rem(8)};
  border: 1px solid ${({ theme }) => opacify(10, theme.text_primary)};
`;

const Image = styled.img`
  max-width: ${px2rem(360)};
  width: 100%;
  //margin-left: ${px2rem(16)};
`;

export { Container, Content, Grid, GridItem, Image };
