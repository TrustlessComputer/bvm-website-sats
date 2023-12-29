import { RootState } from '@/state';
import { createSelector } from '@reduxjs/toolkit';
import { OrderState } from './types';
import { OrderItem } from '@/interface/services/client';
import BigNumber from 'bignumber.js';
import formatter from '@/utils/amount';

const getOrderSelector = (state: RootState): OrderState => state.order;

const orderListSelector = createSelector(getOrderSelector, reducer => reducer.orderList || []);
const orderSelectedSelector = createSelector(getOrderSelector, reducer => reducer.orderSelected);

const allOrdersSelector = createSelector(getOrderSelector, reducer => reducer.allOrders || []);

const withdrawableRewardSelector = createSelector(orderListSelector, orders => {
  const amount = orders.reduce((prev: BigNumber, curr: OrderItem) => {
    if (curr.isWithdrawableReward) {
      return prev.plus(curr.reward || 0);
    }
    return prev;
  }, new BigNumber(0));

  const amountFormatted = formatter.shorterAmount({
    originalAmount: amount.toNumber(),
    decimals: 18,
  });

  const isWithdrawableReward = amount.gt(0);

  return {
    amount: amount.toFixed(),
    formatted: amountFormatted,
    isWithdrawableReward,
  };
});

const getOrderByIDSelector = createSelector(getOrderSelector, orders => (orderId: string) => {
  const { orderList, allOrders } = orders;
  return orderList.find(order => order.orderId === orderId) || allOrders.find(order => order.orderId === orderId);
});

export {
  getOrderSelector,
  orderListSelector,
  orderSelectedSelector,
  withdrawableRewardSelector,
  getOrderByIDSelector,
  allOrdersSelector,
};
