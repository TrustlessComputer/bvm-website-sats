import React, { PropsWithChildren, useMemo } from 'react';
import useTryActivation from '@/hooks/useTryActivation';
import useTryDeactivation from '@/hooks/useTryDeactivation';
import { SupportedChainId } from '@/chains';
import useLogin from '@/hooks/useLogin';
import useAuthenToken from '@/hooks/useAuthenToken';
import useAsyncEffect from 'use-async-effect';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from '@/state/hooks';
import { resetOrders } from '@/state/order/reducer';
import { resetAccount } from '@/state/user/reducer';
import storageAuthen from '@/storage/storage.authen';
import { axiosRemoveAccessToken } from '@/services/client';

export interface IWalletContext {
  onDisconnect: () => void;
  onConnect: (chainID: SupportedChainId) => Promise<boolean>;
  onCleanUp: (tcAddress: string) => void;
}

const initialValue: IWalletContext = {
  onDisconnect: () => {},
  onConnect: async () => false,
  onCleanUp: () => {},
};

export const WalletContext = React.createContext<IWalletContext>(initialValue);

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const tryActivation = useTryActivation();
  const tryDeactivation = useTryDeactivation();
  const onLogin = useLogin();
  const { account } = useWeb3React();
  const { onVerify, onRemoveAuthen } = useAuthenToken();
  const dispatch = useAppDispatch();

  const resetUser = () => {
    dispatch(resetOrders());
    dispatch(resetAccount());
    axiosRemoveAccessToken();
  };

  const onCleanUp = (tcAddress: string) => {
    dispatch(resetOrders());
    dispatch(resetAccount());
    onRemoveAuthen(tcAddress);
  };

  // this function is used to connect to the wallet and sign message for authentication
  const onConnect = async (switchChainID = SupportedChainId.NOS) => {
    let isSuccess;
    try {
      const tcAddress = await tryActivation(switchChainID);
      if (!tcAddress) {
        throw new Error('Failed to connect wallet');
      }

      let isVerified = false;
      if (tcAddress) {
        const authToken = storageAuthen.getToken(tcAddress);
        if (authToken) {
          isVerified = await onVerify(tcAddress);
        }
      }

      if (!isVerified) {
        await onLogin(tcAddress);
      }

      isSuccess = true;
    } catch (error) {
      // const { message } = getErrorMessage(error, 'Failed to connect wallet');
      // toast.error(message);
      isSuccess = false;
    }

    return isSuccess;
  };

  const onVerifyToken = async () => {
    if (!account) return;
    await onVerify(account);
  };

  React.useEffect(() => {
    if (window.ethereum) {
      (window.ethereum as any).on('accountsChanged', () => {
        resetUser();
      });
    }
  }, []);

  useAsyncEffect(onVerifyToken, [account]);

  const contextValues = useMemo((): IWalletContext => {
    return {
      onDisconnect: tryDeactivation,
      onConnect: onConnect,
      onCleanUp,
    };
  }, [tryDeactivation, onConnect, onCleanUp]);

  return <WalletContext.Provider value={contextValues}>{children}</WalletContext.Provider>;
};
