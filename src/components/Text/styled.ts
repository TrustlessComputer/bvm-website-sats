import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';

const BaseText = styled.p<{
  color: string | undefined;
  align: string;
  maxWidth: string | number;
  size: string;
  fontFamily: string;
  wordBreak: string;
}>`
  color: ${({ color, theme }) => (color ? (theme as any)[color] : theme['text_primary'])};
  text-align: ${({ align }) => align};
  max-width: ${({ maxWidth }) => maxWidth};
  line-height: 140%;
  letter-spacing: 0.01em;
  word-break: ${({ wordBreak }) => wordBreak};

  // FONT-SIZE
  font-size: ${({ size }) => px2rem(size)};
  font-family: ${({ fontFamily }) => fontFamily};

  // FONT-WEIGHT
  &.weight-bold {
    font-weight: 700;
    font-family: ${({ fontFamily }) => (fontFamily.toLowerCase().includes('bold') ? fontFamily : 'Helvetica Neue')};
  }
  &.weight-semibold {
    font-weight: 600;
    font-family: ${({ fontFamily }) => (fontFamily.toLowerCase().includes('semibold') ? fontFamily : 'Helvetica Neue')};
  }
  &.weight-medium {
    font-weight: 500;
  }
  &.weight-regular {
    font-weight: 400;
  }
  &.weight-light {
    font-weight: 300;
  }
  ${({ size }) =>
    Number(size) >= 38 &&
    MediaQueryBuilder(
      'xl',
      css`
        font-size: ${px2rem(Math.floor(Number(size) * 0.8))};
      `,
    )}
`;

export { BaseText };
