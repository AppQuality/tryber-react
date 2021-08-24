import { useState, useEffect } from "react";
import useUser from "../redux/user";
import {
  Container,
  Title,
  Spinner,
  SpinnerWrapper,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export default ({
  children,
  redirect,
}: {
  children: React.ReactNode;
  redirect?: { url: string; message?: string };
}) => {
  const { user, error, isLoading } = useUser();
  const { t, i18n } = useTranslation();
  const [loadingMessage, setLoadingMessage] = useState<string>(t("Loading"));
  let redirectMessage = t("Redirecting to your dashboard...");
  let redirectUrl =
    i18n.language === "en" ? "/my-dashboard/" : "/it/la-mia-dashboard/";
  if (redirect) {
    redirectUrl = redirect.url;
    if (redirect.message) {
      redirectMessage = redirect.message;
    }
  }

  useEffect(() => {
    if (user) {
      setLoadingMessage(redirectMessage);
      window.location.href = redirectUrl;
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
