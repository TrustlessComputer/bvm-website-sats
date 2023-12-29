import { useWeb3React } from '@web3-react/core';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { isAuthenticatedSelector } from '@/state/user/selector';
import { batch } from 'react-redux';
import { fetchAllOrders, fetchOrderList } from '@/state/order/actions';
import { fetchAccountInfo, getQuickStart } from '@/state/user/actions';

const useIsAuthenticated = () => {
  const { account } = useWeb3React();
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)(account);
  return isAuthenticated;
};

const useFetchUserData = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useIsAuthenticated();

  const fetchData = () => {
    if (!isAuthenticated) {
      dispatch(fetchAllOrders());
      return;
    }
    batch(() => {
      dispatch(fetchOrderList());
      dispatch(fetchAllOrders());
      dispatch(fetchAccountInfo());
      dispatch(getQuickStart());
    });
  };

  return fetchData;
};

export { useIsAuthenticated, useFetchUserData };
