import { StyledEmpty } from './styled';
import configs from '@/configs';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';

export type TEmpty = {
  infoText?: string;
  isTable?: boolean;
};

const Empty = ({ infoText = '', isTable = false }: TEmpty) => {
  return (
    <StyledEmpty className={'notFound'} isTable={isTable}>
      <IconSVG src={`${configs.CDN_URL}/icons/ic-empty.svg`} color="text_secondary" type="stroke" maxWidth="120" />
      {!!infoText && (
        <Text size="28" fontWeight="semibold">
          {infoText}
        </Text>
      )}
    </StyledEmpty>
  );
};

export default Empty;
