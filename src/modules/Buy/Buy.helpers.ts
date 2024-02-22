import client from '@/services/client';
import { BuyBuilderSelectState } from './Buy.types';
import { DALayerEnum, NetworkEnum, PluginEnum, RollupEnum } from './Buy.constanst';
import { GAS_LITMIT, MIN_GAS_PRICE } from '../Account/Order/FormOrder.constants';
import { PriceType, PriceTypeList } from '../Price/constants';

export const getChainIDRandom = async () => {
  let chainID = Math.floor(Math.random() * 90000) + 10000; //random from 10000 -> 999999
  const isValid = await client.validateChainIdAPI(String(chainID));
  if (isValid) {
    return chainID;
  } else {
    getChainIDRandom();
  }

  return chainID;
};

export const convertDayToHours = (day: number) => {
  if (!day || day === 0) return 1; // 1hour === MIN
  return day * 24; //hours
};

export const convertDayToSeconds = (day: number) => {
  if (!day || day === 0) return 60 * 60; //1hour === 3600s
  return day * 24 * 60 * 60; //second
};

export const convertHoursToSeconds = (hours: number) => {
  if (!hours || hours === 0) return 0;
  return hours * 60 * 60; //second
};

export const dayDescribe = (day: number) => {
  let str;
  let timer;
  if (day === 0) {
    str = '1 hour (minimum hour)';
    timer = '1 hour';
  } else {
    const fullDay = Math.ceil(day * 24);
    const n = Math.floor(fullDay / 24);
    const hours = fullDay % 24;

    const dayStr = n < 1 ? '' : n === 1 ? `${n} day` : `${n} days`;
    const hoursStr = hours < 1 ? '' : hours === 1 ? `${hours} hour` : `${hours} hours`;

    if (hours === 0) {
      str = `${dayStr}`;
      timer = `${dayStr}`;
    } else {
      str = `${day} days = ${dayStr} ${hoursStr}`;
      timer = `${dayStr} ${hoursStr}`;
    }
  }
  return {
    str,
    timer,
  };
};

export const getBuyBuilderStateInit = (type?: string | null): BuyBuilderSelectState | any => {
  const dataInit: BuyBuilderSelectState = {
    network: NetworkEnum.Network_Testnet,
    blockTime: 10,
    dataAvaibilityChain: DALayerEnum.DALayer_BTC,
    pluginIds: [PluginEnum.Plugin_Bridge], //HARD CODE: Force Bridge select
    rollupProtocol: RollupEnum.Rollup_OpStack,
    withdrawPeriod: 7,
    chainName: '',
    minGasPrice: `${MIN_GAS_PRICE}`,
    gasLimit: `${GAS_LITMIT}`,
  };

  if (type === undefined || type === null) return dataInit;

  const typeCatch = Number(type) as PriceType;

  if (!PriceTypeList.includes(typeCatch)) return dataInit;

  switch (typeCatch) {
    case PriceType.FREE:
      return dataInit; // Default
    case PriceType.ESSENTIALS:
      return {
        ...dataInit,
        network: NetworkEnum.Network_Mainnet,
        dataAvaibilityChain: DALayerEnum.DALayer_PLG,
        blockTime: 10,
      };
    case PriceType.PROFESSIONAL:
      return {
        ...dataInit,
        network: NetworkEnum.Network_Mainnet,
        dataAvaibilityChain: DALayerEnum.DALayer_BTC,
        blockTime: 10,
      };
    case PriceType.ENTERPRISE:
      return dataInit; // TO DO
  }
};

export const getRandonComputerName = (isMainnet: boolean) => {
  const prefix = 'Bitcoin L2';
  const suffix = isMainnet ? '' : '(Testnet)';
  const randomNumber = Math.floor(Math.random() * 9000) + 1000; //random from 100 -> 999
  return `${prefix}-${randomNumber}${suffix ? `-${suffix}` : ''}`;
};
