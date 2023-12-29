import * as S from './styled';
import Button from '@/components/Button';
import React, { useContext } from 'react';
import { useIsAuthenticated } from '@/state/user/hooks';
import { SupportedChainId } from '@/chains';
import { WalletContext } from '@/contexts/wallet.context';
import IconSVG from '@/components/IconSVG';
import configs from '@/configs';
import Selection, { SelectionProps } from '@/modules/Home/components/Selection/Selection';
import Text from '@/components/Text';
import useRouteHelper from '@/hooks/useRouterHelper';
import { AccountDrawer } from '@/components/AccountDrawer';
import useToggle from '@/hooks/useToggle';

interface IProps extends SelectionProps {}

const HeaderRow = ({ type, network, onChangeNetwork, onChangeType }: IProps) => {
  const isAuthenticated = useIsAuthenticated();
  const { goBuildPage } = useRouteHelper();
  const [loading, setLoading] = React.useState(false);
  const { onConnect } = useContext(WalletContext);
  const [showDrawer, onToggleDrawer] = useToggle(false);

  const handleConnect = async () => {
    setLoading(true);
    await onConnect(SupportedChainId.NOS);
    setLoading(false);
  };
  return (
    <S.Container>
      <S.Actions>
        {isAuthenticated ? (
          <Button
            sizes="normal"
            variants="primary"
            onClick={() => {
              goBuildPage();
            }}
            disabled={configs.DISABLED_FEATURES.DEPLOY}
          >
            <IconSVG src={`${configs.CDN_APP_ICON_URL}/rocket.svg`} maxWidth="24" />
            <div>
              <Text color="text_reverse" fontWeight="semibold">
                Get started for free
              </Text>
            </div>
          </Button>
        ) : (
          <Button
            sizes="normal"
            variants="outline"
            loading={{ isLoading: loading, color: 'button_primary' }}
            disabled={loading}
            onClick={handleConnect}
          >
            Connect wallet
          </Button>
        )}
        {!!isAuthenticated && <S.MenuBar onClick={onToggleDrawer} />}
        <AccountDrawer open={showDrawer} onClose={onToggleDrawer} />
      </S.Actions>
      <Selection type={type} network={network} onChangeType={onChangeType} onChangeNetwork={onChangeNetwork} />
    </S.Container>
  );
};

export default HeaderRow;
