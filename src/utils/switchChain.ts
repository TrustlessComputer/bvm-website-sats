import Web3 from 'web3';
import { CHAINS_INFO, IResourceChain, SupportedChainId } from '@/chains';
import addChain from '@/utils/addChain';

// const API_PATH = 'https://chainid.network/chains.json';

const getChainList = async (): Promise<Array<IResourceChain>> => {
  try {
    // TODO: Uncomment this when we have a better API
    // const res = await fetch(API_PATH);
    // const chains = await res.json();
    return [...CHAINS_INFO] as Array<IResourceChain>;
  } catch (err: unknown) {
    console.log('Failed to get chain list');
    console.log(err);
    return CHAINS_INFO;
  }
};

const isSupportedChain = (chainId: number | null | undefined): chainId is SupportedChainId => {
  return !!chainId && !!SupportedChainId[chainId];
};

const switchChain = async (chainId: SupportedChainId) => {
  if (!isSupportedChain(chainId)) {
    throw new Error(`Chain ${chainId} not supported`);
  } else if (window.ethereum) {
    try {
      await Object(window.ethereum).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(chainId) }],
      });
    } catch (err: unknown) {
      if (Object(err).code !== 4902) throw err;

      const chainList = await getChainList();
      const info = chainList.find((c: IResourceChain) => c.chainId === chainId);
      if (!info) {
        throw new Error(`Chain ${chainId} not supported`);
      }

      await addChain(info);
    }
  }
};

export { isSupportedChain, switchChain };
