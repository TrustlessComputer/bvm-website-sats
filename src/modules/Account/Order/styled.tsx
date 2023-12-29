import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import CardBg from '@/assets/images/card.png';
import { Modal } from 'antd';
import { MediaQueryBuilder } from '@/theme';

const ModalStyled = styled(Modal)`
  .ant-modal-content {
    background-color: transparent;
    background-color: ${({ theme }) => theme.background_secondary};
    background-image: url(${CardBg});
    background-position: center center;
    overscroll-behavior: contain;

    overflow: auto;
    overscroll-behavior-x: auto;
    overscroll-behavior-y: contain;

    /*or with the shorthand*/
    overscroll-behavior: auto contain;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${px2rem(5)};

  input {
    margin-top: 1px;
    margin-bottom: 1px;
  }
  .modal {
    display: block !important;
  }

  /* Important part */
  .modal-dialog {
    overflow-y: initial !important;
  }
  .ant-select-selection-item {
    font-size: ${px2rem(18)};
  }
`;

const Row = styled.div`
  margin-top: ${px2rem(2)};
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  gap: 0.5rem;

  .ghostWrapper {
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    gap: 0rem;
    :hover {
      border: 1px solid #3772ff;
    }

    :disabled {
      border: 1px solid grey;
      :hover {
        border: 1px solid grey;
      }
    }

    :focus {
      border: 1px solid #3772ff;
    }

    ::placeholder {
      color: lightgray;
    }
  }
`;

const RowFinalizationPeriod = styled.div`
  margin-top: ${px2rem(5)};
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 0.5rem;

  ${MediaQueryBuilder(
    'md',
    css`
      margin-left: ${px2rem(5)};
      margin-top: ${px2rem(10)};
      /* flex-direction: column;
      align-items: baseline; */
      gap: 0.5rem;
    `,
  )}
`;

const GhostLabel = styled.div`
  margin-right: ${px2rem(5)};
  min-width: max-content;
  text-align: center;
  font-size: ${px2rem(18)};
  opacity: 0.5;
  flex-wrap: wrap;
`;

const Column = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  margin-top: ${px2rem(10)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  min-width: ${px2rem(200)};

  ${MediaQueryBuilder(
    'md',
    css`
      min-width: ${px2rem(100)};
    `,
  )}
`;

const SubmitButtonWrapper = styled.div`
  margin-top: ${px2rem(32)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export { ModalStyled, Container, Row, SubmitButtonWrapper, TitleWrapper, Column, GhostLabel, RowFinalizationPeriod };
