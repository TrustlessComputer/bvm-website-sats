import styled, { css } from 'styled-components';
import RowContent from '@/components/RowContent/RowContent';
import px2rem from '@/utils/px2rem';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { MediaQueryBuilder } from '@/theme';
import { Row } from '@/components/Row';

const Container = styled(RowContent)`
  width: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: ${px2rem(32)};
`;

const RightContent = styled.div`
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

const AppText = styled(Text)`
  text-align: left;
  .span-text {
    color: ${({ theme }) => theme.button_secondary};
    font-family: Raleway-Bold;
  }
`;

const BoxDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(16)};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(12)};
  flex-wrap: wrap;
`;

const Socials = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(24)};

  .icon {
    width: ${px2rem(48)};
    height: ${px2rem(48)};
    cursor: pointer;
  }

  .icon:hover {
    opacity: 0.8;
  }
`;

const ButtonGuild = styled(Button)`
  font-size: ${px2rem(18)} !important;
  color: ${({ theme }) => theme.button_secondary} !important;
  padding: 0 !important;
  height: 32px !important;
`;

const ButtonContact = styled(Button)`
  font-size: ${px2rem(18)} !important;
  color: ${({ theme }) => theme.button_secondary} !important;
  padding: 0 !important;
  height: 32px !important;
  gap: ${px2rem(8)} !important;
`;

const LinkButtons = styled(Row)`
  margin-top: ${px2rem(12)};
  gap: ${px2rem(32)};
  //justify-content: center;
  ${MediaQueryBuilder(
    'md',
    css`
      gap: ${px2rem(0)};
      justify-content: flex-start;
    `,
  )}
`;

export {
  Container,
  LeftContent,
  RightContent,
  AppText,
  BoxDescription,
  Actions,
  ButtonGuild,
  LinkButtons,
  ButtonContact,
  Socials,
};
