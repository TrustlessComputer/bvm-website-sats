import { Row } from '@/components/Row';
import Text from '@/components/Text';
import React from 'react';

export type Props = {
  text: string;
  isRequired?: boolean;
  size?: any;
  style?: any;
};

const Title = React.memo((props: Props) => {
  const { text, size = 20, style, isRequired } = props;
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3px',
      }}
    >
      <Text size={size} fontWeight="semibold" align="left">
        {text + ' '}
      </Text>
      {isRequired && (
        <label
          style={{
            color: 'red',
            fontSize: '11px',
            marginBottom: '3px',
          }}
        >
          {'(*)'}
        </label>
      )}
    </div>
  );
});

export default Title;
