import * as S from './styled';
import React, { useContext } from 'react';
import DeployButton from '@/modules/Wellcome/DeployButton';
import SectionImage from '@/assets/images/image_section_1.png';
import { Image } from '@/modules/Wellcome/styled';
import IconSVG from '@/components/IconSVG';
import configs from '@/configs';
import { Row } from '@/components/Row';
import { ModalsContext } from '@/contexts/modals.context';

const DESCRIPTION = [
  'Bitcoin L2s are low-cost and lightning-fast Bitcoin L2 blockchains — fully loaded with DEX, DAO, NFT marketplace, and the whole shebang!',
];

const Introduce = () => {
  const { toggleContact } = useContext(ModalsContext);

  const renderDescription = (text: string) => (
    <S.AppText size="20" key={text}>
      {text}
    </S.AppText>
  );

  return (
    <S.Container
      isEqual={false}
      isLeftLarge={false}
      leftView={
        <S.LeftContent>
          <div>
            <S.AppText size="38" fontWeight="bold">
              Launch your own
            </S.AppText>
            <S.AppText size="38" fontWeight="bold">
              <span className="span-text">Bitcoin L2 blockchain</span>
            </S.AppText>
            <S.AppText size="38" fontWeight="bold">
              in one click.
            </S.AppText>
          </div>
          <S.BoxDescription>{DESCRIPTION.map(renderDescription)}</S.BoxDescription>
          <S.Actions>
            <Row gap={42}>
              <DeployButton paddingHorizontal={80} />
              <S.ButtonContact
                variants="ghost"
                textColor="button_secondary"
                variantColor="button_secondary"
                borderRadius={100}
                onClick={toggleContact}
              >
                Contact sales{' '}
                <IconSVG
                  src={`${configs.CDN_APP_ICON_URL}/arrow-right-small.svg`}
                  color="button_secondary"
                  type="fill"
                  maxWidth="24"
                />
              </S.ButtonContact>
            </Row>
            {/*<S.LinkButtons align="center">*/}
            {/*  /!*<S.ButtonGuild*!/*/}
            {/*  /!*  variants="ghost"*!/*/}
            {/*  /!*  sizes="small"*!/*/}
            {/*  /!*  gap={8}*!/*/}
            {/*  /!*  onClick={() => {*!/*/}
            {/*  /!*    window.open(configs.DOCS_TRUSTLESS_URL, '_blank');*!/*/}
            {/*  /!*  }}*!/*/}
            {/*  /!*>*!/*/}
            {/*  /!*  Read the developer guides <IconSVG src={`${configs.CDN_APP_ICON_URL}/arrow-right-small.svg`} />*!/*/}
            {/*  /!*</S.ButtonGuild>*!/*/}
            {/*  <S.ButtonGuild*/}
            {/*    variants="ghost"*/}
            {/*    sizes="small"*/}
            {/*    gap={8}*/}
            {/*    onClick={() => {*/}
            {/*      window.open(configs.DISCORD_URL, '_blank');*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    Join the community <IconSVG src={`${configs.CDN_APP_ICON_URL}/arrow-right-small.svg`} />*/}
            {/*  </S.ButtonGuild>*/}
            {/*</S.LinkButtons>*/}
          </S.Actions>
          <S.Socials>
            <a target="_blank" href={configs.TWITTER_URL}>
              <img alt="tw" src={`${configs.CDN_URL}/nbc/icons/ic-tw-jackpot.svg`} className="icon" />
            </a>
            <a target="_blank" href={configs.DISCORD_TRUSTLESS_URL}>
              <img alt="discord" src={`${configs.CDN_URL}/nbc/icons/ic-discord-jackpot.svg`} className="icon" />
            </a>
          </S.Socials>
        </S.LeftContent>
      }
      rightView={
        <S.RightContent>
          <Image src={SectionImage} />
        </S.RightContent>
      }
    />
  );
};

export default Introduce;
