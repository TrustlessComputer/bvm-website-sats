import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilderMin } from '@/theme';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-top: ${px2rem(42)};
  align-items: center;
  gap: ${px2rem(12)};
`;

const NotFoundImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: fit-content;
  object-fit: cover;

  ${MediaQueryBuilderMin(
    'xxxl',
    css`
      max-width: 600px;
    `,
  )}
`;

export { Container, NotFoundImage };
