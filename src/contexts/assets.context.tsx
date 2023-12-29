import React, { PropsWithChildren, useMemo } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useWeb3React } from '@web3-react/core';
import { SupportedChainId } from '@/chains';
import formatter from '@/utils/amount';
import BigNumber from 'bignumber.js';
import { useAppDispatch } from '@/state/hooks';
import { fetchUserGamefi } from '@/state/user/actions';
import { ethers } from 'ethers';
import configs from '@/configs';
import { useFetchUserData, useIsAuthenticated } from '@/state/user/hooks';
import debounce from 'lodash/debounce';

const initBalance = {
  amount: '0',
  formatted: '0',
};

export interface IAssetsContext {
  balance: {
    amount: string;
    formatted: string;
  };
  loadedBalance: {
    [key: string]: boolean;
  };
}

const initialValue: IAssetsContext = {
  balance: { ...initBalance },
  loadedBalance: {},
};

export const AssetsContext = React.createContext<IAssetsContext>(initialValue);

export const AssetsProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const { chainId, account } = useWeb3React();
  const dispatch = useAppDispatch();
  const [balance, setBalance] = React.useState({
    ...initBalance,
  });
  const isAuthenticated = useIsAuthenticated();

  const fetchUserData = useFetchUserData();

  const debounceFetchData = React.useCallback(debounce(fetchUserData, 400), [isAuthenticated]);

  const [loadedBalance, setLoadedBalance] = React.useState({});

  const loadBalance = async () => {
    if (chainId !== SupportedChainId.NOS || !account) {
      return;
    }
    try {
      const provider = new ethers.providers.JsonRpcProvider(configs.RPC_URL);
      const balance = await provider.getBalance(account);
      const formatted = formatter.formatAmount({
        originalAmount: new BigNumber(balance.toString()).toNumber(),
        decimals: 18,
      });
      setBalance({
        amount: balance.toString(),
        formatted,
      });
    } catch (error) {
      setBalance({ ...initBalance });
    } finally {
      setLoadedBalance({
        [account]: true,
      });
    }
  };

  const contextValues = useMemo((): IAssetsContext => {
    return {
      balance,
      loadedBalance,
    };
  }, [balance, loadedBalance]);

  // Hide function loadBalance
  // React.useEffect(() => {
  //   loadBalance();
  //   const interval = setInterval(() => {
  //     loadBalance();
  //   }, 5000);
  //
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [chainId, account]);

  React.useEffect(() => {
    fetchUserData();
    const interval = setInterval(() => {
      debounceFetchData();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  useAsyncEffect(async () => {
    dispatch(fetchUserGamefi(account));
  }, [account]);

  return <AssetsContext.Provider value={contextValues}>{children}</AssetsContext.Provider>;
};
