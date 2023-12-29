import { AccountInfo } from '@/pages/layout/AccountInfo/index';
import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  padding-top: ${px2rem(32)};
  > div {
    padding-left: 0;
  }
`;

const AccountInfoSmall = () => {
  return (
    <Container>
      <AccountInfo />
    </Container>
  );
};

export default AccountInfoSmall;
