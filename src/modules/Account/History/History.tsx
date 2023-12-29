import * as S from './styled';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { fetchHistory as fetchHistoryAction } from '@/state/user/actions';
import { historyInfoSelector } from '@/state/user/selector';
import React, { useEffect, useMemo } from 'react';
import Empty from '@/components/Empty';
import { HEADER_COLUMNS } from './History.constants';
import HistoryTable from './HistoryTable';
import { useFetchUserData, useIsAuthenticated } from '@/state/user/hooks';
import useAsyncEffect from 'use-async-effect';

const TIMER_INTERVAL = 6000; //6s

const HistoryPage = React.memo(() => {
  const dispatch = useAppDispatch();
  const fetchUserData = useFetchUserData();
  const isAuthenticated = useIsAuthenticated();
  const { historyList } = useAppSelector(historyInfoSelector);

  const timerRef = React.useRef<any>();

  const fetchHistory = async () => {
    if (isAuthenticated) {
      dispatch(fetchHistoryAction());
    }
  };

  useEffect(() => {
    fetchHistory();
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        fetchHistory();
      }, TIMER_INTERVAL);
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    };
  }, [isAuthenticated]);

  useAsyncEffect(async () => {
    await fetchUserData();
  }, [isAuthenticated]);

  const isEmpty = useMemo(() => {
    return !historyList || historyList.length < 1;
  }, [historyList]);

  const renderEmptyView = () => {
    return <Empty infoText="No history" />;
  };

  const renderContent = () => {
    return <HistoryTable dataHeader={HEADER_COLUMNS} dataSource={historyList} />;
  };

  return <S.Container>{isEmpty || !isAuthenticated ? renderEmptyView() : renderContent()}</S.Container>;
});

export default HistoryPage;
