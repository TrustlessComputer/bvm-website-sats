import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div``;

const DescriptionContainer = styled.div`
  margin-top: ${px2rem(10)};
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export { Container, TitleContainer, DescriptionContainer };
