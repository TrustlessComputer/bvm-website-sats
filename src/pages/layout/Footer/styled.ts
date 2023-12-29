import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { HorizontalPadding } from '@/pages/layout/styled';
import { opacify } from '@/utils';

const Container = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-top: ${px2rem(24)};
  padding-bottom: ${px2rem(24)};
  border-top: 1px solid ${({ theme }) => opacify(20, theme.background)};
  justify-content: space-between;
  ${HorizontalPadding}
`;

const Brand = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SocialShare = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(12)};
`;

const SocialIcon = styled.a<{ isLight: boolean }>`
  border-radius: 4px;
  :hover {
    opacity: 0.7;
  }
  ${({ isLight }) =>
    isLight &&
    css`
      background-color: ${({ theme }) => theme.text_primary};
    `}
`;

export { Container, Brand, SocialShare, SocialIcon };
