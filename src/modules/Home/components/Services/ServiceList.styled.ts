import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import Button from '@/components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${px2rem(0)};
  flex: 1;
  background-color: #f3f1e8;
`;

const GridView = styled.div`
  flex-direction: column;
  overflow: auto;

  display: grid;
  flex: 1;
  gap: 2rem;
  padding: 0.2rem;
  grid-template-columns: repeat(2, 1fr);

  ${MediaQueryBuilder(
    'xxl',
    css`
      grid-template-columns: repeat(1, 1fr);
    `,
  )}
`;

const UnKnowContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: ${px2rem(42)};
  gap: ${px2rem(42)};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  gap: ${px2rem(24)};
  background-color: #f3f1e8;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
  /* background-color: ${({ theme }) => theme.background_secondary}; */
  background-color: #f3f1e8;
  border-radius: ${px2rem(32)};
  padding: ${px2rem(32)};
  ${MediaQueryBuilder(
    'md',
    css`
      background-color: #f3f1e8;
      padding: ${px2rem(0)};
    `,
  )}
`;

const SelectionHead = styled(Button)`
  border-radius: ${px2rem(8)};
  background-color: #f3f1e8;
`;

const SideBar = styled.div`
  ${MediaQueryBuilder(
    'md',
    css`
      display: none;
    `,
  )}
`;

export { Container, GridView, UnKnowContent, Content, ContentBox, SelectionHead, SideBar };
