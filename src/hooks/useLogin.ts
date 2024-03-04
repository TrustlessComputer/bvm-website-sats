import { useWeb3React } from '@web3-react/core';
import client from '@/services/client';
import useSignMessage from '@/hooks/useSignMessage';
import { useAppDispatch } from '@/state/hooks';
import storageAuthen from '@/storage/storage.authen';
import { setAuthen } from '@/state/user/reducer';
import useAuthenToken from '@/hooks/useAuthenToken';
import { axiosSetAccessToken } from '@/services/client';
import { getErrorMessage } from '@/utils';
import toast from 'react-hot-toast';

const useLogin = () => {
  const { connector } = useWeb3React();
  const onSignMessage = useSignMessage();
  const dispatch = useAppDispatch();
  const { onRemoveAuthen } = useAuthenToken();

  const onLogin = async (tcAddress: string) => {
    try {
      if (!connector) {
        throw new Error('No connector found.');
      }
      const { nonce } = await client.getNonce({
        tcAddress,
      });

      // console.log(' DEBUG --1 --- ', nonce);

      // sign message
      const signature = await onSignMessage({
        tcAddress,
        message: nonce,
      });

      // console.log(' DEBUG -- 2 --- ', signature);

      // verify signature
      const { isVerified, token, refreshToken } = await client.verifySignature({
        tcAddress,
        signature: signature || '',
      });

      // console.log(' DEBUG -- 3 --- ', { isVerified, token, refreshToken });

      if (isVerified) {
        storageAuthen.setToken({
          tcAddress,
          accessToken: token,
          refreshToken,
        });
        dispatch(setAuthen({ tcAddress, isAuthen: true }));
        axiosSetAccessToken(token);
      } else {
        onRemoveAuthen(tcAddress);
        throw new Error('Signature is invalid.');
      }
    } catch (error) {
      const { message } = getErrorMessage(error, 'useLogin');
      toast.error(message);
      throw error;
    }
  };

  return onLogin;
};

export default useLogin;
