import { Card } from "@appquality/appquality-design-system";
import { StyledLoginCard } from "./_style";
import LoginForm from "../LoginForm";

export const LoginPage = () => {
  return (
    <StyledLoginCard>
      <Card className="login-card">
        <div className="card-body">
          <img src="/static/trybers-login.svg" alt=""></img>
          <LoginForm className="card-login-form" />
        </div>
      </Card>
    </StyledLoginCard>
  );
};
