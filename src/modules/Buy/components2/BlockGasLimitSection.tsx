import { TextInput2 } from '@/components/TextInput/TextInput2';
import { FormFieldsErrorMessage, FormFields } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Section from '../components/Section';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';

const BlockGasLimitSection = () => {
  const { formFieldsManager, setFormFieldsManager } = useBuyProvider();
  const fieldName = FormFields.BLOCK_GAS_LIMIT;
  const dataField = formFieldsManager[fieldName];
  const { value, hasFocused, errorMessage, hasError } = dataField;

  const fieldData = formFieldsManager[fieldName];

  const onChangeHandler = (text: string) => {
    let errorMessage = undefined;
    if (!text || text.length < 1) {
      errorMessage = FormFieldsErrorMessage[FormFields.BLOCK_GAS_LIMIT];
    } else {
      errorMessage = undefined;
    }

    setFormFieldsManager({
      ...formFieldsManager,
      [fieldName]: {
        ...fieldData,
        value: text,
        errorMessage: errorMessage,
        hasError: !!errorMessage,
        hasFocused: true,
      },
    });
  };

  return (
    <Section
      title={'Block gas limit'}
      description={'Which block gas limit is right for you?'}
      descriptionDetail={undefined}
    >
      <S.ListItemContainer>
        <TextInput2
          placeholder=""
          id={fieldName}
          name={fieldName}
          value={value}
          onBlur={(e: any) => {
            const text = e.target.value;
            onChangeHandler(text);
          }}
          onFocus={(e: any) => {
            setFormFieldsManager({
              ...formFieldsManager,
              [fieldName]: {
                ...dataField,
                hasFocused: true,
              },
            });
          }}
          onChange={e => {
            const text = e.target.value;
            onChangeHandler(text);
          }}
          type="text"
          step={'any'}
          autoComplete="off"
          spellCheck={false}
          autoFocus={false}
          onWheel={(e: any) => e?.target?.blur()}
        />
        {errorMessage && hasFocused && hasError && <ErrorMessage message={errorMessage} />}
      </S.ListItemContainer>
    </Section>
  );
};

export default BlockGasLimitSection;
