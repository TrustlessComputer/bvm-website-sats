import { Spinner } from '@/components/Spinner';
import * as S from '@/components/Loader/styled';
const Loader = ({ loaded, opacity = 60 }: { loaded: boolean; opacity?: number }) => {
  if (loaded) return null;

  return (
    <S.Container opacity={opacity}>
      <div className="wrapper">
        <Spinner size={32} />
      </div>
    </S.Container>
  );
};

export default Loader;
