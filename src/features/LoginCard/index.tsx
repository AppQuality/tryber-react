import { CenteredCard } from "../CenteredCard";
import LoginForm from "../LoginForm";

export const LoginCard = () => {
  return (
    <CenteredCard className="login-card">
      <div className="card-body aq-text-center">
        <img
          aria-hidden
          src="/static/trybers-login.svg"
          alt="tryber-login"
          className="aq-mb-4"
        />
        <LoginForm className="card-login-form" />
      </div>
    </CenteredCard>
  );
};
