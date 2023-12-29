import Web3 from 'web3';
import { IResourceChain } from '@/chains';

const addChain = async (chain: IResourceChain) => {
  const params = {
    chainId: Web3.utils.toHex(chain.chainId),
    chainName: chain.name,
    nativeCurrency: {
      name: chain.nativeCurrency.name,
      symbol: chain.nativeCurrency.symbol,
      decimals: chain.nativeCurrency.decimals,
    },
    rpcUrls: chain.rpc,
    blockExplorerUrls: [
      chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url ? chain.explorers[0].url : chain.infoURL,
    ],
  };

  await Object(window.ethereum).request({
    method: 'wallet_addEthereumChain',
    params: [params],
  });
};

export default addChain;
