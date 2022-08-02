import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import useUser from "src/redux/user";

import Loading from "./Loading";

export default ({
  children,
  redirect,
}: {
  children: React.ReactNode;
  redirect?: { url: string; message?: string };
}) => {
  const history = useHistory();
  const { user, error, isLoading } = useUser();
  const { t } = useTranslation();
  const [loadingMessage, setLoadingMessage] = useState<string>(t("Loading"));
  let redirectMessage = t("Redirecting to your dashboard...");
  const homeRoute = useLocalizeRoute("");

  let redirectUrl = useLocalizeRoute("my-dashboard");
  if (redirect) {
    redirectUrl = redirect.url;
    if (redirect.message) {
      redirectMessage = redirect.message;
    }
  }

  useEffect(() => {
    if (user) {
      if (user.id) {
        localStorage.setItem("isUserLogged", "true");
      }
      setLoadingMessage(redirectMessage);
      history.push(redirectUrl);
    }
  }, [user]);

  if (isLoading || user) {
    return <Loading />;
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  if (error) {
    const isUserLogged = localStorage.getItem("isUserLogged") === "true";
    if (error.statusCode === 403) {
      if (isUserLogged) {
        localStorage.setItem("isUserLogged", "false");
        history.push(homeRoute);
      }
    } else {
      alert(error.message);
    }
  }

  return <>{children}</>;
};
