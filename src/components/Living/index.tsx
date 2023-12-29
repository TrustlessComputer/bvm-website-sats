import styled from 'styled-components';
import { ColorsTheme } from '@/theme/colors';

const Living = styled.span<{
  color?: string | keyof ColorsTheme;
  size?: number;
}>`
  --color: ${({ color, theme }) => {
    const themeColor = color && (theme as any)?.[color];
    return color ? (themeColor ? themeColor : color) : theme.button_secondary;
  }};
  --size: ${({ size }) => (size ? `${size}px` : '10px')};
  display: inline-block;
  position: relative;
  top: calc(50% - 5px);
  background-color: var(--color);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  z-index: 1;
  &:before {
    content: '';
    display: block;
    position: absolute;
    background-color: var(--color);
    opacity: 0.9;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: live 2s ease-in-out infinite;
    z-index: -1;
  }
  @keyframes live {
    0% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(3, 3);
      background-color: var(--color);
      opacity: 0;
    }
  }
`;

export default Living;
