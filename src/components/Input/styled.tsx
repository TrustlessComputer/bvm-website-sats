import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { opacify } from '@/utils';
import Text from '@/components/Text';

const Label = styled.label`
  position: relative;
  font-size: ${px2rem(14)};
  font-weight: 500;
  color: ${({ theme }) => opacify(90, theme.text_primary)};
  opacity: 0.8;
  .required {
    color: ${({ theme }) => opacify(90, theme.negative)};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${px2rem(8)};
`;

const InputCss = css`
  border-radius: 5px;
  font-size: ${px2rem(18)};
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background-color: ${({ theme }) => theme.background_secondary};
  padding: ${px2rem(12)} ${px2rem(18)};
  min-height: ${px2rem(45)};
  flex: 1;
  transition: all 0.2s ease-in-out;
  border: 1px solid ${({ theme }) => opacify(20, theme.text_primary)};
  :hover {
    border-color: ${({ theme }) => opacify(40, theme.text_primary)};
  }
  :focus {
    border-color: ${({ theme }) => opacify(80, theme.button_primary)};
  }
`;

const Input = styled.input`
  max-height: ${px2rem(50)};
  ${InputCss};
`;

const TextArea = styled.textarea`
  border-radius: 5px;
  ${InputCss};
  padding-top: ${px2rem(24)};
`;

const TextView = styled(Text)`
  border-radius: 5px;
  display: flex;
  align-items: center;
  line-break: anywhere;
  ${InputCss};
`;

const Error = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => opacify(90, theme.negative)};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${px2rem(16)};
  flex: 1;
  position: relative;
  .max-button {
    height: ${px2rem(34)};
    position: absolute;
    right: ${px2rem(8)};
    border-radius: 6px;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const SubLabel = styled.label`
  font-size: ${px2rem(14)}
  font-weight: 500;
  color: ${({ theme }) => opacify(90, theme.text_primary)};
  align-self: flex-end;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

export { Container, Label, Input, Error, TextArea, Row, SubLabel, TextView };
