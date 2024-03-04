import { useContext, useEffect, useState } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import { SupportedChainId } from '@/chains';

export enum IframeEventName {
  connect_signature_trustless = 'connect_signature_trustless',
}
export interface IFrameEvent {
  data: {
    name: IframeEventName;
  };
}

const Hydrated = ({ children }: { children?: any }) => {
  const [hydration, setHydration] = useState(false);
  const { onConnect } = useContext(WalletContext);

  const handleConnect = async () => {
    await onConnect(SupportedChainId.NOS);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHydration(true);
    }
  }, []);

  useEffect(() => {
    if (hydration && window) {
      window.addEventListener('message', (event: IFrameEvent & any) => {
        try {
          switch (event.data) {
            case IframeEventName.connect_signature_trustless:
              handleConnect();
              break;
            default:
              break;
          }
        } catch (error) {
          // console.log('error', event);
          // console.log(error);
        }
      });
    }
  }, [hydration]);

  return hydration ? children : null;
};

export default Hydrated;
