import styled from 'styled-components';
import Button from '@/components/Button';
import px2rem from '@/utils/px2rem';

const Container = styled(Button)<{ paddingVertical: number; paddingHorizontal: number; fontSize: number }>`
  background-color: ${({ theme }) => theme.button_secondary} !important;
  width: fit-content;
  transition: 0.4s;
  padding: ${({ paddingVertical, paddingHorizontal }) =>
    `${px2rem(paddingVertical)} ${px2rem(paddingHorizontal)}`} !important;
  border-radius: 50px !important;

  :hover {
    background-position: right center; /* change the direction of the change here */
    text-decoration: none;
  }
`;

const ContentBox = styled.div<{ fontSize: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export { Container, ContentBox };
