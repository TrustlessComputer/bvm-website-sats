import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

const BaseSize = 14;
const Step = 1.4;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${px2rem(80)};
  height: ${px2rem(80)};
  .chevron {
    position: absolute;
    width: ${px2rem(BaseSize * 2.2)};
    height: ${px2rem(BaseSize * 0.5)};
    opacity: 0;
    animation: move-chevron 3s ease-out infinite;
  }

  .chevron:first-child {
    animation: move-chevron 3s ease-out 1s infinite;
  }

  .chevron:nth-child(2) {
    animation: move-chevron 3s ease-out 2s infinite;
  }

  .chevron:before,
  .chevron:after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    background: #ffffff;
  }

  .chevron:before {
    left: 0;
    transform: skewY(30deg);
  }

  .chevron:after {
    right: 0;
    width: 50%;
    transform: skewY(-30deg);
  }

  @keyframes move-chevron {
    25% {
      opacity: 1;
    }
    33.3% {
      opacity: 0.8;
      transform: translateY(${px2rem(BaseSize * Step)});
    }
    66.6% {
      opacity: 0.6;
      transform: translateY(${px2rem(BaseSize * (Step * 2))});
    }
    100% {
      opacity: 0;
      transform: translateY(${px2rem(BaseSize * Step * 3)}) scale(0.5);
    }
  }
`;

export { Container };
