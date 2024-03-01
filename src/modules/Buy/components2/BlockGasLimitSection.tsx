import { TextInput2 } from '@/components/TextInput/TextInput2';
import { isEmpty } from 'lodash';
import { FormFields, FormFieldsErrorMessage } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Section from '../components/Section';
import { useBuy } from '../providers/Buy.hook';
import * as S from '../styled';

const BlockGasLimitSection = () => {
  const { blockGasLimitField, setBlockGasLimitField } = useBuy();
  const { value, hasFocused, errorMessage, hasError } = blockGasLimitField;
  const fieldName = FormFields.MIN_GAS_PRICE;

  const onChangeHandler = async (e: any) => {
    const text = e.target.value;

    let errorMessage = FormFieldsErrorMessage[fieldName];
    let isValid = true;

    if (isEmpty(text)) {
      isValid = false;
    } else if (Number(text) <= 0) {
      isValid = false;
      errorMessage = 'Gas limit must be greater than 0';
    }

    setBlockGasLimitField({
      ...blockGasLimitField,
      hasFocused: true,
      value: text,
      hasError: !!blockGasLimitField.isRequired && !isValid,
      errorMessage,
    });
  };

  return (
    <Section
      isRequired
      title={'Block gas limit'}
      description={'Which block gas limit is right for you?'}
      descriptionDetail={undefined}
    >
      <S.ListItemContainer>
        <TextInput2
          placeholder="Gas limit"
          id={fieldName}
          name={fieldName}
          value={value}
          className={`${hasFocused && hasError ? 'error' : ''}`}
          onBlur={onChangeHandler}
          onChange={onChangeHandler}
          type="number"
          step={'any'}
          autoComplete="off"
          spellCheck={false}
          autoFocus={false}
          onWheel={(e: any) => e?.target?.blur()}
        />
        {hasFocused && hasError && <ErrorMessage message={errorMessage} />}
      </S.ListItemContainer>
    </Section>
  );
};

export default BlockGasLimitSection;
