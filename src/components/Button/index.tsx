import React, { PropsWithChildren } from 'react';
import * as S from './Button.styled';
import { ButtonSizes, ButtonVariants } from '@/components/Button/button.type';
import cs from 'classnames';
import { Spinner } from '@/components/Spinner';
import { ColorsTheme } from '@/theme/colors';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  disabled?: boolean;
  props?: HTMLButtonElement;
  type?: 'submit' | 'reset' | 'button' | undefined;
  variants?: ButtonVariants;
  sizes?: ButtonSizes;
  loading?: {
    isLoading: boolean;
    color?: keyof ColorsTheme;
    size?: number;
  };
  textColor?: keyof ColorsTheme;
  variantColor?: keyof ColorsTheme;
  gap?: number;
  borderRadius?: number;
  bgColor?: string;
}

const Button = ({
  type,
  className,
  onClick,
  children,
  variants = 'primary',
  sizes = 'normal',
  loading,
  textColor = undefined,
  variantColor = undefined,
  gap = 16,
  borderRadius = 12,
  bgColor = undefined,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <S.ButtonStyled
      gap={gap}
      type={type}
      className={cs(className, variants, sizes)}
      onClick={onClick}
      textColor={textColor as string}
      variantColor={variantColor as string}
      borderRadius={borderRadius}
      style={{
        backgroundColor: bgColor,
      }}
      {...props}
    >
      {loading?.isLoading && <Spinner size={loading?.size || 12} color={loading.color || 'white'} />}
      {children}
    </S.ButtonStyled>
  );
};

export default Button;
