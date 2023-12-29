import styled, { css } from 'styled-components';
import { IMenuItem, MENU_DESKTOP } from '@/pages/layout/constants.menu';
import Text from '@/components/Text';
import px2rem from '@/utils/px2rem';
import { PREFIX } from '@/constants/route-path';
import configs from '@/configs';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  gap: ${px2rem(38)};
`;

const Item = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  opacity: 0.7;
  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 1;
    `}
  :hover {
    opacity: 1;
  }
  ${MediaQueryBuilder(
    'xl',
    css`
      display: none;
    `,
  )}
`;

const NavigationRow = () => {
  const onClick = (path: string) => {
    window.open(configs.NEW_BITCOIN_CITY + path, '_self');
  };

  const renderItem = (item: IMenuItem) => {
    const isActive = item.path.includes(PREFIX);
    return (
      <Item
        key={item.name}
        onClick={() => {
          if (isActive) return;
          onClick(item.path);
        }}
        isActive={isActive}
      >
        <Text size="14" fontFamily="Sora-SemiBold">
          {item.name}
        </Text>
      </Item>
    );
  };

  return <Container>{MENU_DESKTOP.map(renderItem)}</Container>;
};

export default NavigationRow;
