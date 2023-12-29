import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MediaQueryBuilder } from '@/theme';

const NavLinkStyled = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;

  &.selected {
    color: ${({ theme }) => theme.button_primary};
    svg {
      stroke-width: 2.5px;
    }
  }
  &.only-mobile {
    display: none;
  }
  ${MediaQueryBuilder(
    'xl',
    css`
      &.only-mobile {
        display: initial;
      }
    `,
  )}

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export { NavLinkStyled };
