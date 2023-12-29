import px2rem from '@/utils/px2rem';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import CardBg from '@/assets/images/card.png';

const Container = styled(Modal)<{ width?: number }>`
  &.modal {
    --bs-modal-color: ${({ theme }) => theme.text_primary};
    --bs-modal-width: ${({ width }: { width?: number }) => px2rem(width || 500)};
    overflow-y: hidden;
  }

  .modal-content {
    background-color: ${({ theme }) => theme.background_secondary};
    padding-top: ${px2rem(8)};
    border-radius: ${px2rem(8)};
    padding: ${px2rem(24)};
    background-image: url(${CardBg});
    background-size: cover;
    background-position: center center;
  }

  .modal-header {
    border-bottom: none;
    display: flex;
    justify-content: flex-end;
    padding: 0;
  }

  .modal {
    display: block !important;
    background-color: black;
  }

  /* Important part */
  .modal-dialog {
    overflow-y: initial !important;
  }

  .modal-body {
    padding-top: ${px2rem(0)};
    max-height: 80vh;
    overflow-y: auto;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .modal-footer {
    border-top: none;
  }
`;

const CloseWrapper = styled.div`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    opacity: 0.6;
    transform: scale(1.2) rotate(90deg);
    animation-fill-mode: forwards;
  }
`;

const Space = styled.div`
  height: ${px2rem(16)};
`;

export { Container, CloseWrapper, Space };
