import { useAppDispatch } from '@/state/hooks';
import { atom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { Connection } from '@/connection/types';
import { updateSelectedWallet } from '@/state/user/reducer';
import { didUserReject } from '@/connection/utils';
import { getConnection } from '@/connection/connection';
import { useWeb3React } from '@web3-react/core';
import { getErrorMessage, isDeepLinkRequired } from '@/utils';
import { openMetamaskDeeplink } from '@/utils/metamask';
import toast from 'react-hot-toast';

export enum ActivationStatus {
  PENDING,
  ERROR,
  IDLE,
}

type ActivationPendingState = { status: ActivationStatus.PENDING; connection: Connection };
type ActivationErrorState = { status: ActivationStatus.ERROR; connection: Connection; error: any };
const IDLE_ACTIVATION_STATE = { status: ActivationStatus.IDLE } as const;
type ActivationState = ActivationPendingState | ActivationErrorState | typeof IDLE_ACTIVATION_STATE;

const activationStateAtom = atom<ActivationState>(IDLE_ACTIVATION_STATE);

const useTryActivation = () => {
  const dispatch = useAppDispatch();
  const setActivationState = useUpdateAtom(activationStateAtom);
  const { connector } = useWeb3React();
  const connection = getConnection(connector);

  const tryActivation = async (chainId?: number): Promise<string | undefined> => {
    // Skips wallet connection if the connection should override the default
    // behavior, i.e. install MetaMask or launch Coinbase app
    if (connection.overrideActivate?.(chainId)) return;
    if (isDeepLinkRequired()) {
      openMetamaskDeeplink();
      return;
    }

    try {
      setActivationState({ status: ActivationStatus.PENDING, connection });

      console.debug(`Connection activating: ${connection.getName()}`);
      dispatch(updateSelectedWallet({ wallet: undefined }));
      await connection.connector.activate();

      const addresses = (await connection.connector.provider?.request({
        method: 'eth_accounts',
      })) as string[];

      console.debug(`Connection activated: ${connection.getName()}`);
      dispatch(updateSelectedWallet({ wallet: connection.type }));

      // Clears pending connection state
      setActivationState(IDLE_ACTIVATION_STATE);

      // await switchChain(SupportedChainId.NOS);

      if (addresses && addresses.length > 0) {
        return addresses[0];
      }
    } catch (error) {
      // Gracefully handles errors from the user rejecting a connection attempt
      if (didUserReject(connection, error)) {
        setActivationState(IDLE_ACTIVATION_STATE);
      } else {
        // TODO(WEB-1859): re-add special treatment for already-pending injected errors & move debug to after didUserReject() check
        console.debug(`Connection failed: ${connection.getName()}`);
        console.error(error);
        setActivationState({ status: ActivationStatus.ERROR, connection, error });
      }
      const { message } = getErrorMessage(error, 'useTryActivation');
      toast.error(message);

      throw error;
    }
  };

  return tryActivation;
};

export default useTryActivation;
