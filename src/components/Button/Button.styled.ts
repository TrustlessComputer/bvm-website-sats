import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const ButtonStyled = styled.button<{ textColor: string; variantColor: string; gap: number; borderRadius: number }>`
  --text-primary-color: ${({ theme, textColor }) =>
    !!textColor && (theme as any)[textColor] ? (theme as any)[textColor] : theme['button_primary']};

  --text-reverse-color: ${({ theme, textColor }) =>
    !!textColor && (theme as any)[textColor] ? (theme as any)[textColor] : theme['text_reverse']};

  --variant-primary-color: ${({ theme, variantColor }) =>
    !!variantColor && (theme as any)[variantColor] ? (theme as any)[variantColor] : theme['button_primary']};

  --variant-reverse-color: ${({ theme, variantColor }) =>
    !!variantColor && (theme as any)[variantColor] ? (theme as any)[variantColor] : theme['text_reverse']};

  border: 1px solid transparent;
  border-radius: ${({ borderRadius }) => px2rem(borderRadius)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => px2rem(gap)};
  font-weight: 600;

  &.underline {
    background-color: transparent;
    text-decoration: underline;
    color: var(--text-primary-color);
    text-underline-offset: ${px2rem(3)};
  }

  &.ghost {
    background-color: transparent;
    text-decoration: none;
    border: 1px solid transparent;
    color: var(--text-primary-color);
  }

  &.primary {
    background-color: var(--variant-primary-color);
    color: var(--text-reverse-color);
  }

  &.outline {
    background-color: transparent;
    color: var(--text-primary-color);
    border-color: var(--variant-primary-color);
  }

  &.outline-negative {
    background-color: transparent;
    color: ${({ theme }) => theme['negative']};
    border-color: ${({ theme }) => theme['negative']};
  }

  &.small {
    padding: ${px2rem(12)} ${px2rem(16)};
    font-size: ${px2rem(16)};
    width: fit-content;
  }

  &.normal {
    padding: ${px2rem(12)} ${px2rem(34)};
    font-size: ${px2rem(16)};
    width: fit-content;
  }

  &.large {
    padding: ${px2rem(12)} ${px2rem(72)};
    font-size: ${px2rem(16)};
    width: fit-content;
  }

  &.stretch {
    padding: ${px2rem(12)} ${px2rem(20)};
    width: 100%;
    font-size: ${px2rem(16)};
  }

  ${MediaQueryBuilder(
    'xs',
    css`
      min-height: 45px;
      &.small {
        padding: ${px2rem(12)} ${px2rem(12)};
      }

      &.normal {
        padding: ${px2rem(12)} ${px2rem(16)};
        font-size: ${px2rem(16)};
        width: fit-content;
      }

      .large {
        padding: ${px2rem(12)} ${px2rem(32)};
        font-size: ${px2rem(16)};
      }

      &.stretch {
        padding: ${px2rem(12)} ${px2rem(14)};
        width: 100%;
        font-size: ${px2rem(16)};
      }
    `,
  )}

  &:hover {
    opacity: 0.8;
    /* animation: mover 0.2s ease-in-out forwards; */
  }

  &:disabled {
    opacity: 0.6;
    transform: scale(1);
  }

  .spinner {
    margin-left: 12px;
  }

  @keyframes mover {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(1px);
    }
  }
`;

export { ButtonStyled };
