import React from 'react';
import { Header } from '@/pages/layout/Header';
import { Outlet } from 'react-router-dom';
import * as S from './styled';
import Meta from '@/pages/layout/Meta';
import { ILayoutProps } from '@/pages/layout/LayoutContent/types';
import Footer from '@/pages/layout/Footer';
import SubHeader from '@/pages/layout/SubHeader/SubHeader';
import useShowHeader from '@/hooks/useShowHeader';

interface IProps extends ILayoutProps {}

const Layout = (props: IProps) => {
  const { parentDark = false } = props;
  const isShowHeader = useShowHeader();

  return (
    <>
      <Meta />
      <S.Container isPadding={isShowHeader}>
        {isShowHeader && <Header parentDark={parentDark} />}
        <S.SubHeaderPaddingWrapper>
          <SubHeader />
        </S.SubHeaderPaddingWrapper>
        <S.Body>
          <Outlet />
        </S.Body>
        <S.PaddingWrapper>
          <Footer parentDark={parentDark} />
        </S.PaddingWrapper>
      </S.Container>
    </>
  );
};

export default Layout;
