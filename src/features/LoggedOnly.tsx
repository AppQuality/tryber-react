import TagManager from "react-gtm-module";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import Loading from "./Loading";
import { LoginCard } from "./LoginCard";
import SiteHeader from "./SiteHeader";
import * as Sentry from "@sentry/react";
import Login from "src/pages/Login";

const LoggedOnly = ({
  children,
  showHeader,
}: {
  children: React.ReactNode;
  showHeader: boolean;
}) => {
  const {
    data: user,
    error,
    isLoading,
  } = useGetUsersMeQuery({
    fields: "id,email,username,wp_user_id,role",
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
      return <LoginCard />;
    } else {
      if ("message" in error) alert(error.message);
    }
    return null;
  }

  return (
    <>
      {showHeader ? <SiteHeader /> : null}
      {children}
    </>
  );
};
export default LoggedOnly;
