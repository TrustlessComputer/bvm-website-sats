import * as S from '@/components/Spinner/styled';
import { ColorsTheme } from '@/theme/colors';

interface IProps {
  className?: string;
  size?: number;
  color?: keyof ColorsTheme;
}

const Spinner = ({ className, size = 45, color }: IProps) => (
  <S.Container className={className} size={size} color={color} />
);

export default Spinner;
