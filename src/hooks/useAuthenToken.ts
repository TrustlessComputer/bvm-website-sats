import storageAuthen from '@/storage/storage.authen';
import client from '@/services/client';
import { getErrorMessage } from '@/utils';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/state/hooks';
import { setAuthen, removeAuthen } from '@/state/user/reducer';
import { axiosRemoveAccessToken, axiosSetAccessToken } from '@/services/client';

const useAuthenToken = () => {
  const dispatch = useAppDispatch();

  const onRemoveAuthen = (tcAddress: string) => {
    storageAuthen.removeToken(tcAddress);
    dispatch(removeAuthen({ tcAddress: tcAddress }));
    axiosRemoveAccessToken();
  };

  const onVerify = async (tcAddress: string) => {
    let isValid = false;
    try {
      const token = storageAuthen.getToken(tcAddress);
      if (token) {
        // this account is logged in
        const { isValid: validAPI } = await client.verifyAccessToken({
          tcAddress: token.tcAddress,
        });
        if (!validAPI) {
          onRemoveAuthen(token.tcAddress);
          isValid = false;
        } else {
          dispatch(setAuthen({ tcAddress: token.tcAddress, isAuthen: true }));
          axiosSetAccessToken(token.accessToken);
          isValid = true;
        }
      }
    } catch (error) {
      const { message } = getErrorMessage(error, 'Failed to verify token');
      toast.error(message);
      onRemoveAuthen(tcAddress);
      isValid = false;
    }

    return isValid;
  };

  return {
    onVerify,
    onRemoveAuthen,
  };
};

export default useAuthenToken;
