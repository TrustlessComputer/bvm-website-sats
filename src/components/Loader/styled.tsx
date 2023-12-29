import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div<{ opacity: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper {
    position: relative;
    flex-direction: column;
    width: ${px2rem(220)};
    height: ${px2rem(160)};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background-color: rgba(22, 26, 41, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), 0 6px 6px rgba(0, 0, 0, 0.3);
  }
`;

export { Container };
