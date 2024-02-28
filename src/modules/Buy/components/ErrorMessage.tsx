import Text from '@/components/Text';
import React from 'react';

export type Props = {
  message: string;
};

const ErrorMessage = React.memo((props: Props) => {
  const { message } = props;
  return (
    <Text size="14" fontWeight="regular" color="negative" style={{ marginTop: '5px' }}>
      {message}
    </Text>
  );
});

export default ErrorMessage;
