import { Connection, ConnectionType } from '@/connection/types';
import {
  getInjection,
  getIsGenericInjector,
  getIsMetaMaskWallet,
  getShouldAdvertiseMetaMask,
} from '@/connection/utils';
import { web3Injected, web3InjectedHooks } from '@/connection/connection.injected';
import { Connector } from '@web3-react/types';

const injectedConnection: Connection = {
  getName: () => getInjection().name,
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
  getIcon: (isDarkMode: boolean) => getInjection(isDarkMode).icon,
  shouldDisplay: () => getIsMetaMaskWallet() || getShouldAdvertiseMetaMask() || getIsGenericInjector(),
  // If on non-injected, non-mobile browser, prompt user to install Metamask
  overrideActivate: () => {
    if (getShouldAdvertiseMetaMask()) {
      window.open('https://metamask.io/', 'inst_metamask');
      return true;
    }
    return false;
  },
};

const connections = [injectedConnection];

const getConnection = (c: Connector | ConnectionType) => {
  if (c instanceof Connector) {
    const connection = connections.find(connection => connection.connector === c);
    if (!connection) {
      throw Error('unsupported connector');
    }
    return connection;
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection;
    }
  }
};

export { injectedConnection, connections, getConnection };
