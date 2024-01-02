import React from 'react';
import * as S from './ServiceList.styled';

import ServiceItem from '../ServiceItem/ServiceItem';
// import ServiceItem from '../ServiceItem_BACKUP/ServiceItem';

import { useAppSelector } from '@/state/hooks';
import { allOrdersSelector, getOrderSelector, orderListSelector } from '@/state/order/selector';
import Text from '@/components/Text';
import { Spinner } from '@/components/Spinner';
import Empty from '@/components/Empty';
import AccountInfoPC from '@/pages/layout/AccountInfo/AccountInfo.pc';
import HeaderRow from '@/modules/Home/components/HeaderRow';
import { ListType, NetworkType } from '@/modules/Home/components/Selection/Selection';
import { OrderItem } from '@/interface/services/client';
import storageDashboard from '@/storage/storage.dashboard';
import { useSearchParams } from 'react-router-dom';
import { SideBar } from './ServiceList.styled';
import QuickStart from '@/components/QuickStart';

const ServiceList = () => {
  const myOrders = useAppSelector(orderListSelector);
  const allOrders = useAppSelector(allOrdersSelector);
  const [searchParams, setSearchParams] = useSearchParams();

  const { isFetching, isFetched, isFetchingAllOrders, isFetchedAllOrders } = useAppSelector(getOrderSelector);
  const [type, setType] = React.useState<ListType>(ListType.All);
  const [network, setNetwork] = React.useState<NetworkType>({
    isMainnet: true,
    isTestnet: false,
  });

  const serviceDataList = React.useMemo(() => {
    const filterByNetwork = (orders: OrderItem[]) => {
      if (network.isTestnet && network.isMainnet) return orders;
      if (network.isTestnet) return orders.filter(order => !order.isMainnet);
      if (network.isMainnet) return orders.filter(order => order.isMainnet);
      return [];
    };
    if (type === ListType.My) {
      return filterByNetwork(myOrders);
    } else if (type === ListType.All) {
      return filterByNetwork(allOrders);
    }
    return [];
  }, [myOrders, allOrders, type, network]);

  const renderItem = (item: any, index: number) => {
    return <ServiceItem key={`${index}`} item={item} isOwner={true} />;
  };

  const renderContent = () => {
    if ((isFetching && !isFetched) || (isFetchingAllOrders && !isFetchedAllOrders)) {
      return (
        <S.UnKnowContent>
          <Spinner size={42} />
        </S.UnKnowContent>
      );
    } else if (serviceDataList.length === 0) {
      return (
        <S.UnKnowContent>
          <Text size="32" fontWeight="semibold">
            No computers available
          </Text>
          <Empty />
        </S.UnKnowContent>
      );
    }

    return <S.GridView>{serviceDataList.map((item, index) => renderItem(item, index))}</S.GridView>;
  };

  const onChangeType = (type: ListType) => {
    setType(type);
    storageDashboard.setIsShowOnlyMyPC(type === ListType.My);
    setSearchParams(`isMainnet=${network.isMainnet}&myPC=${type === ListType.My}`);
  };

  const onChangeNetwork = (network: NetworkType) => {
    setNetwork(network);
    setSearchParams(`isMainnet=${network.isMainnet}&myPC=${type === ListType.My}`);
  };

  React.useEffect(() => {
    const isMainnet = searchParams.get('isMainnet');
    const myPC = searchParams.get('myPC');
    if (isMainnet !== undefined && myPC !== undefined && isMainnet !== null && myPC !== null) {
      const isShowOnlyMyPC = myPC === 'true';
      setType(isShowOnlyMyPC ? ListType.My : ListType.All);
      setNetwork({
        isMainnet: isMainnet === 'true',
        isTestnet: isMainnet === 'false',
      });
      setSearchParams(`isMainnet=${!!isMainnet}&myPC=${!!myPC}`);
    } else {
      const isShowOnlyMyPC = storageDashboard.getIsShowOnlyMyPC();
      setType(isShowOnlyMyPC ? ListType.My : ListType.All);
      setSearchParams(`isMainnet=${network.isMainnet}&myPC=${isShowOnlyMyPC}`);
    }
  }, []);

  return (
    <S.Container className="maxWidth">
      <S.ContentBox>
        <S.Content>
          <HeaderRow type={type} network={network} onChangeType={onChangeType} onChangeNetwork={onChangeNetwork} />
          {renderContent()}
        </S.Content>
      </S.ContentBox>
      {/* <S.SideBar>
        <AccountInfoPC />
      </S.SideBar> */}
    </S.Container>
  );
};

export default React.memo(ServiceList);
