import { NetworkEnum } from '../Buy.constanst';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuy } from '../providers/Buy.hook';
import * as S from '../styled';

const NetworkSection = () => {
  const { availableListData, isMainnet, networkSelected, setNetworkSelected } = useBuy();

  const dataList = availableListData?.network;

  if (!dataList) return <></>;

  return (
    <Section
      title={'Network'}
      description={'Which network is right for you?'}
      descriptionDetail={{
        title: 'Network',
        content: <p>Select whether you want to create a testnet or deploy a mainnet. The testnet is free.</p>,
      }}
    >
      <S.ListItemContainer>
        {dataList?.map((item, index) => {
          const contentValue = item.value === NetworkEnum.Network_Mainnet ? item.price : 'Free Trial';
          return (
            <Item
              isMainnet={isMainnet}
              item={item}
              key={`${item.valueStr}-${index}`}
              value={item.value}
              isSelected={item.value === networkSelected}
              title={item.valueStr}
              content={contentValue}
              priceNote={item.priceNote}
              onClickCallback={value => {}}
              onClickCB={item => {
                setNetworkSelected(item.value);
              }}
            />
          );
        })}
      </S.ListItemContainer>
      {/* {errorMessage && hasFocused && <ErrorMessage message={errorMessage} />} */}
    </Section>
  );
};

export default NetworkSection;
