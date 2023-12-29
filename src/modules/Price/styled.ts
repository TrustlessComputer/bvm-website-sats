import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { PRICES } from '@/modules/Price/constants';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  flex: 1;
  padding-top: ${px2rem(42)};
  margin-bottom: ${px2rem(32)};
  .note {
    margin-top: ${px2rem(42)};
  }

  .horizontal-padding {
    padding-left: ${px2rem(24)};
    padding-right: ${px2rem(24)};
  }
`;

const Grid = styled.div`
  margin-top: ${px2rem(60)};
  display: grid;
  grid-template-columns: repeat(${PRICES.length}, minmax(${px2rem(300)}, 1fr));
`;

const Card = styled.div<{ isFocus: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${px2rem(40)} 0;
  border: 1px solid #e7e7e7;
  .space {
    flex: 1;
  }
  .action {
    align-self: flex-end;
    margin-top: ${px2rem(42)};
  }
  .hidden {
    opacity: 0;
    cursor: unset;
  }
  .unit {
    font-size: ${px2rem(16)};
    margin-left: ${px2rem(4)};
  }
  .card-section-0 {
    min-height: ${px2rem(102)};
  }
  .card-section-2 {
    min-height: ${px2rem(56)};
  }
  .card-section {
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: ${px2rem(12)};
  }
  ${({ isFocus }) =>
    isFocus &&
    css`
      background: linear-gradient(180deg, #4185ec 0%, #7db1ff 100%);
      p {
        color: #fff;
      }
      button {
        color: black !important;
        background-color: white !important;
      }
    `}
`;

const CardHeader = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: fit-content;
  margin: auto;
  min-width: 220px;
  padding: 12px;
  font-size: ${px2rem(22)};
  font-weight: 600;
  color: #fff;
  top: ${px2rem(-(46 / 2))};
  height: ${px2rem(46)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 200px;
  &.header_free {
    background: #a1e3cb;
  }
  &.header_essentials {
    background: linear-gradient(89.5deg, #004fc5 0.3%, #95bfff 92.13%);
  }
  &.header_professional {
    background: linear-gradient(90deg, #ff7e21 0%, #ffc397 100%);
  }
  &.header_enterprise {
    background: linear-gradient(90deg, #4f43e2 0%, #a8a1fe 100%);
  }
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(16)};
  flex: 1;
  justify-content: space-between;
`;

const SpanHighlight = styled.span`
  font-family: Raleway-Bold;
  font-size: ${px2rem(18)};
`;

const TooltipContent = styled.div`
  padding: ${px2rem(16)};
  .tooltip-content {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(16)};
  }
  .title {
    color: #4266aa;
  }
`;

export { Container, Grid, Card, CardSection, SpanHighlight, TooltipContent, CardHeader };
