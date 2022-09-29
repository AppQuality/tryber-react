import TagManager from "react-gtm-module";
import { useTranslation } from "react-i18next";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import useUser from "src/redux/user";
import { useHistory } from "react-router-dom";

import Loading from "./Loading";
import SiteHeader from "./SiteHeader";

export default ({
  children,
  redirect,
}: {
  children: React.ReactNode;
  redirect?: { url: string; message?: string };
}) => {
  const { user, error, isLoading } = useUser();
  const { t } = useTranslation();
  const history = useHistory();
  let redirectMessage = t("Redirecting to your dashboard...");

  let redirectUrl = useLocalizeRoute("my-dashboard");
  if (redirect) {
    redirectUrl = redirect.url;
    if (redirect.message) {
      redirectMessage = redirect.message;
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  if (user) {
    history.push(redirectUrl);
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  if (error && error.statusCode !== 403) {
    alert(error.message);
  }

  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
};
