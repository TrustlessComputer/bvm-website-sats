import { Radio } from 'antd';
import { NativeTokenPayingGasEnum, NetworkEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import CustomizeTokenView from '../CustomizeTokenView';
import Section from '../components/Section';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';

const TokenPayingGasSection = () => {
  const {
    nativeTokenPayingGasSelected,
    setNativeTokenPayingGasSelected,
    setFormDataCustomizeToken,
    isMainnet,
    availableListData,
  } = useBuyProvider();

  const nativeTokenPayingGas = availableListData?.nativeTokenPayingGas;

  if (!nativeTokenPayingGas) return <></>;

  const dataList: ItemDetail[] = isMainnet
    ? nativeTokenPayingGas[NetworkEnum.Network_Mainnet]
    : nativeTokenPayingGas[NetworkEnum.Network_Testnet];

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
          {dataList.map(item => {
            return (
              <Radio
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
          <>
            <CustomizeTokenView
              formDataCallback={(isError, data) => {
                setFormDataCustomizeToken({
                  isError,
                  data,
                });
              }}
            ></CustomizeTokenView>
          </>
        )}
      </S.Section>
      <S.Space />
    </Section>
  );
};

export default TokenPayingGasSection;
