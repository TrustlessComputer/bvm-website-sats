import * as S from './styled';
import React from 'react';
import Text from '@/components/Text';
import SliderSlick from 'react-slick';
import { BLOGS, IBlog } from '@/modules/Wellcome/Blog/constant';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { isMobile, isTablet } from 'react-device-detect';
import { ArrowLeft, ArrowRight } from 'react-feather';

const Blog = () => {
  const numberSlide = isMobile ? 1 : isTablet ? 2 : 3;

  const renderItem = (item: IBlog) => {
    return (
      <S.BlogItem
        key={item.id}
        onClick={() => {
          window.open(item.link, '_blank');
        }}
      >
        <S.Image src={item.imageUrl} alt="" />
        <Text size="24" color="text_primary" fontWeight="semibold" className="mt-12">
          {item.title}
        </Text>
        <Text size="20" color="text_secondary" className="mt-12">
          {item.desc}
        </Text>
      </S.BlogItem>
    );
  };
  return (
    <S.Container>
      <Text size="48" align="center" fontFamily="Raleway-Bold" className="mt-16 mb-24">
        Oh, and the press loves us too!
      </Text>
      <S.Content>
        <SliderSlick
          arrows={true}
          nextArrow={
            <div className="icon">
              <ArrowRight color="white" size="18" />
            </div>
          }
          prevArrow={
            <div className="icon">
              <ArrowLeft color="white" size="18" />
            </div>
          }
          infinite={true}
          swipe={true}
          speed={1000}
          autoplaySpeed={3000}
          slidesToShow={numberSlide}
          slidesToScroll={numberSlide}
          autoplay={true}
          centerPadding="20px"
        >
          {BLOGS.map(renderItem)}
        </SliderSlick>
      </S.Content>
    </S.Container>
  );
};

export default Blog;
