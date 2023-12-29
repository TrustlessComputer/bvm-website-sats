import React from 'react';

import styled from 'styled-components';
import { HistoryItem } from './History.types';
import HistoryTableContent from './HistoryTableContent';
import HistoryTableHeader from './HistoryTableHeader';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  width: 100%;
  height: 100%;

  table {
    width: 100%;
    height: 100%;
    table-layout: fixed;
  }

  * {
    text-align: center;
    font-weight: 500;
    font-size: ${px2rem(16)};
  }

  .fontBold {
    font-weight: 600;
  }
`;

type Props = {
  dataHeader: any[];
  dataSource: any[];
};

const HistoryTable = React.memo((props: Props) => {
  const { dataSource = [] as HistoryItem[], dataHeader = [] } = props;
  return (
    <Container>
      <HistoryTableHeader dataHeader={dataHeader} />
      <HistoryTableContent dataSource={dataSource} />
    </Container>
  );
});

export default HistoryTable;
