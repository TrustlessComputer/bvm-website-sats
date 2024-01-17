import { EnvironmentsEnum } from '@/interface/services/client';

export const FinalizationPeriodConfig = {
  dayDefault: 7, // 7 day,
  maxDay: 22,
  maxHours: 24,
};

export const CHAIN_ID_MAX_LENGTH = 10;

export const CHAIN_NAME_MAX_LENGTH = 30;

export const MIN_BLOCK_TIME = 2; //2 seconds (x)

export const MIN_GAS_PRICE = 1; // 1 gweis
export const GAS_LITMIT = 30000000; //

export const EVNS_LIST = [EnvironmentsEnum.Mainnet, EnvironmentsEnum.Testnet];

export const EVNS_LIST_MAP = {
  [EnvironmentsEnum.Mainnet]: 'Bitcoin Virtual Machine (mainnet)',
  [EnvironmentsEnum.Testnet]: 'Bitcoin Virtual Machine (testnet)',
};

export const SUB_DOMAIN_MAP = {
  [EnvironmentsEnum.Mainnet]: '.l2aas.trustless.computer',
  [EnvironmentsEnum.Testnet]: '.l2aas.trustless.computer', //-test.l2aas.trustless.computer (old)
};

export const FinalizationPeriod = {
  days: Array.from({ length: FinalizationPeriodConfig.maxDay }, (_, i) => i),
  hours: Array.from({ length: FinalizationPeriodConfig.maxHours }, (_, i) => i),
};

export enum ServiceTypeEnum {
  DEFAULT = 1,
}

export const FormFields = {
  serviceType: 'serviceType',
  domain: 'domain',
  chainId: 'chainId',
  chainName: 'chainName',
  description: 'description',
  finalizationPeriod: 'finalizationPeriod',
  minGasPrice: 'minGasPrice',
  dataAvaibilityChain: 'dataAvaibilityChain',
  blockTime: 'blockTime',
};

export type IFormValue = {
  serviceType: number;
  domain: string;
  chainName: string;
  description: string;
  blockTime: string;
  finalizationPeriod: string;
  minGasPrice: string;
  dataAvaibilityChain: string;
};
