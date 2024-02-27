import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${px2rem(24)};
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

const Text1 = styled.p`
  font-size: ${px2rem(32)};
  font-weight: 600;
`;

const Text2 = styled.p`
  font-size: ${px2rem(20)};
  font-weight: 400;
  opacity: 0.9;
  text-align: center;
`;

const Text3 = styled.span`
  font-size: ${px2rem(22)};
  font-weight: 500;
  color: #1c1c1c;
`;

const RowInfor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.span`
  font-size: ${px2rem(17)};
  font-weight: 600;
  color: #1c1c1c;
`;

const Content = styled.span`
  font-size: ${px2rem(17)};
  font-weight: 400;
  color: #1c1c1c;
`;

const RowButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${px2rem(25)};
`;

const WrappIcon = styled.div`
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export {
  Container,
  InputBox,
  IntroduceBox,
  SuccessBox,
  SuccessLinkBox,
  Text1,
  Text2,
  Text3,
  RowInfor,
  Label,
  Content,
  RowButton,
  WrappIcon,
};
