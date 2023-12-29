import Text from '@/components/Text';
import React from 'react';
import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';

export type Props = {
  text: string;
  className?: any;
};

const TextStyled = styled(Text)`
  color: ${({ theme }) => theme.blueberry};
`;

const Title = React.memo((props: Props) => {
  const { text, className } = props;
  return (
    <TextStyled size="16" fontWeight="semibold" align="left" color="blueberry" className={className}>
      {text}
    </TextStyled>
  );
});

export default Title;
