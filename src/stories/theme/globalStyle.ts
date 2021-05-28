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
  ${(props) =>
    Object.entries(props.theme.grid.breakpoints)
      .map(
        ([key, value]) => `
      @media (min-width: ${value}) {
        .stick-to-header-${key} {
          position: sticky;
          top: calc(54px + ${props.theme.grid.spacing.default});
        }
      }
    `
      )
      .join("")}
`;

export default GlobalStyle;
