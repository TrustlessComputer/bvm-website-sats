import Text from '@/components/Text';
import React, { useState } from 'react';
import DescriptionModal from './DescriptionModal/DescriptionModal';
import * as S from './Section.styled';

export type Props = {
  title?: string;
  isRequired?: boolean;
  description?: string;
  children?: React.ReactNode | null;
  descriptionDetail?: {
    title: string;
    content: React.ReactNode | null;
  };
};

const Section = React.memo((props: Props) => {
  const { title, description, children, descriptionDetail, isRequired } = props;

  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <S.Container>
      {title && (
        <S.TitleContainer>
          <Text size="20" fontWeight="semibold" align="left">
            {title}
          </Text>
          {isRequired && (
            <label
              style={{
                color: 'red',
                fontSize: '11px',
                marginBottom: '3px',
              }}
            >
              {'(*)'}
            </label>
          )}
        </S.TitleContainer>
      )}

      {description && (
        <S.DescriptionContainer onClick={() => setIsShowModal(true)}>
          <Text size="16" fontWeight="semibold" align="left" color="blueberry">
            {description}
          </Text>
        </S.DescriptionContainer>
      )}

      {children}

      {descriptionDetail && (
        <DescriptionModal
          show={isShowModal}
          onClose={() => setIsShowModal(false)}
          title={descriptionDetail.title}
          content={descriptionDetail.content}
        />
      )}
    </S.Container>
  );
});

export default Section;
