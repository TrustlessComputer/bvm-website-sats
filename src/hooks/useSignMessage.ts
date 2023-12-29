import { useWeb3React } from '@web3-react/core';

interface ISignMessageParams {
  tcAddress: string;
  message: string;
}

const useSignMessage = () => {
  const { connector } = useWeb3React();

  return async (params: ISignMessageParams): Promise<string> => {
    return connector.provider?.request({
      method: 'personal_sign',
      params: [params.message, params.tcAddress],
    }) as Promise<string>;
  };
};

export default useSignMessage;
