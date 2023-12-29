import * as S from '@/modules/Home/styled';
import React from 'react';
import ServiceList from './components/Services/ServiceList';
// import Banner from '@/modules/Home/components/Banner';

const DashBoard = React.memo(() => {
  return (
    <S.Container>
      <ServiceList />
    </S.Container>
  );
});

export default DashBoard;
