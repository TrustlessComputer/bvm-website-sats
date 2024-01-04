import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import Text from '@/components/Text';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${px2rem(16)};
  margin-bottom: ${px2rem(8)};
  background-color: #f3f1e8;
  .checkbox {
    margin-left: ${px2rem(8)};
  }
  ${MediaQueryBuilder(
    'md',
    css`
      gap: ${px2rem(18)};
      p {
        font-size: ${px2rem(14)};
      }
      .checkbox {
        margin-left: ${px2rem(4)};
      }
    `,
  )}
`;

const LeftView = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightView = styled.div`
  display: flex;
  flex-direction: row;
`;

const NetworkTypeHead = styled.div`
  border-radius: ${px2rem(8)};
  padding: ${px2rem(8)} ${px2rem(12)};
  gap: ${px2rem(8)};
  border: 1px solid ${({ theme }) => theme.button_primary};
  display: flex;
  align-items: center;
  font-size: ${px2rem(18)};
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const NetworkTypeBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${px2rem(8)};
  width: ${px2rem(120)};
  gap: ${px2rem(12)};
`;

const NetworkListTypeBox = styled.div``;

const TabItem = styled(Text)<{ isActive: boolean }>`
  margin-top: ${px2rem(1)};
  cursor: pointer;
  color: ${({ isActive, theme }) => (isActive ? theme.button_primary : theme.text_primary)};
  color: ${({ theme }) => theme.button_primary};
  ${({ isActive, theme }) =>
    isActive &&
    css`
      font-weight: 600 !important;
      border-bottom: 2px solid ${theme.button_primary};
    `};

  :hover {
    opacity: 0.8;
  }
`;

const ButtonNumber = styled.div<{ isActive: boolean }>`
  margin-top: ${px2rem(1)};
  padding: ${px2rem(8)} ${px2rem(16)};
  border-radius: 100px;
  border: 1px solid transparent;
  font-size: 14px;

  cursor: pointer;
  color: ${({ isActive, theme }) => (isActive ? '#000000' : '#B3B3B3')};
  background-color: #fff;
  ${({ isActive, theme }) =>
    isActive &&
    css`
      font-weight: 600 !important;
      border: 1px solid #000000;
    `};

  :hover {
    opacity: 0.8;
  }
`;

const WrapperCheckBox = styled.div`
  padding: ${px2rem(8)} ${px2rem(12)};
  border-radius: 100px;
  background-color: #fff;
`;
export {
  Container,
  NetworkTypeHead,
  NetworkListTypeBox,
  NetworkTypeBox,
  TabItem,
  ButtonNumber,
  WrapperCheckBox,
  LeftView,
  RightView,
};
