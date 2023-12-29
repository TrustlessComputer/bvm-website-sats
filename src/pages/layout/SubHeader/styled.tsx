import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';
import { Link } from 'react-router-dom';
import { MAX_SCREEN_WIDTH } from '@/pages/layout/constants';
import { HorizontalPadding } from '@/pages/layout/styled';
import Text from '@/components/Text';
import DeployButton from '@/modules/Wellcome/DeployButton';

const Container = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${MAX_SCREEN_WIDTH}px;
  margin-left: auto;
  margin-right: auto;
  padding: ${px2rem(16)} 0;
  width: 100%;
  flex-wrap: wrap;
  ${HorizontalPadding}
  ${MediaQueryBuilder(
    'md',
    css`
      gap: ${px2rem(24)};
      button {
        display: none;
      }
      p {
        font-size: ${px2rem(16)};
      }
    `,
  )}
`;

const AppLogo = styled(Link)`
  cursor: pointer;
  text-decoration: none !important;
  :hover {
    opacity: 0.9;
  }
`;

const Navbar = styled.nav`
  display: flex;
  gap: ${px2rem(32)};
  ${MediaQueryBuilder(
    'xs',
    css`
      gap: ${px2rem(14)};
    `,
  )}
`;

const NavbarItem = styled(Link)`
  display: flex;
  :hover {
    opacity: 0.8;
  }
`;

const NavbarExternalItem = styled.div`
  cursor: pointer;
  display: flex;
  :hover {
    opacity: 0.8;
  }
`;

const MainTitle = styled(Text)``;

const Deploy = styled(DeployButton)``;

const LiveBox = styled.div`
  margin-top: ${px2rem(-2)};
`;

export { Container, AppLogo, Navbar, NavbarItem, NavbarExternalItem, MainTitle, Deploy, LiveBox };
