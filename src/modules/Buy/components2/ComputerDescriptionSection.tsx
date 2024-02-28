import { TextArea } from '@/components/TextInput/TextArea';
import { isEmpty } from 'lodash';
import { FormFields } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Title from '../components/Title';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';

const ComputerDescriptionSection = () => {
  const { computerDescriptionField, setComputerDescriptionField, validateField } = useBuyProvider();
  const fieldName = FormFields.DESCRIPTION;
  const { value, hasFocused, errorMessage, hasError } = computerDescriptionField;

  const onChangeHandler = async (e: any) => {
    const text = e.target.value;
    setComputerDescriptionField({
      ...computerDescriptionField,
      hasFocused: true,
      value: text,
      hasError: computerDescriptionField.isRequired && isEmpty(text),
    });
  };

  return (
    <S.Section>
      <Title text={'Bitcoin L2 description'} isRequired />
      <S.Space />
      <TextArea
        placeholder="Tell us more about your plan with your Bitcoin L2"
        id={fieldName}
        name={fieldName}
        value={value}
        onBlur={onChangeHandler}
        onFocus={onChangeHandler}
        onChange={onChangeHandler}
        autoComplete="off"
        spellCheck={false}
        autoFocus={false}
        onWheel={(e: any) => e?.target?.blur()}
      />
      {errorMessage && hasFocused && hasError && <ErrorMessage message={errorMessage} />}
    </S.Section>
  );
};

export default ComputerDescriptionSection;
