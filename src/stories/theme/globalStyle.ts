// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html { 
    font-size: 16px;
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    font-size: 14px;
    }
  }
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
