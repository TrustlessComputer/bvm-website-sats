import Text from '@/components/Text';
import React from 'react';

export type Props = {
  title: string;
};

const SubTitle = React.memo((props: Props) => {
  const { title } = props;
  return (
    <Text size="18" fontWeight="semibold" align="left">
      {title}
    </Text>
  );
});

export default SubTitle;
