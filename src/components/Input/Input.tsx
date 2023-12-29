import * as S from '@/components/Input/styled';
import React from 'react';
import Button from '@/components/Button';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  subLabel?: string;
  error?: any;
  isRequired?: boolean;
  isTextArea?: boolean;
  isViewOnly?: boolean;
  rightView?: React.ReactNode;
  onMax?: () => void;
}

const Input = ({
  label,
  error,
  isRequired = true,
  isTextArea = false,
  rightView = undefined,
  subLabel,
  onMax,
  isViewOnly = false,
  ...rest
}: IProps) => {
  return (
    <S.Container>
      <S.Label>
        {label}
        {isRequired && <span className="required"> *</span>}
        {!!subLabel && <S.SubLabel>{subLabel}</S.SubLabel>}
      </S.Label>
      <S.Row>
        {isViewOnly ? (
          <S.TextView>{rest.value}</S.TextView>
        ) : isTextArea ? (
          <S.TextArea {...(rest as any)} />
        ) : (
          <S.Input step="any" {...rest} />
        )}
        {!!onMax && (
          <Button sizes="small" className="max-button" variants="outline" type="button" onClick={onMax}>
            Max
          </Button>
        )}
        {!!rightView && rightView}
      </S.Row>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
};

export default Input;
