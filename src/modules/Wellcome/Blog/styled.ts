import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';
import { opacify } from '@/utils';
import { MAX_SCREEN_WIDTH } from '@/pages/layout/constants';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  max-width: ${MAX_SCREEN_WIDTH}px;
  padding-top: ${px2rem(100)};
  padding-bottom: ${px2rem(100)};
`;

const Content = styled.div`
  max-width: ${px2rem(1600)};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow-y: auto;
  // hide scrollbar
  ::-webkit-scrollbar {
    display: none;
  }

  ${MediaQueryBuilder(
    'xxxl',
    css`
      max-width: 90vw;
    `,
  )}

  .slick-next:before {
    content: none;
  }

  .slick-prev:before {
    content: none;
  }

  :hover {
    .slick-next,
    .slick-prev {
      background-color: ${({ theme }) => opacify(100, theme.button_secondary)};
      transition: background-color 0.3s ease-in-out;
    }
  }
  .slick-next,
  .slick-prev {
    z-index: 100;
    width: fit-content;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => opacify(0, theme.button_secondary)};
    padding: ${px2rem(8)};
    border-radius: 50%;
    :hover {
      background-color: ${({ theme }) => opacify(100, theme.button_secondary)};
    }
  }

  .slick-next {
    right: ${px2rem(0)};
  }
  .slick-prev {
    left: ${px2rem(0)};
  }
`;

const BlogItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2rem(20)};
  padding: ${px2rem(24)} ${px2rem(20)};
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  border-radius: ${px2rem(10)};
  height: ${px2rem(200)};
  object-fit: cover;
`;

export { Container, Content, BlogItem, Image };
