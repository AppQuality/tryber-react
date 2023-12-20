import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LoginPage } from "src/features/LoginPage";
import { PageTemplate } from "src/features/PageTemplate";

export const Login = () => {
  const { t } = useTranslation();
  return (
    <PageTemplate route={"login"} shouldBeLoggedIn={false}>
      <Title size="l" as={"h1"} className="aq-my-4 aq-text-center">
        {t("login page title")}
      </Title>
      {LoginPage()};
    </PageTemplate>
  );
};

export default Login;
