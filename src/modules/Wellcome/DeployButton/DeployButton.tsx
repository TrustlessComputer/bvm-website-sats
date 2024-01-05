import * as S from './styled';
import React from 'react';
import useRouteHelper from '@/hooks/useRouterHelper';
import Text from '@/components/Text';
import configs from '@/configs';

interface IProps {
  paddingVertical?: number;
  paddingHorizontal?: number;
  fontSize?: number;
  showComingSoon?: boolean;
  text?: string;
}

const DeployButton = ({
  paddingVertical = 12,
  paddingHorizontal = 80,
  fontSize = 18,
  showComingSoon = true,
  text = 'Launch your Bitcoin L2',
}: IProps) => {
  const { goBuildPage } = useRouteHelper();
  const [loading] = React.useState(false);

  const onAction = async () => {
    goBuildPage();
  };

  return (
    <>
      <>
        <S.Container
          paddingVertical={paddingVertical}
          paddingHorizontal={paddingHorizontal}
          fontSize={fontSize}
          variantColor="black"
          onClick={onAction}
          loading={{ isLoading: loading }}
          disabled={loading || configs.DISABLED_FEATURES.DEPLOY}
          sizes="small"
        >
          <div>
            <Text color="text_reverse" fontWeight="semibold">
              {text}
            </Text>
            {!!showComingSoon && configs.DISABLED_FEATURES.DEPLOY && (
              <Text color="text_reverse" size="14">
                (coming soon)
              </Text>
            )}
          </div>
        </S.Container>
      </>
    </>
  );
};

export default DeployButton;
