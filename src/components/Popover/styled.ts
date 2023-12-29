import styled from 'styled-components';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import px2rem from '@/utils/px2rem';

const PopoverWrapper = styled(Popover)<{ width?: number; hidePadding?: boolean }>`
  background-color: ${({ theme }) => theme.background_secondary};
  max-width: ${({ width }) => px2rem(width || 200)} !important;
  border-radius: ${px2rem(8)};

  ${({ hidePadding }) => (!hidePadding ? `padding: ${px2rem(12)} ${px2rem(16)};` : `padding: 0px;`)};

  /* margin-top: ${px2rem(6)}; */

  mix-blend-mode: normal;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &.popover {
    .popover-arrow {
      width: 100%;
      transform: translate(0px, 0px) !important;
      background: transparent !important;
    }

    .popover-arrow::after {
      width: 100%;
      border-bottom-color: transparent !important;
      background: transparent !important;
    }
    .popover-arrow::before {
      width: 100%;
      border-bottom-color: transparent !important;
      background: transparent !important;
    }
  }
`;

const OverlayWrapper = styled(OverlayTrigger)``;

const Wrapper = styled.div<{ show?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: ${({ theme, show }) => (show ? theme.button_primary : 'transparent')};
  padding: ${px2rem(0)} ${px2rem(12)};
  border-radius: ${px2rem(8)};
  height: ${px2rem(48)};
  cursor: pointer;

  .element {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(12)};
    p {
      font-weight: 600;
    }

    .arrow {
      height: ${px2rem(14)};
      width: ${px2rem(14)};
    }
  }

  :hover {
    .element {
      p {
      }
    }
  }
`;

export { PopoverWrapper, OverlayWrapper, Wrapper };
