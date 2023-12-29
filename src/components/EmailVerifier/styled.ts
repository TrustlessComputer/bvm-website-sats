import styled from 'styled-components';
import px2rem from '@/utils/px2rem';
import { opacify } from '@/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${px2rem(6)};
  .submit-btn {
    margin-top: ${px2rem(24)};
  }
`;

const ResendCode = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${px2rem(16)};
  .action {
    margin-left: ${px2rem(4)};
    cursor: pointer;
    color: ${({ theme }) => theme.button_primary};
    :hover {
      opacity: 0.8;
    }
  }
`;

const Spacer = styled.div`
  height: ${px2rem(24)};
`;

const Back = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${px2rem(32)};
  height: ${px2rem(32)};
  border-radius: 50px;
  background-color: ${({ theme }) => opacify(10, theme.text_primary)};
  transition: opacity 0.1s ease-in-out;
  :hover {
    opacity: 0.8;
  }
`;

export { Container, ResendCode, Spacer, Back };
