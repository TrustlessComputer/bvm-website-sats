import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${px2rem(80)};
`;

const Image = styled.img`
  width: 100%;
  max-height: 32rem;
  ${MediaQueryBuilder(
    'xs',
    css`
      max-width: 90vw;
    `,
  )}
`;

export { Container, Footer, Image };
