import { TextArea } from '@/components/TextInput/TextArea';
import { isEmpty } from 'lodash';
import { FormFields } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Title from '../components/Title';
import { useBuy } from '../providers/Buy.hook';
import * as S from '../styled';

const ComputerDescriptionSection = () => {
  const { computerDescriptionField, setComputerDescriptionField } = useBuy();
  const { value, hasFocused, errorMessage, hasError } = computerDescriptionField;
  const fieldName = FormFields.DESCRIPTION;

  const onChangeHandler = async (e: any) => {
    const text = e.target.value;
    setComputerDescriptionField({
      ...computerDescriptionField,
      hasFocused: true,
      value: text,
      hasError: !!computerDescriptionField.isRequired && isEmpty(text),
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
        className={`${hasFocused && hasError ? 'error' : ''}`}
        onBlur={onChangeHandler}
        onChange={onChangeHandler}
        onFocus={(e: any) => {}}
        autoComplete="off"
        spellCheck={false}
        autoFocus={false}
        onWheel={(e: any) => e?.target?.blur()}
      />
      {hasFocused && hasError && <ErrorMessage message={errorMessage} />}
    </S.Section>
  );
};

export default ComputerDescriptionSection;
