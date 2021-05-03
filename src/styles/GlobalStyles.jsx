import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-hearder: #FE9E00;
  }


  * {
    margin: 0;
  }

  button, input {
    outline: none;
    text-decoration: none;
  }

  a {
    text-decoration: none;
    &:link {
      color: black;
    }
    &:visited {
      color: black;
    }
    &:active {
      color: black;
    }
  }

`;

export default GlobalStyles;
