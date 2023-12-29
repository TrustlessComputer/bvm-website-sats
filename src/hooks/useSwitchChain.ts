import toast from 'react-hot-toast';
import { SupportedChainId } from '@/chains';
import { switchChain } from '@/utils/switchChain';

const useSwitchNetwork = () => {
  return async (chainId: SupportedChainId) => {
    try {
      await switchChain(chainId);
    } catch (error: any) {
      if (typeof error === 'string') toast.error(error);
      else {
        toast.error(error.message || 'Something went wrong');
      }
    }
  };
};

export default useSwitchNetwork;
