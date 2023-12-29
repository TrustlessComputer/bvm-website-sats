import styled, { css } from 'styled-components';
import RowContent from '@/components/RowContent/RowContent';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const Container = styled(RowContent)`
  width: 100%;
  background-color: ${({ theme }) => theme.background_secondary};
`;

const RightContent = styled.div`
  flex: 1;
  padding-left: ${px2rem(60)};
  ${MediaQueryBuilder(
    'xl',
    css`
      padding-left: ${px2rem(0)};
    `,
  )}
  .highlight {
    color: ${({ theme }) => theme.button_secondary};
    font-family: 'Raleway-Bold';
  }
`;

const LeftContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  ${MediaQueryBuilder(
    'xl',
    css`
      margin-left: auto;
      margin-right: auto;
      justify-content: center;
    `,
  )}
`;

const Box = styled.div`
  gap: ${px2rem(32)};
  display: flex;
  flex-direction: column;
  margin-top: ${px2rem(32)};
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${px2rem(12)} ${px2rem(24)};
  border-radius: ${px2rem(12)};
  gap: ${px2rem(32)};
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  .indexer {
    background-color: #752c97;
    width: ${px2rem(40)};
    height: ${px2rem(40)};
    border-radius: 50px;
    color: ${({ theme }) => theme.text_reverse};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box-content {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(4)};
    flex-wrap: 1;
  }
`;

export { Container, Box, Item, LeftContent, RightContent };
