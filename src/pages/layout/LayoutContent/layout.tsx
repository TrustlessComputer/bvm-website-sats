import React from 'react';
import { Header } from '@/pages/layout/Header';
import { Outlet } from 'react-router-dom';
import * as S from './styled';
import Meta from '@/pages/layout/Meta';
import { ILayoutProps } from './types';
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
      <S.Container isDark={parentDark} isPadding={isShowHeader}>
        {isShowHeader && <Header parentDark={parentDark} />}
        {/* <S.SubHeaderWrapper>
          <SubHeader />
        </S.SubHeaderWrapper> */}
        <S.Body>
          <S.PageWrapper>
            <Outlet />
          </S.PageWrapper>
        </S.Body>
        {/*<Footer parentDark={parentDark} />*/}
      </S.Container>
    </>
  );
};

export default Layout;
