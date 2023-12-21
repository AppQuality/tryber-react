import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LangMenu } from "src/features/LangMenu";
import { LoginPage } from "src/features/LoginPage";
import { PageTemplate } from "src/features/PageTemplate";

export const Login = () => {
  const { t } = useTranslation();
  return (
    <PageTemplate route={"login"} shouldBeLoggedIn={false}>
      <LangMenu
        itLink="/it/login"
        enLink="/en/login"
        esLink="/es/login"
        className="aq-my-4 lang-navigation"
      />
      <Title size="l" as={"h1"} className="aq-my-4 aq-text-center">
        {t("login page title")}
      </Title>
      {LoginPage()};
    </PageTemplate>
  );
};

export default Login;
