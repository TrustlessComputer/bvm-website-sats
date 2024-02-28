import * as S from './ServiceItem.styled';
import Text from '@/components/Text';
import { IPlugin, OrderItem, OrderStatus } from '@/interface/services/client';
import React from 'react';
import { OrderDetail } from '@/components/OrderDetail';
import useOrderMapper from '@/components/OrderDetail/useOrderMapper';
import OrderRow from '@/components/OrderDetail/Order.row';
import Button from '@/components/Button';
import client from '@/services/client';
import sleep from '@/utils/sleep';
import { useFetchUserData } from '@/state/user/hooks';
import { formatUnixDateTime, getErrorMessage } from '@/utils';
import toast from 'react-hot-toast';
import cs from 'classnames';
import addChain from '@/utils/addChain';
import { NOS_EXPLORER_URL } from '@/chains';
import { Row } from '@/components/Row';
import IconSVG from '@/components/IconSVG';
import configs from '@/configs';
import Living from '@/components/Living';
import { getTCL1Explorer } from '@/modules/Account/History/History.helper';
import { AddressZero } from '@ethersproject/constants';

type props = {
  item: OrderItem;
  isOwner: boolean;
};

const ServiceItem = (props: props) => {
  const { item, isOwner } = props;

  const [showOrderDetail, setShowOrderDetail] = React.useState(false);
  const mapper = useOrderMapper(item);
  const [loading, setLoading] = React.useState(false);
  const [adding, setAdding] = React.useState(false);
  const [orderCancelID, setOrderCancelID] = React.useState<string | undefined>(undefined);
  const fetchUserData = useFetchUserData();

  const isAddToMetamask = React.useMemo(() => {
    return (
      (item.status === OrderStatus.Started || item.status === OrderStatus.Resume) &&
      item.chainName &&
      item.explorer &&
      item.rpc &&
      item.chainId
    );
  }, [item]);

  const onCancelOrder = async () => {
    try {
      setLoading(true);
      await client.cancelOrder(item.orderId);
      await sleep(1);
      fetchUserData();
      setOrderCancelID(item.orderId);
    } catch (error) {
      const { message } = getErrorMessage(error, 'Cancel order failed');
      toast.error(message);
      // cancel error
    } finally {
      setLoading(false);
    }
  };

  const onAddChain = async () => {
    setAdding(true);
    try {
      await addChain({
        name: item.chainName,
        chainId: Number(item.chainId),
        nativeCurrency: {
          name: item.chainName,
          symbol: 'BVM',
          decimals: 18,
        },
        explorers: [
          {
            name: `${item.chainName} explorer`,
            url: item.explorer || NOS_EXPLORER_URL,
            standard: 'EIP3091',
          },
        ],
        rpc: [item.rpc || 'https://rpc.nos.dev'],
      } as any);
    } catch (e) {
      // todo handle error
    } finally {
      setAdding(false);
    }
  };

  const renderPlugin = (plugin: IPlugin) => {
    return (
      <S.PluginTag
        key={plugin.name + item.orderId}
        onClick={event => {
          const link = item.isConstant ? plugin.link : `${plugin.link}/?from=tc&to=${item.chainName}`;
          event.stopPropagation();
          window.open(link, '_blank');
        }}
      >
        <S.Image src={plugin.image} />
        <Text size="14" color="button_primary">
          {plugin.name}
        </Text>
      </S.PluginTag>
    );
  };

  return (
    <>
      <S.Container
        key={item.orderId}
        onClick={event => {
          event.preventDefault();
          setShowOrderDetail(true);
        }}
      >
        <S.Content>
          {item.isNeedTopup && isOwner && (
            <S.TopupBox>
              <Text size="16" align="center">
                Please top up a minimum of {item.needToTopupBalanceFormatted + ' BVM'} to maintain access to your layer
                2 network.
              </Text>
            </S.TopupBox>
          )}
          <IconSVG maxWidth="46" src={`${configs.CDN_APP_ICON_URL}/ic-computer.svg`} className="mr-8" />
          <Text size="24" fontWeight="semibold" className="mb-8">
            {mapper.computerIndexer}
          </Text>
          <OrderRow label="Bitcoin L2 Name" value={item.chainName} isNode={true} />
          {!mapper.isLayer1 && <OrderRow label="Rollup protocol" value="Optimistic rollups" isNode={true} />}
          <OrderRow label="Data availability layer" value={mapper.dataAvailabilityLayer} isNode={true} />
          <OrderRow label="Block time" value={mapper.blockTime} isNode={true} />
          {item.finalizationPeriod && (
            <OrderRow label="Withdrawal Period" value={mapper.finalizationPeriod} isNode={true} />
          )}
          <OrderRow label="Network type" value={item.isMainnet ? 'Bitcoin Mainnet' : 'Bitcoin Testnet'} isNode={true} />
          {!!mapper.deployer && (
            <OrderRow
              label="Deployer"
              value={mapper.deployer}
              isNode={true}
              link={`${getTCL1Explorer(true)}address/${item.tcAddress || AddressZero}`}
            />
          )}
          {!!item.createAt && (
            <OrderRow
              label="Launch date"
              value={formatUnixDateTime({
                dateTime: item.createAt,
                formatPattern: 'MMMM DD, YYYY',
              })}
              isNode={true}
            />
          )}
          {!!item.reward && item.reward !== '0' && (
            <OrderRow label="Collected fees" value={item.rewardFormatted + ' BVM'} isNode={true} />
          )}
          {!!item.plugins && !!item.plugins.length && (
            <OrderRow
              label="Pre-Installed Dapps:"
              value={<S.Plugins>{item.plugins.map(renderPlugin)}</S.Plugins>}
              isNode={true}
            />
          )}
        </S.Content>
        <S.FillHeight />
        <S.Actions>
          <Row gap={22}>
            <Living color={mapper.color} />
            <div>
              <Text size="20" color={mapper.color as any} fontFamily="Sora-SemiBold">
                {mapper.status}
              </Text>
            </div>
          </Row>
          <Row gap={32} justify="flex-end">
            {item.status === OrderStatus.WaitingPayment && orderCancelID !== item.orderId && isOwner && (
              <Button
                sizes="small"
                variants="outline"
                loading={{
                  isLoading: loading,
                  color: 'button_primary',
                }}
                onClick={event => {
                  if (event.stopPropagation) event.stopPropagation();
                  onCancelOrder();
                }}
                className={cs('hover-show', loading ? 'force-show' : '')}
              >
                Cancel order
              </Button>
            )}
            {isAddToMetamask && (
              <Button
                sizes="small"
                variants="outline"
                loading={{
                  isLoading: adding,
                  color: 'button_primary',
                }}
                onClick={event => {
                  if (event.stopPropagation) event.stopPropagation();
                  onAddChain();
                }}
                className={cs('hover-show', adding ? 'force-show' : '')}
              >
                Add to Metamask
              </Button>
            )}
          </Row>
        </S.Actions>
        {!!mapper.subStatus && (
          <Text size="12" color="text_secondary">
            {mapper.subStatus}
          </Text>
        )}
      </S.Container>
      <OrderDetail show={showOrderDetail} onClose={() => setShowOrderDetail(false)} orderId={item.orderId} />
    </>
  );
};

export default ServiceItem;
