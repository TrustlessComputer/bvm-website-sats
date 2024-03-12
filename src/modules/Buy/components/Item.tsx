import * as S from './Item.styled';
import React from 'react';
import Text from '@/components/Text';
import { ItemDetail } from '../Buy.types';
import { Info } from 'react-feather';
import { Tooltip } from 'antd';

export type Props = {
  title: string;
  content?: string;
  isSelected?: boolean;
  value: number;
  disabled?: boolean;
  isMainnet?: boolean;
  item?: ItemDetail;
  onClickCallback?: (value: number) => void;
  onClickCB?: (item: ItemDetail) => void;
  priceNote?: string;
  key?: string;
  infor?: string;
};

const Item = React.memo((props: Props) => {
  const {
    title,
    content,
    isSelected = true,
    value,
    disabled,
    isMainnet,
    item,
    priceNote,
    onClickCallback,
    onClickCB,
    key,
    infor,
  } = props;

  const selectedClassName = isSelected ? 'selected' : 'non-select';
  const disabledClassName = disabled ? 'disabled' : '';
  const sufixStr = disabled ? ' (coming soon)' : '';

  return (
    <S.Container
      key={key}
      className={`${selectedClassName} ${disabledClassName}`}
      onClick={() => {
        if (disabled) return;
        onClickCallback && onClickCallback(value);
        onClickCB && onClickCB(item!);
      }}
    >
      <Text size="20" align="left">
        {title + sufixStr}
      </Text>
      <Text size="20" align="right">
        {content}
        {priceNote && (
          <Text size="16" align="center" color="warning">
            {priceNote}
          </Text>
        )}
        {infor && (
          <Tooltip
            overlayStyle={{ maxWidth: '350px' }}
            title={
              <Text size="16" align="center" color="white">
                {infor}
              </Text>
            }
            placement="top"
            color="black"
          >
            <Info color="#ffae00"></Info>
          </Tooltip>
        )}
      </Text>
    </S.Container>
  );
});

export default Item;
