import { ReactNode, useEffect } from 'react';
import useEagerlyConnect from '@/hooks/useEagerlyConnect';
import { connections, getConnection } from '@/connection/connection';
import { Connector } from '@web3-react/types';
import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import usePrevious from '@/hooks/usePrevious';
import { useConnectedWallets } from '@/state/wallets/hooks';

/** A component to run hooks under the Web3ReactProvider context. */
const Updater = () => {
  const { account, chainId, connector, provider } = useWeb3React();

  // Send analytics events when the active account changes.
  const previousAccount = usePrevious(account);
  const [connectedWallets, addConnectedWallet] = useConnectedWallets();

  useEffect(() => {
    if (account && account !== previousAccount) {
      const walletType = getConnection(connector).getName();
      addConnectedWallet({ account, walletType });
    }
  }, [account, addConnectedWallet, chainId, connectedWallets, connector, previousAccount, provider]);

  return null;
};

const Web3Provider = ({ children }: { children: ReactNode }) => {
  useEagerlyConnect();
  const connectors = connections.map<[Connector, Web3ReactHooks]>(({ hooks, connector }) => [connector, hooks]);

  return (
    <Web3ReactProvider connectors={connectors}>
      <Updater />
      {children}
    </Web3ReactProvider>
  );
};

export default Web3Provider;
