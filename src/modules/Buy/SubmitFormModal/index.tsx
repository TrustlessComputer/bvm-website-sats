import BaseModal from '@/components/BaseModal';

import {
  BreakLine,
  CancelButton,
  Container,
  Content,
  Label,
  RowButton,
  RowInfor,
  SubmitButton,
  Text1,
  Text2,
  Text3,
} from './styled';

export interface IData {
  networkName?: string;
  network?: string;
  blockTime?: string;
  rollupProtocol?: string;
  withdrawalPeriod?: string;
  projectXAccount?: string;
  projectWebsite?: string;
  twitter?: string;
  telegram?: string;
}

interface IProps {
  show: boolean;
  data: IData;
  onClose?: () => void;
  onSuccess?: () => Promise<void>;
}

const CustomizeTokenModal = (props: IProps) => {
  const { show, data, onClose, onSuccess } = props;
  const {
    networkName,
    network,
    blockTime,
    rollupProtocol,
    withdrawalPeriod,
    projectXAccount,
    projectWebsite,
    twitter = '',
    telegram = '',
  } = data;

  const renderRowInfor = (label = '', content = '') => {
    return (
      <RowInfor>
        <Label>{label}</Label>
        <Content>{content}</Content>
      </RowInfor>
    );
  };

  return (
    <BaseModal show={show} handleClose={onClose} hideCloseButton={true} width={700}>
      <Container>
        <Text1>
          You are creating a Bitcoin L2 named <Text2>{networkName}</Text2>
        </Text1>
        {renderRowInfor('Network:', network || '--')}
        {renderRowInfor('Block Time:', blockTime || '--')}
        {renderRowInfor('Rollup Protocol:', rollupProtocol || '--')}
        {renderRowInfor('Withdrawal Period:', withdrawalPeriod || '--')}
        <BreakLine />
        <Text3>YOUR PROJECT INFO:</Text3>
        {renderRowInfor('Project X Account:', projectXAccount || '--')}
        {renderRowInfor('Project Website:', projectWebsite || '--')}
        <BreakLine />
        <Text3>YOUR CONTACT INFO:</Text3>
        {renderRowInfor('Twitter:', twitter || '--')}
        {renderRowInfor('Telegram:', telegram || '--')}
        <RowButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SubmitButton onClick={onSuccess}>Submit</SubmitButton>
        </RowButton>
      </Container>
    </BaseModal>
  );
};

export default CustomizeTokenModal;
