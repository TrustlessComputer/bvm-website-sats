import { OrderItem, OrderStatus } from '@/interface/services/client';
import React from 'react';
import { formatUnixDateTime } from '@/utils';
import configs from '@/configs';
import { DALayerEnumMap } from '@/modules/Buy/Buy.constanst';

const useOrderMapper = (order: OrderItem) => {
  const convertSecondsToHours = () => {
    const seconds = Number(order.finalizationPeriod || 0);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    let result = '';
    if (days !== 0) {
      const suffix = days > 1 ? 's ' : ' ';
      result = `${days} day${suffix} `;
    }
    if (hours !== 0) {
      const suffix = hours > 1 ? 's' : '';
      result = `${result}${hours} hour${suffix}`;
    } else {
      result = `${result}`;
    }
    return result;
  };

  const convertSecondsToMinutes = () => {
    const seconds = Number(order.blockTime || 0);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    let result = '';
    if (minutes !== 0) {
      result = `${minutes} minutes `;
    }
    if (remainingSeconds !== 0) {
      result = `${result}${remainingSeconds} seconds`;
    } else {
      result = `${result}`;
    }
    return result;
  };

  const Color = {
    Success: 'positive',
    Warning: 'warning',
    Failed: 'negative',
  };

  return React.useMemo(() => {
    let status = '';
    let subStatus = '';
    let color;
    const finalizationPeriod = convertSecondsToHours();
    const nextBillingFormatted = formatUnixDateTime({
      dateTime: order.nextBillingAt || 0,
    });

    switch (order.status) {
      case OrderStatus.Rejected:
        status = 'Failed';
        color = Color.Failed;
        break;
      case OrderStatus.WaitingPayment:
        status = 'Waiting for payment';
        color = Color.Warning;
        break;
      case OrderStatus.Processing:
        status = 'Setting up';
        color = Color.Warning;
        subStatus = `(${
          order.isMainnet ? 'This process can take up to 12 hours' : 'This process can take up to 20 minutes'
        })`;
        break;
      case OrderStatus.Started:
        status = 'Healthy';
        color = Color.Success;
        break;
      case OrderStatus.Resume:
        status = 'Please wait for service to resume';
        color = Color.Success;
        break;
      case OrderStatus.InsufficientBalance:
        status = `Must top up to your account`;
        color = Color.Failed;
        break;
      case OrderStatus.Ended:
        status = 'Ended';
        color = Color.Failed;
        break;
      case OrderStatus.Canceled:
        status = 'Canceled';
        color = Color.Warning;
        break;
    }

    const dataAvailabilityLayer = (DALayerEnumMap as any)[order.dataAvaibilityChain];

    let computerIndexer = '';
    if (order.isConstant) {
      computerIndexer = `${configs.APP_NAME} #${order.index}`;
    } else if (order.index !== 0) {
      computerIndexer = `${configs.APP_NAME} #${order.index}`;
    }

    const deployer = order.userName || (order.tcAddress ? order.tcAddress.slice(0, 6) : '');

    return {
      status,
      color,
      finalizationPeriod, // in hours
      nextBillingFormatted,
      blockTime: convertSecondsToMinutes(),
      dataAvailabilityLayer,
      computerIndexer,
      isShowLink: order.status === OrderStatus.Started,
      subStatus,
      deployer,
      isLayer1:
        configs.CHAIN_ID.TRUSTLESS_COMPUTER === Number(order?.chainId) ||
        configs.CHAIN_ID.TRUSTLESS_COMPUTER_TEST === Number(order?.chainId),
    };
  }, [order]);
};

export default useOrderMapper;
