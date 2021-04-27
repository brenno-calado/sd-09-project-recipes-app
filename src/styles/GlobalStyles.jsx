import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --blue-50: #3bf2ff4;
  }

  * {
    margin: 0;
  }

  button, input {
    outline: none;
  }
`;

export default GlobalStyles;
