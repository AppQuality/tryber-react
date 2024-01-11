import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LangMenu } from "src/features/LangMenu";
import { LoginCard } from "src/features/LoginCard";
import { PageTemplate } from "src/features/PageTemplate";
import { getRedirectTo } from "src/features/getValidRedirect";

export const Login = () => {
  const { t } = useTranslation();
  const redirectTo = getRedirectTo();

  return (
    <PageTemplate route={"login"} shouldBeLoggedIn={false}>
      <LangMenu
        itLink={`/it/login${redirectTo ? `?redirectTo=${redirectTo}` : ""}`}
        enLink={`/login${redirectTo ? `?redirectTo=${redirectTo}` : ""}`}
        esLink={`/es/login${redirectTo ? `?redirectTo=${redirectTo}` : ""}`}
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
