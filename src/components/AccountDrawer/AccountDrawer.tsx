import * as S from './styled';
import Avatar from '../Avatar/Avatar';
import Text from '@/components/Text';
import { useWeb3React } from '@web3-react/core';
import { useAppSelector } from '@/state/hooks';
import { userGamefiByAddressSelector } from '@/state/user/selector';
import * as formatter from 'tc-formatter';
import { Copy, LogOut, Check } from 'react-feather';
import React, { useContext } from 'react';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { Tooltip } from 'antd';
import { WalletContext } from '@/contexts/wallet.context';
import AccountInfoSmall from '@/pages/layout/AccountInfo/AccountInfo.small';
import { CloseButton } from 'react-bootstrap';

interface AccountDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AccountDrawer = (props: AccountDrawerProps) => {
  const { open, onClose } = props;
  const { account } = useWeb3React();
  const { onDisconnect, onCleanUp } = useContext(WalletContext);
  const userGamefi = useAppSelector(userGamefiByAddressSelector)(account);
  const [copied, setCopied] = React.useState(false);
  const onCopyAddress = () => {
    copy(account || '');
    toast.success('Copied');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const renderAddress = () => {
    if (!account) return undefined;
    let comp = (
      <Text size="18" fontWeight="semibold">
        {formatter.ellipsisCenter({
          str: account,
        })}
      </Text>
    );
    if (userGamefi && userGamefi?.name) {
      comp = (
        <div>
          <Text size="18" fontWeight="semibold" color="button_primary" align="center">
            {userGamefi.name}
          </Text>
          <Text size="12" color="text_secondary" align="center">
            {account}
          </Text>
        </div>
      );
    }
    return (
      <S.Row>
        <S.AddressBox onClick={onCopyAddress}>
          {comp}
          {copied ? <Check size="14" color="green" className="ic-copy" /> : <Copy size="14" className="ic-copy" />}
        </S.AddressBox>
        <Tooltip title="Logout" placement="bottomRight">
          <S.LogoutIcon
            onClick={() => {
              onCleanUp(account);
              onDisconnect();
              onClose();
            }}
          >
            <LogOut size="18" />
          </S.LogoutIcon>
        </Tooltip>
      </S.Row>
    );
  };

  return (
    <S.Container
      style={{ boxShadow: 'none !important' }}
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      key="account-drawer"
      className="background"
      width="400"
      contentWrapperStyle={{ boxShadow: 'none' }}
    >
      <S.CloseIcon onClick={onClose}>
        <CloseButton />
      </S.CloseIcon>

      <S.DrawerHeader>
        <Avatar />
        {renderAddress()}
      </S.DrawerHeader>
      <S.Content>
        <AccountInfoSmall />
      </S.Content>
    </S.Container>
  );
};

export default AccountDrawer;
