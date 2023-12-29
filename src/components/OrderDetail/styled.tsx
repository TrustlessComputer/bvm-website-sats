import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';
import { opacify } from '@/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(16)};
  padding-top: ${px2rem(12)};
  .status-label {
    color: ${({ theme }) => theme.button_primary};
  }
`;

const Row = styled.div<{ isNode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(12)};
  .main-text {
    min-width: ${({ isNode }) => (isNode ? px2rem(220) : px2rem(240))};
  }
  .sub-label {
    font-size: ${px2rem(14)};
  }

  ${MediaQueryBuilder(
    'md',
    css`
      .main-text {
        min-width: ${px2rem(160)};
      }
    `,
  )}
`;

const HorizontalLine = styled.div`
  height: 1px;
  width: 100%;
  margin: ${px2rem(8)} 0;
  background-color: ${({ theme }) => opacify(20, theme.text_primary)};
`;

export { Container, Row, HorizontalLine };
