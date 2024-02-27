import IcCheckGreen from '@/assets/icons/ic-check-green.svg';
import IcX from '@/assets/icons/ic-x.svg';
import IcTelegram from '@/assets/icons/ic-telegram.svg';
import BaseModal from '@/components/BaseModal';

import IconSVG from '@/components/IconSVG';
import { Container, RowButton, Text1, Text2, WrappIcon } from './styled';

export interface IFormValues {
  totalSupply: string;
  receivingAddress: string;
}

interface IProps {
  show: boolean;
  onClose?: () => void;
  onSuccess?: () => Promise<void>;
  data?: any;
}

const CustomizeTokenModal = (props: IProps) => {
  const { show, onClose, data } = props;

  return (
    <BaseModal show={show} handleClose={onClose} width={800}>
      <Container>
        <IconSVG src={IcCheckGreen} maxWidth="80" />
        <Text1>Thank you for your submission</Text1>
        <Text2>
          We are currently receiving a large amount of submissions.
          <Text2>Our team will review and contact you shortly to get your Bitcoin L2 blockchain started.</Text2>
        </Text2>
        <Text2>Reach out to our team member if you have any question:</Text2>

        <RowButton>
          <WrappIcon
            onClick={() => {
              window.open('https://twitter.com/bird_2836', '_blank');
            }}
          >
            <IconSVG src={IcX} maxWidth="48" />
          </WrappIcon>

          <WrappIcon
            onClick={() => {
              window.open('https://t.me/bird2836', '_blank');
            }}
          >
            <IconSVG src={IcTelegram} maxWidth="48" />
          </WrappIcon>
        </RowButton>
      </Container>
    </BaseModal>
  );
};

export default CustomizeTokenModal;
