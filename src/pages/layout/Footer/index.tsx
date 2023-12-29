import configs from '@/configs';
import React from 'react';
import * as S from './styled';

import { ROUTE_PATH } from '@/constants/route-path';
import { Link, useLocation } from 'react-router-dom';
import IconSVG from '@/components/IconSVG';
import { ILayoutProps } from '@/pages/layout/LayoutContent/types';
import Text from '@/components/Text';

const FOOTER_MENU_RIGHT = [
  {
    name: 'Blog',
    route: ROUTE_PATH.BLOG,
    activePath: 'blog',
  },
];

interface IProps extends ILayoutProps {}

const Footer = ({ parentDark }: IProps) => {
  const location = useLocation();
  const activePath = location.pathname.split('/')[1];

  return (
    <S.Container>
      <S.Brand>
        <Text color={parentDark ? 'text_reverse' : 'text_primary'}>
          New Bitcoin City <span style={{ marginLeft: '12px' }}>©{new Date().getFullYear()}</span>
        </Text>
      </S.Brand>
      <S.SocialShare>
        {FOOTER_MENU_RIGHT.map(menu => {
          return (
            <Text color={parentDark ? 'text_reverse' : 'text_primary'}>
              <a href={menu.route}>{menu.name}</a>
            </Text>
          );
        })}
        <S.SocialIcon href={'https://discord.gg/yNbatuGMDG'} target="_blank" isLight={!parentDark}>
          <IconSVG maxWidth="28" src={`${configs.CDN_URL}/nbc/icons/mingcute_discord-fill.svg`} />
        </S.SocialIcon>
        <S.SocialIcon href={'https://twitter.com/NewBitcoinCity'} target="_blank" isLight={!parentDark}>
          <IconSVG maxWidth="28" src={`${configs.CDN_URL}/nbc/icons/mingcute_tw.svg`} />
        </S.SocialIcon>
      </S.SocialShare>
    </S.Container>
  );
};

export default Footer;
