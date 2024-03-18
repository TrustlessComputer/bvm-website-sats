import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';
import { opacify } from '@/utils';

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;

  gap: ${px2rem(32)};
  background-color: ${({ theme }) => theme.background_secondary};
  border-radius: ${px2rem(32)};
  padding: ${px2rem(32)} ${px2rem(60)};
  height: 100%;
  min-height: 80vh;

  .spinner {
    align-self: center;
  }

  .desc-wrapper-1 {
    margin-top: ${px2rem(10)};
    margin-bottom: 1rem;
  }
  margin-top: ${px2rem(20)};
  margin-bottom: ${px2rem(50)};

  ${MediaQueryBuilder(
    'lg',
    css`
      flex-direction: column;
      padding: ${px2rem(32)} ${px2rem(24)};
    `,
  )}

  ${MediaQueryBuilder(
    'md',
    css`
      padding: ${px2rem(32)} ${px2rem(0)};
      background-color: transparent;
    `,
  )}
`;

const LeftContainer = styled.div`
  display: flex;
  flex: 1;

  .sticky {
    position: sticky;
    top: ${px2rem(0)};
    display: flex;
    flex-direction: column;
    flex: 1;
    img {
      margin-bottom: ${px2rem(52)};
    }
  }
  .discord {
    color: #06c;
    margin-top: ${px2rem(4)};
    :hover {
      cursor: pointer;
    }
  }
  ${MediaQueryBuilder(
    'lg',
    css`
      .sticky {
        align-items: center;
        justify-content: center;
      }
    `,
  )}
`;

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  .header {
    margin-bottom: ${px2rem(20)};
  }

  .cost {
    font-size: ${px2rem(14)};
  }

  .sectionList {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItemContainer = styled.div`
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  /* background-color: blue; */
  gap: 0.8rem;
`;

const Space = styled.div`
  margin-top: ${px2rem(10)};
`;

const FooterView = styled.div`
  position: sticky;
  display: flex;
  flex-direction: row;
  /* background-color: lightblue; */
  width: 100%;
  gap: ${px2rem(32)};
  bottom: 0;
  min-height: ${px2rem(160)};
  padding-top: ${px2rem(24)};
  padding-bottom: ${px2rem(24)};
  padding-left: ${px2rem(60)};
  padding-right: ${px2rem(60)};
  background-color: ${({ theme }) => theme.background_secondary};
  border-top: 1px solid ${({ theme }) => opacify(20, theme.text_primary)};
  ${MediaQueryBuilder(
    'xxxl',
    css`
      bottom: ${px2rem(0)};
    `,
  )}
  ${MediaQueryBuilder(
    'xxl',
    css`
      padding-left: 0;
      gap: ${px2rem(32)};
      padding-right: 0;
    `,
  )}
  ${MediaQueryBuilder(
    'xs',
    css`
      min-height: ${px2rem(80)};
      position: relative;
    `,
  )}
`;

const FooterActions = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  gap: ${px2rem(32)};
  ${MediaQueryBuilder(
    'lg',
    css`
      flex: 1;
      justify-content: flex-end;
    `,
  )}
`;

const FooterActions2 = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  /* background-color: grey; */
  gap: ${px2rem(12)};
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${px2rem(42)};
  }
  .grid-content {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(8)};
  }
  ${MediaQueryBuilder(
    'xs',
    css`
      display: none;
    `,
  )}
  ${MediaQueryBuilder(
    'lg',
    css`
      flex: 1;
      /* justify-content: space-between; */
    `,
  )}
`;

const BreakLine = styled.div`
  display: flex;
  background-color: #787878;
  height: 1px;
  width: '100%';
`;

const RowActionInfor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: ${px2rem(32)};
`;

const FooterInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  /* background-color: green; */
  gap: ${px2rem(12)};
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${px2rem(42)};
  }
  .grid-content {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(8)};
  }
  ${MediaQueryBuilder(
    'xs',
    css`
      display: none;
    `,
  )}
`;

const FooterInfo2 = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: red;
  gap: ${px2rem(12)};
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${px2rem(42)};
  }
  .grid-content {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(8)};
  }
  ${MediaQueryBuilder(
    'xs',
    css`
      display: none;
    `,
  )}
`;

const RowSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const ContactLeftView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ContactRightView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export {
  Container,
  LeftContainer,
  RightContainer,
  Section,
  ListItemContainer,
  Space,
  FooterView,
  FooterActions,
  FooterActions2,
  FooterInfo,
  FooterInfo2,
  RowActionInfor,
  BreakLine,
  RowSection,
  ContactLeftView,
  ContactRightView,
};
