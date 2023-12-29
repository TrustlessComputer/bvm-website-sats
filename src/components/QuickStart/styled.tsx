import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';
import { opacify } from '@/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.background_secondary};
  padding: ${px2rem(24)};
  gap: ${px2rem(24)};
  border-radius: ${px2rem(24)};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(12)};
`;

const Item = styled.div<{ isChecked: boolean }>`
  padding: ${px2rem(8)};
  border-radius: ${px2rem(8)};
  background-color: ${({ theme }) => theme.dark['5']};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: ${px2rem(24)};
  justify-content: space-between;
  :hover {
    opacity: 0.9;
  }
  ${({ isChecked }) =>
    isChecked &&
    css`
      cursor: unset;
      background-color: #a1e3cb;
      p {
        color: #00aa6c !important;
      }
      :hover {
        opacity: 1;
      }
    `};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => opacify(20, theme.text_primary)};
`;

export { Container, Content, Item, Line };
