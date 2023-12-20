import { useTranslation } from "react-i18next";
import { LoginPage } from "src/features/LoginPage";
import { PageTemplate } from "src/features/PageTemplate";

export const Login = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTemplate title={t("Login")} route={"login"} shouldBeLoggedIn={false}>
        {LoginPage()};
      </PageTemplate>
    </>
  );
};

export default Login;
