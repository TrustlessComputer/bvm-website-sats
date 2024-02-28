import { TextInput2 } from '@/components/TextInput/TextInput2';
import { MIN_GAS_PRICE } from '@/modules/Account/Order/FormOrder.constants';
import { FormFieldsErrorMessage, FormFields } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Section from '../components/Section';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';

const MinGasPriceSection = () => {
  const { formFieldsManager, setFormFieldsManager } = useBuyProvider();
  const fieldName = FormFields.MIN_GAS_PRICE;
  const dataField = formFieldsManager[fieldName];
  const { value, hasFocused, errorMessage, hasError } = dataField;

  const fieldData = formFieldsManager[fieldName];

  const onChangeHandler = (text: string) => {
    let errorMessage = undefined;
    if (!text || text.length < 1) {
      errorMessage = FormFieldsErrorMessage[FormFields.MIN_GAS_PRICE];
    } else if (Number(text) < MIN_GAS_PRICE) {
      errorMessage = `Min gas price must be at least ${MIN_GAS_PRICE} Gwei.`;
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
      title={'Min Gas Price (Gwei)'}
      description={'Which min gas price is right for you?'}
      descriptionDetail={{
        title: 'Min Gas Price (Gwei)',
        content: (
          <p>
            Similar to the minimum gas price on other EVM-based blockchains, the gas price for transactions within your
            Bitcoin L2 must be set to a value higher than or equal to the one you choose.
          </p>
        ),
      }}
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

export default MinGasPriceSection;
