import Text from '@/components/Text';
import { TextInput2 } from '@/components/TextInput/TextInput2';
import Title from '../components/Title';
import * as S from '../styled';

const ComputerNameSection = () => {
  return (
    <S.Section>
      <Title text={'Computer Name'} />
      <S.Space />
      <TextInput2
        placeholder=""
        id={'ComputerName-ID'}
        name={'FormFields.chainName'}
        value={buyBuilderState.chainName}
        onBlur={e => {
          onChangeComputerNameHandler(e.target.value);
        }}
        onChange={e => {
          const chainName = e.target.value;
          setBuyBuilderState({
            ...buyBuilderState,
            chainName: chainName,
          });
          onChangeComputerNameHandler(chainName);
        }}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            handleSubmit({
              bypassEmail: false,
            });
          }
        }}
        type="text"
        step={'any'}
        autoComplete="off"
        spellCheck={false}
        autoFocus={true}
        onWheel={(e: any) => e?.target?.blur()}
      />
      {subdomainErrorMessage && !isTyping && (
        <Text size="14" fontWeight="regular" color="negative">
          {subdomainErrorMessage}
        </Text>
      )}
    </S.Section>
  );
};

export default ComputerNameSection;
