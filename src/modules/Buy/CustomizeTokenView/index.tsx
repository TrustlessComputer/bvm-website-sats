import * as S from '@/components/ContactModal/styled';
import { Input } from '@/components/Input';
import { ethers } from 'ethers';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import * as S2 from './styled';

export interface IFormValues {
  totalSupply: string;
  receivingAddress: string;
  tickerName: string;
}

interface IProps {
  formDataCallback: (isError: boolean, data: IFormValues) => any;
}

const CustomizeTokenView = (props: IProps) => {
  const { formDataCallback } = props;

  const [totalSupply, setTotalSupply] = useState<string>('');
  const [receivingAddress, setReceivingAddress] = useState<string>('');
  const [tickerName, setTickerName] = useState<string>('');

  const [totalSupplyError, setTotalSupplyError] = useState<string | undefined>('');
  const [receivingAddressError, setReceivingAddressError] = useState<string | undefined>('');
  const [tickerNameError, setTickerNameError] = useState<string | undefined>('');

  useEffect(() => {
    const isFormError = isEmpty(totalSupply) || isEmpty(receivingAddress);
    formDataCallback &&
      formDataCallback(isFormError, {
        totalSupply,
        receivingAddress,
        tickerName,
      });
  }, [totalSupply, receivingAddress]);

  const validateAll = () => {
    validateField('tickerName', tickerName);
    validateField('totalSupply', totalSupply);
    validateField('receivingAddress', receivingAddress);
  };

  const validateField = (fieldID: string, value: string) => {
    if (fieldID === 'tickerName') {
      if (!value) {
        setTickerNameError('Ticker is required.');
      } else {
        setTickerNameError(undefined);
      }
    }

    if (fieldID === 'totalSupply') {
      if (!value) {
        setTotalSupplyError('Total supply is required.');
      } else {
        setTotalSupplyError(undefined);
      }
    }

    if (fieldID === 'receivingAddress') {
      if (!value) {
        setReceivingAddressError('Receiving address is required.');
      } else {
        if (!ethers.utils.isAddress(value)) {
          setReceivingAddressError('Address is invalid.');
        } else {
          setReceivingAddressError(undefined);
        }
      }
    }
  };

  return (
    <S2.Container_2>
      <S.InputBox>
        <Input
          label="Ticker"
          id="tickerName"
          error={tickerNameError}
          placeholder=""
          isRequired={true}
          type="text"
          autoFocus={true}
          autoComplete="off"
          spellCheck={false}
          value={tickerName}
          onChange={(e: any) => {
            const value = e.target.value;
            setTickerName(value);
            validateField('tickerName', value);
          }}
          onBlur={() => {
            validateAll();
          }}
          onFocus={() => {
            setTickerNameError(undefined);
          }}
          onWheel={(e: any) => e?.target?.blur()}
        />
        <Input
          label="Total supply"
          id="totalSupply"
          error={totalSupplyError}
          placeholder=""
          isRequired={true}
          type="number"
          autoFocus={false}
          autoComplete="off"
          value={totalSupply}
          spellCheck={false}
          onChange={(e: any) => {
            const value = e.target.value;
            setTotalSupply(value);
            validateField('totalSupply', value);
          }}
          onFocus={() => {
            setTotalSupplyError(undefined);
          }}
          onBlur={() => {
            validateAll();
          }}
          onWheel={(e: any) => e?.target?.blur()}
        />
        <Input
          label="Receiving address"
          id="receivingAddress"
          error={receivingAddressError}
          placeholder=""
          isRequired={true}
          type="text"
          autoFocus={false}
          autoComplete="off"
          spellCheck={false}
          value={receivingAddress}
          onChange={(e: any) => {
            const value = e.target.value;
            setReceivingAddress(value);
            validateField('receivingAddress', value);
          }}
          onBlur={() => {
            validateAll();
          }}
          onFocus={() => {
            setReceivingAddressError(undefined);
          }}
          onWheel={(e: any) => e?.target?.blur()}
        />
      </S.InputBox>
    </S2.Container_2>
  );
};

export default CustomizeTokenView;
