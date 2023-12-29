import styled from 'styled-components';

export const TextInputNoBorder = styled.input`
  min-height: 45px;
  max-width: auto;
  width: fit-content;
  width: 60%;

  /* background-color: red; */
  padding-left: 16px;

  overflow: hidden;

  font-weight: 500;
  font-size: 18px;
  color: black;

  caret-color: #3772ff;

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
`;
