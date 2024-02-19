import { ModalsContext } from '@/contexts/modals.context';
import { WalletContext } from '@/contexts/wallet.context';
import useRouteHelper from '@/hooks/useRouterHelper';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { useFetchUserData, useIsAuthenticated } from '@/state/user/hooks';
import { userGamefiByAddressSelector } from '@/state/user/selector';
import { useWeb3React } from '@web3-react/core';
import React, { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

// Buy Context
export type IBuyContext = {};

export const BuyContext = createContext<IBuyContext>({});

export const BuyProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const dispatch = useAppDispatch();
  // const { onSuccess } = props;
  const { goDashboardPage } = useRouteHelper();
  const isAuthenticated = useIsAuthenticated();
  const { onConnect } = useContext(WalletContext);
  const { account } = useWeb3React();
  const userGamefi = useAppSelector(userGamefiByAddressSelector)(account);
  const onFetchData = useFetchUserData();
  const { search } = useLocation();
  const { toggleContact } = useContext(ModalsContext);

  const values = useMemo(() => {
    return {};
  }, []);

  return <BuyContext.Provider value={values}>{children}</BuyContext.Provider>;
};
