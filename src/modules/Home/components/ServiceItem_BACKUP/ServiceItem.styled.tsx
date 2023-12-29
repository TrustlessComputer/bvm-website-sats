import styled from 'styled-components';
import px2rem from '@/utils/px2rem';
import CardBg from '@/assets/images/card.png';
import { opacify } from '@/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${px2rem(24)};
  min-height: ${px2rem(250)};
  border-radius: ${px2rem(24)};
  background-image: url(${CardBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  cursor: pointer;

  background-color: ${({ theme }) => theme.background};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;

  .hover-show {
    opacity: 0;
  }
  .force-show {
    opacity: 1 !important;
  }
  transition: all 0.2s ease-in-out;
  :hover {
    .hover-show {
      opacity: 1;
    }
    border-color: ${({ theme }) => theme.yellow['C']};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(14)};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  //align-items: flex-end;
  align-items: center;
  gap: ${px2rem(32)};
  margin-top: ${px2rem(32)};
  margin-bottom: ${px2rem(16)};
  .sub-month {
    color: ${({ theme }) => theme.text_secondary};
    font-size: ${px2rem(16)};
  }
`;

const TopupBox = styled.div`
  padding: ${px2rem(8)} ${px2rem(12)};
  background-color: ${({ theme }) => opacify(80, theme.warning)};
  border-radius: ${px2rem(8)};
`;

const FillHeight = styled.div`
  display: flex;
  flex: 1;
`;

const Plugins = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${px2rem(24)};
`;

const Plugin = styled.img`
  width: ${px2rem(38)};
  height: ${px2rem(38)};
  transition: transform 0.3s ease-in-out;
  border-radius: 50px;
  :hover {
    transform: scale(1.15) rotate(45deg);
  }
`;

const PluginTag = styled.div`
  transition: all 0.3s ease-in-out;
  padding: ${px2rem(6)} ${px2rem(12)};
  border-radius: ${px2rem(6)};
  border: 2px solid ${({ theme }) => opacify(90, theme.button_primary)};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${px2rem(8)};
  :hover {
    opacity: 0.9;
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: ${px2rem(32)};
  height: ${px2rem(32)};
`;

export { Container, Actions, Content, TopupBox, FillHeight, Plugins, Plugin, PluginTag, Image };
