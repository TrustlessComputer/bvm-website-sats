import BaseModal from '@/components/BaseModal';
import * as S from './styled';
import React from 'react';
import { useAppSelector } from '@/state/hooks';
import { getOrderByIDSelector } from '@/state/order/selector';
import useOrderMapper from '@/components/OrderDetail/useOrderMapper';
import OrderRow from '@/components/OrderDetail/Order.row';

interface IProps {
  show: boolean;
  onClose: () => void;
  orderId: string;
}

const OrderDetail = (props: IProps) => {
  const { show, onClose, orderId } = props;
  const order = useAppSelector(getOrderByIDSelector)(orderId);
  const isHasValue = (value: string) => {
    return value && value !== '0';
  };

  if (!order) return <></>;

  const mapper = useOrderMapper(order);

  return (
    <BaseModal show={show} handleClose={onClose} title={mapper.computerIndexer} width={700}>
      <S.Container>
        <OrderRow label="Computer name" value={order.chainName} />
        {!mapper.isLayer1 && <OrderRow label="Rollup protocol" value="Optimistic rollups" />}
        {!!isHasValue(order.blockTime) && <OrderRow label="Block time" value={mapper.blockTime} />}
        {!!isHasValue(order.finalizationPeriod) && (
          <OrderRow label="Withdrawal Period" value={mapper.finalizationPeriod} />
        )}
        <OrderRow label="Network type" value={order.isMainnet ? 'Bitcoin Mainnet' : 'Bitcoin Testnet'} />
        <S.HorizontalLine />
        {!!order.rpc && mapper.isShowLink && <OrderRow label="RPC URL" value={order.rpc} link={order.rpc} />}
        <OrderRow label="Chain ID" value={order.chainId} />
        {!!order.explorer && mapper.isShowLink && (
          <OrderRow label="Block explorer URL" value={order.explorer} link={order.explorer} />
        )}
        {!!order.monitorLink && mapper.isShowLink && (
          <OrderRow label="Monitor URL" value={order.monitorLink} link={order.monitorLink} />
        )}
        {!!isHasValue(order.reward) && <OrderRow label="Collected fees" value={order.rewardFormatted + ' BVM'} />}
        {!!isHasValue(order.nextBillingAt) && order.isMainnet && (
          <OrderRow label="Next billing at" value={mapper.nextBillingFormatted} />
        )}
        {!!order.l2BridgeContract && order.isMainnet && (
          <OrderRow
            label="L2 bridge contract"
            value={order.l2BridgeContract}
            link={`${order.explorer}/address/${order.l2BridgeContract}`}
          />
        )}
        {!!order.l2PortalContract && order.isMainnet && (
          <OrderRow
            label="L2 portal contract"
            value={order.l2PortalContract}
            link={`${order.explorer}/address/${order.l2PortalContract}`}
          />
        )}
        {order.isOwner && (
          <>
            <S.HorizontalLine />
            <OrderRow label="Setup cost" value={order.setupCostFormatted + ' BVM'} subLabel="(one time)" />
            <OrderRow label="Operation cost" value={order.serviceFeeFormatted + ' BVM'} subLabel="(monthly)" />
            {isHasValue(order.rollupCost) && (
              <OrderRow label="Rollup cost" value={order.rollupCostFormatted + ' BVM'} subLabel="(monthly - est)" />
            )}
            <OrderRow label="Order ID" value={order.orderId} />
          </>
        )}
        <OrderRow label="Status" color={mapper.color as any} value={mapper.status} />
      </S.Container>
    </BaseModal>
  );
};

export default OrderDetail;
