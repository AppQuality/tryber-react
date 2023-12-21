import { Card } from "@appquality/appquality-design-system";
import { StyledLoginCard } from "./_style";
import LoginForm from "../LoginForm";
import styled from "styled-components";

const StyledCard = styled(Card)`
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.md}) {
    max-width: 560px;
    margin: 0 auto;
  }
`;

export const LoginPage = () => {
  return (
    <StyledCard className="login-card">
      <div className="card-body aq-text-center">
        <img src="/static/trybers-login.svg" alt=""></img>
        <LoginForm className="card-login-form" />
      </div>
    </StyledCard>
  );
};
