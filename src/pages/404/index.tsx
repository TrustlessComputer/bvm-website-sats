import * as S from './404.styled';
import Text from '@/components/Text';
import Button from '@/components/Button';
import useRouteHelper from '@/hooks/useRouterHelper';

const Page404 = () => {
  const { goHomePage } = useRouteHelper();

  return (
    <S.Container>
      <Text fontWeight="semibold" size="96" align="center" color="button_primary">
        404
      </Text>
      <S.NotFoundImage src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" />
      <Text fontWeight="semibold" size="32" align="center" color="text_primary">
        Look like you're lost
      </Text>
      <Text fontWeight="semibold" size="18" align="center" color="text_secondary">
        the page you are looking for not avaible!
      </Text>
      <Button variants="underline" onClick={goHomePage}>
        Go home
      </Button>
    </S.Container>
  );
};

export default Page404;
