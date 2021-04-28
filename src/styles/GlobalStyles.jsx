import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    
  }

  * {
    margin: 0;
  }

  button, input {
    outline: none;
  }

  .Footer {
    position: fixed;
    bottom: 0px;
  }
`;

export default GlobalStyles;
