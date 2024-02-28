import Text from '@/components/Text';
import * as S from '@/pages/layout/SubHeader/styled';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMenuItem, SUB_MENU } from '@/pages/layout/constants.menu';
import { Row } from '@/components/Row';
import { ROUTE_PATH } from '@/constants/route-path';
import configs from '@/configs';
import Living from '@/components/Living';
import useRouteHelper from '@/hooks/useRouterHelper';

const SubHeader = () => {
  const location = useLocation();
  const activePath = location.pathname;
  const { postMessage } = useRouteHelper();

  const renderMenuItem = (item: IMenuItem) => {
    const isActive = item.path === activePath;
    let component = null;

    if (item.external) {
      component = (
        <S.NavbarExternalItem
          key={item.path}
          onClick={() => {
            window.open(item.path, item.target || '_blank');
          }}
        >
          <Text size="18" color={isActive ? 'button_secondary' : 'text_primary'} fontWeight="semibold">
            {item.name}
          </Text>
        </S.NavbarExternalItem>
      );
    } else {
      component = (
        <S.NavbarItem
          to={item.path}
          key={item.path}
          onClick={() => {
            postMessage(item.path);
          }}
        >
          <Text size="18" color={isActive ? 'button_secondary' : 'text_primary'} fontWeight="semibold">
            {item.name}
          </Text>
        </S.NavbarItem>
      );
    }

    if (item.live) {
      return (
        <Row gap={14} align="center">
          <S.LiveBox>
            <Living size={8} color="positive" />
          </S.LiveBox>
          {component}
        </Row>
      );
    }

    return <Row width="fit-content">{component}</Row>;
  };

  return (
    <S.Container>
      <Link
        to={ROUTE_PATH.HOME}
        onClick={() => {
          postMessage(ROUTE_PATH.HOME);
        }}
      >
        <S.MainTitle size="18" fontWeight="semibold">
          Bitcoin L2
        </S.MainTitle>
      </Link>
      <Row gap={32} justify="space-between" width="fit-content">
        <S.Navbar>{SUB_MENU.map(renderMenuItem)}</S.Navbar>
        {!configs.DISABLED_FEATURES.DEPLOY && (
          <S.Deploy
            paddingHorizontal={24}
            paddingVertical={6}
            fontSize={16}
            showComingSoon={false}
            text="Try for free"
          />
        )}
      </Row>
    </S.Container>
  );
};

export default SubHeader;
