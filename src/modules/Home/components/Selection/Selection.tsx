import * as S from './styled';
import React from 'react';
import CheckBox from '@/components/Icons/CheckBox';

export enum ListType {
  My,
  All,
}

export interface NetworkType {
  isMainnet: boolean;
  isTestnet: boolean;
}

export interface SelectionProps {
  type: ListType;
  network: NetworkType;
  onChangeType: (type: ListType) => void;
  onChangeNetwork: (network: NetworkType) => void;
}

const Selection = ({ type, network, onChangeType, onChangeNetwork }: SelectionProps) => {
  return (
    <S.Container>
      {/* <S.TabItem
        size="18"
        isActive={network.isMainnet}
        onClick={() => {
          onChangeNetwork({
            isMainnet: true,
            isTestnet: false,
          });
        }}
      >
        Mainnet
      </S.TabItem> */}

      <S.ButtonNumber
        isActive={network.isMainnet}
        onClick={() => {
          onChangeNetwork({
            isMainnet: true,
            isTestnet: false,
          });
        }}
      >
        Mainnet
      </S.ButtonNumber>
      {/* 
      <S.TabItem
        size="18"
        isActive={network.isTestnet}
        onClick={() => {
          onChangeNetwork({
            isMainnet: false,
            isTestnet: true,
          });
        }}
      >
        Testnet
      </S.TabItem> */}

      <S.ButtonNumber
        isActive={network.isTestnet}
        onClick={() => {
          onChangeNetwork({
            isMainnet: false,
            isTestnet: true,
          });
        }}
      >
        Testnet
      </S.ButtonNumber>

      <CheckBox
        className="checkbox"
        checked={type === ListType.My}
        label="Show only my Computers"
        onChange={checked => {
          onChangeType(checked ? ListType.My : ListType.All);
        }}
      />
    </S.Container>
  );
};

export default Selection;
