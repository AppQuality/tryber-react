import { aqBootstrapTheme } from "@appquality/appquality-design-system";
import styled from "styled-components";

export const StyledLoginModal = styled.div`
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
    .modal-login-form {
      max-width: 321px;
      padding: 0 32px;
    }
    .modal-body {
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
