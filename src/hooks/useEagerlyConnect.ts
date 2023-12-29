import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Connector } from '@web3-react/types';
import { Connection } from '@/connection/types';
import { getConnection } from '@/connection/connection';
import { updateSelectedWallet } from '@/state/user/reducer';
import { useEffect } from 'react';

const connect = async (connector: Connector) => {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly();
    } else {
      await connector.activate();
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`);
  }
};

const useEagerlyConnect = () => {
  const dispatch = useAppDispatch();

  const selectedWallet = useAppSelector(state => state.user.selectedWallet);

  let selectedConnection: Connection | undefined;
  if (selectedWallet) {
    try {
      selectedConnection = getConnection(selectedWallet);
    } catch {
      dispatch(updateSelectedWallet({ wallet: undefined }));
    }
  }

  useEffect(() => {
    if (selectedConnection) {
      connect(selectedConnection.connector);
    } // The dependency list is empty so this is only run once on mount
  }, []);
};

export default useEagerlyConnect;
