const ENVS = import.meta.env;

const isDev = ENVS.VITE_MODE === 'development';
const isProd = ENVS.VITE_MODE === 'production';

const RPC_URL = ENVS.VITE_RPC_URL;
const API_URL = ENVS.VITE_API_URL;

const CDN_URL = ENVS.VITE_CDN_URL;

const CDN_APP_URL = `${CDN_URL}/l2aas`;
const CDN_APP_ICON_URL = `${CDN_APP_URL}/icons`;

const GAMEFI_API_URL = ENVS.VITE_GAMEFI_API_URL;

const NEW_BITCOIN_CITY = isProd ? 'https://bvm.network' : 'https://dev.bvm.network';

const BUY_TC_URL = NEW_BITCOIN_CITY + '/topup';
const DOCS_TRUSTLESS_URL = 'https://docs.trustless.computer';

const DISCORD_URL = 'https://discord.gg/n26ekXWBqm';
const TWITTER_URL = 'https://twitter.com/newbitcoincity';
const DISCORD_TRUSTLESS_URL = 'https://discord.gg/n26ekXWBqm';

const ISSUE_TOKEN_URL =
  'https://docs.trustless.computer/quickstart/build-your-first-bitcoin-dapps/issue-your-own-governance-token';

const CROWD_URL =
  'https://docs.trustless.computer/quickstart/build-your-first-bitcoin-dapps/raise-funds-for-your-project-through-a-crowdsale';

const DAO_URL =
  'https://docs.trustless.computer/quickstart/build-your-first-bitcoin-dapps/operate-your-community-driven-project-using-a-dao';

const CHAIN_ID = {
  NOS: 42213,
  NOS_TEST: 42070,
  TRUSTLESS_COMPUTER: 22213,
  TRUSTLESS_COMPUTER_TEST: 22215,
};

const APP_NAME = 'Bitcoin Virtual Machine';

const DISABLED_FEATURES = {
  DEPLOY: false,
};

const configs = {
  isDev,
  isProd,
  RPC_URL,
  API_URL,
  CDN_URL,
  CDN_APP_URL,
  CDN_APP_ICON_URL,
  GAMEFI_API_URL,
  NEW_BITCOIN_CITY,
  BUY_TC_URL,
  DOCS_TRUSTLESS_URL,
  CHAIN_ID,
  APP_NAME,
  DISABLED_FEATURES,
  DISCORD_URL,
  TWITTER_URL,
  DISCORD_TRUSTLESS_URL,
  ISSUE_TOKEN_URL,
  CROWD_URL,
  DAO_URL,
};

export const CDN_ICONS_URL = `${CDN_URL}/icons/bvm-icons`;

export default configs;
