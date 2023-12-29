export interface IPriceTooltip {
  title: string;
  contents?: IPriceSection[] | string;
}

export enum PriceType {
  FREE,
  ESSENTIALS,
  PROFESSIONAL,
  ENTERPRISE,
  HEAD,
}

export const PriceTypeList = [PriceType.FREE, PriceType.ESSENTIALS, PriceType.PROFESSIONAL, PriceType.ENTERPRISE];

export interface IPriceSection {
  title?: string;
  content: string;
  tooltip?: IPriceTooltip | string;
}

export interface IPrice {
  id: string;
  price: string;
  unit: string;
  type: string;
  hidePrice?: boolean;
  setupCost: string;
  subType: string;
  sections: IPriceSection[];
  actionLabel: string;
  priceType: PriceType;
}

const TrialPrice: IPrice = {
  id: 'free',
  price: '7-day free trial',
  unit: '',
  type: 'Free',
  subType: '',
  setupCost: '',
  sections: [
    {
      content: 'Bitcoin testnet',
    },
    {
      content: 'Optimistic rollups',
    },
    {
      content: 'Bitcoin (Regtest) or Ethereum (Goerli)',
    },
    {
      content: '2s or 5s or 10s',
    },
    {
      content: 'Discord support',
    },
  ],
  actionLabel: 'Get started',
  priceType: PriceType.FREE,
};

const EssentialsPrice: IPrice = {
  id: 'essentials',
  price: '182 BVM',
  setupCost: '6 BVM',
  unit: '/month',
  type: 'Essentials',
  subType: '',
  sections: [
    {
      content: 'Bitcoin mainnet',
    },
    {
      content: 'Optimistic rollups',
    },
    {
      content: 'Bitcoin + Polygon',
    },
    {
      content: '2s or 5s or 10s',
    },
    {
      content: 'Discord support',
    },
  ],
  actionLabel: 'Get started',
  priceType: PriceType.ESSENTIALS,
};

const ProfessionalPrice: IPrice = {
  id: 'professional',
  price: '1780 BVM',
  unit: '/month',
  type: 'Professional',
  setupCost: '6 BVM',
  subType: '',
  sections: [
    {
      content: 'Bitcoin mainnet',
    },
    {
      content: 'Optimistic rollups',
    },
    {
      content: 'Bitcoin',
    },
    {
      title: '',
      content: '10s',
      tooltip: {
        title: 'Optional',
        contents: [
          {
            title: 'Block Time',
            content: '5s (+1685 BVM monthly)',
          },
          {
            title: 'Block Time',
            content: '2s (+6740 BVM monthly)',
          },
        ],
      },
    },
    {
      content: 'Dedicated account manager',
    },
  ],
  actionLabel: 'Get started',
  priceType: PriceType.PROFESSIONAL,
};

const EnterprisePrice: IPrice = {
  id: 'enterprise',
  price: 'Custom Price',
  unit: '',
  type: 'Custom',
  setupCost: '',
  subType: '',
  sections: [
    {
      content:
        'Design a custom Bitcoin L2 — available for businesses with large transaction volume or unique business models.',
    },
    {
      content: '',
    },
    {
      content: '',
    },
    {
      content: '',
    },
    {
      content: 'Dedicated account manager',
    },
  ],
  actionLabel: 'Contact sales',
  priceType: PriceType.ENTERPRISE,
};

const Head: IPrice = {
  id: '',
  price: 'Price',
  unit: '',
  type: '',
  hidePrice: true,
  subType: '',
  setupCost: '',
  sections: [
    {
      title: 'Network',
      content: '',
    },
    {
      title: 'Rollup Protocol',
      content: '',
    },
    {
      title: 'Data Availability Layer',
      content: '',
    },
    {
      title: 'Block Time',
      content: '',
    },
    {
      title: 'Support',
      content: '',
    },
  ],
  actionLabel: '',
  priceType: PriceType.HEAD,
};

const PRICES: IPrice[] = [Head, TrialPrice, EssentialsPrice, ProfessionalPrice, EnterprisePrice];

const MOCKUP_PRICE_PARAMS = {
  [PriceType.ESSENTIALS]: {
    serviceType: 1,
    domain: '',
    chainId: 10157 + 2e8 + '',
    chainName: '',
    description: '',
    finalizationPeriod: 604800,
    blockTime: 10,
    minGasPrice: '2000000000',
    dataAvaibilityChain: 10,
    isMainnet: true,
  },
  [PriceType.PROFESSIONAL]: {
    serviceType: 1,
    domain: '',
    chainId: 62095 + 2e8 + '',
    chainName: '',
    description: '',
    finalizationPeriod: 604800,
    blockTime: 10,
    minGasPrice: '2000000000',
    dataAvaibilityChain: 11,
    isMainnet: true,
  },
};

export { PRICES, MOCKUP_PRICE_PARAMS };
