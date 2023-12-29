import styled, { CSSProp } from 'styled-components';
import px2rem from '@/utils/px2rem';
import isNumber from 'lodash/isNumber';

type JustifyContentProperty =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'initial'
  | 'inherit';

type AlignItemsProperty = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'initial' | 'inherit';
type WidthProperty = string | number | 'fit-content' | 'max-content' | 'min-content' | 'auto' | CSSProp;
type WrapProperty = 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial' | 'inherit';
type DirectionProperty = 'row' | 'column' | 'revert' | 'row-revert' | 'column-revert';

const Row = styled.div<{
  width?: WidthProperty;
  align?: AlignItemsProperty;
  justify?: JustifyContentProperty;
  padding?: number;
  borderRadius?: number;
  gap?: number;
  wrap?: WrapProperty;
  direction?: DirectionProperty;
}>`
  flex-direction: ${({ direction }) => direction || 'row'};
  width: ${({ width }) => (width ? (isNumber(width) ? px2rem(width) : width) : '100%')};
  display: flex;
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: ${({ padding }) => px2rem(padding ?? 0)};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 'unset')};
  gap: ${({ gap }) => px2rem(gap ?? 0)};
  flex-wrap: ${({ wrap }) => wrap || 'wrap'};
`;

export { Row };
