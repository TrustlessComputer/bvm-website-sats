import { Row } from '@/components/Row';
import Text from '@/components/Text';
import React from 'react';

export type Props = {
  text: string;
  isRequired?: boolean;
};

const Title = React.memo((props: Props) => {
  const { text, isRequired } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3px',
      }}
    >
      <Text size="20" fontWeight="semibold" align="left">
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
