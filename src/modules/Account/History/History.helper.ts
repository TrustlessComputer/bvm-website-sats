import BigNumber from 'bignumber.js';
import { HistoryType, InstanceInfoType } from './History.types';
import { NOS_EXPLORER_URL } from '@/chains';

export const getTCL1Explorer = (isMainnet: boolean) => {
  return isMainnet ? 'https://explorer.trustless.computer/' : 'https://explorer.regtest.trustless.computer/';
};

export const formatAmount = (amount: string) => {
  if (!amount) return '--';
  return new BigNumber(amount).dividedBy(1e18).decimalPlaces(6).toFixed();
};

export const formatAddress = (amount: string) => {
  if (!amount) return '--';
  return new BigNumber(amount).dividedBy(1e18).decimalPlaces(6).toFixed();
};

export const getExplorer = (type: HistoryType, instanceInfo: InstanceInfoType) => {
  let explorer;

  switch (type) {
    // 5 => User L2
    case HistoryType.HistoryType_RequestWithdrawReward:
      {
        if (instanceInfo && instanceInfo.domain) {
          explorer = 'https://' + instanceInfo.domain + '.tc.l2aas.com/';
        } else {
          explorer = undefined;
        }
      }
      break;

    // 6,7,8 ==> L1
    case HistoryType.HistoryType_ProveWithdrawReward:
    case HistoryType.HistoryType_FinalizeWithdrawReward:
    case HistoryType.HistoryType_TransferL1RewardToUserAddress:
      {
        if (instanceInfo) {
          explorer = getTCL1Explorer(instanceInfo.isMainnet);
        } else {
          explorer = undefined;
        }
      }
      break;

    // DEFAULT ==> NOS L2
    default:
      explorer = NOS_EXPLORER_URL;
      break;
  }
  return explorer;
};
