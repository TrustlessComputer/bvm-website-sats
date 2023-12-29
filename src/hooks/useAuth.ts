import { useAppSelector } from '@/state/hooks';
import { isAuthenticatedSelector } from '@/state/user/selector';
import { useWeb3React } from '@web3-react/core';

const useAuth = () => {
  const { account } = useWeb3React();
  const isAuth = useAppSelector(isAuthenticatedSelector)(account);
  return !!isAuth;
};

export default useAuth;
