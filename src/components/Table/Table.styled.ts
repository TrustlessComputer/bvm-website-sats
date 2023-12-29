import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledTable = styled.div`
  .table {
    position: relative;
    overflow: scroll;
    color: #5b5b5b;
    --bs-body-bg: transparent;

    & > :not(caption) > * > * {
      padding: {
        top: ${px2rem(26)};
        bottom: ${px2rem(26)};
        right: 0;
        left: 0;
      }
    }

    .tableHead {
      /* border-bottom: 1px solid #d6bcbc; */

      &_item {
        font-weight: 500;
        line-height: ${px2rem(24)};
        color: #b6b6b6;
        position: sticky;
        top: 0;
        z-index: 2;
        font-size: 14px;

        @media screen and (max-width: 1024px) {
          font-size: ${px2rem(14)};
        }
      }

      .tableData {
        border-bottom: 1px solid #f7f9fb;

        &:hover {
          background-color: #f7f9fb;
        }

        &_item {
          padding-top: ${px2rem(26)};
          padding-bottom: ${px2rem(26)};
          color: #333333;
          line-height: ${px2rem(26)};
          font-weight: 600;
          vertical-align: middle;
          font-size: ${px2rem(18)};
        }
      }
    }

    .empty {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top: ${px2rem(120)};

      .content {
        margin-top: ${px2rem(16)};
      }

      tr > div {
        position: absolute;
        top: 80px;
      }
    }
  }
`;
