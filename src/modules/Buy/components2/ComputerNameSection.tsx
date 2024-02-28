import { TextInput2 } from '@/components/TextInput/TextInput2';
import client from '@/services/client';
import { debounce, isEmpty } from 'lodash';
import { useCallback } from 'react';
import { FormFields, FormFieldsErrorMessage } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Title from '../components/Title';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';

const ComputerNameSection = () => {
  const { computerNameField, setComputerNameField } = useBuyProvider();

  const fieldID = FormFields.COMPUTER_NAME;
  const { value, hasFocused, errorMessage, hasError } = computerNameField;

  const onChangeHandler = useCallback(
    debounce(async (e: any) => {
      const text = e.target.value;
      let isValid = !isEmpty(text);
      let errorMessage = FormFieldsErrorMessage[FormFields.COMPUTER_NAME];
      if (isValid) {
        try {
          isValid = await client.validateSubDomainAPI(text);
        } catch (error: any) {
          errorMessage = error.toString() || 'Computer name is invalid';
        } finally {
        }
      }
      setComputerNameField({
        ...computerNameField,
        value: text,
        hasFocused: true,
        hasError: computerNameField.isRequired && !isValid,
        errorMessage: isValid ? undefined : errorMessage,
      });
    }, 500),
    [],
  );

  return (
    <S.Section>
      <Title text={'Bitcoin L2 Name'} isRequired />
      <S.Space />
      <TextInput2
        placeholder="Your computer name"
        id={fieldID}
        name={fieldID}
        style={
          {
            // border: hasError ? '1px solid red' : '',
          }
        }
        value={value}
        onBlur={onChangeHandler}
        onFocus={onChangeHandler}
        onChange={e => {
          const text = e.target.value;
          setComputerNameField({
            ...computerNameField,
            value: text,
          });
          onChangeHandler(e);
        }}
        type="text"
        step={'any'}
        autoComplete="off"
        spellCheck={false}
        autoFocus={false}
        onWheel={(e: any) => e?.target?.blur()}
      />
      {errorMessage && hasFocused && hasError && <ErrorMessage message={errorMessage} />}
    </S.Section>
  );
};

export default ComputerNameSection;
