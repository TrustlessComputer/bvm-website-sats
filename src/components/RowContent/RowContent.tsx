import React from 'react';
import * as S from '@/components/RowContent/styled';
import { MediaWidthsKeysType } from '@/theme';

interface IProps {
  isReverse?: boolean;
  className?: string;
  isLeftLarge?: boolean;
  isEqual?: boolean;
  leftView: React.ReactNode;
  rightView: React.ReactNode;
  breakpoint?: MediaWidthsKeysType;
}
const RowContent = (props: IProps) => {
  const {
    leftView,
    rightView,
    isReverse = false,
    isLeftLarge = false,
    isEqual = false,
    className,
    breakpoint = 'xl',
  } = props;
  return (
    <S.ParentContainer className={className || ''}>
      <S.Container isReverse={isReverse}>
        <S.ContentView isLarger={isLeftLarge} isEqual={isEqual} maxWidth={780} breakpoint={breakpoint}>
          {leftView}
        </S.ContentView>
        <S.ContentView isLarger={!isLeftLarge} isEqual={isEqual} breakpoint={breakpoint}>
          {rightView}
        </S.ContentView>
      </S.Container>
    </S.ParentContainer>
  );
};

export default RowContent;
