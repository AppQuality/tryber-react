import { aqBootstrapTheme } from "@appquality/appquality-design-system";
import styled from "styled-components";

export const StyledLoginCard = styled.div`
  display: flex;
  align-items: center;
  height: calc(100vh + 32px);
  margin: auto;
  padding: 16px;

  .login-card {
    width: 600px;
    height: fit-content;
  }
  .aq-card-header {
    padding: 16px;
    .aq-card-title {
      font-size: 16px;
    }
  }
  .login-social {
    text-align: center;
    > * {
      display: inline-block;
      cursor: pointer;
      > img {
        width: 36px;
        height: 36px;
      }
    }
  }

  @media (min-width: ${aqBootstrapTheme.grid.breakpoints.md}) {
    padding: 0;
    width: 600px;
    height: 100vh;

    .aq-card-body {
      margin: 16px 0 16px 16px !important;
    }
    .card-login-form {
      max-width: 321px;
      padding: 0 32px;
    }
    .card-body {
      min-height: 400px;
    }
    .login-social {
      > * > img {
        width: 28px;
        height: 28px;
      }
    }
  }
`;
