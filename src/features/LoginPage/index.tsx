import { Card } from "@appquality/appquality-design-system";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyledLoginCard } from "./_style";
import { useAppDispatch } from "src/store";
import { setIsLoginPage } from "./loginPageSlice";
import LoginForm from "../LoginForm";

export const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLoginPage(true));
    return () => {
      dispatch(setIsLoginPage(false));
    };
  }, []);

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
