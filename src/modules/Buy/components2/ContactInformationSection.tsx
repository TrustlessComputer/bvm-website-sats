import { TextInput2 } from '@/components/TextInput/TextInput2';
import { isEmpty } from 'lodash';
import { FormFields } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Title from '../components/Title';
import { useBuy } from '../providers/Buy.hook';
import * as S from '../styled';

const ContactInformationSection = () => {
  const { yourXField, setYourTelegramField, yourTelegramField, setYourXField } = useBuy();

  const onChangeHandler = async (field: FormFields, e: any) => {
    const text = e.target.value;
    if (field == FormFields.YOUR_X_ACC) {
      setYourXField({
        ...yourXField,
        value: text,
        hasFocused: true,
        hasError: !!yourXField.isRequired && isEmpty(text),
      });
    }

    if (field == FormFields.YOUR_TELEGRAM) {
      setYourTelegramField({
        ...yourTelegramField,
        value: text,
        hasFocused: true,
        hasError: !!yourTelegramField.isRequired && isEmpty(text),
      });
    }
  };

  return (
    <S.RowSection>
      <S.ContactLeftView>
        <Title text={'Your X handle'} isRequired />
        <S.Space />
        <TextInput2
          placeholder="Enter your X handle"
          id={FormFields.YOUR_X_ACC}
          name={FormFields.YOUR_X_ACC}
          value={yourXField.value}
          className={`${yourXField.hasFocused && yourXField.hasError ? 'error' : ''}`}
          onBlur={(e: any) => {
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
        {yourXField.hasFocused && yourXField.hasError && <ErrorMessage message={yourXField.errorMessage} />}
      </S.ContactLeftView>

      <S.ContactRightView>
        <Title text={'Your telegram handle'} />
        <S.Space />
        <TextInput2
          placeholder="Enter your telegram handle"
          id={FormFields.YOUR_TELEGRAM}
          name={FormFields.YOUR_TELEGRAM}
          value={yourTelegramField.value}
          onBlur={(e: any) => {
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
        {yourXField.hasFocused && yourXField.hasError && <ErrorMessage message="" />}
      </S.ContactRightView>
    </S.RowSection>
  );
};

export default ContactInformationSection;
