import * as S from './styled';
import { useAppSelector } from '@/state/hooks';
import { quickStartSelector } from '@/state/user/selector';
import Text from '@/components/Text';
import { IQuickStart, QuickStartTypeEnum } from '@/interface/services/client';
import IconSVG from '@/components/IconSVG';
import configs from '@/configs';
import client from '@/services/client';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { Row } from '@/components/Row';
import Spinner from '@/components/Spinner/Spinner';
import QuickStartTweet from '@/components/QuickStart/QuickStart.tweet';
import useToggle from '@/hooks/useToggle';
import useRouteHelper from '@/hooks/useRouterHelper';

interface IUpdated {
  [address: string]: Array<QuickStartTypeEnum>;
}

const QuickStart = () => {
  const { account } = useWeb3React();
  const list = useAppSelector(quickStartSelector);
  const [updated, setUpdated] = React.useState<IUpdated>({});
  const [loading, setLoading] = React.useState(false);
  const [showTweet, toggleShowTweet] = useToggle(false);
  const { goBuildPage } = useRouteHelper();

  const updateData = (type: QuickStartTypeEnum) => {
    if (!account) return;
    setUpdated(value => {
      const newUpdated = [...((updated || {})[account] || []), type];
      return {
        ...value,
        [account]: newUpdated,
      };
    });
  };

  const onItemClicked = async (item: IQuickStart) => {
    setLoading(true);
    let isSuccess = false;
    switch (item.type) {
      case QuickStartTypeEnum.FAUCET:
      case QuickStartTypeEnum.ISSUE_TOKEN:
      case QuickStartTypeEnum.CROWD_FUNDING:
      case QuickStartTypeEnum.DAO:
      case QuickStartTypeEnum.JOIN_DISCORD: {
        isSuccess = await client.updateQuickStart(item.type);
        break;
      }
    }

    switch (item.type) {
      case QuickStartTypeEnum.ISSUE_TOKEN: {
        if (isSuccess) window.open(configs.ISSUE_TOKEN_URL);
        break;
      }
      case QuickStartTypeEnum.CROWD_FUNDING: {
        if (isSuccess) window.open(configs.CROWD_URL);
        break;
      }
      case QuickStartTypeEnum.DAO: {
        if (isSuccess) window.open(configs.DAO_URL);
        break;
      }
      case QuickStartTypeEnum.JOIN_DISCORD: {
        if (isSuccess) window.open(configs.DISCORD_TRUSTLESS_URL);
        break;
      }
      case QuickStartTypeEnum.CREATE: {
        goBuildPage();
      }
    }

    if (isSuccess && !!account) {
      updateData(item.type);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const renderItem = (item: IQuickStart) => {
    const isCompleted = Boolean(
      item.completed || (account && updated[account] && (updated[account] || []).includes(item.type)),
    );

    if (item.type === QuickStartTypeEnum.TWITTER) {
      return (
        <S.Item
          key={item.title}
          isChecked={isCompleted}
          onClick={() => {
            if (isCompleted) return;
            toggleShowTweet();
          }}
        >
          <Text>{item.title}</Text>
          <IconSVG src={`${configs.CDN_APP_ICON_URL}/${isCompleted ? 'check-circle-2' : 'un-check-circle-2'}.svg`} />
        </S.Item>
      );
    }
    return (
      <S.Item
        key={item.title}
        isChecked={isCompleted}
        onClick={() => {
          if (isCompleted) return;
          onItemClicked(item);
        }}
      >
        <Text>{item.title}</Text>
        <IconSVG src={`${configs.CDN_APP_ICON_URL}/${isCompleted ? 'check-circle-2' : 'un-check-circle-2'}.svg`} />
      </S.Item>
    );
  };

  if (!list || !list.length) return <></>;

  return (
    <>
      <S.Container>
        <Row gap={32}>
          <Text size="24" fontWeight="semibold">
            Quick start
          </Text>
          {loading && <Spinner size={16} />}
        </Row>
        <S.Content>{list.map(renderItem)}</S.Content>
        {showTweet && (
          <QuickStartTweet
            show={showTweet}
            onHide={toggleShowTweet}
            onSuccess={() => {
              toggleShowTweet();
              updateData(QuickStartTypeEnum.TWITTER);
            }}
          />
        )}
      </S.Container>
      <S.Line />
    </>
  );
};

export default QuickStart;
