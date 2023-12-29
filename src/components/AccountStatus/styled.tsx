import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { opacify } from '@/utils';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  .avatar-container {
    display: flex;
  }

  ${MediaQueryBuilder(
    'xs',
    css`
      button {
        padding: ${px2rem(12)} !important;
        font-size: ${px2rem(14)} !important;
      }
    `,
  )}
`;

const Image = styled.img<{ size: number }>`
  max-width: ${props => px2rem(props.size)};
  border-radius: 50%;
`;

const AddressBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(8)};
  border-radius: ${px2rem(50)};
  padding: ${px2rem(6)} ${px2rem(12)};
  border: 1px solid ${({ theme }) => opacify(20, theme.text_primary)};
  :hover {
    opacity: 0.9;
  }
`;

export { Container, Image, AddressBox };
