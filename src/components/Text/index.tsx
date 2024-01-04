import React, { CSSProperties, PropsWithChildren, useRef } from 'react';
import cs from 'classnames';
import { BaseText } from '@/components/Text/styled';
import { ColorsTheme } from '@/theme/colors';

export type FontFamily =
  | 'TitilliumWeb'
  | 'TitilliumWeb-SemiBold'
  | 'TitilliumWeb-Bold'
  | 'Raleway'
  | 'Raleway-SemiBold'
  | 'Raleway-Bold'
  | 'Sora'
  | 'Sora-Medium'
  | 'Sora-SemiBold'
  | 'Sora-Bold'
  | 'Helvetica Neue';

type TText = {
  fontWeight?: 'bold' | 'semibold' | 'medium' | 'regular' | 'light';
  style?: CSSProperties;
  size?:
    | '12'
    | '13'
    | '14'
    | '16'
    | '18'
    | '20'
    | '22'
    | '24'
    | '26'
    | '28'
    | '32'
    | '36'
    | '38'
    | '40'
    | '48'
    | '52'
    | '58'
    | '64'
    | '72'
    | '96';
  align?: 'center' | 'left' | 'right' | 'unset';
  color?: keyof ColorsTheme;
  className?: string;
  maxWidth?: CSSProperties['maxWidth'];
  fontFamily?: FontFamily;
  onClick?: () => void;
  wordBreak?: 'break-all' | 'break-word' | 'keep-all' | 'normal' | 'unset';
};

const Text = ({
  children,
  fontWeight = 'regular',
  size = '16',
  align = 'unset',
  style,
  color,
  className,
  maxWidth = 'none',
  onClick,
  fontFamily = 'Helvetica Neue',
  wordBreak = 'normal',
  ...rest
}: PropsWithChildren<TText>) => {
  const comp = useRef<any>(null);
  return (
    <BaseText
      {...rest}
      ref={comp}
      size={size}
      className={cs(`weight-${fontWeight}`, className)}
      color={color}
      align={align}
      maxWidth={maxWidth}
      fontFamily={fontFamily}
      onClick={onClick}
      wordBreak={wordBreak}
      style={{ ...style }}
    >
      {children}
    </BaseText>
  );
};

export default Text;
