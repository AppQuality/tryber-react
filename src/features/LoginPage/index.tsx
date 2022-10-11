import { Card } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { StyledLoginCard } from "./_style";
import LoginForm from "../LoginForm";

export const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <StyledLoginCard>
      <Card className="login-card" title={t("Login")}>
        <div className="card-body">
          <LoginForm className="card-login-form" />
        </div>
      </Card>
    </StyledLoginCard>
  );
};
