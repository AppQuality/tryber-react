import TagManager from "react-gtm-module";
import { useHistory } from "react-router-dom";

import * as Sentry from "@sentry/react";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import { useAppSelector } from "src/store";
import Loading from "./Loading";
import SiteHeader from "./SiteHeader";

const NotLoggedOnly = ({
  children,
  redirect,
}: {
  children: React.ReactNode;
  redirect?: { url: string; message?: string };
}) => {
  const {
    data: user,
    error,
    isLoading,
  } = useGetUsersMeQuery({
    fields: "id,email,username,wp_user_id,role",
  });
  const history = useHistory();
  const isPublicUser = useAppSelector(
    (state) => state.publicUserPages.isPublic
  );

  if (isLoading) {
    return <Loading />;
  }
  if (user && redirect) {
    Sentry.setUser({
      id: user?.id ?? 0,
      email: user?.email ?? "unknown",
      username: user?.username ?? "unknown",
      wp_user_id: user?.wp_user_id ?? 0,
      role: user?.role ?? "unknown",
    });
    history.push(redirect.url);
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  if (
    error &&
    "status" in error &&
    "message" in error &&
    error.status !== 403
  ) {
    alert(error.message);
  }

  return (
    <>
      {!isPublicUser && <SiteHeader />}
      {children}
    </>
  );
};

export default NotLoggedOnly;
