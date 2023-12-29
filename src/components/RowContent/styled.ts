import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder, MediaWidthsKeysType } from '@/theme';
import { MAX_SCREEN_WIDTH } from '@/pages/layout/constants';
import { HorizontalPadding } from '@/pages/layout/styled';

const ParentContainer = styled.div`
  width: 100%;
`;

const Container = styled.div<{ isReverse: boolean }>`
  display: flex;
  flex-direction: row;
  gap: ${px2rem(120)};
  padding-top: ${px2rem(80)};
  padding-bottom: ${px2rem(80)};
  align-items: center;
  max-width: ${MAX_SCREEN_WIDTH}px;
  ${HorizontalPadding};
  margin: 0 auto;
  ${({ isReverse }) =>
    MediaQueryBuilder(
      'xl',
      css`
        gap: ${px2rem(60)};
        flex-direction: ${isReverse ? 'column-reverse' : 'column'};
      `,
    )}

  ${MediaQueryBuilder(
    'xl',
    css`
      padding-top: ${px2rem(42)};
      padding-bottom: ${px2rem(42)};
    `,
  )}

  ${MediaQueryBuilder(
    'md',
    css`
      padding-top: ${px2rem(32)};
      padding-bottom: ${px2rem(32)};
    `,
  )}
`;

const ContentView = styled.div<{
  isLarger: boolean;
  isEqual: boolean;
  maxWidth?: number;
  breakpoint: MediaWidthsKeysType;
}>`
  flex: ${({ isLarger, isEqual }) => (isEqual ? 1 : isLarger ? 6 : 4)};
  display: flex;
  ${({ maxWidth }) =>
    !!maxWidth &&
    css`
      max-width: ${px2rem(maxWidth)};
    `}
  ${({ breakpoint }) =>
    MediaQueryBuilder(
      breakpoint,
      css`
        flex: 1;
        width: 100%;
        max-width: unset;
        align-self: stretch;
      `,
    )}
  ${({ isLarger }) =>
    isLarger &&
    css`
      justify-content: center;
    `}
`;

export { Container, ContentView, ParentContainer };
