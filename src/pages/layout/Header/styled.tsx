import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';
import { MAX_SCREEN_WIDTH } from '@/pages/layout/constants';
import { HorizontalPadding } from '@/pages/layout/styled';
import { Menu } from 'react-feather';
import { Drawer } from 'antd';
import CardBg from '@/assets/images/card.png';

const Container = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${px2rem(18)} 0;
  max-width: ${MAX_SCREEN_WIDTH}px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: ${px2rem(2)};

  ${HorizontalPadding}
  ${MediaQueryBuilder(
    'xs',
    css`
      gap: ${px2rem(12)};
    `,
  )};
`;

const AppLogo = styled.div`
  cursor: pointer;
  z-index: 2;
  :hover {
    opacity: 0.9;
  }
  ${MediaQueryBuilder(
    'xs',
    css`
      .app-name {
        font-size: ${px2rem(20)};
      }
    `,
  )};
`;

const MenuBar = styled(Menu)`
  cursor: pointer;
  z-index: 2;
  display: none;
  ${MediaQueryBuilder(
    'xl',
    css`
      display: initial;
    `,
  )}
`;

const MenuDrawer = styled(Drawer)`
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

export { Container, AppLogo, MenuBar, MenuDrawer };
