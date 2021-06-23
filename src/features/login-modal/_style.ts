import styled from "styled-components";

export const StyledLoginModal = styled.div`
  .capitalize-first:first-letter {
    text-transform: capitalize;
  }
  @media (min-width: 768px) {
    .modal-login-form {
      max-width: 321px;
      padding: 0 32px;
    }
    .modal-body {
      background: url("static/login-modal-art.svg") right 30px no-repeat;
      min-height: 402px;
    }
  }
`;
