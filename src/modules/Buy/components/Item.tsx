import * as S from './Item.styled';
import React from 'react';
import Text from '@/components/Text';
import { ItemDetail, SectionType } from '../Buy.types';

export type Props = {
  title: string;
  content?: string;
  isSelected?: boolean;
  value: number;
  disabled?: boolean;
  isMainnet?: boolean;
  onClickCallback: (value: number) => void;
  priceNote?: string;
};

const Item = React.memo((props: Props) => {
  const { title, content, isSelected = true, value, disabled, isMainnet, priceNote, onClickCallback } = props;

  const selectedClassName = isSelected ? 'selected' : 'non-select';
  const disabledClassName = disabled ? 'disabled' : '';
  const sufixStr = disabled ? ' (coming soon)' : '';

  return (
    <S.Container
      className={`${selectedClassName} ${disabledClassName}`}
      onClick={() => {
        if (disabled) return;
        onClickCallback(value);
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
      </Text>
    </S.Container>
  );
});

export default Item;
