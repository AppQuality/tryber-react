import { Card } from "@appquality/appquality-design-system";
import LoginForm from "../LoginForm";
import styled from "styled-components";

const StyledCard = styled(Card)`
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.md}) {
    max-width: 560px;
    margin: 0 auto;
    .card-body {
      max-width: 300px;
      margin: 0 auto;
    }
  }
`;

export const LoginCard = () => {
  return (
    <StyledCard className="login-card">
      <div className="card-body aq-text-center">
        <img
          aria-hidden
          src="/static/trybers-login.svg"
          alt="tryber-login"
          className="aq-mb-4"
        />
        <LoginForm className="card-login-form" />
      </div>
    </StyledCard>
  );
};