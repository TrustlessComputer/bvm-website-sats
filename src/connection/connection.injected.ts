import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { onError } from '@/connection/utils';

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>(actions => new MetaMask({ actions, onError }));

export { web3Injected, web3InjectedHooks };
