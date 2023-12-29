import * as S from '@/components/AccountStatus/styled';
import Button from '@/components/Button';
import { useWeb3React } from '@web3-react/core';
import React, { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import { SupportedChainId } from '@/chains';
import { useIsAuthenticated } from '@/state/user/hooks';
import { Spinner } from '@/components/Spinner';
import { AccountDrawer } from '@/components/AccountDrawer';
import useToggle from '@/hooks/useToggle';
import { Avatar } from '@/components/Avatar';
import { ColorsTheme } from '@/theme/colors';
import Text from '@/components/Text';

interface IProps {
  parentDark?: boolean;
}

interface Color {
  text: keyof ColorsTheme;
  textConnected?: keyof ColorsTheme;
  spinner: keyof ColorsTheme;
  background?: keyof ColorsTheme;
  variants: string;
}

const AccountStatus = (props: IProps) => {
  const { parentDark = false } = props;
  const { account, chainId } = useWeb3React();
  const { onConnect } = useContext(WalletContext);
  const isAuthenticated = useIsAuthenticated();
  const [isInited, setInited] = React.useState(false);
  const [showDrawer, onToggleDrawer] = useToggle(false);

  const color = React.useMemo((): Color => {
    const text = parentDark ? 'text_reverse' : 'text_reverse';
    const textConnected = parentDark ? 'text_reverse' : 'button_primary';
    const spinner = text;
    const background = parentDark ? 'text_reverse' : 'button_primary';
    const variants = parentDark ? 'outline' : 'primary';

    return {
      text,
      spinner,
      background,
      variants,
      textConnected,
    };
  }, [parentDark]);

  const [loading, setLoading] = React.useState(false);

  const accountState = React.useMemo(() => {
    const isSwitchNetwork = chainId !== SupportedChainId.NOS;
    return { isSwitchNetwork, isAuthenticated };
  }, [account, chainId, isAuthenticated]);

  const handleConnect = async () => {
    setLoading(true);
    await onConnect(SupportedChainId.NOS);
    setLoading(false);
  };

  const renderConnect = () => {
    return (
      <Button
        onClick={handleConnect}
        loading={{ isLoading: loading, color: color.spinner }}
        textColor={color.text}
        variants={color.variants as any}
        variantColor={color.background}
        disabled={loading}
      >
        Connect wallet
      </Button>
    );
  };

  const renderAccount = () => {
    return (
      <S.AddressBox onClick={onToggleDrawer}>
        <Text color={color.textConnected} fontWeight="semibold">
          {account?.slice(0, 6)}
        </Text>
        <Avatar size={22} />
      </S.AddressBox>
    );
  };

  const renderContent = () => {
    if (!isInited) {
      return <Spinner size={24} color={color.spinner} />;
    }
    if (!accountState.isAuthenticated) {
      return renderConnect();
    }
    return renderAccount();
  };

  React.useEffect(() => {
    setTimeout(() => {
      setInited(true);
    }, 500);
  }, []);

  return (
    <S.Container>
      {renderContent()}
      <AccountDrawer open={showDrawer} onClose={onToggleDrawer} />
    </S.Container>
  );
};

export default AccountStatus;
