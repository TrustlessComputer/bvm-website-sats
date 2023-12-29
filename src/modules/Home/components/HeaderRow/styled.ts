import styled from 'styled-components/macro';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';
import { css } from 'styled-components';
import { Settings } from 'react-feather';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${px2rem(32)};
  flex-wrap: wrap;
  background-color: #f3f1e8;
  ${MediaQueryBuilder(
    'md',
    css`
      gap: ${px2rem(24)};
    `,
  )}
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${px2rem(32)};
`;

const MenuBar = styled(Settings)`
  cursor: pointer;
  z-index: 2;
  display: none;
  :hover {
    opacity: 0.8;
  }
  ${MediaQueryBuilder(
    'xl',
    css`
      display: initial;
    `,
  )}
`;

export { Container, Actions, MenuBar };
