import { TextInput2 } from '@/components/TextInput/TextInput2';
import { isEmpty } from 'lodash';
import { FormFields } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Title from '../components/Title';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';

const ContactInformationSection = () => {
  const { yourXField, setYourTelegramField, yourTelegramField, setYourXField } = useBuyProvider();

  const onChangeHandler = async (field: FormFields, e: any) => {
    const text = e.target.value;
    if (field == FormFields.YOUR_X_ACC) {
      setYourXField({
        ...yourXField,
        value: text,
        hasError: yourXField.isRequired && isEmpty(text),
      });
    }

    if (field == FormFields.YOUR_TELEGRAM) {
      setYourTelegramField({
        ...yourTelegramField,
        value: text,
        hasError: yourTelegramField.isRequired && isEmpty(text),
      });
    }
  };

  return (
    <S.Section>
      <Title text={'Contact information'} />
      <S.Space />
      <TextInput2
        placeholder="Your X account link/handle"
        id={FormFields.YOUR_X_ACC}
        name={FormFields.YOUR_X_ACC}
        value={yourXField.value}
        onBlur={(e: any) => {
          onChangeHandler(FormFields.YOUR_X_ACC, e);
        }}
        onFocus={(e: any) => {
          onChangeHandler(FormFields.YOUR_X_ACC, e);
        }}
        onChange={e => {
          onChangeHandler(FormFields.YOUR_X_ACC, e);
        }}
        type="text"
        step={'any'}
        autoComplete="off"
        spellCheck={false}
        autoFocus={false}
        onWheel={(e: any) => e?.target?.blur()}
      />
      {yourXField.errorMessage && yourXField.hasFocused && yourXField.hasError && (
        <ErrorMessage message={yourXField.errorMessage} />
      )}
      <S.Space />
      <TextInput2
        placeholder="Your telegram link/handle"
        id={FormFields.YOUR_TELEGRAM}
        name={FormFields.YOUR_TELEGRAM}
        value={yourTelegramField.value}
        onBlur={(e: any) => {
          onChangeHandler(FormFields.YOUR_TELEGRAM, e);
        }}
        onFocus={(e: any) => {
          onChangeHandler(FormFields.YOUR_TELEGRAM, e);
        }}
        onChange={e => {
          onChangeHandler(FormFields.YOUR_TELEGRAM, e);
        }}
        type="text"
        step={'any'}
        autoComplete="off"
        spellCheck={false}
        autoFocus={false}
        onWheel={(e: any) => e?.target?.blur()}
      />
    </S.Section>
  );
};

export default ContactInformationSection;
