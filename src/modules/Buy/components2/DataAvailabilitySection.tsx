import { DALayerEnum, NetworkEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuy } from '../providers/Buy.hook';
import * as S from '../styled';

const DataAvailabilitySection = () => {
  const { availableListData, isMainnet, dataValiditySelected, setDataValiditySelected } = useBuy();

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
          const isBitCoinSyscoin = item.value === DALayerEnum.DALayer_SYSCOIN;
          return (
            <Item
              key={`${item.valueStr} ${index}`}
              isMainnet={isMainnet}
              item={item}
              value={item.value}
              isSelected={item.value === dataValiditySelected}
              title={item.valueStr}
              content={item.price}
              priceNote={item.priceNote}
              onClickCallback={value => {}}
              onClickCB={item => {
                setDataValiditySelected(item.value!);
              }}
              infor={
                isBitCoinSyscoin
                  ? "Your rollup will use Syscoin's DA protocol called BitcoinDA, which secures your rollup with Bitcoin's network through merged mining while supplementing with an additive decentralized finality. Syscoin's solution intersects Bitcoin yet is scalable and cost-effective"
                  : undefined
              }
            />
          );
        })}
      </S.ListItemContainer>
    </Section>
  );
};

export default DataAvailabilitySection;
