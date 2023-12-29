import * as S from './styled';
import { useAppSelector } from '@/state/hooks';
import { accountInfoSelector } from '@/state/user/selector';
import Text from '@/components/Text';
import Button from '@/components/Button';
import * as formatter from 'tc-formatter';
import { Copy, Send } from 'react-feather';
import { QRCode, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import React from 'react';
import ConfirmWithdraw from '@/components/ConfirmWithdraw/ConfirmWithdraw';
import { withdrawableRewardSelector } from '@/state/order/selector';
import { ConfirmWithdrawReward } from '@/components/ConfirmWithdrawReward';
import useRouteHelper from '@/hooks/useRouterHelper';
import { Clock, Info } from 'react-feather';
import QuickStart from '@/components/QuickStart';

const AccountInfo = () => {
  const accountInfo = useAppSelector(accountInfoSelector);
  const { goAccountPage } = useRouteHelper();
  const [showWithdrawFund, setShowWithdrawFund] = React.useState(false);
  const [showWithdrawReward, setShowWithdrawReward] = React.useState(false);
  const { isWithdrawableReward, formatted: rewardFormatted } = useAppSelector(withdrawableRewardSelector);
  const [isWithdrawRewardFinished, setIsWithdrawRewardFinished] = React.useState(false);

  const onCopyTopUpAddress = () => {
    copy(accountInfo?.topUpWalletAddress || '');
    toast.success('Copied');
  };

  React.useEffect(() => {
    if (!accountInfo) {
      setShowWithdrawReward(false);
    }
  }, []);

  if (!accountInfo) return <></>;

  return (
    <>
      <S.Container>
        <QuickStart />
        <Text size="24" color="text_secondary" align="center" style={{ position: 'relative', width: '100%' }}>
          Your Credits
          <span>
            <Tooltip
              title="The credits will be deducted automatically from the account to cover the costs of setting up and operating your L2 computers."
              placement="bottomLeft"
            >
              <S.Info>
                <Info size={22} />
              </S.Info>
            </Tooltip>
          </span>
          <Tooltip title="History" placement="bottom">
            <S.History
              onClick={() => {
                goAccountPage();
              }}
            >
              <Clock size={22} />
            </S.History>
          </Tooltip>
        </Text>
        <Text size="48" color="button_primary" fontWeight="semibold">
          {accountInfo.balanceFormatted} BVM
        </Text>
        {isWithdrawableReward && (
          <Button
            sizes="stretch"
            variants="outline"
            onClick={() => setShowWithdrawReward(true)}
            disabled={isWithdrawRewardFinished}
          >
            {`Collect ${rewardFormatted} BVM fees`}
          </Button>
        )}

        {accountInfo.isNeedTopup ? (
          <S.WarningZone>
            Please send a minimum of {accountInfo.needToTopupBalanceFormatted} BVM to the address below to maintain
            access to your layer 2 network(s).
          </S.WarningZone>
        ) : (
          <Text size="14" maxWidth="250px" align="center" color="text_secondary">
            Please send BVM to the address below to conveniently add credits to your account whenever needed.
          </Text>
        )}

        <S.QRCodeBox>
          <QRCode value={accountInfo.topUpWalletAddress} size={220} bordered={false} />
        </S.QRCodeBox>
        <S.AddressBox>
          <S.AddressContentBox>
            <Text size="18" color="text_secondary" fontWeight="semibold">
              {formatter.ellipsisCenter({
                str: accountInfo.topUpWalletAddress,
                limit: 10,
              })}
            </Text>
            <S.Icons>
              <Tooltip title="Copy topup address" placement="bottomRight">
                <Copy size="18" className="ic-copy" onClick={onCopyTopUpAddress} />
              </Tooltip>
              {accountInfo.isWithdrawable && (
                <Tooltip title="Withdraw funds" placement="bottomRight">
                  <Send size="18" className="ic-copy" onClick={() => setShowWithdrawFund(true)} />
                </Tooltip>
              )}
            </S.Icons>
          </S.AddressContentBox>
        </S.AddressBox>
        <S.Actions>
          {accountInfo.isNeedTopup ? (
            <Button
              sizes="stretch"
              onClick={() => {
                window.open(
                  `https://newbitcoincity.com/topup?address=${accountInfo?.topUpWalletAddress || ''}&amount=${
                    accountInfo?.needToTopupBalanceFormatted
                  }`,
                );
              }}
            >
              Get {accountInfo.needToTopupBalanceFormatted} BVM now
            </Button>
          ) : (
            <Button
              sizes="stretch"
              onClick={() => {
                window.open(
                  `https://newbitcoincity.com/topup?address=${accountInfo?.topUpWalletAddress || ''}&amount=${3}`,
                );
              }}
            >
              Get BVM now
            </Button>
          )}
        </S.Actions>
      </S.Container>
      <ConfirmWithdraw show={showWithdrawFund} onClose={() => setShowWithdrawFund(false)} />
      <ConfirmWithdrawReward
        show={showWithdrawReward}
        onClose={() => setShowWithdrawReward(false)}
        onSuccess={() => setIsWithdrawRewardFinished(true)}
      />
    </>
  );
};

export default AccountInfo;
