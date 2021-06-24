import styled from "styled-components";
import { aqBootstrapTheme } from "@appquality/appquality-design-system";

export const StyledLoginModal = styled.div`
  .capitalize-first:first-letter {
    text-transform: capitalize;
  }
  .aq-text-small {
    font-size: ${aqBootstrapTheme.typography.fontSize.small};
  }
  .login-social {
    text-align: center;
    > * {
      display: inline-block;
      cursor: pointer;
      width: 36px;
      height: 36px;
    }
  }
  @media (min-width: ${aqBootstrapTheme.grid.breakpoints.md}) {
    .modal-login-form {
      max-width: 321px;
      padding: 0 32px;
    }
    .modal-body {
      background: url("static/login-modal-art.svg") right bottom no-repeat;
      min-height: 400px;
    }
    .login-social {
      > * {
        width: 28px;
        height: 28px;
      }
    }
  }
`;
