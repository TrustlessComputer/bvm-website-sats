import { useAppSelector } from '@/state/hooks';
import { FC } from 'react';
import SVG from 'react-inlinesvg';
import { StyledIconSVG } from './IconSVG.styled';
import { isDarkSelector } from '@/state/application/selector';
import { ColorsTheme } from '@/theme/colors';

export type IconSVGProps = {
  src: string;
  className?: string;
  maxWidth?: string;
  maxHeight?: string;
  type?: string;
  color?: keyof ColorsTheme;
  onClick?: (e: any) => void;
  useDarkmode?: boolean;
};

const IconSVG: FC<IconSVGProps> = ({
  src,
  className = '',
  maxWidth = '',
  maxHeight = '',
  type = '',
  color = '',
  onClick,
  useDarkmode = false,
}) => {
  const darkMode = useAppSelector(isDarkSelector);
  const wrapSrc = useDarkmode && !darkMode && src.includes('-dark.svg') ? src.replaceAll('-dark', '-light') : src;
  return (
    <StyledIconSVG
      className={className}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      type={type}
      color={color}
      onClick={onClick}
    >
      <SVG src={wrapSrc} />
    </StyledIconSVG>
  );
};

export default IconSVG;
