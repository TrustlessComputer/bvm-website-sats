import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import RowContent from '@/components/RowContent/RowContent';
import Text from '@/components/Text';
import { MediaQueryBuilder } from '@/theme';

const Container = styled(RowContent)`
  width: 100%;
`;

const LeftContent = styled.div`
  ${MediaQueryBuilder(
    'xl',
    css`
      width: 100%;
      flex: 1;
      max-width: unset;
    `,
  )}
`;

const RightContent = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  ${MediaQueryBuilder(
    'xl',
    css`
      justify-content: center;
    `,
  )}
`;

const Box = styled.div`
  padding: ${px2rem(24)};
  border-radius: ${px2rem(12)};
  gap: ${px2rem(12)};
  display: flex;
  flex-direction: column;
  background-color: rgba(117, 43, 151, 1);
  margin-top: ${px2rem(32)};
`;

const RowItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(12)};
  color: ${({ theme }) => theme.text_reverse};
`;

const AppText = styled(Text)`
  text-align: left;
  .highlight {
    color: ${({ theme }) => theme.button_secondary};
    font-family: 'Raleway-Bold';
  }
`;

export { Container, LeftContent, RightContent, Box, RowItem, AppText };
