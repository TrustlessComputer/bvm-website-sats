import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  /* background-color: yellow; */
  border: 1.2px solid ${({ theme }) => theme.dark['10']};
  border-radius: ${px2rem(12)};
  padding: ${px2rem(18)};

  :hover {
    border: 1.2px solid ${({ theme }) => theme.blueberry};
    cursor: pointer;
  }

  &.non-select {
    border: 1.2px solid ${({ theme }) => theme.dark['10']};
  }

  &.selected {
    border: 1.2px solid ${({ theme }) => theme.blueberry};
  }

  &.disabled {
    border: 1.2px solid ${({ theme }) => theme.dark['10']};
    opacity: 0.5;
    pointer-events: none;
  }
`;

export { Container };
