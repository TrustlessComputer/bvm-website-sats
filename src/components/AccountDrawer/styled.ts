import styled, { css } from 'styled-components';
import { Drawer } from 'antd';
import px2rem from '@/utils/px2rem';
import CardBg from '@/assets/images/card.png';
import { MediaQueryBuilder } from '@/theme';

const Container = styled(Drawer)`
  &.background {
    background-color: transparent;
  }
  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.background};
    border-radius: ${px2rem(12)};
    margin-top: ${px2rem(8)};
    margin-bottom: ${px2rem(8)};
    margin-right: ${px2rem(8)};
    background-image: url(${CardBg});
    background-size: cover;
    background-position: center center;
  }

  ${MediaQueryBuilder(
    'xs',
    css`
      margin-left: ${px2rem(4)};
      margin-right: ${px2rem(4)};
    `,
  )}
`;

const DrawerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(16)};
  ${MediaQueryBuilder(
    'md',
    css`
      margin-top: ${px2rem(24)};
    `,
  )}
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(16)};
  justify-content: space-between;
  flex: 1;
`;

const AddressBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(16)};
  padding: ${px2rem(6)} ${px2rem(16)};
  border-radius: ${px2rem(4)};
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  .ic-copy {
    display: none;
  }
  :hover {
    opacity: 0.8;
    background-color: ${({ theme }) => theme.background_tertiary};
    .ic-copy {
      display: initial;
    }
  }
  :active {
    opacity: 0.3;
  }
`;

const LogoutIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${px2rem(4)} ${px2rem(6)};
  border-radius: ${px2rem(4)};
  cursor: pointer;
  background-color: ${({ theme }) => theme.background_tertiary};
  :hover {
    opacity: 0.8;
  }
  .ic-logout {
  }
`;

const CloseIcon = styled.div`
  display: none;
  margin-left: auto;
  padding: ${px2rem(4)};
  background-color: ${({ theme }) => theme.background_tertiary};
  ${MediaQueryBuilder(
    'md',
    css`
      display: initial;
    `,
  )}
`;

const Content = styled.div``;

export { Container, DrawerHeader, AddressBox, Row, LogoutIcon, Content, CloseIcon };
