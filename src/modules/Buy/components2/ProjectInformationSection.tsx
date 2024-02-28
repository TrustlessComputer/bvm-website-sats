import { TextInput2 } from '@/components/TextInput/TextInput2';

import { FormFields } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import Title from '../components/Title';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';
import { isEmpty } from 'lodash';

const ProjectInformationSection = () => {
  const { projectWebSiteField, setProjectXField, projectXField, setProjectWebSiteField } = useBuyProvider();

  const PROJECT_X_ID = FormFields.PROJECT_X;
  const PROJECT_WEBSITE_ID = FormFields.PROJECT_WEBSITE;

  const onChangeHandler = async (field: FormFields, e: any) => {
    const text = e.target.value;
    if (field == PROJECT_X_ID) {
      setProjectXField({
        ...projectXField,
        value: text,
        hasError: projectXField.isRequired && isEmpty(text),
      });
    }

    if (field == PROJECT_WEBSITE_ID) {
      setProjectWebSiteField({
        ...projectWebSiteField,
        value: text,
        hasError: projectWebSiteField.isRequired && isEmpty(text),
      });
    }
  };

  return (
    <S.Section>
      <Title text={'Project information'} />
      <S.Space />
      <TextInput2
        placeholder="Project X account link/handle"
        id={PROJECT_X_ID}
        name={PROJECT_X_ID}
        value={projectXField.value}
        onBlur={(e: any) => {
          onChangeHandler(PROJECT_X_ID, e);
        }}
        onFocus={(e: any) => {
          onChangeHandler(PROJECT_X_ID, e);
        }}
        onChange={e => {
          onChangeHandler(PROJECT_X_ID, e);
        }}
        type="text"
        step={'any'}
        autoComplete="off"
        spellCheck={false}
        autoFocus={false}
        onWheel={(e: any) => e?.target?.blur()}
      />
      {projectXField.errorMessage && projectXField.hasFocused && projectXField.hasError && (
        <ErrorMessage message={projectXField.errorMessage} />
      )}
      <S.Space />
      <TextInput2
        placeholder="Your website"
        id={PROJECT_WEBSITE_ID}
        name={PROJECT_WEBSITE_ID}
        value={projectWebSiteField.value}
        onBlur={(e: any) => {
          onChangeHandler(PROJECT_WEBSITE_ID, e);
        }}
        onFocus={(e: any) => {
          onChangeHandler(PROJECT_WEBSITE_ID, e);
        }}
        onChange={e => {
          onChangeHandler(PROJECT_WEBSITE_ID, e);
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

export default ProjectInformationSection;
