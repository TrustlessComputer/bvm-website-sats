import React from 'react';
import { NetworkEnum, PluginTypeEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Segment from '../components/Segment';
import Title from '../components/Title';
import { useBuy } from '../providers/Buy.hook';
import * as S from '../styled';

const PreInstalledDappsSection = () => {
  const { availableListData, isMainnet, preInstallDAppSelected, setPreInstallDAppSelected } = useBuy();
  if (!availableListData || !availableListData.plugin) return <></>;

  const dataList: ItemDetail[] = isMainnet
    ? availableListData.plugin[NetworkEnum.Network_Mainnet]
    : availableListData.plugin[NetworkEnum.Network_Testnet];

  return (
    <S.Section>
      <Title text={'Pre-Installed Dapps (coming soon)'} />
      <S.ListItemContainer>
        {dataList.map((item, index) => {
          return (
            <React.Fragment key={`${item.valueStr} ${index}`}>
              <Segment
                item={item}
                isMainnet={isMainnet}
                indexSelected={preInstallDAppSelected[0]}
                pluinType={item.pluginType}
                disabled={item.pluginType !== PluginTypeEnum.PluginType_Bridge}
                onClick={item => {
                  if (!preInstallDAppSelected.includes(item.pluginType!)) {
                    setPreInstallDAppSelected([...preInstallDAppSelected, item.pluginType!]);
                  }
                }}
              />
            </React.Fragment>
          );
        })}
      </S.ListItemContainer>
    </S.Section>
  );
};

export default PreInstalledDappsSection;
