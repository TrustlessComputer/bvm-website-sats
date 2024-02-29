import { useWeb3React } from '@web3-react/core';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { isAuthenticatedSelector } from '@/state/user/selector';
import { batch } from 'react-redux';
import { fetchAllOrders, fetchOrderList } from '@/state/order/actions';
import { fetchAccountInfo, getQuickStart } from '@/state/user/actions';
import { STORAGE_KEYS } from '@/constants/storage-key';
import { axiosSetAccessToken } from '@/services/client';
import { useMemo } from 'react';

const useIsAuthenticated = () => {
  // const { account } = useWeb3React();
  // const isAuthenticated = useAppSelector(isAuthenticatedSelector)(account);

  const apiAccessToken = parent.localStorage.getItem(STORAGE_KEYS.API_ACCESS_TOKEN);

  console.log('PHAT useIsAuthenticated ---- apiAccessToken ', apiAccessToken);
  const isAuthenticated = !!apiAccessToken;
  console.log('PHAT isAuthenticated ----  ', isAuthenticated);

  if (isAuthenticated) {
    axiosSetAccessToken(apiAccessToken);
  }
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
