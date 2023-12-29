import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { isDeepLinkRequired } from '@/utils';
import { sendMetamaskDeeplink } from '@/utils/metamask';
import { SupportedChainId } from '@/chains';
import { TransactionResponse } from '@ethersproject/abstract-provider';

interface TopupProps {
  amount: string;
  receiver: string;
}

const useTopup = () => {
  const { account, connector, provider, chainId } = useWeb3React();

  return React.useCallback(
    async ({ amount, receiver }: TopupProps) => {
      if (!account) {
        throw new Error('No account.');
      }
      if (isDeepLinkRequired()) {
        sendMetamaskDeeplink(receiver, amount, SupportedChainId.NOS);
        return;
      }
      const signer = provider?.getSigner(account);
      const tx = (await signer?.sendTransaction({
        from: account,
        to: receiver,
        value: amount,
      })) as TransactionResponse;
      await tx.wait();
    },
    [account, connector, provider, chainId],
  );
};

export default useTopup;
