import SectionImage from '@/assets/images/robot_build.png';
import { Row } from '@/components/Row';
import { Spinner } from '@/components/Spinner';
import Text from '@/components/Text';
import configs from '@/configs';
import { Image } from '@/modules/Wellcome/styled';
import React from 'react';
import { MessageCircle } from 'react-feather';
import SubmitFormModal from './SubmitFormModal';
import SubmitResultFormModal from './SubmitResultFormModal';
import BitcoinValiditySection from './components2/BitcoinValiditySection';
import BlockGasLimitSection from './components2/BlockGasLimitSection';
import BlockTimeSection from './components2/BlockTimeSection';
import ComputerDescriptionSection from './components2/ComputerDescriptionSection';
import ComputerNameSection from './components2/ComputerNameSection';
import ContactInformationSection from './components2/ContactInformationSection';
import DataAvailabilitySection from './components2/DataAvailabilitySection';
import FooterView from './components2/FooterView';
import MinGasPriceSection from './components2/MinGasPriceSection';
import NetworkSection from './components2/NetworkSection';
import PreInstalledDappsSection from './components2/PreInstalledDappsSection';
import ProjectInformationSection from './components2/ProjectInformationSection';
import RollupProtocolSection from './components2/RollupProtocolSection';
import TokenPayingGasSection from './components2/TokenPayingGasSection';
import WithdrawalPeriodSection from './components2/WithdrawalPeriodSection';
import { useBuy } from './providers/Buy.hook';
import * as S from './styled';
import useRouteHelper from '@/hooks/useRouterHelper';

type Props = {
  onSuccess?: () => void;
};

const BuyPage = React.memo((props: Props) => {
  const { onSuccess } = props;
  const { requestContactUs } = useRouteHelper();
  const {
    availableListData,
    isAvailableListFetching,
    confirmSubmitHandler,
    showSubmitForm,
    setShowSubmitForm,
    showSubmitFormResult,
    setShowSubmitFormResult,
  } = useBuy();

  // const urlParams = new URLSearchParams(search);
  // const typeData = urlParams?.get('type')?.replace('/', '') || undefined;

  if (isAvailableListFetching)
    return (
      <S.Container>
        <Spinner color="button_primary" className="spinner" />;
      </S.Container>
    );

  if (!availableListData) return <></>;

  return (
    <>
      <S.Container>
        <S.LeftContainer>
          <div className="sticky">
            <Image src={SectionImage} />
            <Row align="center" justify="center" gap={16}>
              <MessageCircle />
              <div>
                <Text size="14" align="center">
                  Have questions about Bitcoin L2?
                </Text>
                <Text
                  size="13"
                  align="center"
                  className="discord"
                  onClick={() => {
                    requestContactUs();
                  }}
                >
                  Talk to our team
                </Text>
              </div>
            </Row>
          </div>
        </S.LeftContainer>
        <S.RightContainer>
          <Text size="32" fontWeight="semibold" align="left" className="header">
            Customize your Bitcoin L2
          </Text>
          <Text size="20" fontWeight="regular" align="left" className="header">
            Bitcoin L2s are secure, low-cost, and lightning-fast L2 blockchains — fully loaded with DEX, DAO, NFT
            marketplace, and the whole shebang!
          </Text>
          <div className="sectionList">
            {/* Computer Name */}
            {/* <ComputerNameSection /> */}

            {/* Computer Description  */}
            <ComputerDescriptionSection />

            {/* Project Information  */}
            {/* <ProjectInformationSection /> */}

            {/* Contact information  */}
            <ContactInformationSection />

            {/* Network */}
            <NetworkSection />

            {/* Rollup Protocol */}
            <RollupProtocolSection />

            {/* Bitcoin Validity */}
            <BitcoinValiditySection />

            {/* DataAvaibility Chain */}
            <DataAvailabilitySection />

            {/* Block Time */}
            <BlockTimeSection />

            {/* Min Gas Price */}
            <MinGasPriceSection />

            {/* Gas Limit */}
            <BlockGasLimitSection />

            {/* Withdrawal Period (SLIDER)*/}
            <WithdrawalPeriodSection />

            {/* Token for paying Transaction Gas */}
            <TokenPayingGasSection />

            {/* Plugin */}
            <PreInstalledDappsSection />
          </div>
        </S.RightContainer>
      </S.Container>
      <FooterView onSuccess={onSuccess} />

      {showSubmitForm && (
        <SubmitFormModal
          show={showSubmitForm}
          onClose={() => {
            setShowSubmitForm(false);
          }}
          onSuccess={async () => {
            // handeSubmitForm();
            confirmSubmitHandler();
          }}
        />
      )}

      {showSubmitFormResult && (
        <SubmitResultFormModal
          show={showSubmitFormResult}
          onClose={() => {
            setShowSubmitFormResult(false);
          }}
          onSuccess={async () => {}}
        />
      )}
    </>
  );
});

export default BuyPage;
