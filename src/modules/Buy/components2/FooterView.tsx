import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import { Row } from '@/components/Row';
// import { Spinner } from '@/components/Spinner';
import Text from '@/components/Text';
import configs from '@/configs';
import { memo } from 'react';
import { dayDescribe } from '../Buy.helpers';
import { useBuy } from '../providers/Buy.hook';
import * as S from '../styled';

const FooterView = ({ onSuccess }: { onSuccess?: any }) => {
  const {
    withdrawalPeriodSelected,
    availableListData,
    networkSelected,
    blockTimeSelected,
    isMainnet,
    estimateTotalCostFetching,
    estimateTotalCostData,
    submitHandler,
    confirmBtnTitle,
  } = useBuy();

  return (
    <S.FooterView>
      <S.FooterInfo>
        <Row align="center">
          <IconSVG maxWidth="28" src={`${configs.CDN_APP_ICON_URL}/ic-computer.svg`} className="mr-8" />
          <Text size="18" fontWeight="semibold">
            Bitcoin L2
          </Text>
        </Row>
        {!!availableListData && (
          <Row gap={42}>
            <div className="grid-content">
              <Text size="16">
                <span>• Network: </span>
                {(availableListData.network || []).find(item => item.value === networkSelected)?.valueStr}
              </Text>
              <Text size="16">
                <span>• Block Time: </span>
                {blockTimeSelected}s
              </Text>
            </div>
            <div className="grid-content">
              <Text size="16">
                <span>• Rollup Protocol: </span>
                Optimistic Rollups
              </Text>
              <Text size="16">
                <span>• Withdrawal Period: </span>
                {dayDescribe(withdrawalPeriodSelected).timer}
              </Text>
            </div>
          </Row>
        )}
        <Text color="text_secondary" size="14">
          {isMainnet ? 'This process can take up to 12 hours' : 'This process can take up to 20 minutes'}
        </Text>
      </S.FooterInfo>
      {!isMainnet ? (
        <S.FooterActions>
          <Text size="26" fontWeight="semibold" align="left" className="cost">
            {'Free'}
          </Text>
          <Button
            sizes="normal"
            // loading={{ isLoading: !!estimateTotalCostFetching }}
            disabled={!!estimateTotalCostFetching}
            onClick={() => submitHandler(onSuccess)}
          >
            <IconSVG src={`${configs.CDN_APP_ICON_URL}/rocket.svg`} maxWidth="24" />
            {confirmBtnTitle}
          </Button>
        </S.FooterActions>
      ) : (
        <S.FooterActions2>
          <Row align="center">
            <IconSVG maxWidth="28" src={`${configs.CDN_APP_ICON_URL}/ic-computer.svg`} className="mr-8" />
            <Text size="18" fontWeight="semibold">
              Service costs
            </Text>
          </Row>
          <Row gap={42}>
            <div className="grid-content">
              <Text size="16">
                <span>• Setup cost: </span>
                {estimateTotalCostData?.SetupCode || '0'}
              </Text>
              <Text size="16">
                <span>• Operation cost: </span>
                {estimateTotalCostData?.OperationCost || '0'}
              </Text>
              <Text size="16">
                <span>• Rollup cost: </span>
                {estimateTotalCostData?.RollupCost || '0'}
              </Text>
            </div>
            <S.BreakLine></S.BreakLine>
          </Row>
          <S.RowActionInfor>
            <Text size="26" fontWeight="semibold" align="left" className="cost">
              {`Total: ${estimateTotalCostData?.TotalCost} BVM`}
            </Text>
            <Button
              sizes="normal"
              // loading={{ isLoading: !!estimateTotalCostFetching }}
              disabled={!!estimateTotalCostFetching}
              onClick={() => submitHandler(onSuccess)}
            >
              <IconSVG src={`${configs.CDN_APP_ICON_URL}/rocket.svg`} maxWidth="24" />
              {confirmBtnTitle}
            </Button>
          </S.RowActionInfor>
        </S.FooterActions2>
      )}
    </S.FooterView>
  );
};

export default memo(FooterView);
