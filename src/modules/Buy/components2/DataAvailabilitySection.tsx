import { NetworkEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';

const DataAvailabilitySection = () => {
  const { availableListData, isMainnet, dataValiditySelected, setDataValiditySelected } = useBuyProvider();

  const dataWithNetwork = availableListData?.dataAvaibilityChain;

  if (!dataWithNetwork) return <></>;

  const dataList: ItemDetail[] = isMainnet
    ? dataWithNetwork[NetworkEnum.Network_Mainnet]
    : dataWithNetwork[NetworkEnum.Network_Testnet];

  return (
    <Section
      title={'Data Availability'}
      description={'Which data availability layer is right for you?'}
      descriptionDetail={{
        title: 'Data Availability',
        content: (
          <p>
            Initially, there are two types of data availability options:
            <br />
            <br />
            <span>• Bitcoin + Polygon:</span> the data is written to the Polygon network. This is a pragmatic and hybrid
            approach, where data availability is on Polygon, and data validation is on Bitcoin.
            <br />
            <p className="mt-12">
              <span>• Bitcoin:</span> thanks to the Taproot-type transaction, it is now possible to embed any data into
              a Bitcoin Blockchain, which will be permanently stored on the Bitcoin network and inherit its features,
              such as availability, immutability, and determinism.
            </p>
          </p>
        ),
      }}
    >
      <S.ListItemContainer>
        {dataList?.map((item, index) => {
          return (
            <Item
              key={`${item.valueStr} ${index}`}
              isMainnet={isMainnet}
              item={item}
              value={item.value}
              isSelected={item.value === dataValiditySelected?.value}
              title={item.valueStr}
              content={item.price}
              priceNote={item.priceNote}
              onClickCallback={value => {}}
              onClickCB={item => {
                setDataValiditySelected(item!);
              }}
            />
          );
        })}
      </S.ListItemContainer>
    </Section>
  );
};

export default DataAvailabilitySection;
