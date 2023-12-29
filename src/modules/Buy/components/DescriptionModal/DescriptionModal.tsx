import BaseModal from '@/components/BaseModal';
import * as S from './styled';
import React from 'react';
import Text from '@/components/Text';

interface IProps {
  title: string;
  show: boolean;
  onClose: () => void;
  content: React.ReactNode | null;
}

const DescriptionModal = (props: IProps) => {
  const { title, show, onClose, content } = props;

  return (
    <BaseModal show={show} handleClose={onClose} title={title} titleAlign="center" width={700}>
      <S.Container>
        <S.Desciption size="18">{content}</S.Desciption>
      </S.Container>
    </BaseModal>
  );
};

export default DescriptionModal;
