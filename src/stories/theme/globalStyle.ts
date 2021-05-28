// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    
  }
  img {
    max-width: 100%;
  }
  .margin-default {
    margin-bottom: ${(props) => props.theme.grid.spacing.default};
  }
`;

export default GlobalStyle;
