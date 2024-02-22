import * as S from './styled';
import React from 'react';
import Text from '@/components/Text';
import configs from '@/configs';

interface IContent {
  title: string;
  icon: string;
  description: string;
}

const CONTENTS: Array<IContent> = [
  {
    title: 'Unlimited throughput',
    description: 'Hyperscale Bitcoin with an unlimited number of Bitcoin L2 as Bitcoin L2s blockchains.',
    icon: 'reinvention_13.png',
  },
  {
    title: 'Infinite applications',
    description:
      'Bitcoin L2s support Solidity smart contracts on Bitcoin, so you can quickly build all kinds of decentralized applications on Bitcoin.',
    icon: 'reinvention_14.png',
  },
  {
    title: 'Fast & cheap',
    description:
      'Bitcoin L2s implement rollups on Bitcoin. Rollups significantly reduce the block time and transaction fees.',
    icon: 'reinvention_15.png',
  },
];

const Reinvention = () => {
  const renderContent = (item: IContent) => {
    return (
      <S.GridItem>
        <S.Image src={`${configs.CDN_APP_ICON_URL}/${item.icon}`} />
        <Text size="24" align="center" fontWeight="semibold">
          {item.title}
        </Text>
        <Text size="20" align="center" color="text_secondary">
          {item.description}
        </Text>
      </S.GridItem>
    );
  };
  return (
    <S.Container>
      <S.Content>
        <Text size="38" align="center" fontWeight="bold">
          Scalable infrastructure for Bitcoin
        </Text>
        <Text size="20" align="center" className="mt-16">
          If Ethereum is the world’s computer, Bitcoin is the world’s supercomputer. With Bitcoin L2, anyone can launch
          their own Bitcoin L2 blockchain.
        </Text>
        <S.Grid>{CONTENTS.map(renderContent)}</S.Grid>
      </S.Content>
    </S.Container>
  );
};

export default Reinvention;
