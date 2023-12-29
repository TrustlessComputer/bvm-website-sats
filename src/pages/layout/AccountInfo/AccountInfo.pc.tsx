import { AccountInfo } from '@/pages/layout/AccountInfo/index';
import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  ${MediaQueryBuilder(
    'xl',
    css`
      display: none;
    `,
  )}
`;

const AccountInfoPC = () => {
  return (
    <Container>
      <AccountInfo />
    </Container>
  );
};

export default AccountInfoPC;
