import React from 'react';

import styled from 'styled-components';
import {
  HistoryItem,
  HistoryStatusColorMap,
  HistoryStatusMap,
  HistoryType,
  HistoryTypeMap,
  InstanceInfoType,
} from './History.types';
import { HEADER_COLUMNS } from './History.constants';
import { formatAmount, getExplorer } from './History.helper';
import { formatDateTime } from '@/utils';
import { Copy, ExternalLink } from 'react-feather';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import * as formatter from 'tc-formatter';
import { NOS_EXPLORER_URL } from '@/chains';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  overflow-x: auto;
  margin-top: 0px;
  border-bottom-right-radius: ${px2rem(20)};
  border-bottom-left-radius: ${px2rem(20)};
  border: 1px solid grey;

  tr {
    height: 70px;
    display: flex;
    flex-direction: row;
    flex-basis: auto;
  }

  th {
    border: 0.5px solid lightgray;
    padding: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    overflow-wrap: break-word;
  }

  td {
    display: table-cell !important;
    text-overflow: ellipsis;
    flex-basis: auto;
  }
`;

const TableRow = styled.tr`
  :nth-child(even) {
    background-color: #f3f3f3;
  }
  :hover {
    opacity: 0.8;
    background-color: lightyellow;
  }

  .pointer {
    cursor: pointer;
    opacity: 0.7;
    scale: 1.02;
  }
`;

const Cell = styled.tr`
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  overflow: hidden;

  overflow-wrap: break-word;
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;

  .center {
    text-align: center;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  gap: 0.6rem;
  text-overflow: ellipsis;
`;

type Props = {
  dataSource: any[];
};

const HistoryTableContent = React.memo((props: Props) => {
  const { dataSource = [] as HistoryItem[] } = props;

  const onCopyStr = (str: string) => {
    copy(str || '');
    toast.success('Copied');
  };

  const renderOrderId = (orderId: string) => {
    if (!orderId) return '--';
    return (
      <Row>
        <p>{orderId}</p>
        <Copy size="18" className="pointer" onClick={() => onCopyStr(orderId)} />
      </Row>
    );
  };

  const renderNetworkName = (networkName: string) => {
    if (!networkName || networkName.length < 1) return '--';
    return (
      <Row>
        <p>{networkName}</p>
      </Row>
    );
  };

  const renderTxProcess = (txProces: string, type: HistoryType, instanceInfo: InstanceInfoType) => {
    const explorer = getExplorer(type, instanceInfo);
    if (!explorer || !txProces) return '--';
    return (
      <Row>
        <p>
          {formatter.ellipsisCenter({
            str: txProces,
            limit: 8,
          })}
        </p>
        <Copy size="18" className="pointer" onClick={() => onCopyStr(txProces)} />
        <ExternalLink
          size="18"
          className="pointer"
          onClick={() => window.open(`${explorer}tx/${txProces}`, '_blank')}
        ></ExternalLink>
      </Row>
    );
  };

  const renderRow = (item: HistoryItem) => {
    const { orderId, txProcess, amount, type, status, created_at, instanceInfo } = item;
    return (
      <TableRow key={item.id}>
        <Cell style={{ flex: HEADER_COLUMNS[0].flex }}>{renderNetworkName(instanceInfo?.chainName)}</Cell>
        <Cell style={{ flex: HEADER_COLUMNS[1].flex }}>{renderTxProcess(txProcess, type, instanceInfo)}</Cell>
        <Cell style={{ flex: HEADER_COLUMNS[2].flex }}>
          <p>{formatAmount(amount) + ' BVM'}</p>
        </Cell>
        <Cell style={{ flex: HEADER_COLUMNS[3].flex }}>
          <p>{HistoryTypeMap[type] || '--'}</p>
        </Cell>
        <Cell style={{ flex: HEADER_COLUMNS[4].flex }}>
          <p
            style={{
              color: HistoryStatusColorMap[status] || 'black',
              fontWeight: 600,
            }}
          >
            {HistoryStatusMap[status] || '--'}
          </p>
        </Cell>
        <Cell style={{ flex: HEADER_COLUMNS[5].flex }}>
          <p>
            {created_at
              ? formatDateTime({
                  dateTime: new Date(created_at).getTime(),
                }).toLocaleString()
              : '--'}
          </p>
        </Cell>
      </TableRow>
    );
  };

  return (
    <Container>
      <table cellPadding={0} cellSpacing={0} border={0}>
        {dataSource.map(item => renderRow(item))}
      </table>
    </Container>
  );
});

export default HistoryTableContent;
