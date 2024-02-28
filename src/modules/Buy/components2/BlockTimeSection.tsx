import { DALayerEnum, NetworkEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';

const BlockTimeSection = () => {
  const { availableListData, isMainnet, blockTimeSelected, setBlockTimeSelected, dataValiditySelected } =
    useBuyProvider();

  const blockTime = availableListData?.blockTime;
  if (!blockTime) return <></>;

  const dataWithNetwork = isMainnet ? blockTime[NetworkEnum.Network_Mainnet] : blockTime[NetworkEnum.Network_Testnet];
  const DAValue = dataValiditySelected?.value || DALayerEnum.DALayer_BTC;

  const blockTimeList = dataWithNetwork[DAValue];

  return (
    <Section
      title={'Block Time'}
      description={'How fast do you want your Bitcoin L2 to go?'}
      descriptionDetail={{
        title: 'Block Time',
        content: (
          <p>
            There are three types of block time options:
            <br />
            <br />
            <span>• 2 seconds:</span> this block time is perfectly suited for use cases like gaming.
            <br />
            <p className="mt-12">
              <span>• 5 seconds:</span> for use cases requiring slightly less extreme speed, this option is suitable.
            </p>
            <p className="mt-12">
              <span>• 10 seconds:</span> the most cost-effective rollup solution when speed is not a priority aligned
              with your preferences.
            </p>
          </p>
        ),
      }}
    >
      <S.ListItemContainer>
        {blockTimeList?.map((item, index) => {
          return (
            <Item
              key={`${item.valueStr} ${index}`}
              isMainnet={isMainnet}
              item={item}
              value={item.value}
              isSelected={item.value === blockTimeSelected?.value}
              title={item.valueStr}
              content={item.price}
              priceNote={item.priceNote}
              onClickCallback={value => {}}
              onClickCB={item => {
                setBlockTimeSelected(item!);
              }}
            />
          );
        })}
      </S.ListItemContainer>
    </Section>
  );
};

export default BlockTimeSection;
