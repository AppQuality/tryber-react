import { useState, useEffect } from "react";
import UserStore from "../redux/user";
import {
  Container,
  Title,
  Spinner,
  SpinnerWrapper,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useLocalizeRoute } from "../hooks/useLocalizedRoute";

const NotLoggedOnly = ({
  children,
  redirect,
}: {
  children: React.ReactNode;
  redirect?: { url: string; message?: string };
}) => {
  const history = useHistory();
  const { user, error, isLoading } = UserStore();
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
      <Container className="aq-py-3">
        <SpinnerWrapper>
          <Spinner />
          <Title size="xs" as="h5">
            {loadingMessage}
          </Title>
        </SpinnerWrapper>
      </Container>
    );
  }

  if (error && error.statusCode !== 403) {
    alert(error.message);
  }

  return <>{children}</>;
};

export default NotLoggedOnly;
