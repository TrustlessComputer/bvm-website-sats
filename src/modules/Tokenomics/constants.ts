import configs from '@/configs';

const ICON_URL = configs.CDN_URL + '/nbc/icons';

export interface IContent {
  title: string;
  desc: string;
  img: string;
}

const Contents: Array<IContent> = [
  {
    title: 'The lifeblood of Bitcoin dapps',
    desc: 'BVM fuels Bitcoin dapps, facilitating the payment of transaction fees for all dapp activities on Bitcoin.',
    img: `${ICON_URL}/ic_token_heart.svg`,
  },
  {
    title: 'Uses for BVM grow every day',
    desc: 'As Bitcoin L2 enables programmability on Bitcoin, developers have the free to utilize BVM in numerous ways, such as DeFi, GameFi, DEX, DAO, and more.',
    img: `${ICON_URL}/ic_token_chart.svg`,
  },
  {
    title: 'Scale Bitcoin and earn BVM',
    desc: 'Bitcoin L2s aid in scaling Bitcoin with high throughput and low latency, while also enabling new utilities beyond simple money transfers. In return, they receive the transaction fees collected in BVM.',
    img: `${ICON_URL}/ic_token_blockchain.svg`,
  },
];

export { Contents };
