import { PREFIX, ROUTE_PATH } from '@/constants/route-path';
import configs from '@/configs';

export interface IMenuItem {
  name: string;
  path: string;
  external?: boolean;
  authed?: boolean;
  target?: '_blank' | '_self';
  className?: string;
  live?: boolean;
}

const SUB_MENU: Array<IMenuItem> = [
  // {
  //   name: 'Overview',
  //   path: ROUTE_PATH.HOME,
  // },
  {
    name: 'Blockchains',
    path: ROUTE_PATH.DASHBOARD,
    live: true,
  },
  {
    name: 'Developers',
    path: configs.DOCS_TRUSTLESS_URL,
    target: '_blank',
    external: true,
  },
  {
    name: '$BVM',
    path: ROUTE_PATH.TOKENOMICS,
  },
  {
    name: 'Pricing',
    path: ROUTE_PATH.PRICE,
  },
];

const MENU_DESKTOP: Array<IMenuItem> = [
  {
    name: 'GameFi',
    path: '/mega-whales',
    external: true,
    target: '_self',
  },
  {
    name: 'DeFi',
    path: '/defi',
    external: true,
    target: '_self',
  },
  {
    name: 'NFTs',
    path: '/nfts',
    external: true,
    target: '_self',
  },
  {
    name: 'AI',
    path: '/ai',
    external: true,
    target: '_self',
  },
  {
    name: 'GM & Souls',
    path: '/souls',
    external: true,
    target: '_self',
  },
  {
    name: 'Bitcoin L2',
    path: `/${PREFIX}`,
    external: true,
    target: '_self',
  },
  {
    name: 'Our Story',
    path: '/story',
    external: true,
    target: '_self',
  },
];

export { MENU_DESKTOP, SUB_MENU };
