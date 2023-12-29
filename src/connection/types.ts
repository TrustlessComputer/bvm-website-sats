import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';

export enum ConnectionType {
  INJECTED = 'INJECTED',
}

export interface Connection {
  getName(): string;
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
  getIcon?(isDarkMode: boolean): string;
  shouldDisplay(): boolean;
  overrideActivate?: (chainId?: number) => boolean;
}
