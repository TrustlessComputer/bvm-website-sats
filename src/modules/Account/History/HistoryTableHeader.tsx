import px2rem from '@/utils/px2rem';
import React from 'react';
import BannerImg from '@/assets/images/banner.png';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  border-top-right-radius: ${px2rem(24)};
  border-top-left-radius: ${px2rem(24)};
  background-image: url(${BannerImg});
  background-size: cover;
  max-height: 60px;

  th {
    max-height: 60px;
    padding: ${px2rem(20)} ${px2rem(15)};
    text-align: center;
    font-weight: 600;
    font-size: ${px2rem(18)};
    color: white;
  }

  thead {
    max-height: 60px;
  }

  tr {
    display: flex;
  }
`;

type Props = {
  dataHeader: any[];
};

const HistoryTableHeader = React.memo((props: Props) => {
  const { dataHeader = [] } = props;
  return (
    <Container>
      <table cellPadding={0} cellSpacing={0} border={0}>
        <thead>
          <tr>
            {dataHeader.map((item, index) => (
              <th
                key={`${item.key + index}`}
                style={{
                  flex: item.flex,
                }}
              >
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
      </table>
    </Container>
  );
});

export default HistoryTableHeader;
