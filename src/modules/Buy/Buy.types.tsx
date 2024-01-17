import { DALayerEnum, IntervalChargeTimeEnum, NetworkEnum, PluginEnum, RollupEnum } from './Buy.constanst';
import React from 'react';

//Data Strcuture API
export type BuyDataBuilder = {
  network: ItemDetail[];
  dataAvaibilityChain: ItemDetail[];
  rollupProtocol: ItemDetail[];
  blockTime: ItemDetail[];
  plugin: ItemDetail[];
  nativeTokenPayingGas: ItemDetail[];
  gasLimit: ItemDetail[];
};

export type ItemDetail = {
  value: number;
  valueStr: string;

  price: string;
  priceNote?: string;

  intervalChargeTime: IntervalChargeTimeEnum;
  pluginType?: number;
};

export type BuyBuilderSelectState = {
  chainName: string;
  network: NetworkEnum;
  rollupProtocol: RollupEnum;
  dataAvaibilityChain: DALayerEnum;
  blockTime: number;
  pluginIds: number[];
  withdrawPeriod: number;
  minGasPrice: string;
  gasLimit: string;
  // layer1: Layer1Enum;
};

export type SectionProps = {
  title?: string;
  desc?: string;
  sectionType: string;
  valueDisabled?: number;
  data?: any;
  descriptionDetail?: {
    title: string;
    content: React.ReactNode | null;
  };
};

export type SectionType = keyof BuyDataBuilder;
