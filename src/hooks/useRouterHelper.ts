import { ROUTE_PATH } from '@/constants/route-path';
import { setRoutePathSelected } from '@/state/application/reducer';
import { useAppDispatch } from '@/state/hooks';
import { useNavigate } from 'react-router-dom';

const REQUIRED_LOGIN = 'REQUIRED_LOGIN';

const useRouteHelper = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const postMessage = (newURL: string, message?: string) => {
    parent.postMessage(
      JSON.stringify({
        name: 'trustless-computer-change-route',
        url: newURL,
        message: message,
      }),
      '*',
    );
  };

  const goHomePage = () => {
    navigate(ROUTE_PATH.HOME);
    dispatch(setRoutePathSelected(ROUTE_PATH.HOME));
    postMessage(ROUTE_PATH.HOME);
  };

  const goDashboardPage = (isMainnet?: boolean, myPC?: boolean) => {
    let routePath = ROUTE_PATH.DASHBOARD;
    if (isMainnet !== undefined && myPC !== undefined) {
      routePath = `${ROUTE_PATH.DASHBOARD}?isMainnet=${isMainnet}&myPC=${myPC}`;
    }
    navigate(routePath);
    dispatch(setRoutePathSelected(routePath));
    postMessage(routePath);
  };

  const goAccountPage = () => {
    navigate(ROUTE_PATH.ACCOUNT);
    dispatch(setRoutePathSelected(ROUTE_PATH.ACCOUNT));
    postMessage(ROUTE_PATH.ACCOUNT);
  };

  const goNotFoundPage = () => {
    navigate(ROUTE_PATH.NOT_FOUND);
    dispatch(setRoutePathSelected(ROUTE_PATH.NOT_FOUND));
    postMessage(ROUTE_PATH.NOT_FOUND);
  };

  const goBuildPage = () => {
    navigate(ROUTE_PATH.BUY);
    dispatch(setRoutePathSelected(ROUTE_PATH.BUY));
    postMessage(ROUTE_PATH.BUY);
  };

  const requiredLogin = () => {
    console.log('PHAT ---requiredLogin from L2 service  ');
    navigate(ROUTE_PATH.BUY);
    dispatch(setRoutePathSelected(ROUTE_PATH.BUY));
    postMessage(ROUTE_PATH.BUY, REQUIRED_LOGIN);
  };

  return {
    goHomePage,
    goNotFoundPage,
    goAccountPage,
    goDashboardPage,
    goBuildPage,
    postMessage,
    requiredLogin,
  };
};

export default useRouteHelper;
