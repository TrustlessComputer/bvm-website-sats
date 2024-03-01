import { NetworkEnum, RollupEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuy } from '../providers/Buy.hook';
import * as S from '../styled';

const RollupProtocolSection = () => {
  const { availableListData, isMainnet, rollupProtocolSelected, setRollupProtocolSelected } = useBuy();

  const dataWithNetwork = availableListData?.rollupProtocol;

  if (!dataWithNetwork) return <></>;

  const dataList: ItemDetail[] = isMainnet
    ? dataWithNetwork[NetworkEnum.Network_Mainnet]
    : dataWithNetwork[NetworkEnum.Network_Testnet];

  return (
    <Section
      title={'Rollup Protocol'}
      description={'Which rollup protocol is right for you?'}
      descriptionDetail={{
        title: 'Rollup Protocol',
        content: (
          <p>
            You can choose from two types of rollups with different security models:
            <br />
            <br />
            <span>• Optimistic rollups:</span> assumes transactions are valid by default and only runs computation, via
            a fraud proof, in the event of a challenge.
            <br />
            <p className="mt-12">
              <span>• Zero-knowledge rollups:</span> runs computation off-chain and submits a validity proof to the
              chain.
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
              isSelected={item.value === rollupProtocolSelected}
              disabled={item.value === RollupEnum.Rollup_ZK}
              title={item.valueStr}
              content={item.price}
              priceNote={item.priceNote}
              onClickCallback={value => {}}
              onClickCB={item => {
                setRollupProtocolSelected(item.value!);
              }}
            />
          );
        })}
      </S.ListItemContainer>
    </Section>
  );
};

export default RollupProtocolSection;
