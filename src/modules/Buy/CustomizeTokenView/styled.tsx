import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const Container_2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${px2rem(32)};
  margin-bottom: ${px2rem(24)};
  ${MediaQueryBuilder(
    'lg',
    css`
      flex-direction: column;
    `,
  )}
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${px2rem(32)};
  margin-bottom: ${px2rem(24)};
  ${MediaQueryBuilder(
    'lg',
    css`
      flex-direction: column;
    `,
  )}
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(24)};
  flex: 1;
`;

const SuccessBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2rem(18)};
  flex: 1;
`;

const IntroduceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(24)};
  flex: 1;
  .content {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(16)};
  }
`;

const SuccessLinkBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(8)};
  width: 90%;
  padding: ${px2rem(20)} ${px2rem(29)};
  border: 1px solid #4266aa;
  p {
    color: #4266aa;
  }
  border-radius: ${px2rem(8)};
  cursor: pointer;
  flex: 1;
  :hover {
    opacity: 0.9;
  }
`;

export { Container_2, Container, InputBox, IntroduceBox, SuccessBox, SuccessLinkBox };
