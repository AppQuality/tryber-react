import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import useUser from 'src/redux/user';

import LoadingImg from './assets/tryber_loading.gif';


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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "280px" }}
            src={LoadingImg}
            alt="tryber loading"
          />
        </div>
      </div>
    );
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  if (error && error.statusCode !== 403) {
    alert(error.message);
  }

  return <>{children}</>;
};
