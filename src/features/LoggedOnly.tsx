import { Container, Title } from "@appquality/appquality-design-system";
import * as Sentry from "@sentry/react";
import TagManager from "react-gtm-module";
import { useTranslation } from "react-i18next";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import { LangMenu } from "./LangMenu";
import Loading from "./Loading";
import { LoginCard } from "./LoginCard";
import SiteHeader from "./SiteHeader";
import getUnlocalizedUrl from "./getUnlocalizedUrl";

const LoggedOnly = ({
  children,
  showHeader,
  route,
}: {
  children: React.ReactNode;
  showHeader: boolean;
  route: string;
}) => {
  const { t } = useTranslation();
  const {
    data: user,
    error,
    isLoading,
  } = useGetUsersMeQuery({
    fields: "id,email,username,wp_user_id,role,surname",
  });

  if (isLoading) {
    return <Loading />;
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  Sentry.setUser({
    id: user?.id ?? 0,
    email: user?.email ?? "unknown",
    username: user?.username ?? "unknown",
    wp_user_id: user?.wp_user_id ?? 0,
    role: user?.role ?? "unknown",
  });

  if (error) {
    if ("status" in error && error.status === 403) {
      const unlocalizedUrl = getUnlocalizedUrl(window.location.pathname);
      return (
        <>
          <SiteHeader route={route} />
          <Container>
            <LangMenu
              itLink={`/it${unlocalizedUrl}`}
              enLink={`/en${unlocalizedUrl}`}
              esLink={`/es${unlocalizedUrl}`}
              className="aq-my-3 lang-navigation"
            />
            <Title size="l" as={"h1"} className="aq-mb-3 aq-text-center">
              {t("login to continue")}
            </Title>
            <LoginCard />
          </Container>
        </>
      );
    } else {
      if ("message" in error) alert(error.message);
    }
    return null;
  }

  return (
    <>
      {showHeader ? <SiteHeader route={route} /> : null}
      {children}
    </>
  );
};
export default LoggedOnly;
