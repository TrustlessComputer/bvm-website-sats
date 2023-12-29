import { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const HorizontalPadding = css`
  padding-left: ${px2rem(46)};
  padding-right: ${px2rem(46)};
  ${MediaQueryBuilder(
    'xxxl',
    css`
      padding-left: ${px2rem(42)};
      padding-right: ${px2rem(42)};
    `,
  )}
  ${MediaQueryBuilder(
    'xl',
    css`
      padding-left: ${px2rem(12)};
      padding-right: ${px2rem(12)};
    `,
  )}
`;

const HorizontalPaddingVer2 = HorizontalPadding;

export { HorizontalPadding, HorizontalPaddingVer2 };
