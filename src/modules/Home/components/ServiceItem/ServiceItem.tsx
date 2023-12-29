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

  // const renderPlugin = (plugin: IPlugin) => {
  //   return (
  //     <S.PluginTag
  //       key={plugin.name + item.orderId}
  //       onClick={event => {
  //         const link = item.isConstant ? plugin.link : `${plugin.link}/?from=tc&to=${item.chainName}`;
  //         event.stopPropagation();
  //         window.open(link, '_blank');
  //       }}
  //     >
  //       <S.Image src={plugin.image} />
  //       <Text size="14" color="button_primary">
  //         {plugin.name}
  //       </Text>
  //     </S.PluginTag>
  //   );
  // };

  return (
    <>
      <S.Container
        key={item.orderId}
        onClick={event => {
          event.preventDefault();
          setShowOrderDetail(true);
        }}
      >
        <S.Header>
          <div className="leftView">
            <IconSVG maxWidth="46" src={`/assets/storage_ic.svg`} className="mr-8" />
            <Text size="24" fontWeight="semibold" className="mb-8">
              {mapper.computerIndexer}
            </Text>
          </div>
          <div className="rightView">
            <IconSVG maxWidth="46" src={`/assets/bridge_ic.svg`} className="mr-8" />
            <div className="groupDapps">
              <Text size="13" fontWeight="regular">
                {'Pre-Installed Dapps'}
              </Text>
              <Text size="16" fontWeight="semibold">
                {'Trustless Bridge'}
              </Text>
            </div>
          </div>
        </S.Header>
        <S.Divider />
        <S.Body></S.Body>
        <S.Footer></S.Footer>
      </S.Container>
      <OrderDetail show={showOrderDetail} onClose={() => setShowOrderDetail(false)} orderId={item.orderId} />
    </>
  );
};

export default ServiceItem;
