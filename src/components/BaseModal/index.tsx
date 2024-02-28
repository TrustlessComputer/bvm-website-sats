import React from 'react';
import { Modal } from 'react-bootstrap';
import * as S from './styled';
import Text from '@/components/Text';
import { XCircle } from 'react-feather';

type Props = {
  title?: string | React.ReactNode;
  subTitle?: string;
  children: React.ReactElement;
  show: boolean;
  handleClose?: () => void;
  width?: 500 | 600 | 700 | 750 | 800 | 900 | 1100 | 1200 | 1300 | 1500;
  onScrollBody?: (event: React.UIEvent<HTMLDivElement>) => void;
  titleAlign?: 'center' | 'left' | 'right' | 'unset';
  handleDevMode?: () => void;
  hideCloseButton?: boolean;
};

const BaseModal = (props: Props) => {
  const {
    title,
    subTitle,
    children,
    show = false,
    handleClose,
    width,
    onScrollBody,
    titleAlign,
    handleDevMode,
    hideCloseButton = false,
  } = props;

  return (
    <S.Container show={show} onHide={handleClose} centered width={width}>
      <Modal.Header>
        {!hideCloseButton && (
          <S.CloseWrapper onClick={handleClose}>
            <XCircle size={32} strokeWidth={1} />
          </S.CloseWrapper>
        )}
        {handleDevMode && (
          <S.CloseWrapper
            onClick={handleDevMode}
            style={{
              position: 'absolute',
              left: 0,
              opacity: 0,
            }}
          >
            <XCircle size={32} strokeWidth={1} />
          </S.CloseWrapper>
        )}
      </Modal.Header>
      <Modal.Body onScroll={onScrollBody}>
        {title && (
          <Text size="26" align={titleAlign || 'left'} fontWeight="semibold">
            {title}
          </Text>
        )}
        {subTitle && <Text>{subTitle}</Text>}
        <S.Space />
        {children}
      </Modal.Body>
    </S.Container>
  );
};

export default BaseModal;
