import * as S from './styled';
import Text from '@/components/Text';
import React from 'react';
import SectionImage from '@/assets/images/image_section_3.png';
import { Image } from '@/modules/Wellcome/styled';
import { Row } from '@/components/Row';

interface IContent {
  title: string;
  description: string;
}

const CONTENTS = [
  {
    title: 'Choose a rollup method',
    description: 'Optimistic rollups or ZK rollups',
  },
  {
    title: 'Choose a block time',
    description: '10s, 5s, or 2s — entirely up to you.',
  },
  {
    title: 'Choose pre-installed dapps',
    description: 'DEX, DAO, NFT marketplace, and more over time.',
  },
  {
    title: 'Then launch it',
    description: 'It’s that easy!',
  },
];

const WhyLaunch = () => {
  const renderContent = (item: IContent, index: number) => {
    return (
      <S.Item key={item.title}>
        <div>
          <Text size="20" fontWeight="semibold" className="indexer">
            {index + 1}
          </Text>
        </div>
        <div className="box-content">
          <Text size="22" fontWeight="semibold">
            {item.title}
          </Text>
          <Text size="20">{item.description}</Text>
        </div>
      </S.Item>
    );
  };
  return (
    <S.Container
      isLeftLarge={true}
      isEqual={false}
      isReverse={true}
      leftView={
        <S.LeftContent>
          <Image src={SectionImage} />
        </S.LeftContent>
      }
      rightView={
        <S.RightContent>
          <Text size="38" fontFamily="Raleway-Bold">
            <span className="highlight">A no-code tool</span> for building a full-featured Bitcoin L2 blockchain.
          </Text>
          <S.Box>{CONTENTS.map(renderContent)}</S.Box>
        </S.RightContent>
      }
    />
  );
};

export default WhyLaunch;
