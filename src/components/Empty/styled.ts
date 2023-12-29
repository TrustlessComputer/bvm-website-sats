import styled from 'styled-components';

export const StyledEmpty = styled.div<{ isTable: boolean }>`
  &.notFound {
    display: grid;
    place-items: center;
    position: relative;
    gap: 32px;

    &_image {
      margin-bottom: rem(32px);
    }
  }
`;
