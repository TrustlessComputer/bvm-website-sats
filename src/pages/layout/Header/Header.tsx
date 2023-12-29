import Text from '@/components/Text';
import * as S from '@/pages/layout/Header/styled';
import { ILayoutProps } from '@/pages/layout/LayoutContent/types';
import React from 'react';
import NavigationRow from '@/pages/layout/Header/Navigation.row';
import HeaderDrawer from '@/pages/layout/Header/Header.drawer';
import configs from '@/configs';
import { AccountStatus } from '@/components/AccountStatus';
import { Row } from '@/components/Row';

export const HEADER_ID = 'header';

interface IProps extends ILayoutProps {}

const Header = (props: IProps) => {
  const { parentDark = false } = props;

  return (
    <S.Container id={HEADER_ID}>
      <S.AppLogo
        onClick={() => {
          window.open(configs.NEW_BITCOIN_CITY, '_self');
        }}
      >
        <Text
          size="22"
          color={parentDark ? 'text_reverse' : 'text_primary'}
          fontFamily="Sora-Bold"
          className="app-name"
        >
          New Bitcoin City
        </Text>
      </S.AppLogo>
      <NavigationRow />
      <Row width="fit-content" gap={12} style={{ zIndex: 2 }}>
        <AccountStatus />
        <HeaderDrawer />
      </Row>
    </S.Container>
  );
};

export default Header;
