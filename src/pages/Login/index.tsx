import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LangMenu } from "src/features/LangMenu";
import { LoginCard } from "src/features/LoginCard";
import { PageTemplate } from "src/features/PageTemplate";

export const Login = () => {
  const { t } = useTranslation();
  const url = new URL(window.location.href);
  const queryParams = new URLSearchParams(url.search);
  return (
    <PageTemplate route={"login"} shouldBeLoggedIn={false}>
      <LangMenu
        itLink={`/it/login${getValidParams(queryParams)}`}
        enLink={`/en/login${getValidParams(queryParams)}`}
        esLink={`/es/login${getValidParams(queryParams)}`}
        className="aq-my-3 lang-navigation"
      />
      <Title size="l" as={"h1"} className="aq-mb-3 aq-text-center">
        {t("login page title")}
      </Title>
      <LoginCard />
    </PageTemplate>
  );
};

function getValidParams(queryParams: URLSearchParams) {
  if (queryParams.has("redirectTo")) {
    if (redirectIsValid(queryParams)) return `?${queryParams.toString()}`;
    else {
      queryParams.delete("redirectTo");
      return `?${queryParams.toString()}`;
    }
  }
  if (queryParams.size) return `?${queryParams.toString()}`;
  return "";
}

function redirectIsValid(params: URLSearchParams) {
  const urlRegex =
    /^(https?:\/\/)?([\w-]+\.)*([\w-]+\.[a-z]{2,})(:\d{2,5})?(\/[^\s]*)?(\?.*)?$/;
  const redirect = params.get("redirectTo") ?? "";

  if (!redirect.length) {
    return false;
  }
  if (!urlRegex.test(redirect)) {
    return false;
  }
  const parsedURL = new URL(redirect);
  return (
    parsedURL.hostname === "dev.tryber.me" || parsedURL.hostname === "tryber.me"
  );
}

export default Login;
