import * as S from './styled';
import React from 'react';
import Text from '@/components/Text';
import { Image } from '@/modules/Wellcome/styled';
import SectionImage from '@/assets/images/image_section_2.png';

const News = {
  content: [
    'Earn sequencer fees',
    'Have dedicated throughput',
    'Offer low transaction fees to your users',
    'Complete control over gas fee, gas block limit, and withdrawal periods',
    'And more',
  ],
};

const WhatNew = () => {
  const renderContent = (item: string) => {
    return (
      <S.RowItem key={item}>
        &bull;
        <Text color="text_reverse" size="20">
          {item}
        </Text>
      </S.RowItem>
    );
  };

  return (
    <S.Container
      isEqual={false}
      isLeftLarge={false}
      leftView={
        <S.LeftContent>
          <S.AppText size="38" fontWeight="bold">
            Why launch <span className="highlight">your own blockchain?</span>
          </S.AppText>
          <S.AppText size="20" className="mt-12">
            Whatever your vision — a dapp, a fully onchain game, a DEX, or an ecosystem — there are many benefits of
            running your own blockchain.
          </S.AppText>
          <S.Box>{News.content.map(item => renderContent(item))}</S.Box>
        </S.LeftContent>
      }
      rightView={
        <S.RightContent>
          <Image src={SectionImage} />
        </S.RightContent>
      }
    />
  );
};

export default WhatNew;
