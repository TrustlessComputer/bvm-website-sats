import * as S from './styled';
import Introduce from '@/modules/Wellcome/Introduce';
import WhatNew from '@/modules/Wellcome/WhatNew';
import WhyLaunch from '@/modules/Wellcome/WhyLauch/WhyLaunch';
import Reinvention from '@/modules/Wellcome/Reinvention';
import Blog from '@/modules/Wellcome/Blog';

const Wellcome = () => {
  return (
    <S.Container>
      <Introduce />
      <WhyLaunch />
      <WhatNew />
      <Reinvention />
      <Blog />
      <S.Footer />
    </S.Container>
  );
};

export default Wellcome;
