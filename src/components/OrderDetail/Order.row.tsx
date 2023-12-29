import { DefaultTheme } from 'styled-components';
import Text from '@/components/Text';
import React from 'react';
import * as S from './styled';

interface IProps {
  label: string;
  value: string | React.ReactNode;
  isStrong?: boolean;
  color?: keyof DefaultTheme;
  isNode?: boolean;
  link?: string;
  subLabel?: string;
}

const OrderRow = (props: IProps) => {
  const { label, value, color, isNode = false, link, subLabel } = props;
  return (
    <S.Row isNode={isNode}>
      <Text size="18" color="button_primary" fontWeight="semibold" className="main-text">
        {label}
        {subLabel && <span className="sub-label"> {subLabel}</span>}
      </Text>
      <Text size="18" color={color ? color : 'text_primary'} wordBreak="break-word">
        {!!link && !!value ? (
          <a
            href={link}
            target="_blank"
            onClick={event => {
              event.stopPropagation();
            }}
          >
            {value}
          </a>
        ) : value ? (
          value
        ) : (
          '-'
        )}
      </Text>
    </S.Row>
  );
};

export default OrderRow;
