import useToggle from '@/hooks/useToggle';
import * as S from '@/pages/layout/Header/styled';
import Text from '@/components/Text';
import { IMenuItem, MENU_DESKTOP, SUB_MENU } from '@/pages/layout/constants.menu';
import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { PREFIX } from '@/constants/route-path';
import configs from '@/configs';
import { MediaQueryBuilder } from '@/theme';
import { opacify } from '@/utils';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'react-feather';
import React from 'react';

const MainMenuItem = styled.div<{ isActive: boolean }>`
  cursor: pointer;
`;

const SubMenuItem = styled(Link)<{ isActive: boolean }>`
  cursor: pointer;
`;

const SubMenuItemExternal = styled.div`
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(16)};
`;

const ContentSubMenu = styled.div`
  display: none;
  ${MediaQueryBuilder(
    'md',
    css`
      display: flex;
      flex-direction: column;
      gap: ${px2rem(16)};
    `,
  )}
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin-left: auto;
  background-color: ${({ theme }) => opacify(10, theme.text_primary)};
  margin-top: ${px2rem(16)};
  margin-bottom: ${px2rem(16)};
`;

const CloseIcon = styled.div`
  cursor: pointer;
  margin-left: auto;
  padding: ${px2rem(6)};
  border-radius: ${px2rem(4)};
  margin-bottom: ${px2rem(16)};
  background-color: ${({ theme }) => theme.background_tertiary};
  :hover {
    opacity: 0.8;
  }
  ${MediaQueryBuilder(
    'md',
    css`
      display: initial;
    `,
  )}
`;

const HeaderDrawer = () => {
  const location = useLocation();
  const activePath = location.pathname;
  const [open, toggleValue] = useToggle(false);

  const onMainItemClick = (path: string) => {
    window.open(configs.NEW_BITCOIN_CITY + path, '_self');
    toggleValue();
  };

  const renderMainItem = (item: IMenuItem) => {
    const isActive = item.path.includes(PREFIX);
    return (
      <MainMenuItem
        isActive={isActive}
        onClick={() => {
          if (isActive) return toggleValue();
          onMainItemClick(item.path);
        }}
      >
        <Text size="18" align="right" fontFamily="Sora-Medium">
          {item.name}
        </Text>
      </MainMenuItem>
    );
  };

  const renderSubItem = (item: IMenuItem) => {
    const isActive = item.path === activePath;

    const TextComp = (
      <Text size="18" align="right" fontFamily="Sora-Medium" color={isActive ? 'button_primary' : 'text_primary'}>
        {item.name}
      </Text>
    );

    if (item.external) {
      return <SubMenuItemExternal onClick={() => window.open(item.path, '_blank')}>{TextComp}</SubMenuItemExternal>;
    }

    return (
      <SubMenuItem to={item.path} isActive={isActive} onClick={toggleValue}>
        {TextComp}
      </SubMenuItem>
    );
  };

  return (
    <>
      <S.MenuBar onClick={toggleValue} />
      <S.MenuDrawer
        open={open}
        style={{ boxShadow: 'none !important' }}
        placement="right"
        closable={false}
        key="account-drawer"
        className="background"
        width="400"
        contentWrapperStyle={{ boxShadow: 'none' }}
        onClose={toggleValue}
      >
        <Content>
          <CloseIcon onClick={toggleValue}>
            <X size="24px" color="black" />
          </CloseIcon>
          {MENU_DESKTOP.map(renderMainItem)}
          <ContentSubMenu>
            <Line />
            {SUB_MENU.map(renderSubItem)}
          </ContentSubMenu>
        </Content>
      </S.MenuDrawer>
    </>
  );
};

export default HeaderDrawer;
