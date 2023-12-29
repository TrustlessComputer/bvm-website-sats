import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import Text from '@/components/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2rem(16)};
  padding-top: ${px2rem(8)};
`;

const Desciption = styled(Text)`
  font-weight: 400;
  span {
    font-weight: 600;
  }
`;

export { Container, Desciption };
