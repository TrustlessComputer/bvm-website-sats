export const PREFIX = '/trustless-computers-iframe';

const ROUTE_PATH = {
  NOT_FOUND: '*',
  HOME: PREFIX,
  DASHBOARD: `${PREFIX}/computers`,
  NETWORKS: `${PREFIX}/networks`,
  ACCOUNT: `${PREFIX}/account`,
  TOKENOMICS: `${PREFIX}/token`,
  BLOG: `/blog`,
  BUY: `${PREFIX}/buy`,
  PRICE: `${PREFIX}/price`,
};

export { ROUTE_PATH };
