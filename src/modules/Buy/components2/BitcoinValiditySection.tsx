import { NetworkEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';

const BitcoinValiditySection = () => {
  const { availableListData, isMainnet, bitcoinValiditySelected, setBitcoinValiditySelected } = useBuyProvider();

  const dataWithNetwork = availableListData?.bitcoinValidity;

  if (!dataWithNetwork) return <></>;

  const dataList: ItemDetail[] = isMainnet
    ? dataWithNetwork[NetworkEnum.Network_Mainnet]
    : dataWithNetwork[NetworkEnum.Network_Testnet];

  return (
    <Section
      title={'Bitcoin Validity'}
      description={'Which Bitcoin Validity is right for you?'}
      descriptionDetail={undefined}
    >
      <S.ListItemContainer>
        {dataList?.map((item, index) => {
          return (
            <Item
              key={`${item.valueStr} ${index}`}
              isMainnet={isMainnet}
              item={item}
              value={item.value}
              isSelected={item.value === bitcoinValiditySelected?.value}
              title={item.valueStr}
              content={item.price}
              priceNote={item.priceNote}
              onClickCallback={value => {}}
              onClickCB={item => {
                setBitcoinValiditySelected(item!);
              }}
            />
          );
        })}
      </S.ListItemContainer>
    </Section>
  );
};

export default BitcoinValiditySection;
