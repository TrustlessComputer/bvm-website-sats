export interface IFeature {
  icon: string;
  title: string;
  description: string;
  comingSoon?: boolean;
}

const FeatureList: IFeature[] = [
  {
    icon: 'server-stack',
    title: 'Scalable RPCs',
    description: 'Easily handle large on-chain transaction volumes.',
  },
  {
    icon: 'arrows-pointing-out',
    title: 'DDOS Protection',
    description: 'Keep your rollups secure against malicious actors.',
  },
  {
    icon: 'lock',
    title: 'High Availability',
    description: 'Always accessible, even during periods of heavy traffic.',
  },
  {
    icon: 'hand-up',
    title: 'Zero Operations',
    description: 'No technical expertise needed to get started.',
  },
  {
    icon: 'eye',
    title: 'Observability',
    description: 'Monitor rollup performance and health in real-time.',
  },
  {
    icon: 'adjustments',
    title: 'Custom Configuration',
    description: 'Flexibility to create the perfect rollup for your project',
  },
  {
    icon: 'transparent',
    title: 'Block Explorers',
    description: 'View and analyze transaction history and state.',
  },
  {
    icon: 'viewer',
    title: 'Transaction Tracer',
    description: "Deeply introspect your rollup's transactions.",
    comingSoon: true,
  },
  {
    icon: 'wallet',
    title: 'Built-in Faucets',
    description: 'Easily test and debug without spending on gas fees.',
    comingSoon: true,
  },
  {
    icon: 'computer',
    title: 'Bridge UI',
    description: 'Optimism’s bridging UI on demand for your chain.',
    comingSoon: true,
  },
  {
    icon: 'command',
    title: 'Oracles',
    description: 'Off-chain data feeds piped directly to your rollup.',
    comingSoon: true,
  },
  {
    icon: 'arrow-path-rounded',
    title: 'Automated Upgrades',
    description: 'Simplify maintenance and updates to your rollup.',
    comingSoon: true,
  },
  {
    icon: 'queue-list',
    title: 'Data Indexing',
    description: 'Easily search and access data with an intuitive API.',
    comingSoon: true,
  },
  {
    icon: 'shield-check',
    title: 'Verifiers',
    description: 'Enhance security and trust for developers and users alike.',
    comingSoon: true,
  },
  {
    icon: 'puzzle-piece',
    title: 'Bridge Plugins',
    description: 'Connect to other rollups, chains, and applications.',
    comingSoon: true,
  },
  {
    icon: 'bell-alert',
    title: 'Alerts',
    description: 'Receive notifications for important events.',
    comingSoon: true,
  },
  {
    icon: 'cursor-arrow-rays',
    title: 'Generated UIs',
    description: 'Create a user interface for your smart contract in a click.',
    comingSoon: true,
  },
  {
    icon: 'hand-raised',
    title: 'Request a Feature',
    description: 'Let us know what you would like on L2aaS.',
    comingSoon: true,
  },
];

export { FeatureList };
