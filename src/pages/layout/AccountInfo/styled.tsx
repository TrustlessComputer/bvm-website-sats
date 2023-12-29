import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilderMin } from '@/theme';
import Text from '@/components/Text';
import { opacify } from '@/utils';

const Container = styled.div`
  padding-left: ${px2rem(32)};
  min-width: ${px2rem(320)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2rem(32)};
  max-width: ${px2rem(400)};
  padding-bottom: ${px2rem(32)};
  ${MediaQueryBuilderMin(
    'xxxl',
    css`
      min-width: ${px2rem(350)};
    `,
  )}
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(16)};
  width: 100%;
`;

const AddressContentBox = styled.div`
  background-color: ${({ theme }) => theme.background_secondary};
  padding: ${px2rem(8)} ${px2rem(24)};
  border-radius: ${px2rem(8)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${px2rem(12)};
  width: 100%;

  .ic-copy {
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
`;

const AddressBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${px2rem(8)};
  width: 100%;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(12)};
`;

const QRCodeBox = styled.div`
  background-color: ${({ theme }) => theme.background_secondary};
  border-radius: ${px2rem(8)};
  padding: ${px2rem(12)};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const History = styled.span`
  margin-left: ${px2rem(12)};
  cursor: pointer;
  position: absolute;
  right: 0;
  svg {
    margin-top: ${px2rem(-6)};
  }
  :hover {
    opacity: 0.8;
  }
`;

const Info = styled.span`
  margin-left: ${px2rem(12)};
  margin-top: -5px;
  cursor: pointer;
  svg {
    margin-top: ${px2rem(-4)};
  }
  :hover {
    opacity: 0.8;
  }
`;

const WarningZone = styled(Text)`
  background-color: ${({ theme }) => opacify(80, theme.warning)};
  padding: ${px2rem(12)};
  border-radius: ${px2rem(8)};
  text-align: center;
`;

export { Container, Actions, AddressContentBox, QRCodeBox, AddressBox, Icons, History, Info, WarningZone };
