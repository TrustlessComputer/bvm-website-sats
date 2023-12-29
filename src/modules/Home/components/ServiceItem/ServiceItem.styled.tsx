import styled from 'styled-components';
import px2rem from '@/utils/px2rem';
import CardBg from '@/assets/images/card.png';
import { opacify } from '@/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  padding: ${px2rem(24)};
  min-height: ${px2rem(250)};
  border-radius: ${px2rem(24)};
  /* background-image: url(${CardBg}); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  gap: ${px2rem(30)};
  cursor: pointer;

  background-color: ${({ theme }) => theme.background};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;

  .hover-show {
    opacity: 0;
  }
  .force-show {
    opacity: 1 !important;
  }
  transition: all 0.2s ease-in-out;
  :hover {
    .hover-show {
      opacity: 1;
    }
    border-color: ${({ theme }) => theme.yellow['C']};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${px2rem(12)};

  .leftView {
    display: flex;
    flex-direction: row;
    align-items: center;

    .iconWrapper {
    }

    .label {
    }
  }

  .rightView {
    display: flex;
    flex-direction: row;
    align-items: center;

    .iconWrapper {
    }

    .groupDapps {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
      }

      .desc {
      }
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  width: '100%';
  background-color: #ececec;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(14)};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${px2rem(14)};
`;

export { Container, Header, Divider, Body, Footer };
