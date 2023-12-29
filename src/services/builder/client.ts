import { OrderItemResp, OrderItem, AccountInfoResp, AccountInfo } from '@/interface/services/client';
import BigNumber from 'bignumber.js';
import formatter from '@/utils/amount';
import { BuyDataBuilder } from '@/modules/Buy/Buy.types';

const builderOrderList = async (orders: OrderItemResp[], isOwner: boolean): Promise<OrderItem[]> => {
  return orders.map(order => {
    // setup cost
    const setupCostFormatted = formatter.shorterAmount({
      originalAmount: new BigNumber(order.setupCost || 0).toNumber(),
      decimals: 18,
    });

    // service fee
    const serviceFeeFormatted = formatter.shorterAmount({
      originalAmount: new BigNumber(order.serviceFee || 0).toNumber(),
      decimals: 18,
    });

    // topup amount
    const needToTopupBalanceBignumber = new BigNumber(order.needToTopupBalance || 0);
    const isNeedTopup = needToTopupBalanceBignumber.gt(0);
    const needToTopupBalanceFormatted = formatter.formatAmount({
      originalAmount: needToTopupBalanceBignumber.toNumber(),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    });

    // earned reward
    const rewardBignumber = new BigNumber(order.reward || 0);
    const rewardFormatted = formatter.shorterAmount({
      originalAmount: rewardBignumber.toNumber(),
      decimals: 18,
    });

    // rollup cost
    const rollupCostFormatted = formatter.shorterAmount({
      originalAmount: new BigNumber(order.rollupCost || 0).toNumber(),
      decimals: 18,
    });

    return {
      ...order,
      setupCostFormatted,
      serviceFeeFormatted,
      needToTopupBalanceFormatted,
      isNeedTopup,
      rewardFormatted,
      rollupCostFormatted,
      isOwner,
    };
  });
};

const builderAccountInfo = async (account: AccountInfoResp): Promise<AccountInfo> => {
  const balanceFormatted = formatter.shorterAmount({
    originalAmount: new BigNumber(account.balance || 0).toNumber(),
    decimals: 18,
  });

  const withdrawableBalanceBignumber = new BigNumber(account.withdrawableBalance || 0);
  const needToTopupBalanceBignumber = new BigNumber(account.needToTopupBalance || 0);

  const withdrawableBalanceFormatted = formatter.formatAmount({
    originalAmount: withdrawableBalanceBignumber.toNumber(),
    decimals: 18,
    isCeil: false,
    maxDigits: 6,
  });

  const needToTopupBalanceFormatted = formatter.formatAmount({
    originalAmount: needToTopupBalanceBignumber.toNumber(),
    decimals: 18,
    maxDigits: 2,
    isCeil: true,
  });

  const isWithdrawable = withdrawableBalanceBignumber.gt(0);
  const isNeedTopup = needToTopupBalanceBignumber.gt(0);

  return {
    ...account,
    balanceFormatted,
    withdrawableBalanceFormatted,
    isWithdrawable,
    needToTopupBalanceFormatted,
    isNeedTopup,
  };
};

const builderBuyAdapterInfo = async (data: BuyDataBuilder): Promise<BuyDataBuilder> => {
  let result = {} as any;
  for (const [key, value] of Object.entries(data)) {
    const newList = value.map(v => ({
      ...v,
      priceStr: v.price
        ? formatter.formatAmount({
            originalAmount: new BigNumber(v.price || 0).toNumber(),
            decimals: 18,
            isCeil: false,
            maxDigits: 6,
          })
        : undefined,
    }));
    result[key] = [...newList];
  }
  return result;
};

export { builderOrderList, builderAccountInfo, builderBuyAdapterInfo };
