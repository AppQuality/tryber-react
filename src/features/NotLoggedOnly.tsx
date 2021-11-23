import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useLocalizeRoute } from "../hooks/useLocalizedRoute";
import useUser from "../redux/user";

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

  let redirectUrl = useLocalizeRoute("my-dashboard");
  if (redirect) {
    redirectUrl = redirect.url;
    if (redirect.message) {
      redirectMessage = redirect.message;
    }
  }

  useEffect(() => {
    if (user) {
      setLoadingMessage(redirectMessage);
      history.push(redirectUrl);
    }
  }, [user]);

  if (isLoading || user) {
    return (
      <div id="appq-loading-content">
        <div id="appq-loading-spinner">
          <div></div>
        </div>
      </div>
    );
  }

  if (error && error.statusCode !== 403) {
    alert(error.message);
  }

  return <>{children}</>;
};
