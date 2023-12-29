import type { JsonRpcProvider } from '@ethersproject/providers';
import { useMemo } from 'react';
import { ethers } from 'ethers';

interface IProps {
  rpc: string;
}

function useProvider<T extends JsonRpcProvider = JsonRpcProvider>(props: IProps): T | undefined {
  return useMemo(() => {
    try {
      return new ethers.providers.JsonRpcProvider(props.rpc);
    } catch (error) {
      return undefined;
    }
  }, []) as T;
}

export default useProvider;
