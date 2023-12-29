import Text from '@/components/Text';
import React from 'react';

export type Props = {
  text: string;
};

const Title = React.memo((props: Props) => {
  const { text } = props;
  return (
    <Text size="20" fontWeight="semibold" align="left">
      {text}
    </Text>
  );
});

export default Title;
