import { SupportedChainId } from '@/chains/enums';
import configs from '@/configs';

const NOS_EXPLORER_URL = configs.isProd
  ? 'https://explorer.l2.trustless.computer/'
  : 'https://nos-explorer.regtest.trustless.computer/';

const NOS_CHAIN_INFO = {
  name: configs.isProd ? 'NOS' : 'NOS (Test)',
  title: '',
  chain: 'TC',
  icon: '',
  rpc: [configs.RPC_URL],
  faucets: [],
  nativeCurrency: {
    name: 'TC',
    symbol: 'TC',
    decimals: 18,
  },
  infoURL: 'https://trustless.computer',
  shortName: 'TC',
  chainId: SupportedChainId.NOS,
  networkId: SupportedChainId.NOS,
  slip44: 0,
  explorers: [
    {
      name: configs.isProd ? 'Trustless computer explorer' : 'Trustless computer explorer (Test)',
      url: NOS_EXPLORER_URL,
      standard: 'EIP3091',
    },
  ],
  ens: {
    registry: '',
  },
};

const CHAINS_INFO = [NOS_CHAIN_INFO];

export { CHAINS_INFO, NOS_EXPLORER_URL };
