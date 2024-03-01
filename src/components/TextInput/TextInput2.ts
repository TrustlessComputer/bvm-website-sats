import styled from 'styled-components';

export const TextInput2 = styled.input`
  min-height: 45px;
  width: 100%;

  padding: 16px;

  outline: none;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: 500;
  font-size: 18px;
  line-height: 16px;

  color: black;

  caret-color: #3772ff;
  border: 1px solid #d9d9d9;
  border-radius: 12px;

  :hover {
    border: 1px solid #3772ff;
  }

  :disabled {
    border: 1px solid grey;
    :hover {
      border: 1px solid grey;
    }
  }

  :focus {
    border: 1px solid #3772ff;
  }

  ::placeholder {
    color: lightgray;
  }

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  &.error {
    border: 1px solid #ff3737;
  }
`;
