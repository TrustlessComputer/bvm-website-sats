import * as S from './Segment.styled';
import React from 'react';
import Text from '@/components/Text';
import { ItemDetail } from '../Buy.types';
import { PluginTypeEnum } from '../Buy.constanst';

export type Props = {
  item: ItemDetail;
  indexSelected: number;
  disabled?: boolean;
  isMainnet: boolean;
  pluinType?: number;
  onClick?: (item: ItemDetail, value: number) => void;
};

const Segment = React.memo((props: Props) => {
  const { item, disabled, indexSelected, isMainnet, pluinType, onClick } = props;

  if (pluinType === PluginTypeEnum.PluginType_Bridge) return null;
  const isNoThanks = indexSelected === -1;
  const disabledClassName = disabled ? 'disabled' : '';
  const rigtViewClassName = disabled ? disabledClassName : !isNoThanks ? 'selected' : 'non-select';

  return (
    <S.Container>
      <S.LeftView
        onClick={() => {
          onClick && onClick(item, -1);
        }}
        className={disabledClassName}
      >
        <Text size="16" align="center">
          {'No, thanks'}
        </Text>
      </S.LeftView>
      <S.RightView
        className={`${rigtViewClassName}`}
        onClick={() => {
          onClick && onClick(item, item.value);
        }}
      >
        <Text size="16" align="left">
          {`${item.valueStr}`}
        </Text>
        <Text size="16" align="left">
          {`${isMainnet ? item.price : item.price}`}
        </Text>
      </S.RightView>
    </S.Container>
  );
});

export default Segment;
