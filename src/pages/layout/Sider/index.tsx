import { setRoutePathSelected } from '@/state/application/reducer';
import { routePathSelectedSelector } from '@/state/application/selector';
import { useAppDispatch } from '@/state/hooks';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import SiderItem from './SiderItem';
import SiderItemsList from './constants';
import * as S from './styled';
import { SiderItemType } from './types';
import useAuth from '@/hooks/useAuth';

const Sider = React.memo(() => {
  const dispatch = useAppDispatch();

  const routePathSelected = useSelector(routePathSelectedSelector);
  const isAuth = useAuth();
  const sideItems = useMemo(
    () =>
      SiderItemsList.filter(item => {
        if (item.visible) {
          if (item.needAuth) {
            if (isAuth) return true;
            return false;
          }
          return true;
        }
      }),
    [SiderItemsList, isAuth],
  );

  const renderItem = (item: SiderItemType) => {
    return (
      <SiderItem
        key={item.key}
        item={item}
        isActive={item.path === routePathSelected}
        onSelect={item => {
          dispatch(setRoutePathSelected(item.path));
        }}
      />
    );
  };

  return <S.Container>{sideItems.map(item => renderItem(item))}</S.Container>;
});

export default Sider;
