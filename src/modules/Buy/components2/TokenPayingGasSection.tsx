import { TextInput2 } from '@/components/TextInput/TextInput2';
import { Radio } from 'antd';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { FormFields, FormFieldsErrorMessage, NativeTokenPayingGasEnum, NetworkEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import ErrorMessage from '../components/ErrorMessage';
import Section from '../components/Section';
import Title2 from '../components/Title2';
import { useBuy } from '../providers/Buy.hook';
import * as S from '../styled';
import { ethers } from 'ethers';

const Group1 = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Group2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const TokenPayingGasSection = () => {
  const {
    nativeTokenPayingGasSelected,
    setNativeTokenPayingGasSelected,
    isMainnet,
    availableListData,
    tickerField,
    setTickerField,
    totalSupplyField,
    setTotalSupplyField,
    receivingAddressField,
    setReceivingAddressField,
  } = useBuy();

  const TICKER_ID = FormFields.TICKER;
  const TOTAL_SUPPLY_ID = FormFields.TOTAL_SUPPLY;
  const RECEIVING_ADDRESS_ID = FormFields.RECEIVING_ADDRESS;

  const nativeTokenPayingGas = availableListData?.nativeTokenPayingGas;

  if (!nativeTokenPayingGas) return <></>;

  const dataList: ItemDetail[] = isMainnet
    ? nativeTokenPayingGas[NetworkEnum.Network_Mainnet]
    : nativeTokenPayingGas[NetworkEnum.Network_Testnet];

  const onChangeHandler = async (field: FormFields, e: any) => {
    const text = e.target.value;
    if (field == TICKER_ID) {
      setTickerField({
        ...tickerField,
        value: text,
        hasFocused: true,
        hasError: !!tickerField.isRequired && isEmpty(text),
      });
    }

    if (field == TOTAL_SUPPLY_ID) {
      setTotalSupplyField({
        ...totalSupplyField,
        value: text,
        hasFocused: true,
        hasError: !!totalSupplyField.isRequired && isEmpty(text),
      });
    }

    if (field == RECEIVING_ADDRESS_ID) {
      let isValid = true;
      let errorMessage = undefined;
      if (isEmpty(text)) {
        isValid = false;
        errorMessage = FormFieldsErrorMessage[RECEIVING_ADDRESS_ID];
      } else if (!ethers.utils.isAddress(text)) {
        isValid = false;
        errorMessage = 'Address is invalid.';
      }

      setReceivingAddressField({
        ...receivingAddressField,
        value: text,
        hasFocused: true,
        hasError: !!receivingAddressField.isRequired && !isValid,
        errorMessage: errorMessage,
      });
    }
  };

  return (
    <Section
      title={'Native token for paying transaction gas'}
      description={'Which native token is right for you?'}
      descriptionDetail={undefined}
    >
      <S.Space />
      <S.Section>
        <Radio.Group
          onChange={(e: any) => {
            setNativeTokenPayingGasSelected(e.target.value);
          }}
          value={nativeTokenPayingGasSelected}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          {dataList.map((item, index) => {
            return (
              <Radio
                key={`${item.valueStr}-${index}`}
                value={item.value}
                style={{
                  fontSize: '16px',
                  fontWeight: '600px',
                }}
              >
                {item.valueStr}
              </Radio>
            );
          })}
        </Radio.Group>
        {nativeTokenPayingGasSelected === NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint && (
          <Group1>
            <Group2>
              <Title2 text={'Ticker'} isRequired />
              <TextInput2
                placeholder=""
                id={TICKER_ID}
                name={TICKER_ID}
                value={tickerField.value}
                className={`${tickerField.hasFocused && tickerField.hasError ? 'error' : ''}`}
                onChange={e => {
                  onChangeHandler(TICKER_ID, e);
                }}
                onBlur={(e: any) => {
                  onChangeHandler(TICKER_ID, e);
                }}
                autoComplete="off"
                spellCheck={false}
                autoFocus={false}
                type="text"
                step={'any'}
                onWheel={(e: any) => e?.target?.blur()}
              />
              {tickerField.hasFocused && tickerField.hasError && <ErrorMessage message={tickerField.errorMessage} />}
            </Group2>

            <Group2>
              <Title2 text={'Total Supply'} isRequired />
              <TextInput2
                placeholder=""
                id={TOTAL_SUPPLY_ID}
                name={TOTAL_SUPPLY_ID}
                value={totalSupplyField.value}
                className={`${totalSupplyField.hasFocused && totalSupplyField.hasError ? 'error' : ''}`}
                onChange={e => {
                  onChangeHandler(TOTAL_SUPPLY_ID, e);
                }}
                onBlur={(e: any) => {
                  onChangeHandler(TOTAL_SUPPLY_ID, e);
                }}
                autoComplete="off"
                spellCheck={false}
                autoFocus={false}
                type="number"
                step={'any'}
                onWheel={(e: any) => e?.target?.blur()}
              />
              {totalSupplyField.hasFocused && totalSupplyField.hasError && (
                <ErrorMessage message={totalSupplyField.errorMessage} />
              )}{' '}
            </Group2>

            <Group2>
              <Title2 text={'Receiving address'} isRequired />
              <TextInput2
                placeholder=""
                id={RECEIVING_ADDRESS_ID}
                name={RECEIVING_ADDRESS_ID}
                value={receivingAddressField.value}
                className={`${receivingAddressField.hasFocused && receivingAddressField.hasError ? 'error' : ''}`}
                onChange={e => {
                  onChangeHandler(RECEIVING_ADDRESS_ID, e);
                }}
                onBlur={(e: any) => {
                  onChangeHandler(RECEIVING_ADDRESS_ID, e);
                }}
                autoComplete="off"
                spellCheck={false}
                autoFocus={false}
                type="text"
                step={'any'}
                onWheel={(e: any) => e?.target?.blur()}
              />
              {receivingAddressField.hasFocused && receivingAddressField.hasError && (
                <ErrorMessage message={receivingAddressField.errorMessage} />
              )}
            </Group2>
          </Group1>
        )}
      </S.Section>
      <S.Space />
    </Section>
  );
};

export default TokenPayingGasSection;
