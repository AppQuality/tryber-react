import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LangMenu } from "src/features/LangMenu";
import { LoginCard } from "src/features/LoginCard";
import { PageTemplate } from "src/features/PageTemplate";
import getValidRedirect from "src/features/getValidRedirect";

export const Login = () => {
  const { t } = useTranslation();
  const url = new URL(window.location.href);
  const queryParams = new URLSearchParams(url.search);
  return (
    <PageTemplate route={"login"} shouldBeLoggedIn={false}>
      <LangMenu
        itLink={`/it/login${getValidRedirect(queryParams)}`}
        enLink={`/en/login${getValidRedirect(queryParams)}`}
        esLink={`/es/login${getValidRedirect(queryParams)}`}
        className="aq-my-3 lang-navigation"
      />
      <Title size="l" as={"h1"} className="aq-mb-3 aq-text-center">
        {t("login page title")}
      </Title>
      <LoginCard />
    </PageTemplate>
  );
};

export default Login;
