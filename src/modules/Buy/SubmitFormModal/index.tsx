import BaseModal from '@/components/BaseModal';

import { useBuy } from '../providers/Buy.hook';
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
  DevModeButton,
} from './styled';
import { useState } from 'react';

const MAX_CLICK = 5;

interface IProps {
  show: boolean;
  onClose?: () => void;
  onSuccess?: () => Promise<void>;
}

const CustomizeTokenModal = (props: IProps) => {
  const { show, onClose, onSuccess } = props;
  const { computerNameField, projectWebSiteField, projectXField, submitFormParams, orderBuyHandler } = useBuy();

  const [countClick, setCountClick] = useState(0);

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
        <DevModeButton
          onClick={() => {
            if (countClick < MAX_CLICK) {
              setCountClick(prev => prev + 1);
            } else {
              orderBuyHandler();
              onClose && onClose();
            }
          }}
        />
        <Text1>
          You are creating a Bitcoin L2 named <Text2>{computerNameField?.value || '--'}</Text2>
        </Text1>
        {renderRowInfor('Network:', submitFormParams?.network)}
        {renderRowInfor('Block Time:', submitFormParams?.blockTime)}
        {renderRowInfor('Rollup Protocol:', submitFormParams?.rollupProtocol)}
        {renderRowInfor('Withdrawal Period:', submitFormParams?.withdrawPeriod)}
        <BreakLine />
        <Text3>YOUR PROJECT INFO:</Text3>
        {renderRowInfor('Project X Account:', projectXField?.value || '--')}
        {renderRowInfor('Project Website:', projectWebSiteField?.value || '--')}
        <BreakLine />
        <Text3>YOUR CONTACT INFO:</Text3>
        {renderRowInfor('Twitter:', submitFormParams?.twName)}
        {renderRowInfor('Telegram:', submitFormParams?.telegram)}
        <RowButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SubmitButton onClick={onSuccess}>Submit</SubmitButton>
        </RowButton>
      </Container>
    </BaseModal>
  );
};

export default CustomizeTokenModal;
