import useAuth from '@/hooks/useAuth';
import useRouteHelper from '@/hooks/useRouterHelper';

const withAuthen =
  (Component: any, isRedirect = true) =>
  (props: any) => {
    const { goHomePage } = useRouteHelper();
    const isAuth = useAuth();
    if (!isAuth) {
      if (isRedirect) {
        goHomePage();
      } else {
        return null;
      }
    }
    return <Component {...props} />;
  };

export default withAuthen;
