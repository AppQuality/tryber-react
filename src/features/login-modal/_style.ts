import styled from "styled-components";
import { aqBootstrapTheme } from "@appquality/appquality-design-system";

export const StyledLoginModal = styled.div`
  .capitalize-first:first-letter {
    text-transform: capitalize;
  }
  .login-social {
    margin: 0 auto;
    max-width: 78px;
    display: flex;
    justify-content: space-between;
    > * {
      width: 28px;
      height: 28px;
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
  }
`;
