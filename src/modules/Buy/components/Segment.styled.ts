import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;

  min-height: ${px2rem(80)};

  &.disabled {
    border: 1.2px solid ${({ theme }) => theme.dark['10']};
    opacity: 0.5;
    pointer-events: none;
  }
`;

const LeftView = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1.2px solid ${({ theme }) => theme.dark['10']};
  :hover {
    cursor: pointer;
    opacity: 0.8;
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

const RightView = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1.2px solid ${({ theme }) => theme.dark['10']};
  :hover {
    cursor: pointer;
    opacity: 0.8;
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

export { Container, LeftView, RightView };
