import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(26)};
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${px2rem(24)};
`;

export { Container, Actions };
