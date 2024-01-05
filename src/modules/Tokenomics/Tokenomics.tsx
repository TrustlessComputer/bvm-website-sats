import * as S from '@/modules/Tokenomics/styled';
import Text from '@/components/Text';
import IconSVG from '@/components/IconSVG';
import configs from '@/configs';
import Button from '@/components/Button';
import { Contents, IContent } from '@/modules/Tokenomics/constants';

const Tokenomics = () => {
  const renderItem = (item: IContent) => {
    return (
      <S.ItemBox key={item.title}>
        <IconSVG src={item.img} maxWidth="140px" />
        <Text size="18" fontFamily="Sora-SemiBold">
          {item.title}
        </Text>
        <Text size="16" fontFamily="Sora">
          {item.desc}
        </Text>
      </S.ItemBox>
    );
  };

  return (
    <S.Container>
      <S.HeaderBox>
        <S.HeaderContentBox>
          <Text size="48" fontFamily="Sora-SemiBold">
            What is BVM?
          </Text>
          <Text size="18" fontFamily="Sora" maxWidth="800px">
            BVM is the native cryptocurrency of Bitcoin Virtual Machine. When you use a Bitcoin dapp powered by Bitcoin
            Virtual Machine, you’ll pay a transaction fee in BVM.
          </Text>
          <Button
            sizes="large"
            className="mt-24"
            onClick={() => {
              window.open(configs.BUY_TC_URL, '_blank');
            }}
            bgColor="#FF7E21"
          >
            Get BVM
          </Button>
        </S.HeaderContentBox>
        <S.HeaderImageBox>
          <IconSVG
            src={`${configs.CDN_URL}/nbc/images/token_banner.svg`}
            maxWidth="380"
            color="text_primary"
            type="stroke"
          />
        </S.HeaderImageBox>
      </S.HeaderBox>
      <S.GridBox>{Contents.map(renderItem)}</S.GridBox>
    </S.Container>
  );
};

export default Tokenomics;
